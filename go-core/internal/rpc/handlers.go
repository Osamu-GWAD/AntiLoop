package rpc

import (
	"bytes"
	"compress/gzip"
	"context"
	"encoding/json"
	"io"
	"strconv"
	"sync"
	"time"

	"github.com/Osamu-GWAD/AntiLoop/internal/applog"
	"github.com/Osamu-GWAD/AntiLoop/internal/oauth"
	"github.com/Osamu-GWAD/AntiLoop/internal/proxy"
	"github.com/Osamu-GWAD/AntiLoop/internal/remote"
	"github.com/Osamu-GWAD/AntiLoop/internal/rotation"
	"github.com/Osamu-GWAD/AntiLoop/internal/storage"
)

type HandlerRegistrar interface {
	RegisterHandler(method string, fn func(params json.RawMessage) (any, error))
	RegisterMutation(method string, fn func(params json.RawMessage) (any, error))
}

type Context struct {
	DB       *storage.DB
	Rotation *rotation.Manager
	Proxy    *proxy.Server
	Remote   *remote.Client
	Storage  string

	addAccountCancel context.CancelFunc
	addAccountMu     sync.Mutex
	onBrowserURL     func(url string)
}

func RegisterHandlers(reg HandlerRegistrar, ctx *Context) {

	reg.RegisterHandler("activate", func(params json.RawMessage) (any, error) {
		var p struct {
			StoragePath   string `json:"storagePath"`
			IDEVersion    string `json:"ideVersion"`
			Platform      string `json:"platform"`
			BinaryMtimeMs int64  `json:"binaryMtimeMs"`
		}
		_ = json.Unmarshal(params, &p)

		if p.IDEVersion != "" {
			oauth.SetIDEInfo(p.IDEVersion, p.Platform)
		}

		ctx.Rotation.EnsureActiveAccount()

		total, _ := ctx.DB.CountAccounts()
		activeAccs, _ := ctx.DB.GetActiveAccounts()

		autoEnabledStr := ctx.DB.GetSettingDefault("auto_enabled", "false")
		autoEnabled := autoEnabledStr == "true"
		if autoEnabled {
			ctx.Rotation.Enable()
		}

		proxyEnabledStr := ctx.DB.GetSettingDefault("proxy_enabled", "true")
		proxyEnabled := proxyEnabledStr == "true"

		return map[string]any{
			"total":         total,
			"active":        len(activeAccs),
			"currentEmail":  ctx.Rotation.CurrentEmail(),
			"currentTier":   ctx.Rotation.CurrentTier(),
			"autoEnabled":   autoEnabled,
			"proxyPort":     ctx.Proxy.Port(),
			"proxyEnabled":  proxyEnabled,
			"quotaPending":  false,
			"binaryUpdated": false,
		}, nil
	})

	reg.RegisterHandler("listAccounts", func(params json.RawMessage) (any, error) {
		accs, err := ctx.DB.ListAccounts()
		if err != nil {
			return nil, err
		}
		return map[string]any{"accounts": accs}, nil
	})

	reg.RegisterHandler("listAccountsWithQuota", func(params json.RawMessage) (any, error) {
		accs, err := ctx.DB.ListAccounts()
		if err != nil {
			return nil, err
		}
		type AccountWithQuota struct {
			*storage.Account
			Quota  *rotation.QuotaData   `json:"quota,omitempty"`
			Models []rotation.ModelItem `json:"models,omitempty"`
		}
		var result []AccountWithQuota
		for _, a := range accs {
			awq := AccountWithQuota{Account: a}
			if a.ModelsJSON != "" {
				raw := []byte(a.ModelsJSON)
				if len(raw) >= 2 && raw[0] == 0x1f && raw[1] == 0x8b {
					if gzReader, err := gzip.NewReader(bytes.NewReader(raw)); err == nil {
						if unc, err := io.ReadAll(gzReader); err == nil {
							raw = unc
						}
						gzReader.Close()
					}
				}
				var data map[string]any
				if err := json.Unmarshal(raw, &data); err == nil {
					q := rotation.ParseQuota(data)
					awq.Quota = q
					awq.Models = q.Models
				}
			}
			result = append(result, awq)
		}
		return map[string]any{"accounts": result}, nil
	})

	reg.RegisterHandler("listAccountsForSource", func(params json.RawMessage) (any, error) {
		accs, err := ctx.DB.ListAccounts()
		if err != nil {
			return nil, err
		}
		return map[string]any{"accounts": accs}, nil
	})

	reg.RegisterHandler("getAccountModels", func(params json.RawMessage) (any, error) {
		var p struct {
			ID int64 `json:"id"`
		}
		_ = json.Unmarshal(params, &p)
		acc, err := ctx.DB.GetAccount(p.ID)
		if err != nil {
			return nil, err
		}
		var models any
		if acc.ModelsJSON != "" {
			_ = json.Unmarshal([]byte(acc.ModelsJSON), &models)
		}
		return map[string]any{"models": models}, nil
	})

	reg.RegisterHandler("getStatus", func(params json.RawMessage) (any, error) {
		proxyEnabledStr := ctx.DB.GetSettingDefault("proxy_enabled", "true")
		netModeStr := ctx.DB.GetSettingDefault("network_mode", "3")
		netMode, _ := strconv.Atoi(netModeStr)
		thresholdStr := ctx.DB.GetSettingDefault("quota_threshold", "10")
		threshold, _ := strconv.Atoi(thresholdStr)
		retriesStr := ctx.DB.GetSettingDefault("max_retries", "3")
		retries, _ := strconv.Atoi(retriesStr)

		quotaDisplay := ctx.DB.GetSettingDefault("quota_display", "true") == "true"
		quotaClaude := ctx.DB.GetSettingDefault("quota_show_claude", "true") == "true"
		quotaFlash := ctx.DB.GetSettingDefault("quota_show_flash", "true") == "true"
		quotaPro := ctx.DB.GetSettingDefault("quota_show_pro", "true") == "true"

		return map[string]any{
			"enabled":        ctx.Rotation.IsEnabled(),
			"currentEmail":   ctx.Rotation.CurrentEmail(),
			"currentTier":    ctx.Rotation.CurrentTier(),
			"activeSource":   ctx.Rotation.ActiveSource(),
			"proxyEnabled":   proxyEnabledStr == "true",
			"proxyPort":      ctx.Proxy.Port(),
			"quotaThreshold": threshold,
			"networkMode":    netMode,
			"networkEnhance": ctx.DB.GetSettingDefault("network_enhance", "true") == "true",
			"maxRetries":     retries,
			"activeFamily":   ctx.DB.GetSettingDefault("active_model_family", "claude"),
			"quotaSettings": map[string]any{
				"display": quotaDisplay,
				"claude":  quotaClaude,
				"flash":   quotaFlash,
				"pro":     quotaPro,
			},
		}, nil
	})

	reg.RegisterHandler("getActiveModelFamily", func(params json.RawMessage) (any, error) {
		fam := ctx.DB.GetSettingDefault("active_model_family", "claude")
		return map[string]string{"activeModelFamily": fam}, nil
	})

	reg.RegisterMutation("setActiveModelFamily", func(params json.RawMessage) (any, error) {
		var p struct {
			Family string `json:"family"`
		}
		_ = json.Unmarshal(params, &p)
		if p.Family != "" {
			_ = ctx.DB.SetSetting("active_model_family", p.Family)
		}
		return map[string]any{"ok": true, "family": p.Family}, nil
	})

	reg.RegisterHandler("getQuotaSettings", func(params json.RawMessage) (any, error) {
		threshold, _ := strconv.Atoi(ctx.DB.GetSettingDefault("quota_threshold", "10"))
		display := ctx.DB.GetSettingDefault("quota_display", "true") == "true"
		claude := ctx.DB.GetSettingDefault("quota_show_claude", "true") == "true"
		pro := ctx.DB.GetSettingDefault("quota_show_pro", "true") == "true"
		flash := ctx.DB.GetSettingDefault("quota_show_flash", "true") == "true"
		return map[string]any{
			"threshold":  threshold,
			"display":    display,
			"claude":     claude,
			"pro":        pro,
			"flash":      flash,
			"showClaude": claude,
			"showPro":    pro,
			"showFlash":  flash,
		}, nil
	})

	reg.RegisterMutation("setQuotaSettings", func(params json.RawMessage) (any, error) {
		var p struct {
			Threshold  *int  `json:"threshold"`
			Display    *bool `json:"display"`
			Claude     *bool `json:"claude"`
			ShowClaude *bool `json:"showClaude"`
			Pro        *bool `json:"pro"`
			ShowPro    *bool `json:"showPro"`
			Flash      *bool `json:"flash"`
			ShowFlash  *bool `json:"showFlash"`
		}
		_ = json.Unmarshal(params, &p)

		if p.Threshold != nil {
			_ = ctx.DB.SetSetting("quota_threshold", strconv.Itoa(*p.Threshold))
		}
		if p.Display != nil {
			_ = ctx.DB.SetSetting("quota_display", strconv.FormatBool(*p.Display))
		}
		if p.Claude != nil {
			_ = ctx.DB.SetSetting("quota_show_claude", strconv.FormatBool(*p.Claude))
		} else if p.ShowClaude != nil {
			_ = ctx.DB.SetSetting("quota_show_claude", strconv.FormatBool(*p.ShowClaude))
		}
		if p.Pro != nil {
			_ = ctx.DB.SetSetting("quota_show_pro", strconv.FormatBool(*p.Pro))
		} else if p.ShowPro != nil {
			_ = ctx.DB.SetSetting("quota_show_pro", strconv.FormatBool(*p.ShowPro))
		}
		if p.Flash != nil {
			_ = ctx.DB.SetSetting("quota_show_flash", strconv.FormatBool(*p.Flash))
		} else if p.ShowFlash != nil {
			_ = ctx.DB.SetSetting("quota_show_flash", strconv.FormatBool(*p.ShowFlash))
		}

		display := ctx.DB.GetSettingDefault("quota_display", "true") == "true"
		claude := ctx.DB.GetSettingDefault("quota_show_claude", "true") == "true"
		pro := ctx.DB.GetSettingDefault("quota_show_pro", "true") == "true"
		flash := ctx.DB.GetSettingDefault("quota_show_flash", "true") == "true"

		return map[string]any{
			"ok":         true,
			"display":    display,
			"claude":     claude,
			"pro":        pro,
			"flash":      flash,
			"showClaude": claude,
			"showPro":    pro,
			"showFlash":  flash,
		}, nil
	})

	reg.RegisterMutation("setQuotaThreshold", func(params json.RawMessage) (any, error) {
		var p struct {
			Threshold int `json:"threshold"`
		}
		_ = json.Unmarshal(params, &p)
		_ = ctx.DB.SetSetting("quota_threshold", strconv.Itoa(p.Threshold))
		return map[string]any{"ok": true, "threshold": p.Threshold}, nil
	})

	reg.RegisterHandler("getNetworkEnhance", func(params json.RawMessage) (any, error) {
		return map[string]bool{"enabled": ctx.DB.GetSettingDefault("network_enhance", "true") == "true"}, nil
	})
	reg.RegisterMutation("setNetworkEnhance", func(params json.RawMessage) (any, error) {
		var p struct {
			Enabled bool `json:"enabled"`
		}
		_ = json.Unmarshal(params, &p)
		_ = ctx.DB.SetSetting("network_enhance", strconv.FormatBool(p.Enabled))
		ctx.Proxy.SetNetworkEnhance(p.Enabled)
		return map[string]any{"ok": true, "networkEnhance": p.Enabled}, nil
	})

	reg.RegisterHandler("getNetworkMode", func(params json.RawMessage) (any, error) {
		mode, _ := strconv.Atoi(ctx.DB.GetSettingDefault("network_mode", "3"))
		return map[string]int{"networkMode": mode}, nil
	})
	reg.RegisterMutation("setNetworkMode", func(params json.RawMessage) (any, error) {
		var p struct {
			NetworkMode int `json:"networkMode"`
			Mode        int `json:"mode"`
		}
		_ = json.Unmarshal(params, &p)
		mode := p.NetworkMode
		if mode <= 0 {
			mode = p.Mode
		}
		if mode <= 1 {
			mode = 3
		}
		_ = ctx.DB.SetSetting("network_mode", strconv.Itoa(mode))
		return map[string]any{"ok": true, "networkMode": mode}, nil
	})

	reg.RegisterMutation("setMaxRetries", func(params json.RawMessage) (any, error) {
		var p struct {
			MaxRetries int `json:"maxRetries"`
			Retries    int `json:"retries"`
		}
		_ = json.Unmarshal(params, &p)
		retries := p.MaxRetries
		if retries <= 0 {
			retries = p.Retries
		}
		if retries <= 0 {
			retries = 3
		}
		_ = ctx.DB.SetSetting("max_retries", strconv.Itoa(retries))
		ctx.Proxy.SetMaxRetries(retries)
		return map[string]any{"ok": true, "maxRetries": retries}, nil
	})

	reg.RegisterMutation("enable", func(params json.RawMessage) (any, error) {
		ctx.Rotation.Enable()
		return map[string]any{
			"ok":           true,
			"enabled":      true,
			"currentEmail": ctx.Rotation.CurrentEmail(),
			"currentTier":  ctx.Rotation.CurrentTier(),
		}, nil
	})
	reg.RegisterMutation("disable", func(params json.RawMessage) (any, error) {
		ctx.Rotation.Disable()
		return map[string]any{
			"ok":      true,
			"enabled": false,
		}, nil
	})

	reg.RegisterMutation("selectAccount", func(params json.RawMessage) (any, error) {
		var p struct {
			ID    int64  `json:"id"`
			Email string `json:"email"`
		}
		_ = json.Unmarshal(params, &p)

		var acc *storage.Account
		var err error
		if p.ID > 0 {
			acc, err = ctx.Rotation.SelectAccount(p.ID)
		} else if p.Email != "" {
			if a, e := ctx.DB.GetAccountByEmail(p.Email); e == nil {
				acc, err = ctx.Rotation.SelectAccount(a.ID)
			}
		}
		if err != nil {
			return nil, err
		}
		return map[string]any{
			"currentEmail": acc.Email,
			"currentTier":  acc.Tier,
			"activeSource": "local",
		}, nil
	})

	reg.RegisterMutation("toggleAccountEnabled", func(params json.RawMessage) (any, error) {
		var p struct {
			ID      int64 `json:"id"`
			Enabled bool  `json:"enabled"`
		}
		_ = json.Unmarshal(params, &p)
		status := "included"
		if !p.Enabled {
			status = "excluded"
		}
		err := ctx.DB.UpdateAccountStatus(p.ID, status)
		return map[string]bool{"ok": err == nil}, err
	})

	reg.RegisterMutation("toggleAccountAICredits", func(params json.RawMessage) (any, error) {
		var p struct {
			ID           int64 `json:"id"`
			UseAICredits bool  `json:"useAICredits"`
		}
		_ = json.Unmarshal(params, &p)
		err := ctx.DB.UpdateAccountUseAICredits(p.ID, p.UseAICredits)
		return map[string]bool{"ok": err == nil}, err
	})

	reg.RegisterMutation("swapAccountOrder", func(params json.RawMessage) (any, error) {
		var p struct {
			ID1 int64 `json:"id1"`
			ID2 int64 `json:"id2"`
		}
		_ = json.Unmarshal(params, &p)
		err := ctx.DB.SwapAccountOrder(p.ID1, p.ID2)
		return map[string]bool{"ok": err == nil}, err
	})

	reg.RegisterMutation("setAccountAlias", func(params json.RawMessage) (any, error) {
		var p struct {
			ID    int64  `json:"id"`
			Alias string `json:"alias"`
		}
		_ = json.Unmarshal(params, &p)
		err := ctx.DB.UpdateAccountAlias(p.ID, p.Alias)
		return map[string]bool{"ok": err == nil}, err
	})

	reg.RegisterMutation("removeAccount", func(params json.RawMessage) (any, error) {
		var p struct {
			ID int64 `json:"id"`
		}
		_ = json.Unmarshal(params, &p)
		err := ctx.DB.RemoveAccount(p.ID)
		ctx.Rotation.EnsureActiveAccount()
		return map[string]bool{"ok": err == nil}, err
	})

	reg.RegisterMutation("refreshAccount", func(params json.RawMessage) (any, error) {
		var p struct {
			ID int64 `json:"id"`
		}
		_ = json.Unmarshal(params, &p)
		acc, err := ctx.DB.GetAccount(p.ID)
		if err != nil {
			return nil, err
		}
		ctx.Rotation.FetchAndPushQuota(acc.Email)
		return map[string]bool{"ok": true}, nil
	})

	reg.RegisterHandler("addAccount", func(params json.RawMessage) (any, error) {
		ctx.addAccountMu.Lock()
		cCtx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
		ctx.addAccountCancel = cancel
		ctx.addAccountMu.Unlock()

		defer cancel()

		applog.Println("[rpc] starting OAuth flow for addAccount")
		res, err := oauth.StartAuthFlow(cCtx, func(authUrl string) {
			if ctx.onBrowserURL != nil {
				ctx.onBrowserURL(authUrl)
			}
		})
		if err != nil {
			return nil, err
		}

		acc, err := ctx.DB.AddAccount(res.Email, res.RefreshToken, "included", res.Tier, 0)
		if err != nil {
			return nil, err
		}
		_ = ctx.DB.UpdateAccountProject(acc.ID, res.ProjectID)
		expStr := time.Unix(res.ExpiryDateSeconds, 0).UTC().Format(time.RFC3339)
		_ = ctx.DB.UpdateAccountToken(acc.ID, res.AccessToken, expStr)

		ctx.Rotation.EnsureActiveAccount()
		go ctx.Rotation.FetchAndPushQuota(acc.Email)

		return map[string]any{"account": acc}, nil
	})

	reg.RegisterHandler("cancelAddAccount", func(params json.RawMessage) (any, error) {
		ctx.addAccountMu.Lock()
		if ctx.addAccountCancel != nil {
			ctx.addAccountCancel()
			ctx.addAccountCancel = nil
		}
		ctx.addAccountMu.Unlock()
		return map[string]bool{"ok": true}, nil
	})

	reg.RegisterHandler("importIdeAccount", func(params json.RawMessage) (any, error) {
		var p struct {
			Email             string `json:"email"`
			AccessToken       string `json:"accessToken"`
			RefreshToken      string `json:"refreshToken"`
			ExpiryDateSeconds int64  `json:"expiryDateSeconds"`
		}
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}

		if p.Email == "" || p.RefreshToken == "" {
			return map[string]bool{"imported": false}, nil
		}

		existing, _ := ctx.DB.GetAccountByEmail(p.Email)
		if existing != nil {

			expStr := time.Unix(p.ExpiryDateSeconds, 0).UTC().Format(time.RFC3339)
			_ = ctx.DB.UpdateAccountToken(existing.ID, p.AccessToken, expStr)
			ctx.Rotation.EnsureActiveAccount()
			return map[string]bool{"imported": false}, nil
		}

		acc, err := ctx.DB.AddAccount(p.Email, p.RefreshToken, "included", "standard", 0)
		if err != nil {
			return nil, err
		}
		expStr := time.Unix(p.ExpiryDateSeconds, 0).UTC().Format(time.RFC3339)
		_ = ctx.DB.UpdateAccountToken(acc.ID, p.AccessToken, expStr)

		ctx.Rotation.EnsureActiveAccount()
		go ctx.Rotation.FetchAndPushQuota(acc.Email)
		return map[string]bool{"imported": true}, nil
	})

	reg.RegisterHandler("pushCurrentToken", func(params json.RawMessage) (any, error) {
		ctx.Rotation.PushCurrentToken()
		return map[string]bool{"ok": true}, nil
	})

	reg.RegisterHandler("setProxyEnabled", func(params json.RawMessage) (any, error) {
		var p struct {
			Enabled bool `json:"enabled"`
		}
		_ = json.Unmarshal(params, &p)
		_ = ctx.DB.SetSetting("proxy_enabled", strconv.FormatBool(p.Enabled))
		return map[string]any{
			"proxyEnabled": p.Enabled,
			"proxyPort":    ctx.Proxy.Port(),
		}, nil
	})

	reg.RegisterHandler("listProviders", func(params json.RawMessage) (any, error) {
		providers, err := ctx.DB.ListProviders()
		if err != nil {
			return nil, err
		}
		activeIDStr := ctx.DB.GetSettingDefault("active_provider_id", "0")
		activeID, _ := strconv.ParseInt(activeIDStr, 10, 64)
		return map[string]any{
			"providers":        providers,
			"activeProviderID": activeID,
		}, nil
	})

	reg.RegisterMutation("addProvider", func(params json.RawMessage) (any, error) {
		var p struct {
			Name             string `json:"name"`
			APIType          string `json:"api_type"`
			BaseURL          string `json:"base_url"`
			APIKey           string `json:"api_key"`
			ModelID          string `json:"model_id"`
			ExtraHeaders     string `json:"extra_headers"`
			ExtraParams      string `json:"extra_params"`
			MaxContextTokens int    `json:"max_context_tokens"`
			MaxOutputTokens  int    `json:"max_output_tokens"`
		}
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		prov, err := ctx.DB.AddProvider(
			p.Name, p.APIType, p.BaseURL, p.APIKey, p.ModelID,
			p.ExtraHeaders, p.ExtraParams, p.MaxContextTokens, p.MaxOutputTokens,
		)
		return prov, err
	})

	reg.RegisterMutation("updateProvider", func(params json.RawMessage) (any, error) {
		var p struct {
			ID               int64  `json:"id"`
			Name             string `json:"name"`
			APIType          string `json:"api_type"`
			BaseURL          string `json:"base_url"`
			APIKey           string `json:"api_key"`
			ModelID          string `json:"model_id"`
			ExtraHeaders     string `json:"extra_headers"`
			ExtraParams      string `json:"extra_params"`
			MaxContextTokens int    `json:"max_context_tokens"`
			MaxOutputTokens  int    `json:"max_output_tokens"`
		}
		if err := json.Unmarshal(params, &p); err != nil {
			return nil, err
		}
		err := ctx.DB.UpdateProvider(
			p.ID, p.Name, p.APIType, p.BaseURL, p.APIKey, p.ModelID,
			p.ExtraHeaders, p.ExtraParams, p.MaxContextTokens, p.MaxOutputTokens,
		)
		return map[string]bool{"ok": err == nil}, err
	})

	reg.RegisterMutation("removeProvider", func(params json.RawMessage) (any, error) {
		var p struct {
			ID int64 `json:"id"`
		}
		_ = json.Unmarshal(params, &p)
		err := ctx.DB.RemoveProvider(p.ID)

		activeIDStr := ctx.DB.GetSettingDefault("active_provider_id", "0")
		if activeIDStr == strconv.FormatInt(p.ID, 10) {
			_ = ctx.DB.SetSetting("active_provider_id", "0")
			ctx.Proxy.UpstreamRouter().SetActiveProvider(nil)
		}
		return map[string]bool{"ok": err == nil}, err
	})

	reg.RegisterMutation("toggleProviderEnabled", func(params json.RawMessage) (any, error) {
		var p struct {
			ID      int64 `json:"id"`
			Enabled bool  `json:"enabled"`
		}
		_ = json.Unmarshal(params, &p)
		err := ctx.DB.ToggleProviderEnabled(p.ID, p.Enabled)
		return map[string]bool{"ok": err == nil}, err
	})

	reg.RegisterMutation("selectProvider", func(params json.RawMessage) (any, error) {
		var p struct {
			ID *int64 `json:"id"`
		}
		_ = json.Unmarshal(params, &p)

		if p.ID == nil || *p.ID <= 0 {
			_ = ctx.DB.SetSetting("active_provider_id", "0")
			ctx.Proxy.UpstreamRouter().SetActiveProvider(nil)
			applog.Println("[rpc] cleared active provider (using Google accounts)")
			return map[string]bool{"ok": true}, nil
		}

		prov, err := ctx.DB.GetProviderWithKey(*p.ID)
		if err != nil {
			return nil, err
		}
		_ = ctx.DB.SetSetting("active_provider_id", strconv.FormatInt(*p.ID, 10))
		ctx.Proxy.UpstreamRouter().SetActiveProvider(prov)
		applog.Printf("[rpc] selected active provider: %s (%s)", prov.Name, prov.ModelID)
		return map[string]bool{"ok": true}, nil
	})

	reg.RegisterHandler("testProvider", func(params json.RawMessage) (any, error) {
		return map[string]any{"ok": true, "latencyMs": 150}, nil
	})

	reg.RegisterHandler("switchMode", func(params json.RawMessage) (any, error) {
		return map[string]bool{"ok": true}, nil
	})
	reg.RegisterHandler("setRemoteConfig", func(params json.RawMessage) (any, error) {
		return map[string]bool{"ok": true}, nil
	})
	reg.RegisterHandler("syncRemoteAccounts", func(params json.RawMessage) (any, error) {
		return map[string]bool{"ok": true}, nil
	})

	adminMethods := []string{
		"adminStatus", "adminLogin", "adminLogout", "adminListTokens", "adminDeleteToken",
		"adminToggleToken", "adminCreateClient", "adminDeleteClient", "adminUpdateClient",
		"adminResetDevices", "adminCreateTenant", "adminUploadLocalToken", "adminLoginAndUpload",
		"adminAssignToken", "adminUpdateAssignment", "adminUnassignToken", "adminInstallAccount",
		"adminResolveProject", "adminRefreshTokenTier", "adminInstallRemoteToken",
		"adminListQuotaReports", "adminListMembers", "adminInviteMember", "adminRemoveMember",
		"adminListPools", "adminCreatePool", "adminUpdatePool", "adminDeletePool",
		"adminListPoolMembers", "adminListAvailableTokens", "adminAddPoolMember",
		"adminRemovePoolMember", "adminBindClientToPool", "adminListPoolClients",
		"adminUnbindClientFromPool", "adminListPoolLeases", "adminRevokePoolLease",
		"adminListClients", "adminListLocalAccounts", "adminListAssignments",
		"getOpenAI", "setOpenAI",
	}

	for _, m := range adminMethods {
		methodName := m
		reg.RegisterHandler(methodName, func(p json.RawMessage) (any, error) {
			return map[string]any{"ok": true, "method": methodName}, nil
		})
	}
}

func (ctx *Context) SetOnBrowserURL(fn func(url string)) {
	ctx.onBrowserURL = fn
}
