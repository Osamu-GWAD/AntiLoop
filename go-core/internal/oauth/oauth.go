package oauth

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"net/url"
	"runtime"
	"strings"
	"sync"
	"time"
)

func decodeSecret(data []byte, key byte) string {
	res := make([]byte, len(data))
	for i, b := range data {
		res[i] = b ^ key
	}
	return string(res)
}

var (
	rawCID       = []byte{107, 106, 109, 107, 106, 106, 108, 106, 108, 106, 111, 99, 107, 119, 46, 55, 50, 41, 41, 51, 52, 104, 50, 104, 107, 54, 57, 40, 63, 104, 105, 111, 44, 46, 53, 54, 53, 48, 50, 110, 61, 110, 106, 105, 63, 42, 116, 59, 42, 42, 41, 116, 61, 53, 53, 61, 54, 63, 47, 41, 63, 40, 57, 53, 52, 46, 63, 52, 46, 116, 57, 53, 55}
	rawCSEC      = []byte{29, 21, 25, 9, 10, 2, 119, 17, 111, 98, 28, 13, 8, 110, 98, 108, 22, 62, 22, 16, 107, 55, 22, 24, 98, 41, 2, 25, 110, 32, 108, 43, 30, 27, 60}
	ClientID     = decodeSecret(rawCID, 0x5A)
	ClientSecret = decodeSecret(rawCSEC, 0x5A)
)

const (
	TokenEndpoint       = "https://oauth2.googleapis.com/token"
	UserInfoEndpoint    = "https://www.googleapis.com/oauth2/v2/userinfo"
	AuthEndpoint        = "https://accounts.google.com/o/oauth2/v2/auth"
	LoadCodeAssistURL   = "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist"
	OnboardUserURL      = "https://cloudcode-pa.googleapis.com/v1internal:onboardUser"
	FetchModelsURL      = "https://daily-cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels"
)

var ScopesList = []string{
	"https://www.googleapis.com/auth/cloud-platform",
	"https://www.googleapis.com/auth/userinfo.email",
	"https://www.googleapis.com/auth/userinfo.profile",
	"openid",
	"https://www.googleapis.com/auth/cclog",
	"https://www.googleapis.com/auth/experimentsandconfigs",
}

func Scopes() string {
	return strings.Join(ScopesList, " ")
}

type AuthResult struct {
	Email             string `json:"email"`
	AccessToken       string `json:"access_token"`
	RefreshToken      string `json:"refresh_token"`
	ExpiryDateSeconds int64  `json:"expiry_date_seconds"`
	Tier              string `json:"tier"`
	ProjectID         string `json:"project_id"`
}

type TokenResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	ExpiresIn    int64  `json:"expires_in"`
	TokenType    string `json:"token_type"`
	IDToken      string `json:"id_token"`
}

type UserInfo struct {
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
}

var httpClient = &http.Client{
	Timeout: 30 * time.Second,
}

var (
	ideVersionMu sync.RWMutex
	currIdeVer   = "1.105.0"
	currPlatform = "linux/amd64"
)

func SetIDEInfo(version, platform string) {
	ideVersionMu.Lock()
	defer ideVersionMu.Unlock()
	if version != "" {
		currIdeVer = version
	}
	if platform != "" {
		currPlatform = platform
	}
}

func getIDEInfo() (string, string) {
	ideVersionMu.RLock()
	defer ideVersionMu.RUnlock()
	return currIdeVer, currPlatform
}

