package main

import (
	"fmt"
	"os"
	"os/signal"
	"path/filepath"
	"strconv"
	"syscall"

	"github.com/Osamu-GWAD/AntiLoop/internal/adminhttp"
	"github.com/Osamu-GWAD/AntiLoop/internal/applog"
	"github.com/Osamu-GWAD/AntiLoop/internal/ipc"
	"github.com/Osamu-GWAD/AntiLoop/internal/proxy"
	"github.com/Osamu-GWAD/AntiLoop/internal/remote"
	"github.com/Osamu-GWAD/AntiLoop/internal/rotation"
	"github.com/Osamu-GWAD/AntiLoop/internal/rpc"
	"github.com/Osamu-GWAD/AntiLoop/internal/storage"
	"github.com/gofrs/flock"
)

func main() {
	storagePath := "."
	if len(os.Args) > 1 && os.Args[1] != "" {
		storagePath = os.Args[1]
	}

	if err := os.MkdirAll(storagePath, 0700); err != nil {
		fmt.Fprintf(os.Stderr, "failed to create storage dir: %v\n", err)
		os.Exit(1)
	}

	lockPath := filepath.Join(storagePath, "daemon.lock")
	fileLock := flock.New(lockPath)
	locked, err := fileLock.TryLock()
	if err != nil || !locked {
		fmt.Fprintf(os.Stderr, "daemon already running or lock failed: %v\n", err)
		os.Exit(0)
	}
	defer fileLock.Unlock()

	logFile := filepath.Join(storagePath, "daemon.log")
	_ = applog.Init(logFile, true)

	applog.Printf("[main] starting AntiLoop Go backend in %s", storagePath)

	db, err := storage.Open(storagePath)
	if err != nil {
		applog.Printf("[main] failed to open DB: %v", err)
		os.Exit(1)
	}
	defer db.Close()

	exePath, _ := os.Executable()
	extensionPath := filepath.Dir(filepath.Dir(filepath.Dir(exePath)))
	if _, err := os.Stat(filepath.Join(extensionPath, "webview-ui", "dist")); os.IsNotExist(err) {

		cwd, _ := os.Getwd()
		extensionPath = cwd
	}

	rotManager := rotation.NewManager(db)
	proxyServer := proxy.NewServer(storagePath, rotManager, db)
	adminServer := adminhttp.NewServer(storagePath, extensionPath)
	daemonIPC := ipc.NewDaemon(storagePath)
	remoteClient := remote.NewClient(db)

	rotManager.SetCallbacks(
		func(email string) {
			daemonIPC.Notify("injectToken", map[string]string{"email": email})
		},
		func(status any) {
			daemonIPC.Notify("updateStatus", status)
		},
		func(quota any, email string) {
			daemonIPC.Notify("quotaUpdate", quota)
		},
		func(msg string) {
			daemonIPC.Notify("initProgress", map[string]string{"message": msg})
		},
	)

	proxyServer.SetOnRetry(func(attempt, maxRetries, delayMs int) {
		daemonIPC.Notify("proxyRetry", map[string]any{
			"attempt":    attempt,
			"maxRetries": maxRetries,
			"delayMs":    delayMs,
		})
	})

	rpcCtx := &rpc.Context{
		DB:       db,
		Rotation: rotManager,
		Proxy:    proxyServer,
		Remote:   remoteClient,
		Storage:  storagePath,
	}

	rpcCtx.SetOnBrowserURL(func(url string) {
		daemonIPC.Notify("openBrowser", map[string]string{"url": url})
	})

	rpc.RegisterHandlers(daemonIPC, rpcCtx)
	rpc.RegisterHandlers(adminServer, rpcCtx)

	activeProviderIDStr := db.GetSettingDefault("active_provider_id", "0")
	if activeID, _ := strconv.ParseInt(activeProviderIDStr, 10, 64); activeID > 0 {
		if prov, err := db.GetProviderWithKey(activeID); err == nil {
			proxyServer.UpstreamRouter().SetActiveProvider(prov)
			applog.Printf("[main] restored active third-party provider: %s", prov.Name)
		}
	}

	maxRetries, _ := strconv.Atoi(db.GetSettingDefault("max_retries", "3"))
	proxyServer.SetMaxRetries(maxRetries)
	proxyServer.SetNetworkEnhance(db.GetSettingDefault("network_enhance", "true") == "true")

	if err := proxyServer.Start(); err != nil {
		applog.Printf("[main] failed to start proxy server: %v", err)
	}
	defer proxyServer.Close()

	if err := adminServer.Start(); err != nil {
		applog.Printf("[main] failed to start admin HTTP server: %v", err)
	}
	defer adminServer.Stop()

	if err := daemonIPC.Listen("127.0.0.1:0"); err != nil {
		applog.Printf("[main] failed to listen on IPC: %v", err)
		os.Exit(1)
	}
	defer daemonIPC.Close()

	go rotManager.RunQuotaWatch()
	applog.Println("[rotation] loops started")
	applog.Println("[quotaWatch] started")
	applog.Println("[main] background restore complete")

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-sigChan
		applog.Println("[main] received termination signal, shutting down...")
		daemonIPC.Close()
		adminServer.Stop()
		proxyServer.Close()
		os.Exit(0)
	}()

	if err := daemonIPC.Serve(); err != nil {
		applog.Printf("[main] IPC server stopped: %v", err)
	}
}
