import * as vscode from 'vscode';
import { QuotaData, QuotaFamily } from './types';

export function formatProgressBar(percent: number): string {
  const filled = Math.round(Math.max(0, Math.min(100, percent)) / 10);
  const empty = 10 - filled;
  return '▰'.repeat(filled) + '▱'.repeat(empty);
}

export function formatResetCountdown(dateStr?: string): string {
  if (!dateStr) return '-';
  try {
    const target = new Date(dateStr);
    const now = new Date();
    const diffMs = target.getTime() - now.getTime();
    if (diffMs <= 0) return 'now';

    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    const timeStr = target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return hours > 0 ? `${hours}h ${minutes}m (${timeStr})` : `${minutes}m (${timeStr})`;
  } catch {
    return dateStr;
  }
}

export class StatusBarManager {
  public statusBarItem: vscode.StatusBarItem;
  public quotaBarItem: vscode.StatusBarItem;

  public retrySuffix = '';
  private retryTimer: NodeJS.Timeout | null = null;
  public lastState: 'idle' | 'active' | 'loading' | 'error' = 'idle';
  public lastEmail = '';
  public lastTier = '';
  public lastSource = 'local';
  private activeProviderName: string | null = null;
  private activeProviderModel: string | null = null;
  private cachedQuota: QuotaData | null = null;
  private cachedQuotaEmail = '';
  private quotaSettings = { display: true, claude: true, flash: true, pro: true };

  public setQuotaSettings(settings?: {
    display?: boolean;
    claude?: boolean;
    flash?: boolean;
    pro?: boolean;
    showClaude?: boolean;
    showFlash?: boolean;
    showPro?: boolean;
  }) {
    if (!settings) return;
    if (settings.display !== undefined) this.quotaSettings.display = settings.display;
    if (settings.claude !== undefined) this.quotaSettings.claude = settings.claude;
    else if (settings.showClaude !== undefined) this.quotaSettings.claude = settings.showClaude;
    if (settings.flash !== undefined) this.quotaSettings.flash = settings.flash;
    else if (settings.showFlash !== undefined) this.quotaSettings.flash = settings.showFlash;
    if (settings.pro !== undefined) this.quotaSettings.pro = settings.pro;
    else if (settings.showPro !== undefined) this.quotaSettings.pro = settings.showPro;

    if (!this.quotaSettings.display) {
      this.hideQuota();
    } else if (this.cachedQuota) {
      this.handleQuotaUpdate(this.cachedQuota, this.cachedQuotaEmail);
    }
  }

  constructor(context: vscode.ExtensionContext) {
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    this.statusBarItem.command = 'antiLoop.accounts.focus';
    context.subscriptions.push(this.statusBarItem);

    this.quotaBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
    this.quotaBarItem.command = 'antiLoop.refreshAll';
    context.subscriptions.push(this.quotaBarItem);
  }

  public show() {
    this.statusBarItem.show();
  }

  public updateStatus(
    state: 'idle' | 'active' | 'loading' | 'error',
    email: string,
    tier: string,
    source: string
  ) {
    this.lastState = state;
    this.lastEmail = email;
    this.lastTier = tier;
    this.lastSource = source;

    const sourceIcon = source !== 'local' ? '$(cloud) ' : '';
    const tierBadge = tier && tier !== 'unknown' ? `[${tier.toUpperCase()}] ` : '';

    if (this.activeProviderName) {
      this.statusBarItem.text = `$(sparkle) [${this.activeProviderName}]${this.activeProviderModel ? ` ${this.activeProviderModel}` : ''}`;
      this.statusBarItem.tooltip = `AntiLoop — Active Provider: ${this.activeProviderName}`;
      this.statusBarItem.backgroundColor = undefined;
      return;
    }

    switch (state) {
      case 'idle':
        this.statusBarItem.text = email
          ? `$(account) ${sourceIcon}${tierBadge}${email}${this.retrySuffix}`
          : '$(account) Idle';
        this.statusBarItem.tooltip = email
          ? `AntiLoop — ${source.toUpperCase()} — ${tierBadge}${email} (rotation off)`
          : 'AntiLoop — Click to open panel';
        this.statusBarItem.backgroundColor = undefined;
        if (!email) {
          this.quotaBarItem.text = '';
          this.quotaBarItem.hide();
        }
        break;

      case 'active':
        this.statusBarItem.text = email
          ? `$(sync) ${sourceIcon}${tierBadge}${email}${this.retrySuffix}`
          : '$(sync) Active';
        this.statusBarItem.tooltip = `AntiLoop — ${tierBadge}${email || 'Active'} (rotating)`;
        this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        if (!this.quotaBarItem.text) {
          this.quotaBarItem.text = '$(loading~spin) ...';
          this.quotaBarItem.tooltip = 'Loading quota...';
          this.quotaBarItem.show();
        }
        break;

      case 'loading':
        this.statusBarItem.text = '$(loading~spin) Starting...';
        this.statusBarItem.tooltip = 'AntiLoop — Starting...';
        this.statusBarItem.backgroundColor = undefined;
        break;

      case 'error':
        this.statusBarItem.text = '$(error) Error';
        this.statusBarItem.tooltip = 'AntiLoop — Error occurred';
        this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
        break;
    }
  }

