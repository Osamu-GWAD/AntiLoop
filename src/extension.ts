import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { DaemonClient, readAdminHttpPort } from './daemonClient';
import { StatusBarManager } from './statusBar';
import { AccountsViewProvider, getWebviewHtml } from './accountsViewProvider';
import { getIdeToken, getIdeEmail, setIdeToken } from './tokenHelper';
import { ActivateResult, StatusInfo } from './types';

let daemonClient: DaemonClient | null = null;
let statusBar: StatusBarManager | null = null;
let outputChannel: vscode.OutputChannel | null = null;
let accountsProvider: AccountsViewProvider | null = null;
let storagePath = '';
let mainStoragePath = '';
let adminPanelWebview: vscode.WebviewPanel | undefined;
let signOutWatchTimer: NodeJS.Timeout | undefined;
let wasSignOutNotified = false;

const state = {
  isEnabled: false,
  currentEmail: '',
  currentTier: '',
  activeSource: 'local',
  isBackendReady: false,
};

function log(msg: string) {
  const time = new Date().toISOString().substring(11, 23);
  outputChannel?.appendLine(`[${time}] ${msg}`);
}

export async function activate(context: vscode.ExtensionContext) {
  outputChannel = vscode.window.createOutputChannel('AntiLoop');
  log('AntiLoop activating...');

  const isFirstActivation = !context.globalState.get('firstActivationDone');

  statusBar = new StatusBarManager(context);
  statusBar.showStarting();
  statusBar.show();

  const isDev = fs.existsSync(path.join(context.extensionPath, '.devmode'));
  storagePath = isDev ? context.globalStorageUri.fsPath + '-dev' : context.globalStorageUri.fsPath;
  mainStoragePath = context.globalStorageUri.fsPath;
  if (isDev) {
    log('Development mode detected (.devmode marker)');
  }

  daemonClient = new DaemonClient(context.extensionPath, outputChannel);
  daemonClient.connect(storagePath).catch((err) => {
    log(`Initial daemon connect error: ${err.message}`);
  });

  accountsProvider = new AccountsViewProvider(
    context.extensionUri,
    () => state.isBackendReady,
    (method, params, timeoutMs) => daemonClient!.send(method, params, timeoutMs),
    (webview) => getWebviewHtml(webview, context.extensionUri),
    async (action) => {
      if (action === 'enable') {
        statusBar!.updateStatus('loading', state.currentEmail, state.currentTier, state.activeSource);
        const res = await daemonClient!.send('enable');
        state.isEnabled = true;
        statusBar!.updateStatus('active', state.currentEmail, state.currentTier, state.activeSource);
        return res;
      } else {
        const res = await daemonClient!.send('disable');
        state.isEnabled = false;
        statusBar!.updateStatus('idle', state.currentEmail, state.currentTier, state.activeSource);
        return res;
      }
    },
    (msg) => log(msg),
    async (action, params) => {
      if (action === 'restartBackend') {
        log('Restart backend requested from sidebar');
        await restartBackend(context);
        return { ok: true };
      }
      if (action === 'openAdminPanel') {
        log('Opening admin panel in browser...');
        const port = readAdminHttpPort(storagePath);
        if (port > 0) {
          const url = `http://127.0.0.1:${port}`;
          vscode.commands.executeCommand('simpleBrowser.show', vscode.Uri.parse(url));
          log(`Admin panel opened: ${url}`);
        } else {
          log('Admin HTTP port file not found — backend may not be ready');
          vscode.window.showWarningMessage('AntiLoop: Admin panel not available yet. Please wait for the backend to start.');
        }
        return { ok: true };
      }
      if (
        action === 'selectProvider' ||
        action === 'removeProvider' ||
        action === 'updateProvider' ||
        action === 'toggleProviderEnabled'
      ) {
        syncActiveProviderToStatusBar();
      }
      if (action === 'setQuotaSettings') {
        statusBar?.setQuotaSettings(params);
        if (!statusBar?.hasCachedQuota()) {
          daemonClient
            ?.send('listAccountsWithQuota', {})
            .then((data: any) => {
              const acc =
                data?.accounts?.find((a: any) => a.email === state.currentEmail) ||
                data?.accounts?.[0];
              if (acc?.quota) {
                statusBar?.handleQuotaUpdate(acc.quota, acc.email);
              }
            })
            .catch(() => {});
        }
      }
    },
    async (method, params) => {
      if (method === 'setProxyEnabled') {
        return handleSetProxyEnabled(params);
      }
      if (method === 'executeIdeCommand') {
        const cmd = params?.command;
        if (!cmd) return { error: 'missing command' };
        log(`[debug] Executing IDE command: ${cmd}`);
        try {
          const res = await vscode.commands.executeCommand(cmd);
          return { ok: true, command: cmd, result: res ?? null };
        } catch (err: any) {
          return { ok: false, command: cmd, error: err.message };
        }
      }
      if (method === 'checkIdeToken') {
        const token = await getIdeToken();
        if (token) {
          const preview = token.accessToken ? token.accessToken.substring(0, 12) + '...' : '(empty)';
          const expiry = token.expiryDateSeconds ? new Date(token.expiryDateSeconds * 1000).toISOString() : null;
          return {
            hasToken: true,
            accessTokenPreview: preview,
            expiry,
            hasRefreshToken: !!token.refreshToken,
          };
        } else {
          return { hasToken: false };
        }
      }
      if (method === 'promptAccountAlias') {
        const alias = await vscode.window.showInputBox({
          title: 'Account Alias',
          prompt: `Set alias for ${params?.email || 'account'}`,
          value: params?.currentAlias || '',
          placeHolder: params?.email || '',
        });
        if (alias === undefined) return { ok: false, cancelled: true };
        const res = await daemonClient!.send('setAccountAlias', { id: params.id, alias });
        accountsProvider?.refreshState();
        return res;
      }
      return undefined;
    }
  );

  accountsProvider.isDev = isDev;
  accountsProvider.pluginVersion = context.extension.packageJSON.version || '';

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(AccountsViewProvider.viewType, accountsProvider, {
      webviewOptions: { retainContextWhenHidden: true },
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('jetski') && state.isBackendReady && daemonClient?.isRunning) {
        daemonClient
          .send('getStatus', {})
          .then((st: StatusInfo) => {
            const current = vscode.workspace.getConfiguration('jetski').get<string>('cloudCodeUrl');
            const target = st.proxyEnabled && st.proxyPort ? `http://127.0.0.1:${st.proxyPort}` : undefined;
            if (current !== target) {
              log(`[DEBUG] Config Guard: Detected unauthorized change to jetski.cloudCodeUrl (was: ${current}). Reverting to: ${target || 'undefined'}`);
              applyProxyUrl(st.proxyEnabled, st.proxyPort);
            }
          })
          .catch(() => {});
      }
    })
  );

  daemonClient.onNotification(async (method, params) => {
    accountsProvider?.postNotification(method, params);
    adminPanelWebview?.webview.postMessage({ type: 'notification', method, params });

    switch (method) {
      case 'injectToken':
        log(`[injectToken] Syncing active credentials for ${params?.email || 'unknown'}`);
        if (params?.email) {
          state.currentEmail = params.email;
        }
        if (params?.accessToken) {
          await setIdeToken({
            email: params.email,
            accessToken: params.accessToken,
            refreshToken: params.refreshToken,
            expiryDateSeconds: params.expiryDateSeconds,
          });
        }
        accountsProvider?.refreshState();
        break;

      case 'updateStatus':
        updateStatusFromDaemon(params);
        accountsProvider?.refreshState();
        break;

      case 'quotaUpdate':
        statusBar?.handleQuotaUpdate(params, params.email || state.currentEmail);
        break;

      case 'proxyRetry':
        statusBar?.handleProxyRetry(params);
        break;

      case 'proxyError':
        accountsProvider?.postNotification('proxyError', params);
        break;

      case 'stateChanged':
        log(`[stateChanged] triggered by ${params?.trigger || 'unknown'}`);
        accountsProvider?.refreshState();
        daemonClient?.send('getStatus', {}).then((st: StatusInfo) => {
          applyProxyUrl(st.proxyEnabled, st.proxyPort);
          if (st.quotaSettings) {
            statusBar?.setQuotaSettings(st.quotaSettings);
          }
        }).catch(() => {});
        break;

      case 'initProgress':
        if (params?.message) {
          statusBar?.showProgress(params.message);
        } else {
          daemonClient?.send('getStatus', {}).then((st: StatusInfo) => {
            if (st.currentEmail) {
              state.currentEmail = st.currentEmail;
              state.currentTier = st.currentTier || '';
              if (st.activeSource) state.activeSource = st.activeSource;
              statusBar?.updateStatus(state.isEnabled ? 'active' : 'idle', state.currentEmail, state.currentTier, state.activeSource);
            }
          }).catch(() => {});
        }
        break;

      case 'openBrowser':
        handleOpenBrowserNotification(params.url);
        break;
    }
  });

  context.subscriptions.push(
    vscode.commands.registerCommand('antiLoop.openPanel', () => {
      openAdminPanelWebview(context);
    }),
    vscode.commands.registerCommand('antiLoop.enable', async () => {
      try {
        statusBar?.updateStatus('loading', state.currentEmail, state.currentTier, state.activeSource);
        await daemonClient!.send('enable');
        state.isEnabled = true;
        statusBar?.updateStatus('active', state.currentEmail, state.currentTier, state.activeSource);
        vscode.window.showInformationMessage(`AntiLoop: Rotation started${state.currentEmail ? ` (${state.currentEmail})` : ''}`);
      } catch (err: any) {
        statusBar?.updateStatus('idle', state.currentEmail, state.currentTier, state.activeSource);
        vscode.window.showErrorMessage(`AntiLoop: ${err.message}`);
      }
    }),
    vscode.commands.registerCommand('antiLoop.disable', async () => {
      try {
        await daemonClient!.send('disable');
        state.isEnabled = false;
        statusBar?.updateStatus('idle', state.currentEmail, state.currentTier, state.activeSource);
        vscode.window.showInformationMessage('AntiLoop: Rotation stopped');
      } catch (err: any) {
        vscode.window.showErrorMessage(`AntiLoop: ${err.message}`);
      }
    }),
    vscode.commands.registerCommand('antiLoop.addAccount', async () => {
      try {
        vscode.window.showInformationMessage('AntiLoop: Opening browser for Google login...');
        const res = await daemonClient!.send('addAccount', undefined, 300000);
        vscode.window.showInformationMessage(`AntiLoop: Account added - ${res.account?.email}`);
      } catch (err: any) {
        vscode.window.showErrorMessage(`AntiLoop: ${err.message}`);
      }
    }),
    vscode.commands.registerCommand('antiLoop.refreshAll', async () => {
      statusBar?.showQuotaLoading();
      try {
        const data = await daemonClient?.send('listAccountsWithQuota', {});
        if (data?.accounts) {
          for (const a of data.accounts) {
            if (a.status !== 'excluded') {
              await daemonClient?.send('refreshAccount', { id: a.id, source: 'local' }).catch(() => {});
            }
          }
          const updated = await daemonClient?.send('listAccountsWithQuota', {});
          const acc =
            updated?.accounts?.find((a: any) => a.email === state.currentEmail) ||
            updated?.accounts?.[0];
          if (acc?.quota) {
            statusBar?.handleQuotaUpdate(acc.quota, acc.email);
          }
        }
        accountsProvider?.refreshState();
      } catch (err: any) {
        log(`refreshAll error: ${err.message}`);
      }
    }),
    vscode.commands.registerCommand('antiLoop.warmupAll', async () => {
      vscode.window.showInformationMessage('AntiLoop: Warming up all accounts to start rolling 5-hour limit timer...');
      try {
        const res = await daemonClient?.send('warmupAccounts', {});
        const count = res?.results?.filter((r: any) => r.success)?.length || 0;
        const total = res?.results?.length || 0;
        vscode.window.showInformationMessage(`AntiLoop: Warmed up ${count}/${total} accounts. 5-hour limit timers started!`);
        accountsProvider?.refreshState();
      } catch (err: any) {
        vscode.window.showErrorMessage(`AntiLoop Warmup failed: ${err.message}`);
      }
    }),
    vscode.commands.registerCommand('antiLoop.testLoginCommands', async () => {
      try {
        const token = await getIdeToken();
        const email = await getIdeEmail();
        const hasToken = !!token?.accessToken;
        const status = `IDE Account: ${email || '(none)'}\nHas Access Token: ${hasToken}\nHas Refresh Token: ${!!token?.refreshToken}\nBackend Ready: ${state.isBackendReady}`;
        vscode.window.showInformationMessage(`AntiLoop Diagnostics:\n${status}`);
      } catch (err: any) {
        vscode.window.showErrorMessage(`AntiLoop Diagnostics Error: ${err.message}`);
      }
    })
  );

  context.subscriptions.push({
    dispose: () => {
      daemonClient?.dispose();
    },
  });

  log('Phase 1 complete: TS ready');
  initDaemonLifecycle(context, storagePath, isFirstActivation).catch((err) => {
    log(`Go backend init failed: ${err.message}`);
  });
}

