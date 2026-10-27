package ipc

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"os"
	"path/filepath"
	"strconv"
	"sync"

	"github.com/Osamu-GWAD/AntiLoop/internal/applog"
)

type Request struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      *int64          `json:"id,omitempty"`
	Method  string          `json:"method"`
	Params  json.RawMessage `json:"params,omitempty"`
}

type Response struct {
	JSONRPC string    `json:"jsonrpc"`
	ID      *int64    `json:"id,omitempty"`
	Result  any       `json:"result,omitempty"`
	Error   *RPCError `json:"error,omitempty"`
	Method  string    `json:"method,omitempty"`
	Params  any       `json:"params,omitempty"`
}

type RPCError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type HandlerFunc = func(params json.RawMessage) (any, error)

type Client struct {
	conn net.Conn
	mu   sync.Mutex
}

func (c *Client) Send(resp any) error {
	data, err := json.Marshal(resp)
	if err != nil {
		return err
	}
	data = append(data, '\n')
	c.mu.Lock()
	defer c.mu.Unlock()
	_, err = c.conn.Write(data)
	return err
}

type Daemon struct {
	storagePath string
	listener    net.Listener
	port        int
	handlers    map[string]HandlerFunc
	mutations   map[string]HandlerFunc
	clients     map[*Client]struct{}
	clientsMu   sync.Mutex
	closed      bool
	closeMu     sync.Mutex
}

func NewDaemon(storagePath string) *Daemon {
	return &Daemon{
		storagePath: storagePath,
		handlers:    make(map[string]HandlerFunc),
		mutations:   make(map[string]HandlerFunc),
		clients:     make(map[*Client]struct{}),
	}
}

func (d *Daemon) RegisterHandler(method string, fn HandlerFunc) {
	d.handlers[method] = fn
}

func (d *Daemon) RegisterMutation(method string, fn HandlerFunc) {
	d.mutations[method] = fn
	d.handlers[method] = fn
}

func (d *Daemon) Port() int {
	return d.port
}

func (d *Daemon) Listen(addr string) error {
	l, err := net.Listen("tcp", addr)
	if err != nil {
		return fmt.Errorf("failed to listen on %s: %w", addr, err)
	}
	d.listener = l
	tcpAddr := l.Addr().(*net.TCPAddr)
	d.port = tcpAddr.Port

	portFile := filepath.Join(d.storagePath, "daemon.port")
	if err := os.WriteFile(portFile, []byte(strconv.Itoa(d.port)), 0644); err != nil {
		l.Close()
		return fmt.Errorf("failed to write daemon.port file: %w", err)
	}
	applog.Printf("[daemon] listening on %s (pid=%d)", tcpAddr.String(), os.Getpid())
	applog.Printf("[daemon] port file written: %s = %d", portFile, d.port)
	return nil
}

func (d *Daemon) Serve() error {
	for {
		conn, err := d.listener.Accept()
		if err != nil {
			d.closeMu.Lock()
			closed := d.closed
			d.closeMu.Unlock()
			if closed {
				return nil
			}
			applog.Printf("[daemon] accept error: %v", err)
			continue
		}

		client := &Client{conn: conn}
		d.clientsMu.Lock()
		d.clients[client] = struct{}{}
		d.clientsMu.Unlock()

		go d.handleClient(client)
	}
}

func (d *Daemon) handleClient(client *Client) {
	defer func() {
		client.conn.Close()
		d.clientsMu.Lock()
		delete(d.clients, client)
		d.clientsMu.Unlock()
	}()

	reader := bufio.NewReader(client.conn)
	for {
		line, err := reader.ReadBytes('\n')
		if err != nil {
			if err != io.EOF {
				applog.Printf("[daemon] client read error: %v", err)
			}
			return
		}

		if len(line) == 0 || line[0] == '\n' || line[0] == '\r' {
			continue
		}

		var req Request
		if err := json.Unmarshal(line, &req); err != nil {
			applog.Printf("[daemon] invalid json: %v", err)
			continue
		}

		d.dispatchMessage(client, &req)
	}
}

func (d *Daemon) dispatchMessage(client *Client, req *Request) {
	if req.Method == "shutdown" {
		if req.ID != nil {
			client.Send(Response{
				JSONRPC: "2.0",
				ID:      req.ID,
				Result:  map[string]bool{"ok": true},
			})
		}
		go d.Close()
		return
	}

	handler, exists := d.handlers[req.Method]
	if !exists {
		if req.ID != nil {
			client.Send(Response{
				JSONRPC: "2.0",
				ID:      req.ID,
				Error: &RPCError{
					Code:    -32601,
					Message: fmt.Sprintf("Method not found: %s", req.Method),
				},
			})
		}
		return
	}

	result, err := handler(req.Params)
	if req.ID != nil {
		if err != nil {
			client.Send(Response{
				JSONRPC: "2.0",
				ID:      req.ID,
				Error: &RPCError{
					Code:    -32603,
					Message: err.Error(),
				},
			})
		} else {
			client.Send(Response{
				JSONRPC: "2.0",
				ID:      req.ID,
				Result:  result,
			})
		}
	}
}

func (d *Daemon) Broadcast(method string, params any) {
	d.Notify(method, params)
}

func (d *Daemon) Notify(method string, params any) {
	d.clientsMu.Lock()
	clients := make([]*Client, 0, len(d.clients))
	for c := range d.clients {
		clients = append(clients, c)
	}
	d.clientsMu.Unlock()

	notification := Response{
		JSONRPC: "2.0",
		Method:  method,
		Params:  params,
	}

	for _, c := range clients {
		_ = c.Send(notification)
	}
}

func (d *Daemon) Close() error {
	d.closeMu.Lock()
	if d.closed {
		d.closeMu.Unlock()
		return nil
	}
	d.closed = true
	d.closeMu.Unlock()

	portFile := filepath.Join(d.storagePath, "daemon.port")
	_ = os.Remove(portFile)

	d.clientsMu.Lock()
	for c := range d.clients {
		c.conn.Close()
	}
	d.clients = make(map[*Client]struct{})
	d.clientsMu.Unlock()

	if d.listener != nil {
		return d.listener.Close()
	}
	return nil
}