  public showStarting() {
    this.statusBarItem.text = '$(loading~spin) Starting...';
    this.statusBarItem.tooltip = 'AntiLoop — Starting Go backend...';
    this.statusBarItem.show();
  }

  public showInitializing(count: number) {
    this.statusBarItem.text = `$(loading~spin) Initializing... (${count} accounts)`;
    this.statusBarItem.tooltip = 'AntiLoop — Restoring account state...';
    this.statusBarItem.backgroundColor = undefined;
    this.quotaBarItem.text = '$(loading~spin) Loading quota...';
    this.quotaBarItem.tooltip = 'Waiting for backend to push quota data';
    this.quotaBarItem.show();
  }

  public showProgress(msg: string) {
    this.statusBarItem.text = `$(loading~spin) ${msg}`;
    this.statusBarItem.tooltip = `AntiLoop — ${msg}`;
    this.statusBarItem.backgroundColor = undefined;
  }

  public showDead() {
    this.statusBarItem.text = '$(error) Disconnected';
    this.statusBarItem.tooltip = 'AntiLoop — Daemon connection lost. Click to reconnect.';
    this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    this.quotaBarItem.hide();
  }

  public showQuotaLoading() {
    this.quotaBarItem.text = '$(loading~spin) Quota...';
    this.quotaBarItem.tooltip = 'Fetching quota in background...';
    this.quotaBarItem.show();
  }

  public hideQuota() {
    this.quotaBarItem.text = '';
    this.quotaBarItem.hide();
  }

  public handleQuotaUpdate(quota: QuotaData, email?: string) {
    this.cachedQuota = quota;
    this.cachedQuotaEmail = email || this.lastEmail;

    if (!this.quotaSettings.display) {
      this.hideQuota();
      return;
    }

    if (!quota || !quota.families || quota.families.length === 0) {
      if (quota?.isUnlimited) {
        this.quotaBarItem.text = '$(infinity) Unlimited';
        this.quotaBarItem.tooltip = 'Enterprise / Unlimited Quota';
        this.quotaBarItem.show();
        return;
      }
      this.hideQuota();
      return;
    }

    const visibleFamilies = quota.families.filter((f) => {
      const fam = (f.family || f.label || '').toLowerCase();
      if (fam.includes('claude')) return this.quotaSettings.claude;
      if (fam.includes('flash')) return this.quotaSettings.flash;
      if (fam.includes('pro')) return this.quotaSettings.pro;
      return true;
    });

    if (visibleFamilies.length === 0) {
      this.hideQuota();
      return;
    }

    const parts = visibleFamilies.map((f) => `${f.label}:${Math.round(f.percent)}%`);
    this.quotaBarItem.text = `$(graph) ${parts.join(' | ')}`;

    const md = new vscode.MarkdownString();
    md.supportHtml = true;
    md.isTrusted = true;
    md.appendMarkdown(`### AntiLoop Quota Monitor\n\n`);
    if (this.cachedQuotaEmail) {
      md.appendMarkdown(`**Account:** \`${this.cachedQuotaEmail}\`\n\n`);
    }

    md.appendMarkdown('| Family | Remaining | Progress | Resets In |\n');
    md.appendMarkdown('|:-------|:----------|:---------|:----------|\n');
    for (const f of visibleFamilies) {
      const p = Math.round(f.percent);
      const bar = formatProgressBar(p);
      const reset = formatResetCountdown(f.resetTime || quota.resetTime);
      md.appendMarkdown(`| **${f.label}** | ${p}% | \`${bar}\` | ${reset} |\n`);
    }
    md.appendMarkdown(`\n*Click to refresh quota across all accounts.*`);

    this.quotaBarItem.tooltip = md;
    this.quotaBarItem.show();
  }

  public handleProxyRetry(event: { attempt: number; maxRetries: number; delayMs?: number }) {
    this.retrySuffix = ` [Retry ${event.attempt}/${event.maxRetries}]`;
    this.updateStatus(this.lastState, this.lastEmail, this.lastTier, this.lastSource);

    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }
    this.retryTimer = setTimeout(() => {
      this.retrySuffix = '';
      this.updateStatus(this.lastState, this.lastEmail, this.lastTier, this.lastSource);
    }, 5000);
  }

  public setActiveProvider(name: string | null, modelId: string | null) {
    this.activeProviderName = name;
    this.activeProviderModel = modelId;
    this.updateStatus(this.lastState, this.lastEmail, this.lastTier, this.lastSource);

    if (name) {
      this.quotaBarItem.text = `$(plug) External`;
      this.quotaBarItem.tooltip = `Routing via external provider: ${name} (${modelId || 'default'})`;
      this.quotaBarItem.show();
    } else if (this.cachedQuota) {
      this.handleQuotaUpdate(this.cachedQuota, this.cachedQuotaEmail);
    } else {
      this.quotaBarItem.hide();
    }
  }
}