async function initDaemonLifecycle(context: vscode.ExtensionContext, storageDir: string, isFirstInstall = false) {
  if (!state.isEnabled) {
    statusBar?.showStarting();
  }
  await daemonClient!.connect(storageDir);
  log('Phase 2 complete: connected to daemon');

  let ideVer = vscode.version;
  try {
    const productJsonPath = path.join(vscode.env.appRoot, 'product.json');
    const product = JSON.parse(fs.readFileSync(productJsonPath, 'utf8'));
    if (typeof product.ideVersion === 'string' && product.ideVersion) {
      ideVer = product.ideVersion;
    }
    const settingsPath = path.join(context.globalStorageUri.fsPath, '..', '..', 'settings.json');
    const cleanupMeta = path.join(context.extensionPath, '.cleanup-meta.json');
    fs.writeFileSync(cleanupMeta, JSON.stringify({ settingsPath: path.resolve(settingsPath) }), 'utf-8');
  } catch {}

  const platform = `${process.platform === 'win32' ? 'windows' : process.platform}/${process.arch}`;
  log(`IDE: antigravity/${ideVer} ${platform}`);
  accountsProvider!.ideVersion = ideVer;

  await activateDaemon(context, storageDir, ideVer, platform, isFirstInstall);

  daemonClient!.setOnReady(async () => {
    log('Daemon reconnected — re-initializing...');
    try {
      await activateDaemon(context, storageDir, ideVer, platform);
      log('Re-initialization complete');
    } catch (err: any) {
      log(`Re-initialization failed: ${err.message}`);
    }
  });

  daemonClient!.setOnDead(() => {
    log('Daemon connection permanently lost');
    statusBar?.showDead();
    vscode.window.showErrorMessage('AntiLoop: Lost connection to daemon after 5 retries.', 'Reconnect').then((sel) => {
      if (sel === 'Reconnect') {
        daemonClient?.resetCrashCount();
        daemonClient?.connect(storageDir).then(() => initDaemonLifecycle(context, storageDir));
      }
    });
  });
}

