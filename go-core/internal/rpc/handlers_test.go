package rpc

import (
	"encoding/json"
	"testing"

	"github.com/Osamu-GWAD/AntiLoop/internal/proxy"
	"github.com/Osamu-GWAD/AntiLoop/internal/rotation"
	"github.com/Osamu-GWAD/AntiLoop/internal/storage"
)

type testRegistrar map[string]func(json.RawMessage) (any, error)

func (r testRegistrar) RegisterHandler(method string, fn func(json.RawMessage) (any, error)) {
	r[method] = fn
}
func (r testRegistrar) RegisterMutation(method string, fn func(json.RawMessage) (any, error)) {
	r[method] = fn
}

func TestInvalidSelectionReturnsErrorAndKeepsActiveProvider(t *testing.T) {
	db, err := storage.Open(t.TempDir())
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	rot := rotation.NewManager(db)
	server := proxy.NewServer(t.TempDir(), rot, db)
	server.UpstreamRouter().SetActiveProvider(&storage.Provider{ID: 9, BaseURL: "https://example.com", ModelID: "model"})
	db.SetSetting("active_provider_id", "9")
	r := testRegistrar{}
	RegisterHandlers(r, &Context{DB: db, Rotation: rot, Proxy: server})
	for _, params := range []string{`{}`, `{"email":"missing@example.com"}`, `{"id":999}`, `invalid-json`} {
		if _, err := r["selectAccount"](json.RawMessage(params)); err == nil {
			t.Fatalf("invalid selection succeeded: %s", params)
		}
		if !server.UpstreamRouter().IsActive() || db.GetSettingDefault("active_provider_id", "") != "9" {
			t.Fatal("failed selection disabled the previous provider")
		}
	}
}

func TestMutationsNotifyOtherClientsOnlyAfterSuccess(t *testing.T) {
	db, err := storage.Open(t.TempDir())
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	rot := rotation.NewManager(db)
	ctx := &Context{DB: db, Rotation: rot, Proxy: proxy.NewServer(t.TempDir(), rot, db)}
	var notifications []string
	ctx.SetOnStateChanged(func(method string) { notifications = append(notifications, method) })
	r := testRegistrar{}
	RegisterHandlers(r, ctx)
	if _, err := r["selectAccount"](json.RawMessage(`{}`)); err == nil {
		t.Fatal("invalid selection succeeded")
	}
	if len(notifications) != 0 {
		t.Fatal("failed mutation announced a state change")
	}
	if _, err := r["selectProvider"](json.RawMessage(`{"id":0}`)); err != nil {
		t.Fatal(err)
	}
	if len(notifications) != 1 || notifications[0] != "selectProvider" {
		t.Fatal("successful selection was not broadcast")
	}
}
