package proxy

import (
	"bytes"
	"encoding/json"
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

	if s.router.ActiveProvider() != nil {
		s.router.HandleRequest(w, r)
		return
	}

	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := s.rotation.GetActiveAccessToken()
	isPassThrough := false
	if err != nil || token == "" {
		incomingAuth := r.Header.Get("Authorization")
		if incomingAuth != "" {
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

	email := s.rotation.CurrentEmail()
	if email == "" && isPassThrough {
		email = "ide-passthrough"
	}
	applog.Printf("[proxy] → %s %s  account=%s", r.Method, path, email)

	if !isPassThrough && s.rotation.CurrentUseAICredits() {
		bodyBytes = s.rewriteAICredits(bodyBytes)
	}

	baseUpstream := s.getBaseUpstreamURL()
	upstreamURL := baseUpstream + r.URL.RequestURI()
	parsedUpstream, _ := url.Parse(baseUpstream)

	var resp *http.Response
	var clientErr error
	maxRetries := s.maxRetries

	for attempt := 1; attempt <= maxRetries; attempt++ {
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
		if clientErr == nil {
			if resp.StatusCode == http.StatusTooManyRequests {
				applog.Printf("[proxy] upstream HTTP 429 Too Many Requests (attempt %d/%d) — triggering account rotation", attempt, maxRetries)
				s.rotation.RotateToNextAccount()
				if !isPassThrough {
					if nextTok, tokErr := s.rotation.GetActiveAccessToken(); tokErr == nil && nextTok != "" {
						token = strings.TrimSpace(strings.TrimPrefix(nextTok, "Bearer "))
					}
				}
			} else if resp.StatusCode < 500 {
				break
			}
		}

		if resp != nil {
			resp.Body.Close()
		}

		if attempt < maxRetries {
			delayMs := 500 * (1 << (attempt - 1))
			applog.Printf("[proxy] request failed (attempt %d/%d), retrying in %dms...", attempt, maxRetries, delayMs)
			if s.onRetryEvent != nil {
				s.onRetryEvent(attempt, maxRetries, delayMs)
			}
			time.Sleep(time.Duration(delayMs) * time.Millisecond)
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
	for {
		n, readErr := resp.Body.Read(buf)
		if n > 0 {
			w.Write(buf[:n])
			if isFlusher {
				flusher.Flush()
			}
		}
		if readErr != nil {
			break
		}
	}

	duration := time.Since(start).Round(time.Millisecond)
	applog.Printf("[proxy] ← %s %s  status=%d  duration=%s", r.Method, path, resp.StatusCode, duration)
}

func (s *Server) rewriteAICredits(body []byte) []byte {
	if len(body) == 0 {
		return body
	}
	var m map[string]any
	if err := json.Unmarshal(body, &m); err != nil {
		return body
	}
	m["useAiCredits"] = true
	res, err := json.Marshal(m)
	if err != nil {
		return body
	}
	return res
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
