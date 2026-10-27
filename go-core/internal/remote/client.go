package remote

import (
	"encoding/json"
	"net/http"
	"sync"
	"time"

	"github.com/Osamu-GWAD/AntiLoop/internal/storage"
)

type Client struct {
	db         *storage.DB
	serverURL  string
	tenantSlug string
	clientKey  string
	httpClient *http.Client
	mu         sync.RWMutex
}

func NewClient(db *storage.DB) *Client {
	return &Client{
		db: db,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

func (c *Client) SetConfig(serverURL, tenantSlug, clientKey string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.serverURL = serverURL
	c.tenantSlug = tenantSlug
	c.clientKey = clientKey

	_ = c.db.SetSetting("remote_url", serverURL)
	_ = c.db.SetSetting("remote_tenant", tenantSlug)
	_ = c.db.SetSetting("remote_client_key", clientKey)
}

func (c *Client) AdminLogin(username, password string) (map[string]any, error) {
	return map[string]any{"token": "mock-admin-token", "ok": true}, nil
}

func (c *Client) AdminLogout() error {
	return nil
}

func (c *Client) FetchTokens() ([]map[string]any, error) {
	return []map[string]any{}, nil
}

func (c *Client) SyncAccounts() error {
	return nil
}

func (c *Client) HandleGenericRPC(method string, params json.RawMessage) (any, error) {
	return map[string]any{"ok": true, "method": method}, nil
}
