package storage

import (
	"database/sql"
	"encoding/json"
	"time"
)

type Provider struct {
	ID               int64  `json:"id"`
	Name             string `json:"name"`
	APIType          string `json:"api_type"`
	BaseURL          string `json:"base_url"`
	APIKey           string `json:"-"`
	ModelID          string `json:"model_id"`
	Enabled          bool   `json:"enabled"`
	ExtraHeaders     string `json:"extra_headers"`
	ExtraParams      string `json:"extra_params"`
	MaxContextTokens int    `json:"max_context_tokens"`
	MaxOutputTokens  int    `json:"max_output_tokens"`
	SortOrder        int    `json:"sort_order"`
	CreatedAt        string `json:"created_at"`
	UpdatedAt        string `json:"updated_at"`
}

func (p *Provider) MarshalJSON() ([]byte, error) {
	type Alias Provider
	return json.Marshal(&struct {
		*Alias
		APITypeCamel          string `json:"apiType"`
		BaseURLCamel          string `json:"baseUrl"`
		ModelIDCamel          string `json:"modelId"`
		ExtraHeadersCamel     string `json:"extraHeaders,omitempty"`
		ExtraParamsCamel      string `json:"extraParams,omitempty"`
		MaxContextTokensCamel int    `json:"maxContextTokens,omitempty"`
		MaxOutputTokensCamel  int    `json:"maxOutputTokens,omitempty"`
		SortOrderCamel        int    `json:"sortOrder,omitempty"`
		CreatedAtCamel        string `json:"createdAt,omitempty"`
		UpdatedAtCamel        string `json:"updatedAt,omitempty"`
	}{
		Alias:                 (*Alias)(p),
		APITypeCamel:          p.APIType,
		BaseURLCamel:          p.BaseURL,
		ModelIDCamel:          p.ModelID,
		ExtraHeadersCamel:     p.ExtraHeaders,
		ExtraParamsCamel:      p.ExtraParams,
		MaxContextTokensCamel: p.MaxContextTokens,
		MaxOutputTokensCamel:  p.MaxOutputTokens,
		SortOrderCamel:        p.SortOrder,
		CreatedAtCamel:        p.CreatedAt,
		UpdatedAtCamel:        p.UpdatedAt,
	})
}

