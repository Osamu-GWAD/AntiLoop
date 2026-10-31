package rotation

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/Osamu-GWAD/AntiLoop/internal/applog"
	"github.com/Osamu-GWAD/AntiLoop/internal/oauth"
	"github.com/Osamu-GWAD/AntiLoop/internal/storage"
)

type TokenInfo struct {
	Email             string `json:"email"`
	AccessToken       string `json:"accessToken"`
	RefreshToken      string `json:"refreshToken"`
	ExpiryDateSeconds int64  `json:"expiryDateSeconds"`
}

type WarmupResult struct {
	Email   string `json:"email"`
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type QuotaFamily struct {
	Name      string  `json:"name"`
	Label     string  `json:"label"`
	Percent   float64 `json:"percent"`
	Remaining int     `json:"remaining,omitempty"`
	Limit     int     `json:"limit,omitempty"`
	ResetTime string  `json:"resetTime,omitempty"`
}

type ModelItem struct {
	Name              string  `json:"name"`
	DisplayName       string  `json:"displayName"`
	Percent           float64 `json:"percent"`
	RemainingPercent  float64 `json:"remainingPercent"`
	RemainingFraction float64 `json:"remainingFraction"`
	ResetTime         string  `json:"resetTime,omitempty"`
}

type QuotaData struct {
	Families       []QuotaFamily `json:"families"`
	Models         []ModelItem   `json:"models,omitempty"`
	ResetTime      string        `json:"resetTime,omitempty"`
	OverallPercent float64       `json:"overallPercent,omitempty"`
	IsUnlimited    bool          `json:"isUnlimited,omitempty"`
}

type Manager struct {
	db             *storage.DB
	currentAccount *storage.Account
	activeSource   string
	enabled        bool
	quotaSnapshot  *QuotaData
	mu             sync.RWMutex

	onInjectToken  func(info *TokenInfo)
	onUpdateStatus func(status any)
	onQuotaUpdate  func(quota any, email string)
	onProgress     func(msg string)

	stopWatch chan struct{}
}

func NewManager(db *storage.DB) *Manager {
	return &Manager{
		db:           db,
		activeSource: "local",
		stopWatch:    make(chan struct{}),
	}
}

func (m *Manager) SetCallbacks(
	onInjectToken func(info *TokenInfo),
	onUpdateStatus func(status any),
	onQuotaUpdate func(quota any, email string),
	onProgress func(msg string),
) {
	m.onInjectToken = onInjectToken
	m.onUpdateStatus = onUpdateStatus
	m.onQuotaUpdate = onQuotaUpdate
	m.onProgress = onProgress
}

func (m *Manager) IsEnabled() bool {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.enabled
}

func (m *Manager) ActiveSource() string {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.activeSource
}

func (m *Manager) CurrentEmail() string {
	m.mu.RLock()
	defer m.mu.RUnlock()
	if m.currentAccount != nil {
		return m.currentAccount.Email
	}
	return ""
}

func (m *Manager) CurrentTier() string {
	m.mu.RLock()
	defer m.mu.RUnlock()
	if m.currentAccount != nil {
		return m.currentAccount.Tier
	}
	return ""
}

func (m *Manager) CurrentAccountID() int64 {
	m.mu.RLock()
	defer m.mu.RUnlock()
	if m.currentAccount != nil {
		return m.currentAccount.ID
	}
	return 0
}

func (m *Manager) CurrentUseAICredits() bool {
	m.mu.RLock()
	defer m.mu.RUnlock()
	if m.currentAccount != nil {
		return m.currentAccount.UseAICredits
	}
	return false
}

func (m *Manager) GetActiveAccessToken() (string, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	if m.currentAccount == nil {
		return "", fmt.Errorf("no active account")
	}

	acc, err := m.db.GetAccount(m.currentAccount.ID)
	if err != nil {
		return "", err
	}
	m.currentAccount = acc

	var expSec int64
	if acc.TokenExpiresAt != "" {
		if t, err := time.Parse(time.RFC3339, acc.TokenExpiresAt); err == nil {
			expSec = t.Unix()
		}
	}

	now := time.Now().Unix()
	if expSec <= now+60 && acc.RefreshToken != "" {
		applog.Printf("[rotation] refreshing expired token for %s", acc.Email)
		tok, err := oauth.RefreshAccessToken(acc.RefreshToken)
		if err != nil {
			return "", fmt.Errorf("refresh token for %s: %w", acc.Email, err)
		}
		newExp := time.Now().Add(time.Duration(tok.ExpiresIn) * time.Second).UTC().Format(time.RFC3339)
		_ = m.db.UpdateAccountToken(acc.ID, tok.AccessToken, newExp)
		acc.AccessToken = tok.AccessToken
		acc.TokenExpiresAt = newExp
		m.currentAccount = acc

		m.syncStandaloneToken(acc, tok.AccessToken)
		if m.onInjectToken != nil {
			m.onInjectToken(&TokenInfo{
				Email:             acc.Email,
				AccessToken:       tok.AccessToken,
				RefreshToken:      acc.RefreshToken,
				ExpiryDateSeconds: time.Now().Unix() + int64(tok.ExpiresIn),
			})
		}
	} else if acc.AccessToken != "" {
		m.syncStandaloneToken(acc, acc.AccessToken)
	}

	return m.currentAccount.AccessToken, nil
}

func (m *Manager) syncStandaloneToken(acc *storage.Account, accessToken string) {
	if acc == nil || accessToken == "" {
		return
	}
	home, err := os.UserHomeDir()
	if err != nil {
		return
	}
	tokenFile := filepath.Join(home, ".gemini", "jetski-standalone-oauth-token")
	writerID := "1GJ6_-43mI_KcAO22uF6Lg"
	if b, err := os.ReadFile(tokenFile); err == nil {
		var old struct {
			WriterID string `json:"writer_id"`
		}
		if json.Unmarshal(b, &old) == nil && old.WriterID != "" {
			writerID = old.WriterID
		}
	}

	var expSec int64 = time.Now().Add(3600 * time.Second).Unix()
	if acc.TokenExpiresAt != "" {
		if t, err := time.Parse(time.RFC3339, acc.TokenExpiresAt); err == nil {
			expSec = t.Unix()
		}
	}
	expTime := time.Unix(expSec, 0)

	payload := map[string]any{
		"token": map[string]any{
			"access_token":  accessToken,
			"token_type":    "Bearer",
			"refresh_token": acc.RefreshToken,
			"expiry":        expTime.Format("2006-01-02T15:04:05.999999999-07:00"),
			"expires_in":    expSec - time.Now().Unix(),
		},
		"auth_method":    "consumer",
		"id_token_email": acc.Email,
		"writer_id":      writerID,
	}

	if out, err := json.MarshalIndent(payload, "", "  "); err == nil {
		_ = os.WriteFile(tokenFile, out, 0600)
		applog.Printf("[rotation] synced standalone token for %s to %s", acc.Email, tokenFile)
	}
}

func (m *Manager) EnsureActiveAccount() {
	m.mu.Lock()
	defer m.mu.Unlock()

	savedEmail, _ := m.db.GetSetting("current_email")
	if savedEmail != "" {
		if acc, err := m.db.GetAccountByEmail(savedEmail); err == nil {
			m.currentAccount = acc
			applog.Printf("[rotation] restored active account from DB: %s", acc.Email)
			if tok, tokErr := m.GetAccountAccessToken(acc); tokErr == nil && tok != "" {
				m.syncStandaloneToken(acc, tok)
			}
			if m.db.GetSettingDefault("auto_warmup", "false") == "true" {
				go m.WarmupAllAccounts()
			}
			return
		}
	}

	accounts, err := m.db.GetActiveAccounts()
	if err == nil && len(accounts) > 0 {
		m.currentAccount = accounts[0]
		_ = m.db.SetSetting("current_email", accounts[0].Email)
		applog.Printf("[rotation] active account set to first available: %s", accounts[0].Email)
		if tok, tokErr := m.GetAccountAccessToken(accounts[0]); tokErr == nil && tok != "" {
			m.syncStandaloneToken(accounts[0], tok)
		}
		if m.db.GetSettingDefault("auto_warmup", "false") == "true" {
			go m.WarmupAllAccounts()
		}
	}
}

func (m *Manager) SelectAccount(id int64) (*storage.Account, error) {
	acc, err := m.db.GetAccount(id)
	if err != nil {
		return nil, err
	}

	tok, tokErr := m.GetAccountAccessToken(acc)
	if tokErr == nil && tok != "" {
		m.syncStandaloneToken(acc, tok)
	}

	m.mu.Lock()
	m.currentAccount = acc
	_ = m.db.SetSetting("current_email", acc.Email)
	m.mu.Unlock()

	applog.Printf("[rotation] selected account: %s", acc.Email)
	if m.onInjectToken != nil {
		var expSec int64 = time.Now().Add(3600 * time.Second).Unix()
		if acc.TokenExpiresAt != "" {
			if t, err := time.Parse(time.RFC3339, acc.TokenExpiresAt); err == nil {
				expSec = t.Unix()
			}
		}
		m.onInjectToken(&TokenInfo{
			Email:             acc.Email,
			AccessToken:       tok,
			RefreshToken:      acc.RefreshToken,
			ExpiryDateSeconds: expSec,
		})
	}
	m.emitStatus()
	go m.FetchAndPushQuota(acc.Email)
	return acc, nil
}

func (m *Manager) Enable() {
	m.mu.Lock()
	m.enabled = true
	_ = m.db.SetSetting("auto_enabled", "true")
	m.mu.Unlock()

	applog.Println("[rotation] enabled")
	m.emitStatus()
}

func (m *Manager) Disable() {
	m.mu.Lock()
	m.enabled = false
	_ = m.db.SetSetting("auto_enabled", "false")
	m.mu.Unlock()

	applog.Println("[rotation] disabled")
	m.emitStatus()
}

func (m *Manager) emitStatus() {
	if m.onUpdateStatus != nil {
		m.mu.RLock()
		st := map[string]any{
			"enabled":      m.enabled,
			"currentEmail": m.CurrentEmail(),
			"currentTier":  m.CurrentTier(),
			"activeSource": m.activeSource,
		}
		m.mu.RUnlock()
		m.onUpdateStatus(st)
	}
}

func (m *Manager) PushCurrentToken() {
	m.mu.RLock()
	acc := m.currentAccount
	m.mu.RUnlock()
	if acc != nil && m.onInjectToken != nil {
		tok, err := m.GetAccountAccessToken(acc)
		if err == nil && tok != "" {
			m.syncStandaloneToken(acc, tok)
			var expSec int64 = time.Now().Add(3600 * time.Second).Unix()
			if acc.TokenExpiresAt != "" {
				if t, err := time.Parse(time.RFC3339, acc.TokenExpiresAt); err == nil {
					expSec = t.Unix()
				}
			}
			m.onInjectToken(&TokenInfo{
				Email:             acc.Email,
				AccessToken:       tok,
				RefreshToken:      acc.RefreshToken,
				ExpiryDateSeconds: expSec,
			})
		}
	}
}

func (m *Manager) PushCurrentQuota() {
	m.mu.RLock()
	q := m.quotaSnapshot
	email := m.CurrentEmail()
	m.mu.RUnlock()

	if q != nil && m.onQuotaUpdate != nil {
		m.onQuotaUpdate(q, email)
	}
}

func (m *Manager) GetAccountAccessToken(acc *storage.Account) (string, error) {
	if acc == nil {
		return "", fmt.Errorf("account is nil")
	}

	var expSec int64
	if acc.TokenExpiresAt != "" {
		if t, err := time.Parse(time.RFC3339, acc.TokenExpiresAt); err == nil {
			expSec = t.Unix()
		}
	}

	now := time.Now().Unix()
	if (expSec <= now+60 || acc.AccessToken == "") && acc.RefreshToken != "" {
		applog.Printf("[rotation] refreshing expired token for %s", acc.Email)
		tok, err := oauth.RefreshAccessToken(acc.RefreshToken)
		if err != nil {
			applog.Printf("[rotation] token refresh failed for %s: %v", acc.Email, err)
			if acc.AccessToken != "" {
				return acc.AccessToken, nil
			}
			return "", err
		}
		newExp := time.Now().Add(time.Duration(tok.ExpiresIn) * time.Second).UTC().Format(time.RFC3339)
		acc.AccessToken = tok.AccessToken
		acc.TokenExpiresAt = newExp
		_ = m.db.UpdateAccountToken(acc.ID, tok.AccessToken, newExp)
	}

	return acc.AccessToken, nil
}

func (m *Manager) FetchAndPushQuota(email string) {
	var acc *storage.Account
	var err error
	if email != "" {
		acc, err = m.db.GetAccountByEmail(email)
	} else {
		m.mu.RLock()
		acc = m.currentAccount
		m.mu.RUnlock()
	}
	if err != nil || acc == nil {
		return
	}

	tok, err := m.GetAccountAccessToken(acc)
	if err != nil {
		applog.Printf("[rotation] failed to get token for quota check %s: %v", acc.Email, err)
		return
	}

	data, err := oauth.FetchAvailableModels(tok, acc.ProjectID)
	if err != nil {
		applog.Printf("[rotation] fetch quota error for %s: %v", acc.Email, err)
		return
	}

	raw, _ := json.Marshal(data)
	_ = m.db.UpdateAccountModels(acc.ID, string(raw))

	quota := ParseQuota(data)
	m.mu.Lock()
	if m.currentAccount != nil && m.currentAccount.Email == acc.Email {
		m.quotaSnapshot = quota
	}
	m.mu.Unlock()

	if m.onQuotaUpdate != nil {
		m.onQuotaUpdate(quota, acc.Email)
	}
	if m.IsEnabled() && m.currentAccount != nil && m.currentAccount.Email == acc.Email {
		m.checkAutoRotation()
	}
}

func (m *Manager) UpdateAccountModelsJSON(email, modelsJSON string) {
	if email == "" || modelsJSON == "" {
		return
	}
	rawBytes := []byte(modelsJSON)
	if len(rawBytes) >= 2 && rawBytes[0] == 0x1f && rawBytes[1] == 0x8b {
		if gzReader, err := gzip.NewReader(bytes.NewReader(rawBytes)); err == nil {
			if uncompressed, err := io.ReadAll(gzReader); err == nil {
				rawBytes = uncompressed
				modelsJSON = string(rawBytes)
			}
			gzReader.Close()
		}
	}

	acc, err := m.db.GetAccountByEmail(email)
	if err != nil || acc == nil {
		return
	}
	_ = m.db.UpdateAccountModels(acc.ID, modelsJSON)

	var data map[string]any
	if err := json.Unmarshal(rawBytes, &data); err == nil {
		quota := ParseQuota(data)
		m.mu.Lock()
		if m.currentAccount != nil && m.currentAccount.Email == email {
			m.quotaSnapshot = quota
		}
		m.mu.Unlock()
		if m.onQuotaUpdate != nil {
			m.onQuotaUpdate(quota, email)
		}
		if m.IsEnabled() && m.currentAccount != nil && m.currentAccount.Email == email {
			m.checkAutoRotation()
		}
	}
}

func ParseQuota(data map[string]any) *QuotaData {
	if data == nil {
		return &QuotaData{IsUnlimited: true}
	}

	if exhausted, _ := data["quotaExhausted"].(bool); exhausted {
		zeroFamilies := []QuotaFamily{
			{Name: "claude", Label: "Claude", Percent: 0},
			{Name: "pro", Label: "Gemini Pro", Percent: 0},
			{Name: "flash", Label: "Gemini Flash", Percent: 0},
		}
		zeroModels := []ModelItem{
			{Name: "Claude", DisplayName: "Claude", Percent: 0, RemainingPercent: 0},
			{Name: "Gemini Pro", DisplayName: "Gemini Pro", Percent: 0, RemainingPercent: 0},
			{Name: "Gemini Flash", DisplayName: "Gemini Flash", Percent: 0, RemainingPercent: 0},
		}
		return &QuotaData{
			Families: zeroFamilies,
			Models:   zeroModels,
		}
	}

	var rawModels []map[string]any

	if slice, ok := data["models"].([]any); ok {
		for _, item := range slice {
			if mMap, ok := item.(map[string]any); ok {
				rawModels = append(rawModels, mMap)
			}
		}
	} else if mMap, ok := data["models"].(map[string]any); ok {
		for _, item := range mMap {
			if subMap, ok := item.(map[string]any); ok {
				rawModels = append(rawModels, subMap)
			}
		}
	}

	if len(rawModels) == 0 {
		return &QuotaData{IsUnlimited: true}
	}

	var claudeFamily, proFamily, flashFamily *QuotaFamily
	var earliestReset string
	var modelItems []ModelItem

	for _, mMap := range rawModels {
		name, _ := mMap["name"].(string)
		displayName, _ := mMap["displayName"].(string)
		if displayName == "" {
			displayName = name
		}
		lower := strings.ToLower(name + " " + displayName)

		quotaInfo, _ := mMap["quotaInfo"].(map[string]any)
		if quotaInfo == nil {
			continue
		}

		remaining, _ := quotaInfo["remainingRequests"].(float64)
		limit, _ := quotaInfo["limit"].(float64)
		remFrac, hasFrac := quotaInfo["remainingFraction"].(float64)
		resetTime, _ := quotaInfo["resetTime"].(string)
		if resetTime != "" && (earliestReset == "" || resetTime < earliestReset) {
			earliestReset = resetTime
		}

		percent := 100.0
		if hasFrac {
			percent = remFrac * 100.0
		} else if limit > 0 {
			percent = (remaining / limit) * 100.0
		}
		percent = math.Round(percent)

		modelItems = append(modelItems, ModelItem{
			Name:              displayName,
			DisplayName:       displayName,
			Percent:           percent,
			RemainingPercent:  percent,
			RemainingFraction: percent / 100.0,
			ResetTime:         resetTime,
		})

		if strings.Contains(lower, "claude") {
			if claudeFamily == nil || percent < claudeFamily.Percent {
				claudeFamily = &QuotaFamily{
					Name:      "claude",
					Label:     "Claude",
					Percent:   percent,
					Remaining: int(remaining),
					Limit:     int(limit),
					ResetTime: resetTime,
				}
			}
		} else if strings.Contains(lower, "pro") {
			if proFamily == nil || percent < proFamily.Percent {
				proFamily = &QuotaFamily{
					Name:      "pro",
					Label:     "Gemini Pro",
					Percent:   percent,
					Remaining: int(remaining),
					Limit:     int(limit),
					ResetTime: resetTime,
				}
			}
		} else if strings.Contains(lower, "flash") {
			if flashFamily == nil || percent < flashFamily.Percent {
				flashFamily = &QuotaFamily{
					Name:      "flash",
					Label:     "Gemini Flash",
					Percent:   percent,
					Remaining: int(remaining),
					Limit:     int(limit),
					ResetTime: resetTime,
				}
			}
		}
	}

	var families []QuotaFamily
	if claudeFamily != nil {
		families = append(families, *claudeFamily)
	}
	if proFamily != nil {
		families = append(families, *proFamily)
	}
	if flashFamily != nil {
		families = append(families, *flashFamily)
	}

	if len(families) == 0 && len(modelItems) == 0 {
		return &QuotaData{IsUnlimited: true}
	}

	return &QuotaData{
		Families:  families,
		Models:    modelItems,
		ResetTime: earliestReset,
	}
}

func (m *Manager) RunQuotaWatch() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for {
		select {
		case <-m.stopWatch:
			return
		case <-ticker.C:
			email := m.CurrentEmail()
			if email != "" {
				m.FetchAndPushQuota(email)
				if m.IsEnabled() {
					m.checkAutoRotation()
				}
			}
		}
	}
}

