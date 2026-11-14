package rotation

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"errors"
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
	db               *storage.DB
	currentAccount   *storage.Account
	activeSource     string
	enabled          bool
	quotaSnapshot    *QuotaData
	selectionVersion uint64
	mu               sync.RWMutex
	switchMu         sync.Mutex
	tokenLocks       sync.Map
	refreshToken     func(string) (*oauth.TokenResponse, error)
	fetchModels      func(string, string) (map[string]any, error)
	unavailableUntil map[int64]time.Time

	onInjectToken  func(info *TokenInfo)
	onUpdateStatus func(status any)
	onQuotaUpdate  func(quota any, email string)
	onProgress     func(msg string)

	stopWatch chan struct{}
}

func NewManager(db *storage.DB) *Manager {
	return &Manager{
		db:               db,
		activeSource:     "local",
		stopWatch:        make(chan struct{}),
		refreshToken:     oauth.RefreshAccessToken,
		fetchModels:      oauth.FetchAvailableModels,
		unavailableUntil: make(map[int64]time.Time),
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

var ErrNoActiveAccount = errors.New("no active account")

func (m *Manager) GetActiveAccessToken() (string, error) {
	_, token, err := m.GetActiveAccountToken()
	return token, err
}

// GetActiveAccountToken keeps the credentials and account metadata from the same selection.
func (m *Manager) GetActiveAccountToken() (*storage.Account, string, error) {
	for {
		m.mu.RLock()
		if m.currentAccount == nil {
			m.mu.RUnlock()
			return nil, "", ErrNoActiveAccount
		}
		acc := *m.currentAccount
		version := m.selectionVersion
		m.mu.RUnlock()
		previousToken := acc.AccessToken
		token, err := m.GetAccountAccessToken(&acc)
		m.switchMu.Lock()
		if m.CurrentAccountID() != acc.ID || m.selectionVersion != version {
			m.switchMu.Unlock()
			continue
		}
		if err != nil {
			m.switchMu.Unlock()
			return &acc, "", err
		}
		if !accountEnabled(&acc) {
			m.switchMu.Unlock()
			return &acc, "", fmt.Errorf("account %s is excluded", acc.Email)
		}
		m.mu.Lock()
		current := acc
		m.currentAccount = &current
		m.mu.Unlock()
		if token != previousToken {
			m.pushToken(&acc)
		}
		m.switchMu.Unlock()
		return &acc, token, nil
	}
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

	out, err := json.MarshalIndent(payload, "", "  ")
	if err == nil {
		err = os.MkdirAll(filepath.Dir(tokenFile), 0700)
	}
	if err == nil {
		var tmp *os.File
		tmp, err = os.CreateTemp(filepath.Dir(tokenFile), ".antiloop-token-*")
		if err == nil {
			defer os.Remove(tmp.Name())
			_, err = tmp.Write(out)
			closeErr := tmp.Close()
			if err == nil {
				err = closeErr
			}
			if err == nil {
				err = os.Rename(tmp.Name(), tokenFile)
			}
		}
	}
	if err != nil {
		applog.Printf("[rotation] standalone token sync failed: %v", err)
	}
}

func accountEnabled(acc *storage.Account) bool {
	return acc != nil && (acc.Status == "active" || acc.Status == "included")
}

func (m *Manager) EnsureActiveAccount() {
	m.switchMu.Lock()
	defer m.switchMu.Unlock()
	accounts, err := m.db.GetActiveAccounts()
	if err != nil {
		return
	}
	saved := m.db.GetSettingDefault("current_email", "")
	for i, acc := range accounts {
		if acc.Email == saved {
			accounts[0], accounts[i] = accounts[i], accounts[0]
			break
		}
	}
	for _, acc := range accounts {
		if _, err := m.selectAccount(acc.ID); err == nil {
			if m.db.GetSettingDefault("auto_warmup", "false") == "true" {
				go m.WarmupAllAccounts()
			}
			return
		}
	}
	m.mu.Lock()
	m.currentAccount = nil
	m.selectionVersion++
	m.quotaSnapshot = nil
	m.mu.Unlock()
	_ = m.db.SetSetting("current_email", "")
	m.emitStatus()
}

func (m *Manager) SelectAccount(id int64) (*storage.Account, error) {
	m.switchMu.Lock()
	defer m.switchMu.Unlock()
	return m.selectAccount(id)
}

// selectAccount runs with switchMu held so credential notifications follow selection order.
func (m *Manager) selectAccount(id int64) (*storage.Account, error) {
	acc, err := m.db.GetAccount(id)
	if err != nil {
		return nil, err
	}
	if !accountEnabled(acc) {
		return nil, fmt.Errorf("account %s is excluded", acc.Email)
	}
	if _, err := m.GetAccountAccessToken(acc); err != nil {
		return nil, err
	}
	if err := m.db.SetSetting("current_email", acc.Email); err != nil {
		return nil, err
	}
	m.mu.Lock()
	current := *acc
	m.currentAccount = &current
	m.selectionVersion++
	m.quotaSnapshot = quotaFromAccount(acc)
	m.mu.Unlock()
	m.pushToken(acc)
	m.emitStatus()
	go m.FetchAndPushQuota(acc.Email)
	return acc, nil
}

func (m *Manager) pushToken(acc *storage.Account) {
	m.syncStandaloneToken(acc, acc.AccessToken)
	if m.onInjectToken != nil {
		exp, _ := time.Parse(time.RFC3339, acc.TokenExpiresAt)
		m.onInjectToken(&TokenInfo{Email: acc.Email, AccessToken: acc.AccessToken,
			RefreshToken: acc.RefreshToken, ExpiryDateSeconds: exp.Unix()})
	}
}

func quotaFromAccount(acc *storage.Account) *QuotaData {
	if acc == nil || acc.ModelsJSON == "" {
		return nil
	}
	if fetched, err := time.Parse(time.RFC3339, acc.ModelsFetchedAt); err == nil && time.Since(fetched) > 5*time.Minute {
		return nil
	}
	raw := []byte(acc.ModelsJSON)
	if len(raw) >= 2 && raw[0] == 0x1f && raw[1] == 0x8b {
		r, err := gzip.NewReader(bytes.NewReader(raw))
		if err != nil {
			return nil
		}
		defer r.Close()
		raw, err = io.ReadAll(r)
		if err != nil {
			return nil
		}
	}
	var data map[string]any
	if json.Unmarshal(raw, &data) != nil {
		return nil
	}
	return ParseQuota(data)
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
	if m.onUpdateStatus == nil {
		return
	}
	m.mu.RLock()
	email, tier := "", ""
	if m.currentAccount != nil {
		email, tier = m.currentAccount.Email, m.currentAccount.Tier
	}
	st := map[string]any{"enabled": m.enabled, "currentEmail": email,
		"currentTier": tier, "activeSource": m.activeSource}
	m.mu.RUnlock()
	m.onUpdateStatus(st)
}

func (m *Manager) PushCurrentToken() {
	acc, _, err := m.GetActiveAccountToken()
	if err != nil {
		return
	}
	m.switchMu.Lock()
	defer m.switchMu.Unlock()
	m.mu.RLock()
	current := m.currentAccount
	matches := current != nil && current.ID == acc.ID && current.AccessToken == acc.AccessToken
	m.mu.RUnlock()
	if matches {
		m.pushToken(acc)
	}
}

func (m *Manager) PushCurrentQuota() {
	m.mu.RLock()
	q := m.quotaSnapshot
	email := ""
	if m.currentAccount != nil {
		email = m.currentAccount.Email
	}
	m.mu.RUnlock()
	if q != nil && m.onQuotaUpdate != nil {
		m.onQuotaUpdate(q, email)
	}
}

func (m *Manager) GetAccountAccessToken(acc *storage.Account) (string, error) {
	if acc == nil {
		return "", fmt.Errorf("account is nil")
	}
	lock, _ := m.tokenLocks.LoadOrStore(acc.ID, &sync.Mutex{})
	lock.(*sync.Mutex).Lock()
	defer lock.(*sync.Mutex).Unlock()
	fresh, err := m.db.GetAccount(acc.ID)
	if err != nil {
		return "", err
	}
	*acc = *fresh
	exp, _ := time.Parse(time.RFC3339, acc.TokenExpiresAt)
	if acc.AccessToken != "" && exp.After(time.Now().Add(time.Minute)) {
		return acc.AccessToken, nil
	}
	if acc.RefreshToken == "" {
		return "", fmt.Errorf("account %s has no usable credentials", acc.Email)
	}
	tok, err := m.refreshToken(acc.RefreshToken)
	if err != nil {
		return "", fmt.Errorf("refresh token for %s: %w", acc.Email, err)
	}
	if tok == nil || tok.AccessToken == "" || tok.ExpiresIn <= 0 {
		return "", fmt.Errorf("empty or expired token for %s", acc.Email)
	}
	newExp := time.Now().Add(time.Duration(tok.ExpiresIn) * time.Second).UTC().Format(time.RFC3339)
	if err := m.db.UpdateAccountToken(acc.ID, tok.AccessToken, newExp); err != nil {
		return "", err
	}
	acc.AccessToken, acc.TokenExpiresAt = tok.AccessToken, newExp
	return acc.AccessToken, nil
}

func (m *Manager) FetchAndPushQuota(email string) {
	var acc *storage.Account
	var err error
	if email != "" {
		acc, err = m.db.GetAccountByEmail(email)
	} else {
		m.mu.RLock()
		if m.currentAccount != nil {
			copy := *m.currentAccount
			acc = &copy
		}
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

	data, err := m.fetchModels(tok, acc.ProjectID)
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
	if m.IsEnabled() && m.CurrentEmail() == acc.Email {
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
		if m.IsEnabled() && m.CurrentEmail() == email {
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
		for k, item := range mMap {
			if subMap, ok := item.(map[string]any); ok {
				mCopy := make(map[string]any, len(subMap)+2)
				for sk, sv := range subMap {
					mCopy[sk] = sv
				}
				mCopy["_modelId"] = k
				if name, _ := mCopy["name"].(string); name == "" {
					mCopy["name"] = k
				}
				if dn, _ := mCopy["displayName"].(string); dn == "" {
					mCopy["displayName"] = k
				}
				rawModels = append(rawModels, mCopy)
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
		modelId, _ := mMap["_modelId"].(string)
		name, _ := mMap["name"].(string)
		displayName, _ := mMap["displayName"].(string)
		modelVal, _ := mMap["model"].(string)
		if displayName == "" {
			if name != "" {
				displayName = name
			} else if modelId != "" {
				displayName = modelId
			}
		}
		lower := strings.ToLower(modelId + " " + name + " " + displayName + " " + modelVal)

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
		} else if resetTime != "" {
			// In Proto3 JSON, default numeric values (0.0) are omitted.
			// When remainingFraction is omitted but resetTime is present, the quota is 0%.
			percent = 0.0
		}
		if percent < 0 {
			percent = 0
		} else if percent > 100 {
			percent = 100
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

		// Skip tab autocomplete background models from driving the main chat/agent quota families
		if strings.HasPrefix(modelId, "tab_") {
			continue
		}

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

func quotaLow(q *QuotaData, benchmark string, threshold float64) bool {
	if q == nil {
		return false
	}
	for _, f := range q.Families {
		if strings.EqualFold(f.Name, benchmark) {
			if reset, err := time.Parse(time.RFC3339, f.ResetTime); err == nil && reset.Before(time.Now()) {
				return false
			}
			return f.Percent <= threshold
		}
	}
	for _, f := range q.Families {
		if f.Percent <= threshold {
			if reset, err := time.Parse(time.RFC3339, f.ResetTime); err == nil && reset.Before(time.Now()) {
				continue
			}
			return true
		}
	}
	return false
}

func (m *Manager) rotationSettings() (string, float64) {
	threshold, err := strconv.ParseFloat(m.db.GetSettingDefault("quota_threshold", "10"), 64)
	if err != nil || threshold < 0 || threshold > 100 {
		threshold = 10
	}
	return m.db.GetSettingDefault("active_model_family", "claude"), threshold
}

func (m *Manager) checkAutoRotation() {
	m.mu.RLock()
	q, enabled := m.quotaSnapshot, m.enabled
	var id int64
	if m.currentAccount != nil {
		id = m.currentAccount.ID
	}
	m.mu.RUnlock()
	benchmark, threshold := m.rotationSettings()
	if enabled && quotaLow(q, benchmark, threshold) {
		m.RotateIfCurrent(id, false)
	}
}

func (m *Manager) RotateToNextAccount() {
	m.RotateIfCurrent(m.CurrentAccountID(), false)
}

// RotateIfCurrent prevents late failures from rotating an account selected by another request.
func (m *Manager) RotateIfCurrent(id int64, rateLimited bool) bool {
	m.switchMu.Lock()
	defer m.switchMu.Unlock()
	if m.CurrentAccountID() != id {
		return true
	}
	if !m.IsEnabled() {
		return false
	}
	if rateLimited {
		m.unavailableUntil[id] = time.Now().Add(time.Minute)
	}
	accounts, err := m.db.GetActiveAccounts()
	if err != nil || len(accounts) < 2 {
		return false
	}
	benchmark, threshold := m.rotationSettings()
	start := -1
	for i, acc := range accounts {
		if acc.ID == id {
			start = i
			break
		}
	}
	for offset := 1; offset <= len(accounts); offset++ {
		acc := accounts[(start+offset)%len(accounts)]
		if acc.ID == id || time.Now().Before(m.unavailableUntil[acc.ID]) || quotaLow(quotaFromAccount(acc), benchmark, threshold) {
			continue
		}
		if _, err := m.selectAccount(acc.ID); err == nil {
			return true
		}
	}
	return false
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
