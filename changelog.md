# Changelog

All notable changes to the AntiLoop extension will be documented in this file.

## [1.0.0] - 2026-10-28

### Features
- **Zero-Restart Account Rotation**: Seamlessly rotate between multiple Google accounts in Antigravity IDE without reloading or restarting.
- **Smart Quota Monitoring**: Real-time quota polling across Claude, Gemini Pro, and Gemini Flash model families with status bar indicators.
- **Auto-Failover**: Automatic rotation to secondary accounts upon encountering quota exhaustion or rate limits (HTTP 429).
- **Pass-Through Authorization**: Transparent pass-through of IDE credentials when pool is unconfigured.
- **Multi-Provider AI Routing**: Support for custom OpenAI, Anthropic, and standard OpenAI-compatible endpoints directly in Antigravity.
- **Local SQLite Engine**: Fast, secure SQLite storage with authenticated AES-256-GCM encryption.
- **Multi-Platform Support**: Native cross-compiled Go daemon binaries for Linux (x64/arm64), macOS (Apple Silicon/Intel), and Windows (x64/arm64).