func (m *Manager) checkAutoRotation() {
	m.mu.RLock()
	q := m.quotaSnapshot
	thresholdStr := m.db.GetSettingDefault("quota_threshold", "10")
	benchmark := m.db.GetSettingDefault("active_model_family", "claude")
	m.mu.RUnlock()

	if q == nil || len(q.Families) == 0 {
		return
	}

	threshold, err := strconv.ParseFloat(thresholdStr, 64)
	if err != nil || threshold < 0 {
		threshold = 10
	}

	low := false
	benchmarkFound := false
	for _, f := range q.Families {
		if strings.EqualFold(f.Name, benchmark) {
			benchmarkFound = true
			if f.Percent <= threshold {
				low = true
			}
			break
		}
	}
	if !benchmarkFound {
		for _, f := range q.Families {
			if f.Percent <= threshold {
				low = true
				break
			}
		}
	}

	if low {
		applog.Printf("[rotation] %s quota below or at threshold (%.1f%%) — rotating account", benchmark, threshold)
		m.RotateToNextAccount()
	}
}

func (m *Manager) RotateToNextAccount() {
	accounts, err := m.db.GetActiveAccounts()
	if err != nil || len(accounts) <= 1 {
		return
	}

	currID := m.CurrentAccountID()
	var next *storage.Account
	for i, a := range accounts {
		if a.ID == currID {
			next = accounts[(i+1)%len(accounts)]
			break
		}
	}
	if next == nil {
		next = accounts[0]
	}

	_, _ = m.SelectAccount(next.ID)
}

