package rotation

import (
	"encoding/json"
	"errors"
	"os"
	"path/filepath"
	"runtime"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/Osamu-GWAD/AntiLoop/internal/oauth"
	"github.com/Osamu-GWAD/AntiLoop/internal/storage"
)

func testManager(t *testing.T) (*Manager, *storage.DB) {
	t.Helper()
	home := t.TempDir()
	t.Setenv("HOME", home)
	t.Setenv("USERPROFILE", home)
	db, err := storage.Open(t.TempDir())
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { db.Close() })
	m := NewManager(db)
	m.fetchModels = func(string, string) (map[string]any, error) { return nil, errors.New("offline test") }
	m.refreshToken = func(string) (*oauth.TokenResponse, error) { return nil, errors.New("refresh rejected") }
	return m, db
}

func addTestAccount(t *testing.T, db *storage.DB, email string, usable bool) *storage.Account {
	t.Helper()
	a, err := db.AddAccount(email, "refresh-"+email, "included", "pro", 0)
	if err != nil {
		t.Fatal(err)
	}
	if usable {
		if err := db.UpdateAccountToken(a.ID, "token-"+email, time.Now().Add(time.Hour).UTC().Format(time.RFC3339)); err != nil {
			t.Fatal(err)
		}
	}
	return a
}

func TestFailedSwitchPreservesPreviousAccountAndCredentials(t *testing.T) {
	m, db := testManager(t)
	a := addTestAccount(t, db, "a@example.com", true)
	b := addTestAccount(t, db, "b@example.com", false)
	var injected string
	m.SetCallbacks(func(info *TokenInfo) { injected = info.Email }, nil, nil, nil)
	if _, err := m.SelectAccount(a.ID); err != nil {
		t.Fatal(err)
	}
	if _, err := m.SelectAccount(b.ID); err == nil {
		t.Fatal("invalid credentials must fail the switch")
	}
	if m.CurrentAccountID() != a.ID || injected != a.Email || db.GetSettingDefault("current_email", "") != a.Email {
		t.Fatal("failed switch changed active state")
	}
	if err := db.UpdateAccountStatus(b.ID, "excluded"); err != nil {
		t.Fatal(err)
	}
	if _, err := m.SelectAccount(b.ID); err == nil {
		t.Fatal("excluded account must not be selectable")
	}
	file := filepath.Join(os.Getenv("HOME"), ".gemini", "jetski-standalone-oauth-token")
	raw, err := os.ReadFile(file)
	if err != nil {
		t.Fatal(err)
	}
	var payload map[string]any
	if json.Unmarshal(raw, &payload) != nil || payload["id_token_email"] != a.Email {
		t.Fatal("standalone token does not match selected account")
	}
	info, _ := os.Stat(file)
	if runtime.GOOS != "windows" && info.Mode().Perm() != 0600 {
		t.Fatalf("token permissions: %v", info.Mode())
	}
}

func TestEnsureActiveAccountReplacesExcludedAndClearsRemovedAccount(t *testing.T) {
	m, db := testManager(t)
	a := addTestAccount(t, db, "a@example.com", true)
	b := addTestAccount(t, db, "b@example.com", true)
	m.SelectAccount(a.ID)
	db.UpdateAccountStatus(a.ID, "excluded")
	m.EnsureActiveAccount()
	if m.CurrentAccountID() != b.ID {
		t.Fatal("excluded account was restored")
	}
	db.RemoveAccount(b.ID)
	m.EnsureActiveAccount()
	saved, err := db.GetSetting("current_email")
	if err != nil {
		t.Fatal(err)
	}
	if m.CurrentAccountID() != 0 || saved != "" {
		t.Fatal("removed account stayed active")
	}
}

func TestConcurrentRateLimitsRotateOnlyTheFailedAccount(t *testing.T) {
	m, db := testManager(t)
	a := addTestAccount(t, db, "a@example.com", true)
	b := addTestAccount(t, db, "b@example.com", true)
	addTestAccount(t, db, "c@example.com", true)
	m.SelectAccount(a.ID)
	m.Enable()
	var wg sync.WaitGroup
	for i := 0; i < 16; i++ {
		wg.Add(1)
		go func() { defer wg.Done(); m.RotateIfCurrent(a.ID, true) }()
	}
	wg.Wait()
	if m.CurrentAccountID() != b.ID {
		t.Fatal("late rate limits skipped the healthy account")
	}
	m.Disable()
	if m.RotateIfCurrent(b.ID, true) || m.CurrentAccountID() != b.ID {
		t.Fatal("disabled rotation switched accounts")
	}
}

func TestRotationSkipsInvalidAndExhaustedCandidates(t *testing.T) {
	m, db := testManager(t)
	a := addTestAccount(t, db, "a@example.com", true)
	addTestAccount(t, db, "broken@example.com", false)
	low := addTestAccount(t, db, "low@example.com", true)
	good := addTestAccount(t, db, "good@example.com", true)
	db.UpdateAccountModels(low.ID, `{"quotaExhausted":true}`)
	m.SelectAccount(a.ID)
	m.Enable()
	if !m.RotateIfCurrent(a.ID, true) || m.CurrentAccountID() != good.ID {
		t.Fatal("rotation failed to skip unusable accounts")
	}
	db.UpdateAccountModels(a.ID, `{"quotaExhausted":true}`)
	if m.RotateIfCurrent(good.ID, false) {
		t.Fatal("rotation cycled into an exhausted account")
	}
}

