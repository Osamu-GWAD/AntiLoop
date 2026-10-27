import * as vscode from 'vscode';
import * as crypto from 'crypto';

export function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function getWebviewHtml(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  viewType = ''
): string {
  const scriptUri = webview
    .asWebviewUri(vscode.Uri.joinPath(extensionUri, 'webview-ui', 'dist', 'assets', 'index.js'))
    .toString();
  const styleUri = webview
    .asWebviewUri(vscode.Uri.joinPath(extensionUri, 'webview-ui', 'dist', 'assets', 'index.css'))
    .toString();
  const cspSource = webview.cspSource;
  const nonce = generateNonce();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${cspSource} data:; img-src ${cspSource} data: https:; connect-src ${cspSource} http://127.0.0.1:* https:;">
<title>AntiLoop${viewType === 'admin' ? ' - Admin' : ''}</title>
<link rel="stylesheet" href="${styleUri}">
</head>
<body>
  <div id="root" data-view="${viewType}">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:200px;gap:12px;opacity:0;animation:_al_fi .3s ease forwards">
      <div style="font-size:2.4em;animation:_al_p 1.8s ease-in-out infinite">🔄</div>
      <div style="font-size:1.1em;font-weight:600;opacity:.5;letter-spacing:.5px">AntiLoop</div>
      <div style="display:flex;gap:6px;margin-top:4px">
        <span style="width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.4;animation:_al_d 1.2s ease-in-out infinite"></span>
        <span style="width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.4;animation:_al_d 1.2s ease-in-out .2s infinite"></span>
        <span style="width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.4;animation:_al_d 1.2s ease-in-out .4s infinite"></span>
      </div>
    </div>
    <style>@keyframes _al_fi{from{opacity:0}to{opacity:1}}@keyframes _al_p{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.1);opacity:1}}@keyframes _al_d{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1.2)}}</style>
  </div>
  <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
}

export const MUTATION_METHODS = new Set([
  'swapAccountOrder',
  'removeAccount',
  'refreshAccount',
  'addAccount',
  'setActiveModelFamily',
  'selectAccount',
  'toggleAccountEnabled',
  'setQuotaSettings',
  'setQuotaThreshold',
  'setAccountAlias',
  'switchMode',
  'setRemoteConfig',
  'adminLogin',
  'adminLogout',
  'addProvider',
  'updateProvider',
  'removeProvider',
  'toggleProviderEnabled',
  'selectProvider',
]);

export class AccountsViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'antiLoop.accounts';
  private view?: vscode.WebviewView;
  private isWebviewReady = false;
  public isDev = false;
  public ideVersion = '';
  public pluginVersion = '';
  public needsRestart = false;

  constructor(
    private readonly extensionUri: vscode.Uri,
    private readonly isBackendReady: () => boolean,
    private readonly sendRpc: (method: string, params?: any, timeoutMs?: number) => Promise<any>,
    private readonly getHtml: (webview: vscode.Webview) => string,
    private readonly onToggleEnable: (action: 'enable' | 'disable') => Promise<any>,
    private readonly log: (msg: string) => void,
    private readonly onSpecialAction: (action: string, params?: any) => Promise<any>,
    private readonly customCommandHandler?: (method: string, params?: any) => Promise<any>
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this.view = webviewView;
    this.log('[sidebar] resolveWebviewView called');

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    webviewView.webview.html = this.getHtml(webviewView.webview);
    this.log('[sidebar] HTML set, registering message handler');

    webviewView.webview.onDidReceiveMessage(async (msg) => {
      this.log(`[sidebar] ← webview msg: method=${msg.method} id=${msg.id}`);

      if (msg.method === 'webviewReady') {
        this.log('[sidebar] webview ready signal received');
        this.isWebviewReady = true;
        if (this.isBackendReady()) {
          this.pushFullState();
        } else {
          this.log('[sidebar] backend not ready yet, will push state when ready');
        }
        return;
      }

      try {
        if (this.customCommandHandler) {
          const res = await this.customCommandHandler(msg.method, msg.params);
          if (res !== undefined) {
            webviewView.webview.postMessage({ type: 'response', id: msg.id, result: res });
            return;
          }
        }

        if (msg.method === 'restartBackend') {
          this.log('[sidebar] restart backend requested');
          this.onSpecialAction('restartBackend');
          webviewView.webview.postMessage({ type: 'response', id: msg.id, result: { ok: true } });
          return;
        }

        if (msg.method === 'openAdminPanel') {
          this.log('[sidebar] openAdminPanel requested');
          this.onSpecialAction('openAdminPanel');
          webviewView.webview.postMessage({ type: 'response', id: msg.id, result: { ok: true } });
          return;
        }

        if (msg.method === 'enable' || msg.method === 'disable') {
          const res = await this.onToggleEnable(msg.method);
          webviewView.webview.postMessage({ type: 'response', id: msg.id, result: res });
          return;
        }

        const result = await this.sendRpc(msg.method, msg.params);
        webviewView.webview.postMessage({ type: 'response', id: msg.id, result });

        if (MUTATION_METHODS.has(msg.method)) {
          this.onSpecialAction(msg.method, msg.params);
          this.refreshState();
        }
      } catch (err: any) {
        this.log(`[sidebar] RPC error for ${msg.method}: ${err.message}`);
        webviewView.webview.postMessage({ type: 'response', id: msg.id, error: err.message });
      }
    });
  }

  public onBackendReady() {
    this.log('[sidebar] backend marked ready');
    if (this.isWebviewReady) {
      this.pushFullState();
    }
  }

  public postNotification(method: string, params: any) {
    if (this.view) {
      this.view.webview.postMessage({ type: 'notification', method, params });
    }
  }

  public refreshState() {
    if (this.isWebviewReady && this.isBackendReady()) {
      this.pushFullState();
    }
  }

  public async pushFullState() {
    if (!this.view) return;
    try {
      const [status, accountsData, providersData] = await Promise.all([
        this.sendRpc('getStatus').catch(() => null),
        this.sendRpc('listAccountsWithQuota').catch(() => null),
        this.sendRpc('listProviders').catch(() => null),
      ]);

      this.view.webview.postMessage({
        type: 'state',
        data: {
          enabled: status?.enabled,
          currentEmail: status?.currentEmail,
          currentTier: status?.currentTier,
          activeSource: status?.activeSource || 'local',
          proxyEnabled: status?.proxyEnabled,
          proxyPort: status?.proxyPort,
          networkMode: status?.networkMode,
          networkEnhance: status?.networkEnhance,
          quotaThreshold: status?.quotaThreshold,
          accounts: accountsData?.accounts || [],
          providers: providersData?.providers || [],
          activeProviderID: providersData?.activeProviderID,
          isDev: this.isDev,
          ideVersion: this.ideVersion,
          pluginVersion: this.pluginVersion,
          needsRestart: this.needsRestart,
        },
      });
    } catch (err: any) {
      this.log(`[sidebar] pushFullState error: ${err.message}`);
    }
  }
}