func (m *Manager) WarmupAccount(acc *storage.Account) *WarmupResult {
	if acc == nil {
		return &WarmupResult{Success: false, Message: "account is nil"}
	}

	tok, err := m.GetAccountAccessToken(acc)
	if err != nil || tok == "" {
		return &WarmupResult{Email: acc.Email, Success: false, Message: fmt.Sprintf("failed to get token: %v", err)}
	}

	modelsToPing := []string{"gemini-2.5-flash", "claude-sonnet-4-6"}
	warmedAny := false
	var lastErr error

	for _, mod := range modelsToPing {
		reqBody := map[string]any{
			"model": mod,
			"request": map[string]any{
				"contents": []map[string]any{
					{
						"role": "user",
						"parts": []map[string]string{
							{"text": "1"},
						},
					},
				},
				"generationConfig": map[string]any{
					"maxOutputTokens": 1,
				},
			},
		}
		if acc.ProjectID != "" {
			reqBody["project"] = acc.ProjectID
		}

		raw, _ := json.Marshal(reqBody)
		req, err := http.NewRequest("POST", "https://cloudcode-pa.googleapis.com/v1internal:generateContent", bytes.NewReader(raw))
		if err != nil {
			lastErr = err
			continue
		}
		req.Header.Set("Authorization", "Bearer "+tok)
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("User-Agent", "antigravity/1.107.0 (linux; x64)")

		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			lastErr = err
			continue
		}
		resp.Body.Close()

		if resp.StatusCode == http.StatusOK || resp.StatusCode == http.StatusTooManyRequests {
			warmedAny = true
		} else {
			lastErr = fmt.Errorf("HTTP %d", resp.StatusCode)
		}
	}

	go m.FetchAndPushQuota(acc.Email)

	if warmedAny {
		applog.Printf("[warmup] successfully initiated 5hr limit timer for %s", acc.Email)
		return &WarmupResult{Email: acc.Email, Success: true, Message: "5-hour limit timer started"}
	}
	return &WarmupResult{Email: acc.Email, Success: false, Message: fmt.Sprintf("warmup failed: %v", lastErr)}
}

func (m *Manager) WarmupAllAccounts() []WarmupResult {
	accounts, err := m.db.GetActiveAccounts()
	if err != nil || len(accounts) == 0 {
		return nil
	}

	applog.Printf("[warmup] starting warmup for %d active accounts...", len(accounts))
	results := make([]WarmupResult, 0, len(accounts))
	for _, acc := range accounts {
		res := m.WarmupAccount(acc)
		if res != nil {
			results = append(results, *res)
		}
	}
	return results
}