async function activateDaemon(
  context: vscode.ExtensionContext,
  storageDir: string,
  ideVer: string,
  platform: string,
  isFirstInstall = false
) {
  let mtime = 0;
  try {
    const binPath = daemonClient!.getBinaryPath();
    const st = fs.statSync(binPath);
    mtime = Math.floor(st.mtimeMs);
    log(`Binary mtime: ${mtime} (${new Date(mtime).toLocaleTimeString()})`);
  } catch (err: any) {
    log(`WARNING: could not read binary mtime: ${err.message}`);
  }

  const res: ActivateResult = await daemonClient!.send('activate', {
    storagePath: storageDir,
    ideVersion: ideVer,
    platform,
    binaryMtimeMs: mtime,
  });

  log(`Activated: accounts=${res.total}, active=${res.active}`);
  if (res.binaryUpdated) {
    log('Daemon binary outdated — daemon will restart, awaiting reconnect...');
    return;
  }

  state.isBackendReady = true;
  daemonClient!.resetCrashCount();
  accountsProvider?.onBackendReady();

  state.currentTier = res.currentTier || '';
  state.currentEmail = res.currentEmail || '';
  log(`activate result: email=${res.currentEmail}, tier=${res.currentTier}, autoEnabled=${res.autoEnabled}, proxyPort=${res.proxyPort || 'none'}`);

  daemonClient
    ?.send('getStatus', {})
    .then((st: StatusInfo) => {
      if (st.quotaSettings) statusBar?.setQuotaSettings(st.quotaSettings);
    })
    .catch(() => {});

  await applyProxyUrl(res.proxyEnabled, res.proxyPort);
  await daemonClient?.send('pushCurrentToken', {}).catch(() => {});

  if (res.autoEnabled) {
    state.isEnabled = true;
    statusBar?.updateStatus('active', state.currentEmail, state.currentTier, state.activeSource);
  } else if (!state.currentEmail && res.total > 0) {
    statusBar?.showInitializing(res.total);
  } else {
    statusBar?.updateStatus('idle', state.currentEmail, state.currentTier, state.activeSource);
  }

  if (res.quota && res.quota.families && res.quota.families.length > 0) {
    statusBar?.handleQuotaUpdate(res.quota, state.currentEmail);
  } else if (res.quotaPending) {
    statusBar?.showQuotaLoading();
  } else {
    statusBar?.hideQuota();
  }

  const tryImport = async (attempt: number) => {
    try {
      const token = await getIdeToken();
      if (token?.accessToken && token?.refreshToken && !token.refreshToken.startsWith('MOCK_TOKEN_')) {
        const email = await getIdeEmail();
        if (email) {
          const importRes = await daemonClient!.send('importIdeAccount', {
            email,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            expiryDateSeconds: token.expiryDateSeconds,
          });
          if (importRes.imported) {
            log(`Auto-imported IDE account: ${email}`);
          } else {
            log(`IDE account already in pool: ${email}`);
          }
          if (!state.isEnabled) {
            const st: StatusInfo = await daemonClient!.send('getStatus', {});
            state.currentEmail = st.currentEmail || '';
            state.currentTier = st.currentTier || '';
            statusBar?.updateStatus('idle', state.currentEmail, state.currentTier, state.activeSource);
          }
          accountsProvider?.refreshState();
          return;
        }
      }
      if (attempt < 3) {
        const delays = [2000, 6000, 12000];
        setTimeout(() => tryImport(attempt + 1), delays[attempt]);
      }
    } catch (err: any) {
      log(`IDE account import skipped (attempt ${attempt + 1}): ${err.message}`);
      if (attempt < 3) {
        setTimeout(() => tryImport(attempt + 1), 5000);
      }
    }
  };
  setTimeout(() => tryImport(0), 2000);

  syncActiveProviderToStatusBar();
  log('Phase 3 complete: business logic started');

  if (isFirstInstall) {
    context.globalState.update('firstActivationDone', true);
    accountsProvider!.needsRestart = true;
  }

  startSignOutWatch();
}

