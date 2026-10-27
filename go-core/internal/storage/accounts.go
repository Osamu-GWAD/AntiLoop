package storage

import (
	"database/sql"
	"fmt"
	"time"
)

type Account struct {
	ID              int64  `json:"id"`
	Email           string `json:"email"`
	Alias           string `json:"alias"`
	Status          string `json:"status"`
	Tier            string `json:"tier"`
	UseAICredits    bool   `json:"use_ai_credits"`
	AccessToken     string `json:"-"`
	RefreshToken    string `json:"-"`
	TokenExpiresAt  string `json:"token_expires_at,omitempty"`
	ProjectID       string `json:"project_id,omitempty"`
	ModelsJSON      string `json:"models_json,omitempty"`
	ModelsFetchedAt string `json:"models_fetched_at,omitempty"`
	CodeAssistJSON  string `json:"codeassist_json,omitempty"`
	SortOrder       int    `json:"sort_order"`
	CreatedAt       string `json:"created_at"`
	UpdatedAt       string `json:"updated_at"`
}

func (d *DB) CountAccounts() (int, error) {
	d.mu.RLock()
	defer d.mu.RUnlock()

	var count int
	err := d.db.QueryRow("SELECT COUNT(*) FROM accounts").Scan(&count)
	return count, err
}