func StartAuthFlow(ctx context.Context, openBrowserCb func(authUrl string)) (*AuthResult, error) {
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return nil, fmt.Errorf("failed to bind loopback listener: %w", err)
	}
	defer listener.Close()

	port := listener.Addr().(*net.TCPAddr).Port
	redirectURI := fmt.Sprintf("http://127.0.0.1:%d/oauthcallback", port)

	codeChan := make(chan string, 1)
	errChan := make(chan error, 1)

	mux := http.NewServeMux()
	mux.HandleFunc("/oauthcallback", func(w http.ResponseWriter, r *http.Request) {
		code := r.URL.Query().Get("code")
		if code == "" {
			errStr := r.URL.Query().Get("error")
			http.Error(w, "Authentication failed: "+errStr, http.StatusBadRequest)
			errChan <- fmt.Errorf("auth callback error: %s", errStr)
			return
		}

		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		fmt.Fprint(w, `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:sans-serif;text-align:center;padding:50px">
			<h1>✅ Authorization Successful</h1>
			<p>You can close this tab and return to the IDE.</p>
			<script>setTimeout(()=>window.close(),2000)</script>
			</body></html>`)

		codeChan <- code
	})

	server := &http.Server{Handler: mux}
	go func() {
		_ = server.Serve(listener)
	}()
	defer server.Close()

	authURL := fmt.Sprintf(
		"%s?client_id=%s&redirect_uri=%s&response_type=code&scope=%s&access_type=offline&prompt=consent",
		AuthEndpoint,
		url.QueryEscape(ClientID),
		url.QueryEscape(redirectURI),
		url.QueryEscape(Scopes()),
	)

	openBrowserCb(authURL)

	var code string
	select {
	case <-ctx.Done():
		return nil, ctx.Err()
	case err := <-errChan:
		return nil, err
	case code = <-codeChan:
	}

	tokenResp, err := ExchangeCode(code, redirectURI)
	if err != nil {
		return nil, fmt.Errorf("exchange code: %w", err)
	}

	userInfo, err := FetchUserInfo(tokenResp.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("fetch user info: %w", err)
	}

	ideVer, platform := getIDEInfo()
	tier, projectID, _ := LoadCodeAssist(tokenResp.AccessToken, ideVer, platform)
	if projectID == "" {
		projectID, _ = OnboardUser(tokenResp.AccessToken, ideVer, platform)
	}

	expirySec := time.Now().Unix() + tokenResp.ExpiresIn

	return &AuthResult{
		Email:             userInfo.Email,
		AccessToken:       tokenResp.AccessToken,
		RefreshToken:      tokenResp.RefreshToken,
		ExpiryDateSeconds: expirySec,
		Tier:              tier,
		ProjectID:         projectID,
	}, nil
}

func ExchangeCode(code, redirectURI string) (*TokenResponse, error) {
	data := url.Values{
		"code":          {code},
		"client_id":     {ClientID},
		"client_secret": {ClientSecret},
		"redirect_uri":  {redirectURI},
		"grant_type":    {"authorization_code"},
	}

	resp, err := httpClient.PostForm(TokenEndpoint, data)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("token exchange failed (%d): %s", resp.StatusCode, string(body))
	}

	var res TokenResponse
	if err := json.Unmarshal(body, &res); err != nil {
		return nil, err
	}
	return &res, nil
}

func RefreshAccessToken(refreshToken string) (*TokenResponse, error) {
	data := url.Values{
		"client_id":     {ClientID},
		"client_secret": {ClientSecret},
		"refresh_token": {refreshToken},
		"grant_type":    {"refresh_token"},
	}

	resp, err := httpClient.PostForm(TokenEndpoint, data)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("token refresh failed (%d): %s", resp.StatusCode, string(body))
	}

	var res TokenResponse
	if err := json.Unmarshal(body, &res); err != nil {
		return nil, err
	}
	if res.RefreshToken == "" {
		res.RefreshToken = refreshToken
	}
	return &res, nil
}

func FetchUserInfo(accessToken string) (*UserInfo, error) {
	req, err := http.NewRequest("GET", UserInfoEndpoint, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)

	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("fetch user info failed (%d): %s", resp.StatusCode, string(body))
	}

	var u UserInfo
	if err := json.NewDecoder(resp.Body).Decode(&u); err != nil {
		return nil, err
	}
	return &u, nil
}

func getPlatformString() string {
	osStr := runtime.GOOS
	switch osStr {
	case "darwin":
		osStr = "Darwin"
	case "windows":
		osStr = "Windows"
	case "linux":
		osStr = "Linux"
	}
	archStr := runtime.GOARCH
	if archStr == "amd64" {
		archStr = "x64"
	}
	return fmt.Sprintf("%s; %s", osStr, archStr)
}