async function handleOpenBrowserNotification(url: string) {
  const openAction = 'Open Browser';
  const copyAction = 'Copy URL';
  const chosen = await vscode.window.showInformationMessage(
    'AntiLoop: Google login URL ready. Open in browser or copy to paste in a specific browser.',
    { modal: true, detail: url },
    openAction,
    copyAction
  );
  if (chosen === openAction) {
    vscode.env.openExternal(vscode.Uri.parse(url));
  } else if (chosen === copyAction) {
    await vscode.env.clipboard.writeText(url);
    vscode.window.showInformationMessage('AntiLoop: Login URL copied to clipboard');
  } else {
    daemonClient?.send('cancelAddAccount').catch(() => {});
  }
}

async function applyProxyUrl(enabled: boolean, port?: number) {
  try {
    const config = vscode.workspace.getConfiguration('jetski');
    const current = config.get<string>('cloudCodeUrl');
    if (enabled && port) {
      const target = `http://127.0.0.1:${port}`;
      if (current !== target) {
        await config.update('cloudCodeUrl', target, vscode.ConfigurationTarget.Global);
        log(`Proxy URL set: ${target}`);
      }
    } else {
      if (typeof current === 'string' && current.startsWith('http://127.0.0.1:')) {
        await config.update('cloudCodeUrl', undefined, vscode.ConfigurationTarget.Global);
        log('Proxy URL cleared (proxy disabled)');
      }
    }
  } catch (err: any) {
    log(`WARNING: applyProxyUrl failed: ${err.message}`);
  }
}

