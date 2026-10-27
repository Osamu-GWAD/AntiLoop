package adminhttp

import (
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"

	"github.com/Osamu-GWAD/AntiLoop/internal/applog"
)

const adminIndexHTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>AntiLoop Admin</title>
<style>
:root {
  --vscode-editor-foreground: #333333;
  --vscode-editor-background: #ffffff;
  --vscode-foreground: #333333;
  --vscode-errorForeground: #e51400;
  --vscode-descriptionForeground: rgba(51, 51, 51, 0.7);
  --vscode-widget-border: rgba(0, 0, 0, 0.12);
  --vscode-list-hoverBackground: rgba(0, 0, 0, 0.04);
  --vscode-input-background: #ffffff;
  --vscode-input-foreground: #333333;
  --vscode-input-border: rgba(0, 0, 0, 0.2);
  --vscode-button-background: #0078d4;
  --vscode-button-foreground: #ffffff;
  --vscode-button-hoverBackground: #1a8ae8;
  --vscode-icon-foreground: #424242;
  --vscode-badge-background: rgba(0, 0, 0, 0.08);
  --vscode-badge-foreground: #333333;
  --vscode-menu-background: #f8f8f8;
  --vscode-editorWarning-foreground: #bf8803;
  --vscode-editorWidget-border: rgba(0, 0, 0, 0.1);
  --vscode-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --vscode-font-size: 13px;
}
body { background: #ffffff !important; }
</style>
<script type="module" crossorigin src="/assets/index.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index.css">
</head>
<body>
<div id="root" data-view="admin"></div>
</body>
</html>`

type Server struct {
	storagePath   string
	extensionPath string
	listener      net.Listener
	port          int
	handlers      map[string]func(params json.RawMessage) (any, error)
	mu            sync.RWMutex
}

func NewServer(storagePath, extensionPath string) *Server {
	return &Server{
		storagePath:   storagePath,
		extensionPath: extensionPath,
		handlers:      make(map[string]func(params json.RawMessage) (any, error)),
	}
}

func (s *Server) RegisterHandler(method string, fn func(params json.RawMessage) (any, error)) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.handlers[method] = fn
}

func (s *Server) RegisterMutation(method string, fn func(params json.RawMessage) (any, error)) {
	s.RegisterHandler(method, fn)
}

func (s *Server) Port() int {
	return s.port
}

func (s *Server) Start() error {
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return err
	}
	s.listener = l
	s.port = l.Addr().(*net.TCPAddr).Port

	portFile := filepath.Join(s.storagePath, "daemon-http.port")
	_ = os.WriteFile(portFile, []byte(strconv.Itoa(s.port)), 0644)

	distPath := filepath.Join(s.extensionPath, "webview-ui", "dist")
	applog.Printf("[admin-http] serving admin panel from %s", distPath)
	applog.Printf("[admin-http] listening on 127.0.0.1:%d", s.port)

	mux := http.NewServeMux()

	assetsDir := filepath.Join(distPath, "assets")
	mux.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir(assetsDir))))

	mux.HandleFunc("/rpc", s.handleRPC)
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" && !strings.HasPrefix(r.URL.Path, "/assets") {
			http.Redirect(w, r, "/", http.StatusFound)
			return
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Write([]byte(adminIndexHTML))
	})

	handler := s.corsMiddleware(mux)

	go func() {
		server := &http.Server{Handler: handler}
		_ = server.Serve(l)
	}()

	return nil
}

func (s *Server) corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func (s *Server) handleRPC(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		s.writeJSONError(w, nil, -32700, "Parse error")
		return
	}

	var req struct {
		JSONRPC string          `json:"jsonrpc"`
		ID      *int64          `json:"id"`
		Method  string          `json:"method"`
		Params  json.RawMessage `json:"params"`
	}

	if err := json.Unmarshal(body, &req); err != nil {
		s.writeJSONError(w, nil, -32700, "Parse error")
		return
	}

	s.mu.RLock()
	handler, exists := s.handlers[req.Method]
	s.mu.RUnlock()

	if !exists {
		s.writeJSONError(w, req.ID, -32601, fmt.Sprintf("Method not found: %s", req.Method))
		return
	}

	result, err := handler(req.Params)
	if err != nil {
		s.writeJSONError(w, req.ID, -32603, err.Error())
		return
	}

	resp := map[string]any{
		"jsonrpc": "2.0",
		"id":      req.ID,
		"result":  result,
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(resp)
}

func (s *Server) writeJSONError(w http.ResponseWriter, id *int64, code int, msg string) {
	resp := map[string]any{
		"jsonrpc": "2.0",
		"id":      id,
		"error": map[string]any{
			"code":    code,
			"message": msg,
		},
	}
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(resp)
}

func (s *Server) Stop() error {
	portFile := filepath.Join(s.storagePath, "daemon-http.port")
	_ = os.Remove(portFile)
	if s.listener != nil {
		return s.listener.Close()
	}
	return nil
}