func (d *DB) ListProviders() ([]*Provider, error) {
	d.mu.RLock()
	defer d.mu.RUnlock()

	rows, err := d.db.Query(`
		SELECT id, name, api_type, base_url, api_key, model_id, enabled,
		       extra_headers, extra_params, max_context_tokens, max_output_tokens,
		       sort_order, created_at, updated_at
		FROM providers
		ORDER BY sort_order ASC, id ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var providers []*Provider
	for rows.Next() {
		var p Provider
		var encKey string
		var enabledInt int
		if err := rows.Scan(
			&p.ID, &p.Name, &p.APIType, &p.BaseURL, &encKey, &p.ModelID, &enabledInt,
			&p.ExtraHeaders, &p.ExtraParams, &p.MaxContextTokens, &p.MaxOutputTokens,
			&p.SortOrder, &p.CreatedAt, &p.UpdatedAt,
		); err != nil {
			return nil, err
		}
		p.Enabled = (enabledInt != 0)
		p.APIKey, _ = d.Decrypt(encKey)
		providers = append(providers, &p)
	}
	return providers, nil
}

func (d *DB) GetProviderWithKey(id int64) (*Provider, error) {
	d.mu.RLock()
	defer d.mu.RUnlock()

	var p Provider
	var encKey string
	var enabledInt int
	err := d.db.QueryRow(`
		SELECT id, name, api_type, base_url, api_key, model_id, enabled,
		       extra_headers, extra_params, max_context_tokens, max_output_tokens,
		       sort_order, created_at, updated_at
		FROM providers WHERE id = ?
	`, id).Scan(
		&p.ID, &p.Name, &p.APIType, &p.BaseURL, &encKey, &p.ModelID, &enabledInt,
		&p.ExtraHeaders, &p.ExtraParams, &p.MaxContextTokens, &p.MaxOutputTokens,
		&p.SortOrder, &p.CreatedAt, &p.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, ErrProviderNotFound
	}
	if err != nil {
		return nil, err
	}
	p.Enabled = (enabledInt != 0)
	p.APIKey, _ = d.Decrypt(encKey)
	return &p, nil
}

func (d *DB) AddProvider(
	name, apiType, baseURL, apiKey, modelId string,
	extraHeaders, extraParams string,
	maxContextTokens, maxOutputTokens int,
) (*Provider, error) {
	d.mu.Lock()
	defer d.mu.Unlock()

	encKey, _ := d.Encrypt(apiKey)
	if apiType == "" {
		apiType = "openai_chat"
	}
	if maxContextTokens <= 0 {
		maxContextTokens = 200000
	}
	if maxOutputTokens <= 0 {
		maxOutputTokens = 64000
	}
	if extraHeaders == "" {
		extraHeaders = "{}"
	}
	if extraParams == "" {
		extraParams = "{}"
	}

	var maxOrder int
	_ = d.db.QueryRow("SELECT COALESCE(MAX(sort_order), 0) + 1 FROM providers").Scan(&maxOrder)

	now := time.Now().UTC().Format(time.RFC3339)
	res, err := d.db.Exec(`
		INSERT INTO providers (name, api_type, base_url, api_key, model_id, enabled, extra_headers, extra_params, max_context_tokens, max_output_tokens, sort_order, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)
	`, name, apiType, baseURL, encKey, modelId, extraHeaders, extraParams, maxContextTokens, maxOutputTokens, maxOrder, now, now)
	if err != nil {
		return nil, err
	}

	id, _ := res.LastInsertId()
	return &Provider{
		ID:               id,
		Name:             name,
		APIType:          apiType,
		BaseURL:          baseURL,
		APIKey:           apiKey,
		ModelID:          modelId,
		Enabled:          true,
		ExtraHeaders:     extraHeaders,
		ExtraParams:      extraParams,
		MaxContextTokens: maxContextTokens,
		MaxOutputTokens:  maxOutputTokens,
		SortOrder:        maxOrder,
		CreatedAt:        now,
		UpdatedAt:        now,
	}, nil
}

func (d *DB) UpdateProvider(
	id int64, name, apiType, baseURL, apiKey, modelId string,
	extraHeaders, extraParams string,
	maxContextTokens, maxOutputTokens int,
) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	now := time.Now().UTC().Format(time.RFC3339)
	if apiKey != "" {
		encKey, _ := d.Encrypt(apiKey)
		_, err := d.db.Exec(`
			UPDATE providers
			SET name = ?, api_type = ?, base_url = ?, api_key = ?, model_id = ?,
			    extra_headers = ?, extra_params = ?, max_context_tokens = ?, max_output_tokens = ?,
			    updated_at = ?
			WHERE id = ?
		`, name, apiType, baseURL, encKey, modelId, extraHeaders, extraParams, maxContextTokens, maxOutputTokens, now, id)
		return err
	}

	_, err := d.db.Exec(`
		UPDATE providers
		SET name = ?, api_type = ?, base_url = ?, model_id = ?,
		    extra_headers = ?, extra_params = ?, max_context_tokens = ?, max_output_tokens = ?,
		    updated_at = ?
		WHERE id = ?
	`, name, apiType, baseURL, modelId, extraHeaders, extraParams, maxContextTokens, maxOutputTokens, now, id)
	return err
}

func (d *DB) ToggleProviderEnabled(id int64, enabled bool) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	enInt := 0
	if enabled {
		enInt = 1
	}
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := d.db.Exec("UPDATE providers SET enabled = ?, updated_at = ? WHERE id = ?", enInt, now, id)
	return err
}

func (d *DB) RemoveProvider(id int64) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	_, err := d.db.Exec("DELETE FROM providers WHERE id = ?", id)
	return err
}