async function handleSetProxyEnabled(params: { enabled: boolean }) {
  const res = await daemonClient!.send('setProxyEnabled', params);
  daemonClient
    ?.send('getStatus', {})
    .then((st: StatusInfo) => {
      if (st.quotaSettings) statusBar?.setQuotaSettings(st.quotaSettings);
    })
    .catch(() => {});

  await applyProxyUrl(res.proxyEnabled, res.proxyPort);
  await daemonClient?.send('pushCurrentToken', {}).catch(() => {});
  const reload = 'Reload Now';
  const chosen = await vscode.window.showInformationMessage(
    'Proxy setting updated. Reload Window to fully apply.',
    reload
  );
  if (chosen === reload) {
    await vscode.commands.executeCommand('workbench.action.reloadWindow');
  }
  return res;
}

function updateStatusFromDaemon(status: any) {
  if (status.error) {
    statusBar?.updateStatus('error', state.currentEmail, state.currentTier, state.activeSource);
    return;
  }
  state.isEnabled = status.enabled;
  state.currentEmail = status.currentEmail || '';
  state.currentTier = status.currentTier || '';
  if (status.activeSource) state.activeSource = status.activeSource;
  statusBar?.updateStatus(
    status.enabled ? 'active' : 'idle',
    state.currentEmail,
    state.currentTier,
    state.activeSource
  );
}

