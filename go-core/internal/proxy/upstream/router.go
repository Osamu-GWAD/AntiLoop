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
			Timeout: 180 * time.Second,
		},
	}
}

func (r *Router) SetActiveProvider(p *storage.Provider) {
	r.activeProvider = p
}

func (r *Router) ActiveProvider() *storage.Provider {
	return r.activeProvider
}

func (r *Router) IsActive() bool {
	if r == nil {
		return false
	}
	p := r.activeProvider
	return p != nil && p.BaseURL != "" && p.ModelID != ""
}

type ContentItem struct {
	Role  string `json:"role"`
	Parts []struct {
		Text string `json:"text"`
	} `json:"parts"`
}

type SystemInst struct {
	Parts []struct {
		Text string `json:"text"`
	} `json:"parts"`
}

type GenConfig struct {
	Temperature     float64 `json:"temperature"`
	MaxOutputTokens int     `json:"maxOutputTokens"`
}

type ParsedGeminiRequest struct {
	Messages        []map[string]string
	SystemText      string
	Temperature     float64
	MaxOutputTokens int
	IsStream        bool
}

func ParseGeminiBody(body []byte) (*ParsedGeminiRequest, error) {
	if len(body) == 0 {
		return nil, fmt.Errorf("empty request body")
	}

	// Try standard or wrapped Gemini format
	var gReq struct {
		Contents          []ContentItem `json:"contents"`
		SystemInstruction SystemInst    `json:"systemInstruction"`
		GenerationConfig  GenConfig     `json:"generationConfig"`
		Request           struct {
			Contents          []ContentItem `json:"contents"`
			SystemInstruction SystemInst    `json:"systemInstruction"`
			GenerationConfig  GenConfig     `json:"generationConfig"`
		} `json:"request"`
	}

	if err := json.Unmarshal(body, &gReq); err != nil {
		// Fallback: check if it is already OpenAI messages format
		var oaiReq struct {
			Messages []map[string]string `json:"messages"`
		}
		if oaiErr := json.Unmarshal(body, &oaiReq); oaiErr == nil && len(oaiReq.Messages) > 0 {
			return &ParsedGeminiRequest{
				Messages: oaiReq.Messages,
				IsStream: true,
			}, nil
		}
		return nil, err
	}

	contents := gReq.Contents
	if len(contents) == 0 && len(gReq.Request.Contents) > 0 {
		contents = gReq.Request.Contents
	}

	systemParts := gReq.SystemInstruction.Parts
	if len(systemParts) == 0 && len(gReq.Request.SystemInstruction.Parts) > 0 {
		systemParts = gReq.Request.SystemInstruction.Parts
	}

	temp := gReq.GenerationConfig.Temperature
	if temp == 0 && gReq.Request.GenerationConfig.Temperature != 0 {
		temp = gReq.Request.GenerationConfig.Temperature
	}

	maxTokens := gReq.GenerationConfig.MaxOutputTokens
	if maxTokens == 0 && gReq.Request.GenerationConfig.MaxOutputTokens != 0 {
		maxTokens = gReq.Request.GenerationConfig.MaxOutputTokens
	}

	var sysText string
	for _, p := range systemParts {
		sysText += p.Text
	}

	var messages []map[string]string
	for _, c := range contents {
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
			messages = append(messages, map[string]string{"role": role, "content": text})
		}
	}

	return &ParsedGeminiRequest{
		Messages:        messages,
		SystemText:      sysText,
		Temperature:     temp,
		MaxOutputTokens: maxTokens,
		IsStream:        true,
	}, nil
}

