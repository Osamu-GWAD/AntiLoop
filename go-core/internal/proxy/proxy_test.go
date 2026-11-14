package proxy

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/Osamu-GWAD/AntiLoop/internal/rotation"
	"github.com/Osamu-GWAD/AntiLoop/internal/storage"
)

type roundTripFunc func(*http.Request) (*http.Response, error)

func (f roundTripFunc) RoundTrip(r *http.Request) (*http.Response, error) { return f(r) }

func TestMain(m *testing.M) {
	// Quota refreshes must stay offline while the proxy exercises real account selection.
	http.DefaultTransport = roundTripFunc(func(*http.Request) (*http.Response, error) {
		return &http.Response{StatusCode: 200, Header: make(http.Header), Body: io.NopCloser(strings.NewReader(`{}`))}, nil
	})
	os.Exit(m.Run())
}

type trackedBody struct {
	io.Reader
	closed bool
}

func (b *trackedBody) Close() error { b.closed = true; return nil }
func (b *trackedBody) Read(p []byte) (int, error) {
	if b.closed {
		return 0, io.ErrClosedPipe
	}
	return b.Reader.Read(p)
}

func TestFinalUpstreamErrorBodyRemainsReadable(t *testing.T) {
	for _, status := range []int{429, 503} {
		t.Run(http.StatusText(status), func(t *testing.T) {
			s := NewServer(t.TempDir(), rotation.NewManager(nil), nil)
			s.SetMaxRetries(2)
			var bodies []*trackedBody
			s.client.Transport = roundTripFunc(func(*http.Request) (*http.Response, error) {
				body := &trackedBody{Reader: strings.NewReader(`{"error":"quota or service unavailable"}`)}
				bodies = append(bodies, body)
				return &http.Response{StatusCode: status, Header: http.Header{"Content-Type": {"application/json"}}, Body: body}, nil
			})
			r := httptest.NewRequest("POST", "/v1internal:generateContent", strings.NewReader(`{}`))
			r.Header.Set("Authorization", "Bearer ide-token")
			w := httptest.NewRecorder()
			s.ServeHTTP(w, r)
			if w.Code != status || !strings.Contains(w.Body.String(), "quota or service unavailable") {
				t.Fatalf("upstream error was lost: %d %s", w.Code, w.Body.String())
			}
			for _, b := range bodies {
				if !b.closed {
					t.Error("response body leaked")
				}
			}
		})
	}
}

func TestRetryStopsWhenRequestIsCancelled(t *testing.T) {
	s := NewServer(t.TempDir(), rotation.NewManager(nil), nil)
	s.SetMaxRetries(3)
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	calls := 0
	s.client.Transport = roundTripFunc(func(*http.Request) (*http.Response, error) {
		calls++
		return &http.Response{StatusCode: 503, Header: make(http.Header), Body: io.NopCloser(strings.NewReader("retry"))}, nil
	})
	s.SetOnRetry(func(int, int, int) { cancel() })
	r := httptest.NewRequest("POST", "/v1internal:generateContent", strings.NewReader(`{}`)).WithContext(ctx)
	r.Header.Set("Authorization", "Bearer ide-token")
	s.ServeHTTP(httptest.NewRecorder(), r)
	if calls != 1 {
		t.Fatalf("cancelled request retried %d times", calls)
	}
}

func TestRetryBodyUsesSelectedAccountProjectAndCredits(t *testing.T) {
	original := []byte(`{"project":"old-project","useAiCredits":true,"request":{"contents":[{"role":"user"}]}}`)
	var body map[string]any
	if err := json.Unmarshal(rewriteAccountBody(original, &storage.Account{ProjectID: "next-project"}), &body); err != nil {
		t.Fatal(err)
	}
	if body["project"] != "next-project" || body["useAiCredits"] != false || body["request"] == nil {
		t.Fatalf("old account settings survived: %v", body)
	}
	json.Unmarshal(rewriteAccountBody(original, &storage.Account{}), &body)
	if strings.Contains(string(rewriteAccountBody(original, &storage.Account{})), "old-project") {
		t.Fatal("unknown project reused previous account's project")
	}
}

func TestConcurrentRateLimitsRetryWithOneCoherentNewAccount(t *testing.T) {
	home := t.TempDir()
	t.Setenv("HOME", home)
	t.Setenv("USERPROFILE", home)
	db, err := storage.Open(t.TempDir())
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	var accounts []*storage.Account
	for _, name := range []string{"a", "b", "c"} {
		a, err := db.AddAccount(name+"@example.com", "refresh-"+name, "included", "pro", 0)
		if err != nil {
			t.Fatal(err)
		}
		db.UpdateAccountToken(a.ID, name, time.Now().Add(time.Hour).UTC().Format(time.RFC3339))
		db.UpdateAccountProject(a.ID, "project-"+name)
		accounts = append(accounts, a)
	}
	db.UpdateAccountUseAICredits(accounts[0].ID, true)
	rot := rotation.NewManager(db)
	if _, err := rot.SelectAccount(accounts[0].ID); err != nil {
		t.Fatal(err)
	}
	rot.Enable()
	s := NewServer(t.TempDir(), rot, db)
	s.SetMaxRetries(2)
	const concurrent = 8
	var arrived atomic.Int32
	release := make(chan struct{})
	s.client.Transport = roundTripFunc(func(req *http.Request) (*http.Response, error) {
		var data map[string]any
		json.NewDecoder(req.Body).Decode(&data)
		status := 200
		switch req.Header.Get("Authorization") {
		case "Bearer a":
			if data["project"] != "project-a" || data["useAiCredits"] != true {
				t.Error("initial account metadata mismatch")
			}
			if arrived.Add(1) == concurrent {
				close(release)
			}
			select {
			case <-release:
			case <-time.After(2 * time.Second):
				t.Error("requests did not reach rate limit barrier")
			}
			status = 429
		case "Bearer b":
			if data["project"] != "project-b" || data["useAiCredits"] != false {
				t.Error("retry retained previous account metadata")
			}
		default:
			t.Errorf("healthy account skipped: %s", req.Header.Get("Authorization"))
		}
		return &http.Response{StatusCode: status, Header: make(http.Header), Body: io.NopCloser(strings.NewReader(`{"result":"ok"}`))}, nil
	})
	var wg sync.WaitGroup
	for i := 0; i < concurrent; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			r := httptest.NewRequest("POST", "/v1internal:generateContent", strings.NewReader(`{"project":"original","useAiCredits":true}`))
			w := httptest.NewRecorder()
			s.ServeHTTP(w, r)
			if w.Code != 200 {
				t.Errorf("request failed after switching: %d %s", w.Code, w.Body.String())
			}
		}()
	}
	wg.Wait()
	if rot.CurrentAccountID() != accounts[1].ID {
		t.Fatal("concurrent failures skipped the next account")
	}
}
