package proxy

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/Osamu-GWAD/AntiLoop/internal/applog"
	"github.com/Osamu-GWAD/AntiLoop/internal/proxy/upstream"
	"github.com/Osamu-GWAD/AntiLoop/internal/rotation"
	"github.com/Osamu-GWAD/AntiLoop/internal/storage"
)

var hopByHopHeaders = map[string]bool{
	"Connection":          true,
	"Keep-Alive":          true,
	"Proxy-Authenticate":  true,
	"Proxy-Authorization": true,
	"Te":                  true,
	"Trailers":            true,
	"Transfer-Encoding":   true,
	"Upgrade":             true,
}

type Server struct {
	storagePath    string
	db             *storage.DB
	listener       net.Listener
	port           int
	rotation       *rotation.Manager
	router         *upstream.Router
	client         *http.Client
	maxRetries     int
	networkEnhance bool
	unaryMode      bool
	http2Enabled   bool
	keepAlive      bool
	onRetryEvent   func(attempt, maxRetries int, delayMs int)
	closed         bool
	mu             sync.RWMutex
}

func NewServer(storagePath string, rot *rotation.Manager, db *storage.DB) *Server {
	return &Server{
		storagePath:    storagePath,
		db:             db,
		rotation:       rot,
		router:         upstream.NewRouter(),
		maxRetries:     3,
		networkEnhance: true,
		unaryMode:      false,
		http2Enabled:   false,
		keepAlive:      true,
		client: &http.Client{
			Timeout: 180 * time.Second,
			Transport: &http.Transport{
				DisableKeepAlives:   false,
				MaxIdleConns:        100,
				MaxIdleConnsPerHost: 20,
				IdleConnTimeout:     90 * time.Second,
			},
		},
	}
}

func (s *Server) UpstreamRouter() *upstream.Router {
	return s.router
}

func (s *Server) Port() int {
	return s.port
}

func (s *Server) SetMaxRetries(n int) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if n <= 0 {
		n = 1
	}
	if n > 10 {
		n = 10
	}
	s.maxRetries = n
}

func (s *Server) SetNetworkEnhance(enabled bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.networkEnhance = enabled
}

func (s *Server) SetUnaryMode(enabled bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.unaryMode = enabled
}

func (s *Server) SetHTTP2(enabled bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.http2Enabled = enabled
}

func (s *Server) SetKeepAlive(enabled bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.keepAlive = enabled
}

func (s *Server) SetOnRetry(fn func(attempt, maxRetries int, delayMs int)) {
	s.onRetryEvent = fn
}

func (s *Server) Start() error {
	l, err := net.Listen("tcp", "127.0.0.1:18888")
	if err != nil {
		l, err = net.Listen("tcp", "127.0.0.1:0")
		if err != nil {
			return fmt.Errorf("proxy listen error: %w", err)
		}
	}
	s.listener = l
	s.port = l.Addr().(*net.TCPAddr).Port

	portFile := filepath.Join(s.storagePath, "daemon-proxy.port")
	_ = os.WriteFile(portFile, []byte(strconv.Itoa(s.port)), 0644)

	baseUpstream := s.getBaseUpstreamURL()
	applog.Printf("[proxy] listening on 127.0.0.1:%d (upstream: %s)", s.port, baseUpstream)
	applog.Printf("[proxy] unary mode: %v, HTTP/2: %v, keep-alive: %v", s.unaryMode, s.http2Enabled, s.keepAlive)

	go func() {
		server := &http.Server{
			Handler: s,
		}
		_ = server.Serve(l)
	}()

	return nil
}

func (s *Server) getBaseUpstreamURL() string {
	if env := os.Getenv("ANTILOOP_UPSTREAM_URL"); env != "" {
		return strings.TrimRight(env, "/")
	}
	if s.db != nil {
		if val := s.db.GetSettingDefault("upstream_url", ""); val != "" {
			return strings.TrimRight(val, "/")
		}
	}
	return "https://cloudcode-pa.googleapis.com"
}

func isGenerationRequest(path string) bool {
	return strings.HasSuffix(path, ":streamGenerateContent") ||
		strings.HasSuffix(path, ":generateContent") ||
		strings.HasSuffix(path, "/chat/completions") ||
		strings.HasSuffix(path, "/completions") ||
		strings.HasSuffix(path, "/messages")
}

