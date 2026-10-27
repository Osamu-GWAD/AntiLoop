package upstream

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/Osamu-GWAD/AntiLoop/internal/applog"
	"github.com/Osamu-GWAD/AntiLoop/internal/storage"
)

type Router struct {
	activeProvider *storage.Provider
	client         *http.Client
}

func NewRouter() *Router {
	return &Router{
		client: &http.Client{
			Timeout: 120 * time.Second,
		},
	}
}

func (r *Router) SetActiveProvider(p *storage.Provider) {
	r.activeProvider = p
}

func (r *Router) ActiveProvider() *storage.Provider {
	return r.activeProvider
}

func ConvertRequestToOpenAI(geminiBody []byte, modelID string) ([]byte, bool, error) {
	var gReq struct {
		Contents []struct {
			Role  string `json:"role"`
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		} `json:"contents"`
		SystemInstruction struct {
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		} `json:"systemInstruction"`
		GenerationConfig struct {
			Temperature     float64 `json:"temperature"`
			MaxOutputTokens int     `json:"maxOutputTokens"`
		} `json:"generationConfig"`
	}

	if err := json.Unmarshal(geminiBody, &gReq); err != nil {
		return nil, false, err
	}

	type Message struct {
		Role    string `json:"role"`
		Content string `json:"content"`
	}

	var messages []Message

	var sysText string
	for _, p := range gReq.SystemInstruction.Parts {
		sysText += p.Text
	}
	if sysText != "" {
		messages = append(messages, Message{Role: "system", Content: sysText})
	}

	for _, c := range gReq.Contents {
		role := c.Role
		if role == "model" {
			role = "assistant"
		} else if role == "" || role == "user" {
			role = "user"
		}

		var text string
		for _, p := range c.Parts {
			text += p.Text
		}
		if text != "" {
			messages = append(messages, Message{Role: role, Content: text})
		}
	}

	oReq := map[string]any{
		"model":    modelID,
		"messages": messages,
		"stream":   true,
	}

	if gReq.GenerationConfig.Temperature > 0 {
		oReq["temperature"] = gReq.GenerationConfig.Temperature
	}
	if gReq.GenerationConfig.MaxOutputTokens > 0 {
		oReq["max_tokens"] = gReq.GenerationConfig.MaxOutputTokens
	}

	out, err := json.Marshal(oReq)
	return out, true, err
}

func (r *Router) HandleRequest(w http.ResponseWriter, req *http.Request) {
	p := r.activeProvider
	if p == nil {
		http.Error(w, "No active third-party provider configured", http.StatusBadGateway)
		return
	}

	body, err := io.ReadAll(req.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	applog.Printf("[upstream] routing to %s (%s, model=%s)", p.Name, p.BaseURL, p.ModelID)

	oBody, isStream, err := ConvertRequestToOpenAI(body, p.ModelID)
	if err != nil {
		applog.Printf("[upstream] request conversion error: %v", err)
		http.Error(w, "Failed to convert Gemini request to provider format: "+err.Error(), http.StatusBadRequest)
		return
	}

	endpoint := strings.TrimRight(p.BaseURL, "/")
	if !strings.HasSuffix(endpoint, "/chat/completions") {
		if strings.HasSuffix(endpoint, "/v1") {
			endpoint += "/chat/completions"
		} else {
			endpoint += "/v1/chat/completions"
		}
	}

	upReq, err := http.NewRequestWithContext(req.Context(), "POST", endpoint, bytes.NewReader(oBody))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	upReq.Header.Set("Content-Type", "application/json")
	if p.APIKey != "" {
		upReq.Header.Set("Authorization", "Bearer "+p.APIKey)
	}

	if p.ExtraHeaders != "" && p.ExtraHeaders != "{}" {
		var hdrs map[string]string
		if err := json.Unmarshal([]byte(p.ExtraHeaders), &hdrs); err == nil {
			for k, v := range hdrs {
				upReq.Header.Set(k, v)
			}
		}
	}

	upResp, err := r.client.Do(upReq)
	if err != nil {
		applog.Printf("[upstream] request error: %v", err)
		http.Error(w, "Provider request failed: "+err.Error(), http.StatusBadGateway)
		return
	}
	defer upResp.Body.Close()

	if upResp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(upResp.Body)
		applog.Printf("[upstream] provider returned status %d: %s", upResp.StatusCode, string(respBody))
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(upResp.StatusCode)
		w.Write(respBody)
		return
	}

	if isStream {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")

		flusher, ok := w.(http.Flusher)
		reader := bufio.NewReader(upResp.Body)

		for {
			line, err := reader.ReadBytes('\n')
			if err != nil {
				break
			}
			line = bytes.TrimSpace(line)
			if !bytes.HasPrefix(line, []byte("data: ")) {
				continue
			}

			payload := bytes.TrimPrefix(line, []byte("data: "))
			if bytes.Equal(payload, []byte("[DONE]")) {
				break
			}

			var chunk struct {
				Choices []struct {
					Delta struct {
						Content string `json:"content"`
					} `json:"delta"`
					FinishReason *string `json:"finish_reason"`
				} `json:"choices"`
			}

			if err := json.Unmarshal(payload, &chunk); err == nil && len(chunk.Choices) > 0 {
				deltaText := chunk.Choices[0].Delta.Content
				var finishReason string
				if chunk.Choices[0].FinishReason != nil {
					finishReason = *chunk.Choices[0].FinishReason
					if finishReason == "stop" {
						finishReason = "STOP"
					}
				}

				geminiChunk := map[string]any{
					"candidates": []map[string]any{
						{
							"content": map[string]any{
								"role": "model",
								"parts": []map[string]string{
									{"text": deltaText},
								},
							},
							"finishReason": finishReason,
						},
					},
				}

				chunkBytes, _ := json.Marshal(geminiChunk)
				fmt.Fprintf(w, "data: %s\n\n", string(chunkBytes))
				if ok {
					flusher.Flush()
				}
			}
		}
	}
}