func TestConcurrentRefreshUsesOneTokenAndCoherentAccount(t *testing.T) {
	m, db := testManager(t)
	a := addTestAccount(t, db, "a@example.com", true)
	var refreshes atomic.Int32
	m.refreshToken = func(string) (*oauth.TokenResponse, error) {
		refreshes.Add(1)
		return &oauth.TokenResponse{AccessToken: "refreshed", ExpiresIn: 3600}, nil
	}
	m.SelectAccount(a.ID)
	db.UpdateAccountToken(a.ID, "expired", "2000-01-01T00:00:00Z")
	var wg sync.WaitGroup
	for i := 0; i < 16; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			acc, token, err := m.GetActiveAccountToken()
			if err != nil || token != "refreshed" || acc.Email != a.Email || acc.AccessToken != token {
				t.Error("incoherent account token snapshot")
			}
		}()
	}
	wg.Wait()
	if refreshes.Load() != 1 {
		t.Fatalf("refreshed %d times", refreshes.Load())
	}
}

func TestSlowOldAccountRefreshDoesNotBlockOrUndoManualSwitch(t *testing.T) {
	m, db := testManager(t)
	a := addTestAccount(t, db, "a@example.com", false)
	b := addTestAccount(t, db, "b@example.com", true)
	started, release := make(chan struct{}), make(chan struct{})
	var once sync.Once
	m.refreshToken = func(string) (*oauth.TokenResponse, error) {
		once.Do(func() { close(started) })
		<-release
		return &oauth.TokenResponse{AccessToken: "refreshed-a", ExpiresIn: 3600}, nil
	}
	m.currentAccount = a
	readDone := make(chan *storage.Account, 1)
	go func() { acc, _, _ := m.GetActiveAccountToken(); readDone <- acc }()
	<-started
	switched := make(chan error, 1)
	go func() { _, err := m.SelectAccount(b.ID); switched <- err }()
	select {
	case err := <-switched:
		if err != nil {
			t.Fatal(err)
		}
	case <-time.After(time.Second):
		close(release)
		t.Fatal("manual switch blocked behind another account's refresh")
	}
	close(release)
	select {
	case acc := <-readDone:
		if acc.ID != b.ID {
			t.Fatal("old refresh restored previous account")
		}
	case <-time.After(time.Second):
		t.Fatal("token read did not complete")
	}
}

func TestStaleExhaustedQuotaDoesNotExcludeAnAccountForever(t *testing.T) {
	acc := &storage.Account{ModelsJSON: `{"quotaExhausted":true}`, ModelsFetchedAt: time.Now().Add(-time.Hour).UTC().Format(time.RFC3339)}
	if quotaLow(quotaFromAccount(acc), "claude", 10) {
		t.Fatal("stale quota permanently excluded a recovered account")
	}
	acc.ModelsFetchedAt = time.Now().UTC().Format(time.RFC3339)
	if !quotaLow(quotaFromAccount(acc), "claude", 10) {
		t.Fatal("fresh exhausted quota was ignored")
	}
}

func TestParseQuotaHandlesMapKeysAndOmittedZeroRemainingFraction(t *testing.T) {
	data := map[string]any{
		"models": map[string]any{
			"claude-sonnet-4-6": map[string]any{
				"displayName": "Claude Sonnet 4.6 (Thinking)",
				"quotaInfo": map[string]any{
					"remainingFraction": 1.0,
					"resetTime":         "2026-11-13T20:12:00Z",
				},
			},
			"gemini-2.5-pro": map[string]any{
				"displayName": "Gemini 2.5 Pro",
				"quotaInfo": map[string]any{
					// remainingFraction omitted by proto3 when 0
					"resetTime": "2026-11-13T23:42:45Z",
				},
			},
			"gemini-2.5-flash": map[string]any{
				"displayName": "Gemini 3.5 Flash Lite",
				"quotaInfo": map[string]any{
					// remainingFraction omitted by proto3 when 0
					"resetTime": "2026-11-13T23:42:45Z",
				},
			},
			"tab_flash_lite_preview": map[string]any{
				"quotaInfo": map[string]any{
					"remainingFraction": 1.0,
				},
			},
		},
	}

	q := ParseQuota(data)
	if q == nil {
		t.Fatal("expected non-nil QuotaData")
	}

	var claude, pro, flash *QuotaFamily
	for i := range q.Families {
		switch q.Families[i].Name {
		case "claude":
			claude = &q.Families[i]
		case "pro":
			pro = &q.Families[i]
		case "flash":
			flash = &q.Families[i]
		}
	}

	if claude == nil || claude.Percent != 100 {
		t.Fatalf("expected Claude at 100%%, got: %+v", claude)
	}
	if pro == nil || pro.Percent != 0 {
		t.Fatalf("expected Gemini Pro at 0%%, got: %+v", pro)
	}
	if flash == nil || flash.Percent != 0 {
		t.Fatalf("expected Gemini Flash at 0%% (ignoring tab_ autocomplete), got: %+v", flash)
	}
}
