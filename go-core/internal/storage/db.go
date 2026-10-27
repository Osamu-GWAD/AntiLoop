package storage

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sync"

	"github.com/Osamu-GWAD/AntiLoop/internal/applog"
	_ "modernc.org/sqlite"
)

var (
	ErrAccountNotFound  = errors.New("account not found")
	ErrProviderNotFound = errors.New("provider not found")
)

type DB struct {
	db   *sql.DB
	path string
	gcm  cipher.AEAD
	mu   sync.RWMutex
}

func computeDBKey() string {
	raw, _ := hex.DecodeString("7a2f91b344e80cd715a63bf08259ce4de3681fb497205caa06d173ef48bc9532")
	h1 := sha256.Sum256(raw)
	h2 := sha256.Sum256(h1[:])
	h3 := sha256.Sum256(h2[:])
	return hex.EncodeToString(h3[:])
}

func initCipher() (cipher.AEAD, error) {
	keyHex := computeDBKey()
	keyBytes, err := hex.DecodeString(keyHex)
	if err != nil {
		return nil, fmt.Errorf("decode key: %w", err)
	}
	block, err := aes.NewCipher(keyBytes)
	if err != nil {
		return nil, fmt.Errorf("new cipher: %w", err)
	}
	return cipher.NewGCM(block)
}

func Open(storagePath string) (*DB, error) {
	if err := os.MkdirAll(storagePath, 0700); err != nil {
		return nil, fmt.Errorf("create storage dir: %w", err)
	}

	dbPath := filepath.Join(storagePath, "antiloop.db")
	sqlDB, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, fmt.Errorf("open sqlite: %w", err)
	}

	sqlDB.SetMaxOpenConns(1)

	gcm, err := initCipher()
	if err != nil {
		sqlDB.Close()
		return nil, fmt.Errorf("init cipher: %w", err)
	}

	db := &DB{
		db:   sqlDB,
		path: dbPath,
		gcm:  gcm,
	}

	if err := db.migrate(); err != nil {
		sqlDB.Close()
		return nil, fmt.Errorf("migrate: %w", err)
	}

	return db, nil
}

func (d *DB) Close() error {
	return d.db.Close()
}

func (d *DB) Encrypt(plaintext string) (string, error) {
	if plaintext == "" {
		return "", nil
	}
	nonce := make([]byte, d.gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}
	ciphertext := d.gcm.Seal(nonce, nonce, []byte(plaintext), nil)
	return base64.StdEncoding.EncodeToString(ciphertext), nil
}

func (d *DB) Decrypt(encoded string) (string, error) {
	if encoded == "" {
		return "", nil
	}
	data, err := base64.StdEncoding.DecodeString(encoded)
	if err != nil {
		applog.Printf("[storage] WARNING: Decrypt: invalid base64 (len=%d): %v", len(encoded), err)
		return "", err
	}
	nonceSize := d.gcm.NonceSize()
	if len(data) < nonceSize {
		return "", errors.New("ciphertext too short")
	}
	nonce, ciphertext := data[:nonceSize], data[nonceSize:]
	plaintext, err := d.gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}
	return string(plaintext), nil
}

func (d *DB) migrate() error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS accounts (
			id            INTEGER PRIMARY KEY AUTOINCREMENT,
			email         TEXT    NOT NULL UNIQUE,
			status        TEXT    NOT NULL DEFAULT 'included',
			refresh_token TEXT    NOT NULL,
			created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
			updated_at    TEXT    NOT NULL DEFAULT (datetime('now')),
			tier          TEXT    NOT NULL DEFAULT 'unknown',
			access_token  TEXT    NOT NULL DEFAULT '',
			token_expires_at TEXT NOT NULL DEFAULT '',
			project_id    TEXT    NOT NULL DEFAULT '',
			models_json   TEXT    NOT NULL DEFAULT '',
			sort_order    INTEGER NOT NULL DEFAULT 0,
			models_fetched_at TEXT NOT NULL DEFAULT '',
			alias         TEXT    DEFAULT '',
			codeassist_json TEXT  DEFAULT '',
			use_ai_credits INTEGER DEFAULT 0
		);`,
		`CREATE TABLE IF NOT EXISTS settings (
			key   TEXT PRIMARY KEY,
			value TEXT NOT NULL
		);`,
		`CREATE TABLE IF NOT EXISTS providers (
			id            INTEGER PRIMARY KEY AUTOINCREMENT,
			name          TEXT    NOT NULL,
			api_type      TEXT    NOT NULL DEFAULT 'openai_chat',
			base_url      TEXT    NOT NULL,
			api_key       TEXT    NOT NULL DEFAULT '',
			model_id      TEXT    NOT NULL DEFAULT '',
			enabled       INTEGER NOT NULL DEFAULT 1,
			extra_headers TEXT    NOT NULL DEFAULT '{}',
			extra_params  TEXT    NOT NULL DEFAULT '{}',
			sort_order    INTEGER NOT NULL DEFAULT 0,
			created_at    TEXT    NOT NULL,
			updated_at    TEXT    NOT NULL,
			max_context_tokens INTEGER NOT NULL DEFAULT 200000,
			max_output_tokens INTEGER NOT NULL DEFAULT 64000
		);`,
	}

	for _, q := range queries {
		if _, err := d.db.Exec(q); err != nil {
			return err
		}
	}

	defaultSettings := map[string]string{
		"network_mode":    "3",
		"active_source":   "local",
		"quota_threshold": "10",
		"network_enhance": "true",
		"max_retries":     "3",
	}

	for k, v := range defaultSettings {
		_, _ = d.db.Exec(`INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO NOTHING;`, k, v)
	}

	return nil
}
