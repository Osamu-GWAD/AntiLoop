package upstream

import (
	"sync"
	"testing"

	"github.com/Osamu-GWAD/AntiLoop/internal/storage"
)

func TestOpenAIMessagesArePreserved(t *testing.T) {
	parsed, err := ParseGeminiBody([]byte(`{"messages":[{"role":"user","content":"hello"}],"temperature":0.2,"max_tokens":64}`))
	if err != nil {
		t.Fatal(err)
	}
	if len(parsed.Messages) != 1 || parsed.Messages[0]["content"] != "hello" || parsed.MaxOutputTokens != 64 || parsed.Temperature != 0.2 {
		t.Fatalf("messages were lost: %+v", parsed)
	}
	if _, err := ParseGeminiBody([]byte(`{}`)); err == nil {
		t.Fatal("empty conversation accepted")
	}
}

func TestProviderSelectionUsesIndependentSnapshots(t *testing.T) {
	r := NewRouter()
	p := &storage.Provider{BaseURL: "https://example.com", ModelID: "model-a"}
	r.SetActiveProvider(p)
	p.ModelID = "changed"
	copy := r.ActiveProvider()
	copy.ModelID = "changed-again"
	if r.ActiveProvider().ModelID != "model-a" {
		t.Fatal("provider state shares mutable caller memory")
	}
	var wg sync.WaitGroup
	for i := 0; i < 16; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for j := 0; j < 50; j++ {
				r.SetActiveProvider(p)
				r.IsActive()
				r.ActiveProvider()
			}
		}()
	}
	wg.Wait()
}
