# AntiLoop

> Intelligent multi-account rotation, quota management, and network optimization for Antigravity IDE.

## Highlights

1. **Seamless Account Switching**: Switch between Google accounts instantly with zero IDE restart. When your active account's quota runs low, AntiLoop automatically rotates to the next account in your pool to keep your workflow uninterrupted.
2. **Third-Party AI Models**: Bring your own API key to connect OpenAI, Anthropic, DeepSeek, or any compatible LLM provider directly into Antigravity.
3. **High-Performance Network Proxy**: Built-in streaming proxy engineered to eliminate disconnects, manage SSE keep-alive, and handle intelligent retries.
4. **Real-Time Quota Monitoring**: Live quota tracking across Claude, Gemini Pro, and Gemini Flash model families displayed directly in the status bar with countdown timers and visual progress bars.
5. **Team Token Management**: Support for remote tenant configurations to distribute shared account pools across developer teams without exposing credentials.

---

## Features

### 1. Zero-Restart Account Rotation
- **Instant Hot-Swapping:** Switch accounts in real-time without restarting or reloading the IDE.
- **Configurable Auto-Rotation:** Set a quota threshold (e.g., 10%) — when the current account drops below the threshold or hits rate limits (HTTP 429), AntiLoop rotates immediately.
- **Account Pool Management:** Add, sort, enable, or disable multiple accounts with a visual sidebar interface.

### 2. External LLM Providers
- **Bring Your Own Key:** Connect any OpenAI-compatible API endpoint (OpenAI, DeepSeek, Groq, Ollama) or Anthropic Claude API.
- **Unified Sidebar:** Manage external providers alongside Google accounts from a single dashboard.
- **Dynamic Routing:** Route completion and chat requests through custom providers on demand.

### 3. Network Optimization & Resilience
- **Robust Streaming Proxy:** Intercepts and stabilizes streaming completions to eliminate dropped connections.
- **CORS & Preflight Handling:** Seamless compatibility with local webviews and devtools.
- **Pass-Through Fallback:** If the pool is empty or initializing, your IDE credentials pass through without interruption.

### 4. Real-Time Status Bar Quota Display
- **Status Bar Integration:** View remaining quota percentages for Claude, Gemini Pro, and Gemini Flash directly in the status bar.
- **Rich Hover Tooltips:** Detailed Markdown breakdown of quota percentages, visual progress bars, and reset countdowns.

### 5. Auto Warmup (Start Rolling 5h Quota Windows)
- **One-Click Limit Initialization:** Simultaneously fires lightweight warmup requests across all accounts in your pool to initiate their 5-hour rolling rate limit windows in advance.
- **Maximized Effective Quota:** By starting the timer on secondary accounts early, their limits refresh sooner without having to wait until an account switch occurs.
- **Command:** `AntiLoop: Warm Up All Accounts (Start 5h Limit)` (`antiLoop.warmupAll`).

---

## Architecture

AntiLoop consists of two tightly coupled components:
1. **TypeScript Extension (`src/`)**: Integrates directly with Antigravity IDE APIs, managing the Activity Bar view, status bar items, and IDE configuration overrides (`jetski.cloudCodeUrl`).
2. **Go Core Daemon (`go-core/`)**: High-performance local service that handles authenticated AES-256-GCM SQLite storage, upstream proxying, token refresh, and JSON-RPC daemon communication.

---

## Getting Started

### Installation
Install the VSIX package via the command line:
```bash
antigravity-ide --install-extension antiloop-1.0.0.vsix
```
Or open the Extensions panel (`Ctrl+Shift+X`), click **...**, and choose **Install from VSIX...**.

### Quick Start
1. Click the **AntiLoop** loop icon in the activity bar.
2. Your primary IDE account is automatically imported into your pool.
3. Click **Add Account** to log into additional Google accounts.
4. Toggle **Enable** to turn on automatic rotation.

---

## Building from Source

### Prerequisites
- Node.js 18+ and npm
- Go 1.22+

### Build Steps
```bash
# Clone the repository
git clone https://github.com/Osamu-GWAD/AntiLoop.git
cd AntiLoop

# Install dependencies
npm install

# Compile the Go backend for your platform
bash scripts/build-go.sh current

# Build the extension bundle
npm run compile:prod

# Package the extension
npx @vscode/vsce package --no-dependencies
```

To build Go binaries for all supported platforms (Linux, macOS, Windows):
```bash
bash scripts/build-go.sh all
```

---

## License

MIT License. Copyright (c) 2026 Osamu-GWAD. See [LICENSE.txt](LICENSE.txt) for details.