async function syncActiveProviderToStatusBar() {
  if (!daemonClient || !statusBar) return;
  try {
    const res = await daemonClient.send('listProviders');
    const activeId = res?.activeProviderID;
    if (activeId && res?.providers) {
      const active = res.providers.find((p: any) => p.id === activeId);
      if (active) {
        statusBar.setActiveProvider(active.modelId || active.name, active.modelId);
        log(`[provider] Status bar → ${active.modelId || active.name}`);
        return;
      }
    }
    statusBar.setActiveProvider(null, null);
    log('[provider] Status bar → Google');
  } catch {}
}

function startSignOutWatch() {
  if (signOutWatchTimer) return;
  signOutWatchTimer = setInterval(async () => {
    if (!state.isBackendReady) return;
    try {
      const token = await getIdeToken();
      if (token?.accessToken) {
        wasSignOutNotified = false;
        return;
      }
      if (wasSignOutNotified) return;
      wasSignOutNotified = true;
      log('[signOutWatch] IDE token missing — user appears to have signed out');
      const chosen = await vscode.window.showWarningMessage(
        'AntiLoop: You have signed out of the IDE. Sign in to restore the Agent panel.',
        'Sign In',
        'Later'
      );
      if (chosen === 'Sign In') {
        vscode.commands.executeCommand('workbench.action.loginWithRedirect');
      }
    } catch {}
  }, 30000);
}

async function restartBackend(context: vscode.ExtensionContext) {
  log('Restarting Go backend...');
  try {
    state.isEnabled = false;
    state.currentEmail = '';
    state.isBackendReady = false;
    statusBar?.updateStatus('loading', '', '', state.activeSource);
    await daemonClient?.stop();
    daemonClient?.resetCrashCount();
    await initDaemonLifecycle(context, storagePath);
    log('Go backend restarted successfully');
    vscode.window.showInformationMessage('AntiLoop: Backend restarted');
  } catch (err: any) {
    log(`Go backend restart failed: ${err.message}`);
    statusBar?.updateStatus('error', state.currentEmail, state.currentTier, state.activeSource);
    vscode.window.showErrorMessage(`AntiLoop: Restart failed — ${err.message}`);
  }
}

function openAdminPanelWebview(context: vscode.ExtensionContext) {
  if (adminPanelWebview) {
    adminPanelWebview.reveal();
    return;
  }
  adminPanelWebview = vscode.window.createWebviewPanel(
    'antiLoop',
    'AntiLoop',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [context.extensionUri],
    }
  );
  adminPanelWebview.webview.html = getWebviewHtml(adminPanelWebview.webview, context.extensionUri);

  adminPanelWebview.webview.onDidReceiveMessage(async (msg) => {
    try {
      if (msg.method === 'enable') {
        const res = await daemonClient!.send('enable');
        state.isEnabled = true;
        statusBar?.updateStatus('active', state.currentEmail, state.currentTier, state.activeSource);
        adminPanelWebview?.webview.postMessage({ type: 'response', id: msg.id, result: res });
        return;
      }
      if (msg.method === 'disable') {
        const res = await daemonClient!.send('disable');
        state.isEnabled = false;
        statusBar?.updateStatus('idle', state.currentEmail, state.currentTier, state.activeSource);
        adminPanelWebview?.webview.postMessage({ type: 'response', id: msg.id, result: res });
        return;
      }
      const res = await daemonClient!.send(msg.method, msg.params);
      adminPanelWebview?.webview.postMessage({ type: 'response', id: msg.id, result: res });
      accountsProvider?.refreshState();
    } catch (err: any) {
      adminPanelWebview?.webview.postMessage({ type: 'response', id: msg.id, error: err.message });
    }
  });

  adminPanelWebview.onDidDispose(() => {
    adminPanelWebview = undefined;
  });
}

export async function deactivate() {
  if (signOutWatchTimer) {
    clearInterval(signOutWatchTimer);
    signOutWatchTimer = undefined;
  }
  try {
    await vscode.workspace
      .getConfiguration('jetski')
      .update('cloudCodeUrl', undefined, vscode.ConfigurationTarget.Global);
  } catch {}
  daemonClient?.dispose();
}