func (d *DB) ListAccounts() ([]*Account, error) {
	d.mu.RLock()
	defer d.mu.RUnlock()

	rows, err := d.db.Query(`
		SELECT id, email, COALESCE(alias,''), status, tier, use_ai_credits, sort_order,
		       access_token, refresh_token, token_expires_at, project_id, models_json,
		       models_fetched_at, created_at, updated_at
		FROM accounts
		ORDER BY sort_order ASC, id ASC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var accounts []*Account
	for rows.Next() {
		var a Account
		var encAccess, encRefresh string
		var useCredits int
		if err := rows.Scan(
			&a.ID, &a.Email, &a.Alias, &a.Status, &a.Tier, &useCredits, &a.SortOrder,
			&encAccess, &encRefresh, &a.TokenExpiresAt, &a.ProjectID, &a.ModelsJSON,
			&a.ModelsFetchedAt, &a.CreatedAt, &a.UpdatedAt,
		); err != nil {
			return nil, err
		}
		a.UseAICredits = (useCredits != 0)
		a.AccessToken, _ = d.Decrypt(encAccess)
		a.RefreshToken, _ = d.Decrypt(encRefresh)
		accounts = append(accounts, &a)
	}
	return accounts, nil
}

func (d *DB) GetActiveAccounts() ([]*Account, error) {
	all, err := d.ListAccounts()
	if err != nil {
		return nil, err
	}
	var active []*Account
	for _, a := range all {
		if a.Status == "active" || a.Status == "included" {
			active = append(active, a)
		}
	}
	return active, nil
}

func (d *DB) GetAccount(id int64) (*Account, error) {
	d.mu.RLock()
	defer d.mu.RUnlock()

	var a Account
	var encAccess, encRefresh string
	var useCredits int
	err := d.db.QueryRow(`
		SELECT id, email, COALESCE(alias,''), status, tier, use_ai_credits, sort_order,
		       access_token, refresh_token, token_expires_at, project_id, models_json,
		       models_fetched_at, created_at, updated_at
		FROM accounts WHERE id = ?
	`, id).Scan(
		&a.ID, &a.Email, &a.Alias, &a.Status, &a.Tier, &useCredits, &a.SortOrder,
		&encAccess, &encRefresh, &a.TokenExpiresAt, &a.ProjectID, &a.ModelsJSON,
		&a.ModelsFetchedAt, &a.CreatedAt, &a.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, ErrAccountNotFound
	}
	if err != nil {
		return nil, err
	}

	a.UseAICredits = (useCredits != 0)
	a.AccessToken, _ = d.Decrypt(encAccess)
	a.RefreshToken, _ = d.Decrypt(encRefresh)
	return &a, nil
}

func (d *DB) GetAccountByEmail(email string) (*Account, error) {
	d.mu.RLock()
	defer d.mu.RUnlock()

	var a Account
	var encAccess, encRefresh string
	var useCredits int
	err := d.db.QueryRow(`
		SELECT id, email, COALESCE(alias,''), status, tier, use_ai_credits, sort_order,
		       access_token, refresh_token, token_expires_at, project_id, models_json,
		       models_fetched_at, created_at, updated_at
		FROM accounts WHERE email = ?
	`, email).Scan(
		&a.ID, &a.Email, &a.Alias, &a.Status, &a.Tier, &useCredits, &a.SortOrder,
		&encAccess, &encRefresh, &a.TokenExpiresAt, &a.ProjectID, &a.ModelsJSON,
		&a.ModelsFetchedAt, &a.CreatedAt, &a.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, ErrAccountNotFound
	}
	if err != nil {
		return nil, err
	}

	a.UseAICredits = (useCredits != 0)
	a.AccessToken, _ = d.Decrypt(encAccess)
	a.RefreshToken, _ = d.Decrypt(encRefresh)
	return &a, nil
}

func (d *DB) AddAccount(email, refreshToken, status, tier string, sortOrder int) (*Account, error) {
	d.mu.Lock()
	defer d.mu.Unlock()

	encRefresh, err := d.Encrypt(refreshToken)
	if err != nil {
		return nil, fmt.Errorf("encrypt refresh token: %w", err)
	}

	if status == "" {
		status = "included"
	}
	if tier == "" {
		tier = "unknown"
	}
	now := time.Now().UTC().Format(time.RFC3339)

	if sortOrder <= 0 {
		var maxOrder int
		_ = d.db.QueryRow("SELECT COALESCE(MAX(sort_order), 0) + 1 FROM accounts").Scan(&maxOrder)
		sortOrder = maxOrder
	}

	res, err := d.db.Exec(`
		INSERT INTO accounts (email, refresh_token, status, tier, sort_order, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?)
		ON CONFLICT(email) DO UPDATE SET
			refresh_token = excluded.refresh_token,
			status = excluded.status,
			updated_at = excluded.updated_at
	`, email, encRefresh, status, tier, sortOrder, now, now)
	if err != nil {
		return nil, err
	}

	id, _ := res.LastInsertId()
	if id == 0 {

		var existingId int64
		_ = d.db.QueryRow("SELECT id FROM accounts WHERE email = ?", email).Scan(&existingId)
		id = existingId
	}

	return &Account{
		ID:           id,
		Email:        email,
		Status:       status,
		Tier:         tier,
		RefreshToken: refreshToken,
		SortOrder:    sortOrder,
		CreatedAt:    now,
		UpdatedAt:    now,
	}, nil
}

func (d *DB) UpdateAccountToken(id int64, accessToken, expiresAt string) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	encAccess, err := d.Encrypt(accessToken)
	if err != nil {
		return err
	}

	now := time.Now().UTC().Format(time.RFC3339)
	_, err = d.db.Exec(`
		UPDATE accounts
		SET access_token = ?, token_expires_at = ?, updated_at = ?
		WHERE id = ?
	`, encAccess, expiresAt, now, id)
	return err
}

func (d *DB) UpdateAccountTier(id int64, tier string) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	now := time.Now().UTC().Format(time.RFC3339)
	_, err := d.db.Exec("UPDATE accounts SET tier = ?, updated_at = ? WHERE id = ?", tier, now, id)
	return err
}

func (d *DB) UpdateAccountProject(id int64, projectID string) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	now := time.Now().UTC().Format(time.RFC3339)
	_, err := d.db.Exec("UPDATE accounts SET project_id = ?, updated_at = ? WHERE id = ?", projectID, now, id)
	return err
}

func (d *DB) UpdateAccountModels(id int64, modelsJSON string) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	now := time.Now().UTC().Format(time.RFC3339)
	_, err := d.db.Exec(`
		UPDATE accounts
		SET models_json = ?, models_fetched_at = ?, updated_at = ?
		WHERE id = ?
	`, modelsJSON, now, now, id)
	return err
}

func (d *DB) UpdateAccountAlias(id int64, alias string) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	now := time.Now().UTC().Format(time.RFC3339)
	_, err := d.db.Exec("UPDATE accounts SET alias = ?, updated_at = ? WHERE id = ?", alias, now, id)
	return err
}

func (d *DB) UpdateAccountUseAICredits(id int64, useAICredits bool) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	credits := 0
	if useAICredits {
		credits = 1
	}
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := d.db.Exec("UPDATE accounts SET use_ai_credits = ?, updated_at = ? WHERE id = ?", credits, now, id)
	return err
}

func (d *DB) UpdateAccountStatus(id int64, status string) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	now := time.Now().UTC().Format(time.RFC3339)
	_, err := d.db.Exec("UPDATE accounts SET status = ?, updated_at = ? WHERE id = ?", status, now, id)
	return err
}

func (d *DB) SwapAccountOrder(id1, id2 int64) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	var order1, order2 int
	if err := d.db.QueryRow("SELECT sort_order FROM accounts WHERE id = ?", id1).Scan(&order1); err != nil {
		return err
	}
	if err := d.db.QueryRow("SELECT sort_order FROM accounts WHERE id = ?", id2).Scan(&order2); err != nil {
		return err
	}

	tx, err := d.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	if _, err := tx.Exec("UPDATE accounts SET sort_order = ? WHERE id = ?", order2, id1); err != nil {
		return err
	}
	if _, err := tx.Exec("UPDATE accounts SET sort_order = ? WHERE id = ?", order1, id2); err != nil {
		return err
	}
	return tx.Commit()
}

func (d *DB) RemoveAccount(id int64) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	_, err := d.db.Exec("DELETE FROM accounts WHERE id = ?", id)
	return err
}