func (s *Server) handleExternalMockDiscovery(w http.ResponseWriter, r *http.Request, path string) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

	switch {
	case strings.HasSuffix(path, "/cascadeNuxes"):
		w.Write([]byte(`{"nuxes":[]}`))
	case strings.HasSuffix(path, ":fetchUserInfo"):
		w.Write([]byte(`{"userTier":"PRO","userEmail":"external@antiloop.local"}`))
	case strings.HasSuffix(path, ":loadCodeAssist"):
		w.Write([]byte(`{"currentTier":"pro","cloudaicompanionProject":{"id":"projects/antiloop-external"}}`))
	case strings.HasSuffix(path, ":listExperiments"):
		w.Write([]byte(`{"experiments":[]}`))
	case strings.HasSuffix(path, ":fetchAvailableModels"):
		prov := s.router.ActiveProvider()
		modelName := "External Model"
		modelID := "external-model"
		if prov != nil && prov.ModelID != "" {
			modelID = prov.ModelID
			if prov.Name != "" {
				modelName = prov.Name
			} else {
				modelName = prov.ModelID
			}
		}
		resp := map[string]any{
			"agentModelSorts": []map[string]any{
				{
					"displayName": "Recommended",
					"groups": []map[string]any{
						{"modelIds": []string{modelID}},
					},
				},
			},
			"models": []map[string]any{
				{
					"name":        modelID,
					"displayName": modelName,
				},
			},
		}
		_ = json.NewEncoder(w).Encode(resp)
	default:
		w.Write([]byte(`{}`))
	}
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	path := r.URL.Path

	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.WriteHeader(http.StatusOK)
		return
	}

	if strings.HasSuffix(path, ":recordTrajectoryAnalytics") || strings.HasSuffix(path, ":recordCodeAssistMetrics") {
		applog.Printf("[proxy] ✕ blocked telemetry: %s", path)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("{}"))
		return
	}

	if s.router.IsActive() {
		if isGenerationRequest(path) {
			s.router.HandleRequest(w, r)
			return
		}
		s.handleExternalMockDiscovery(w, r, path)
		return
	}

	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	acc, token, err := s.rotation.GetActiveAccountToken()
	if err != nil && acc != nil && s.rotation.RotateIfCurrent(acc.ID, false) {
		acc, token, err = s.rotation.GetActiveAccountToken()
	}
	isPassThrough := false
	if err != nil || token == "" {
		incomingAuth := r.Header.Get("Authorization")
		if incomingAuth != "" && errors.Is(err, rotation.ErrNoActiveAccount) {
			token = strings.TrimPrefix(incomingAuth, "Bearer ")
			token = strings.TrimPrefix(token, "bearer ")
			token = strings.TrimSpace(token)
			isPassThrough = true
			applog.Printf("[proxy] using pass-through token from IDE (no active AntiLoop account)")
		} else {
			applog.Printf("[proxy] token error: %v (no pass-through Authorization available)", err)
			http.Error(w, "No active account token", http.StatusUnauthorized)
			return
		}
	} else {
		token = strings.TrimPrefix(token, "Bearer ")
		token = strings.TrimPrefix(token, "bearer ")
		token = strings.TrimSpace(token)
	}

	email := "ide-passthrough"
	if acc != nil {
		email = acc.Email
	}
	originalBody := bodyBytes
	applog.Printf("[proxy] → %s %s account=%s", r.Method, path, email)

	baseUpstream := s.getBaseUpstreamURL()
	upstreamURL := baseUpstream + r.URL.RequestURI()
	parsedUpstream, _ := url.Parse(baseUpstream)

	var resp *http.Response
	var clientErr error
	s.mu.RLock()
	maxRetries, onRetry := s.maxRetries, s.onRetryEvent
	s.mu.RUnlock()

	for attempt := 1; attempt <= maxRetries; attempt++ {
		bodyBytes = originalBody
		if !isPassThrough {
			bodyBytes = rewriteAccountBody(originalBody, acc)
		}
		req, reqErr := http.NewRequestWithContext(r.Context(), r.Method, upstreamURL, bytes.NewReader(bodyBytes))
		if reqErr != nil {
			http.Error(w, reqErr.Error(), http.StatusInternalServerError)
			return
		}

		for k, vv := range r.Header {
			if strings.EqualFold(k, "Content-Length") || hopByHopHeaders[k] {
				continue
			}
			for _, v := range vv {
				req.Header.Add(k, v)
			}
		}

		req.Header.Set("Authorization", "Bearer "+token)
		if parsedUpstream != nil {
			req.Host = parsedUpstream.Host
		}
		req.ContentLength = int64(len(bodyBytes))
		req.GetBody = func() (io.ReadCloser, error) {
			return io.NopCloser(bytes.NewReader(bodyBytes)), nil
		}

		resp, clientErr = s.client.Do(req)
		shouldRetry := clientErr != nil
		if clientErr == nil {
			shouldRetry = resp.StatusCode >= 500
			if resp.StatusCode == http.StatusTooManyRequests && !isPassThrough {
				if s.rotation.RotateIfCurrent(acc.ID, true) && attempt < maxRetries {
					nextAcc, nextToken, tokenErr := s.rotation.GetActiveAccountToken()
					if tokenErr == nil && nextAcc.ID != acc.ID {
						acc, token, email = nextAcc, nextToken, nextAcc.Email
						shouldRetry = true
					}
				}
			}
		}
		if !shouldRetry || attempt == maxRetries {
			break
		}
		if resp != nil {
			resp.Body.Close()
			resp = nil
		}
		delayMs := 500 * (1 << (attempt - 1))
		if onRetry != nil {
			onRetry(attempt, maxRetries, delayMs)
		}
		timer := time.NewTimer(time.Duration(delayMs) * time.Millisecond)
		select {
		case <-r.Context().Done():
			timer.Stop()
			return
		case <-timer.C:
		}

	}

	if clientErr != nil || resp == nil {
		if clientErr == nil {
			clientErr = fmt.Errorf("upstream returned no response")
		}
		applog.Printf("[proxy] request error: %v", clientErr)
		http.Error(w, clientErr.Error(), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Access-Control-Allow-Origin", "*")
	for k, vv := range resp.Header {
		if hopByHopHeaders[k] {
			continue
		}
		for _, v := range vv {
			w.Header().Add(k, v)
		}
	}

	isSSE := strings.Contains(resp.Header.Get("Content-Type"), "text/event-stream")
	if isSSE {
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("X-Accel-Buffering", "no")
	}

	w.WriteHeader(resp.StatusCode)

	flusher, isFlusher := w.(http.Flusher)
	if isFlusher {
		flusher.Flush()
	}

	buf := make([]byte, 4096)
	var captureBuf bytes.Buffer
	isFetchModels := resp.StatusCode == http.StatusOK && strings.HasSuffix(path, ":fetchAvailableModels")
	for {
		n, readErr := resp.Body.Read(buf)
		if n > 0 {
			w.Write(buf[:n])
			if isFlusher {
				flusher.Flush()
			}
			if isFetchModels {
				captureBuf.Write(buf[:n])
			}
		}
		if readErr != nil {
			break
		}
	}

	if isFetchModels && captureBuf.Len() > 0 && email != "" && email != "ide-passthrough" {
		capturedBytes := captureBuf.Bytes()
		if resp.Header.Get("Content-Encoding") == "gzip" || (len(capturedBytes) >= 2 && capturedBytes[0] == 0x1f && capturedBytes[1] == 0x8b) {
			if gzReader, err := gzip.NewReader(bytes.NewReader(capturedBytes)); err == nil {
				if uncompressed, err := io.ReadAll(gzReader); err == nil {
					capturedBytes = uncompressed
				}
				gzReader.Close()
			}
		}
		go s.rotation.UpdateAccountModelsJSON(email, string(capturedBytes))
	}

	duration := time.Since(start).Round(time.Millisecond)
	applog.Printf("[proxy] ← %s %s  status=%d  duration=%s", r.Method, path, resp.StatusCode, duration)
}

func rewriteAccountBody(body []byte, acc *storage.Account) []byte {
	if acc == nil || len(body) == 0 {
		return body
	}
	var data map[string]any
	if json.Unmarshal(body, &data) != nil || data == nil {
		return body
	}
	if acc.ProjectID != "" {
		data["project"] = acc.ProjectID
	} else {
		delete(data, "project")
	}
	if _, exists := data["useAiCredits"]; exists || acc.UseAICredits {
		data["useAiCredits"] = acc.UseAICredits
	}
	result, err := json.Marshal(data)
	if err != nil {
		return body
	}
	return result
}

func (s *Server) Close() error {
	s.mu.Lock()
	if s.closed {
		s.mu.Unlock()
		return nil
	}
	s.closed = true
	s.mu.Unlock()

	portFile := filepath.Join(s.storagePath, "daemon-proxy.port")
	_ = os.Remove(portFile)

	if s.listener != nil {
		return s.listener.Close()
	}
	return nil
}
