import * as vscode from 'vscode';

export interface IdeTokenInfo {
  accessToken: string;
  refreshToken: string;
  expiryDateSeconds: number;
  tokenType: string;
}

export async function getIdeToken(): Promise<IdeTokenInfo | null> {
  try {
    const v = vscode as any;
    const tokenInfo = await v.antigravityUnifiedStateSync?.OAuthPreferences?.getOAuthTokenInfo?.();
    if (!tokenInfo || !tokenInfo.accessToken) {
      return null;
    }
    return {
      accessToken: tokenInfo.accessToken || '',
      refreshToken: tokenInfo.refreshToken || '',
      expiryDateSeconds: tokenInfo.expiryDateSeconds || 0,
      tokenType: tokenInfo.tokenType || 'Bearer',
    };
  } catch {
    return null;
  }
}

let cachedIdeEmail: string | null = null;

export async function getIdeEmail(): Promise<string | null> {
  if (cachedIdeEmail) return cachedIdeEmail;
  try {
    const v = vscode as any;
    const rawStatus = await v.antigravityUnifiedStateSync?.UserStatus?.getUserStatus?.();
    if (!rawStatus || typeof rawStatus !== 'string') return null;

    const decoded = Buffer.from(rawStatus, 'base64').toString('utf-8');
    const match = decoded.match(new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'));
    if (match) {
      cachedIdeEmail = match[0];
      return cachedIdeEmail;
    }
    return null;
  } catch {
    return null;
  }
}
