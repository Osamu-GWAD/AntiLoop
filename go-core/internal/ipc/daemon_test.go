package ipc

import (
	"encoding/json"
	"net"
	"testing"
	"time"
)

func TestLongRequestDoesNotBlockSelectionOrCancellation(t *testing.T) {
	d := NewDaemon(t.TempDir())
	started, release := make(chan struct{}), make(chan struct{})
	d.RegisterHandler("addAccount", func(json.RawMessage) (any, error) {
		close(started)
		<-release
		return true, nil
	})
	d.RegisterMutation("selectAccount", func(json.RawMessage) (any, error) { return "switched", nil })
	d.RegisterHandler("cancelAddAccount", func(json.RawMessage) (any, error) { return "cancelled", nil })
	server, client := net.Pipe()
	defer client.Close()
	defer close(release)
	go d.handleClient(&Client{conn: server})
	client.SetDeadline(time.Now().Add(2 * time.Second))
	enc, dec := json.NewEncoder(client), json.NewDecoder(client)
	if err := enc.Encode(map[string]any{"id": 1, "method": "addAccount"}); err != nil {
		t.Fatal(err)
	}
	<-started
	for i, method := range []string{"selectAccount", "cancelAddAccount"} {
		if err := enc.Encode(map[string]any{"id": i + 2, "method": method}); err != nil {
			t.Fatal(err)
		}
		var resp Response
		if err := dec.Decode(&resp); err != nil {
			t.Fatalf("%s blocked behind login: %v", method, err)
		}
		if resp.ID == nil || *resp.ID != int64(i+2) || resp.Error != nil {
			t.Fatalf("unexpected response: %+v", resp)
		}
	}
}

func TestMutationsKeepArrivalOrder(t *testing.T) {
	d := NewDaemon(t.TempDir())
	started, release := make(chan struct{}), make(chan struct{})
	d.RegisterMutation("first", func(json.RawMessage) (any, error) { close(started); <-release; return true, nil })
	d.RegisterMutation("second", func(json.RawMessage) (any, error) { return true, nil })
	server, client := net.Pipe()
	defer client.Close()
	go d.handleClient(&Client{conn: server})
	client.SetDeadline(time.Now().Add(2 * time.Second))
	enc, dec := json.NewEncoder(client), json.NewDecoder(client)
	enc.Encode(map[string]any{"id": 1, "method": "first"})
	<-started
	enc.Encode(map[string]any{"id": 2, "method": "second"})
	close(release)
	for _, expected := range []int64{1, 2} {
		var resp Response
		if err := dec.Decode(&resp); err != nil {
			t.Fatal(err)
		}
		if resp.ID == nil || *resp.ID != expected {
			t.Fatalf("mutation order changed: %+v", resp)
		}
	}
}