func (r *Router) HandleRequest(w http.ResponseWriter, req *http.Request) {
	p := r.activeProvider
	if p == nil || p.BaseURL == "" || p.ModelID == "" {
		http.Error(w, "No active third-party provider configured", http.StatusBadGateway)
		return
	}

	body, err := io.ReadAll(req.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	parsed, err := ParseGeminiBody(body)
	if err != nil {
		applog.Printf("[upstream] request conversion error for %s: %v", req.URL.Path, err)
		http.Error(w, "Failed to parse request: "+err.Error(), http.StatusBadRequest)
		return
	}

	applog.Printf("[upstream] routing to %s (%s, model=%s)", p.Name, p.BaseURL, p.ModelID)

	isAnthropic := strings.EqualFold(p.APIType, "anthropic")
	var endpoint string
	var upReqBody []byte
	var isStream = true

	if isAnthropic {
		endpoint = strings.TrimRight(p.BaseURL, "/")
		if !strings.HasSuffix(endpoint, "/messages") {
			if strings.HasSuffix(endpoint, "/v1") {
				endpoint += "/messages"
			} else {
				endpoint += "/v1/messages"
			}
		}

		maxTokens := p.MaxOutputTokens
		if maxTokens <= 0 {
			maxTokens = parsed.MaxOutputTokens
		}
		if maxTokens <= 0 {
			maxTokens = 4096
		}

		var anthropicMsgs []map[string]string
		for _, m := range parsed.Messages {
			role := m["role"]
			if role == "system" {
				if parsed.SystemText == "" {
					parsed.SystemText = m["content"]
				} else {
					parsed.SystemText += "\n" + m["content"]
				}
				continue
			}
			anthropicMsgs = append(anthropicMsgs, m)
		}

		aReq := map[string]any{
			"model":      p.ModelID,
			"messages":   anthropicMsgs,
			"max_tokens": maxTokens,
			"stream":     true,
		}
		if parsed.SystemText != "" {
			aReq["system"] = parsed.SystemText
		}
		if parsed.Temperature > 0 {
			aReq["temperature"] = parsed.Temperature
		}
		upReqBody, _ = json.Marshal(aReq)
	} else {
		endpoint = strings.TrimRight(p.BaseURL, "/")
		if !strings.HasSuffix(endpoint, "/chat/completions") {
			if strings.HasSuffix(endpoint, "/v1") {
				endpoint += "/chat/completions"
			} else {
				endpoint += "/v1/chat/completions"
			}
		}

		var oaiMsgs []map[string]string
		if parsed.SystemText != "" {
			oaiMsgs = append(oaiMsgs, map[string]string{"role": "system", "content": parsed.SystemText})
		}
		oaiMsgs = append(oaiMsgs, parsed.Messages...)

		oReq := map[string]any{
			"model":    p.ModelID,
			"messages": oaiMsgs,
			"stream":   true,
		}
		if parsed.Temperature > 0 {
			oReq["temperature"] = parsed.Temperature
		}
		maxTokens := p.MaxOutputTokens
		if maxTokens <= 0 {
			maxTokens = parsed.MaxOutputTokens
		}
		if maxTokens > 0 {
			oReq["max_tokens"] = maxTokens
		}
		upReqBody, _ = json.Marshal(oReq)
	}

	upReq, err := http.NewRequestWithContext(req.Context(), "POST", endpoint, bytes.NewReader(upReqBody))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	upReq.Header.Set("Content-Type", "application/json")
	if isAnthropic {
		if p.APIKey != "" {
			upReq.Header.Set("x-api-key", p.APIKey)
		}
		upReq.Header.Set("anthropic-version", "2023-06-01")
	} else {
		if p.APIKey != "" {
			upReq.Header.Set("Authorization", "Bearer "+p.APIKey)
		}
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

	contentType := upResp.Header.Get("Content-Type")
	if isStream && (strings.Contains(contentType, "text/event-stream") || strings.Contains(contentType, "text/plain")) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		flusher, ok := w.(http.Flusher)
		reader := bufio.NewReader(upResp.Body)

		for {
			line, readErr := reader.ReadBytes('\n')
			if len(line) > 0 {
				lineTrimmed := bytes.TrimSpace(line)
				if bytes.HasPrefix(lineTrimmed, []byte("data: ")) {
					payload := bytes.TrimPrefix(lineTrimmed, []byte("data: "))
					if bytes.Equal(payload, []byte("[DONE]")) {
						break
					}

					var deltaText string
					var finishReason string

					if isAnthropic {
						var aChunk struct {
							Type  string `json:"type"`
							Delta struct {
								Type string `json:"type"`
								Text string `json:"text"`
							} `json:"delta"`
						}
						if json.Unmarshal(payload, &aChunk) == nil {
							if aChunk.Delta.Text != "" {
								deltaText = aChunk.Delta.Text
							}
							if aChunk.Type == "message_stop" {
								finishReason = "STOP"
							}
						}
					} else {
						var chunk struct {
							Choices []struct {
								Delta struct {
									Content string `json:"content"`
								} `json:"delta"`
								FinishReason *string `json:"finish_reason"`
							} `json:"choices"`
						}
						if json.Unmarshal(payload, &chunk) == nil && len(chunk.Choices) > 0 {
							deltaText = chunk.Choices[0].Delta.Content
							if chunk.Choices[0].FinishReason != nil {
								finishReason = *chunk.Choices[0].FinishReason
								if finishReason == "stop" {
									finishReason = "STOP"
								}
							}
						}
					}

					if deltaText != "" || finishReason != "" {
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
							"response": map[string]any{
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
			if readErr != nil {
				break
			}
		}
	} else {
		// Non-streaming response fallback
		respBody, _ := io.ReadAll(upResp.Body)
		var fullText string
		if isAnthropic {
			var aResp struct {
				Content []struct {
					Type string `json:"type"`
					Text string `json:"text"`
				} `json:"content"`
			}
			if json.Unmarshal(respBody, &aResp) == nil && len(aResp.Content) > 0 {
				fullText = aResp.Content[0].Text
			}
		} else {
			var oResp struct {
				Choices []struct {
					Message struct {
						Content string `json:"content"`
					} `json:"message"`
				} `json:"choices"`
			}
			if json.Unmarshal(respBody, &oResp) == nil && len(oResp.Choices) > 0 {
				fullText = oResp.Choices[0].Message.Content
			}
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		geminiResp := map[string]any{
			"candidates": []map[string]any{
				{
					"content": map[string]any{
						"role":  "model",
						"parts": []map[string]string{{"text": fullText}},
					},
					"finishReason": "STOP",
				},
			},
			"response": map[string]any{
				"candidates": []map[string]any{
					{
						"content": map[string]any{
							"role":  "model",
							"parts": []map[string]string{{"text": fullText}},
						},
						"finishReason": "STOP",
					},
				},
			},
		}
		_ = json.NewEncoder(w).Encode(geminiResp)
	}
}