func LoadCodeAssist(accessToken, ideVersion, idePlatform string) (string, string, error) {
	reqBody := map[string]any{
		"metadata": map[string]string{
			"ide_type":    "ANTIGRAVITY",
			"ide_name":    "antigravity",
			"ide_version": ideVersion,
		},
	}
	raw, _ := json.Marshal(reqBody)

	req, err := http.NewRequest("POST", LoadCodeAssistURL, bytes.NewReader(raw))
	if err != nil {
		return "", "", err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("User-Agent", fmt.Sprintf("antigravity/%s (%s)", ideVersion, getPlatformString()))

	resp, err := httpClient.Do(req)
	if err != nil {
		return "", "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", "", err
	}

	if resp.StatusCode != http.StatusOK {
		return "", "", fmt.Errorf("loadCodeAssist HTTP %d: %s", resp.StatusCode, string(body))
	}

	var out struct {
		CurrentTier             string `json:"currentTier"`
		PaidTier                any    `json:"paidTier"`
		ProjectID               string `json:"projectId"`
		AllowedTiers            []any  `json:"allowedTiers"`
		CloudaicompanionProject any    `json:"cloudaicompanionProject"`
	}
	_ = json.Unmarshal(body, &out)

	tier := out.CurrentTier
	if tier == "" {
		if ptMap, ok := out.PaidTier.(map[string]any); ok {
			if id, ok := ptMap["id"].(string); ok {
				tier = id
			}
		} else if ptStr, ok := out.PaidTier.(string); ok {
			tier = ptStr
		}
	}
	if tier == "" && len(out.AllowedTiers) > 0 {
		if first, ok := out.AllowedTiers[0].(map[string]any); ok {
			if id, ok := first["id"].(string); ok {
				tier = id
			}
		} else if firstStr, ok := out.AllowedTiers[0].(string); ok {
			tier = firstStr
		}
	}
	if tier == "" {
		tier = "standard"
	}

	projID := out.ProjectID
	if projID == "" {
		if cpMap, ok := out.CloudaicompanionProject.(map[string]any); ok {
			if id, ok := cpMap["id"].(string); ok {
				projID = id
			}
		}
	}

	return normalizeTier(tier), projID, nil
}

func normalizeTier(t string) string {
	lower := strings.ToLower(t)
	if strings.Contains(lower, "ultra") {
		return "ultra"
	}
	if strings.Contains(lower, "pro") {
		return "pro"
	}
	if strings.Contains(lower, "enterprise") {
		return "enterprise"
	}
	if strings.Contains(lower, "standard") || strings.Contains(lower, "free") {
		return "standard"
	}
	return "standard"
}

func OnboardUser(accessToken, ideVersion, idePlatform string) (string, error) {
	reqBody := map[string]any{
		"metadata": map[string]string{
			"ide_type":    "ANTIGRAVITY",
			"ide_name":    "antigravity",
			"ide_version": ideVersion,
		},
		"tierId": "standard-tier",
	}
	raw, _ := json.Marshal(reqBody)

	req, err := http.NewRequest("POST", OnboardUserURL, bytes.NewReader(raw))
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("User-Agent", fmt.Sprintf("antigravity/%s (%s)", ideVersion, getPlatformString()))

	resp, err := httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var out struct {
		ProjectID string `json:"projectId"`
		Response  struct {
			CloudaicompanionProject struct {
				ID string `json:"id"`
			} `json:"cloudaicompanionProject"`
		} `json:"response"`
	}
	_ = json.Unmarshal(body, &out)
	if out.ProjectID != "" {
		return out.ProjectID, nil
	}
	return out.Response.CloudaicompanionProject.ID, nil
}

func FetchAvailableModels(accessToken, projectID string) (map[string]any, error) {
	reqBody := map[string]string{}
	if projectID != "" {
		reqBody["project"] = projectID
	}
	raw, _ := json.Marshal(reqBody)

	endpoint := "https://cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels"

	req, err := http.NewRequest("POST", endpoint, bytes.NewReader(raw))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("User-Agent", fmt.Sprintf("antigravity/%s (%s)", currIdeVer, getPlatformString()))

	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode == http.StatusOK {
		var out map[string]any
		if err := json.Unmarshal(body, &out); err == nil {
			return out, nil
		}
		return nil, fmt.Errorf("json unmarshal models: %w", err)
	}

	if resp.StatusCode == http.StatusTooManyRequests {
		return map[string]any{"quotaExhausted": true}, nil
	}

	return nil, fmt.Errorf("fetchAvailableModels %s failed (HTTP %d): %s", endpoint, resp.StatusCode, string(body))
}
