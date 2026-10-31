import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

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

export async function setIdeToken(tokenInfo: {
  accessToken: string;
  refreshToken?: string;
  expiryDateSeconds?: number;
  email: string;
}): Promise<void> {
  if (!tokenInfo || !tokenInfo.accessToken) return;

  // 1. Sync to ~/.gemini/jetski-standalone-oauth-token (for Antigravity CLI / agy / language server)
  try {
    const geminiDir = path.join(os.homedir(), '.gemini');
    if (!fs.existsSync(geminiDir)) {
      fs.mkdirSync(geminiDir, { recursive: true });
    }
    const tokenFile = path.join(geminiDir, 'jetski-standalone-oauth-token');

    let writerId = '1GJ6_-43mI_KcAO22uF6Lg';
    if (fs.existsSync(tokenFile)) {
      try {
        const oldData = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
        if (oldData?.writer_id) {
          writerId = oldData.writer_id;
        }
      } catch {}
    }

    const expSec = tokenInfo.expiryDateSeconds || Math.floor(Date.now() / 1000) + 3600;
    const expDate = new Date(expSec * 1000);
    const expiresIn = Math.max(0, expSec - Math.floor(Date.now() / 1000));

    const payload = {
      auth_method: 'consumer',
      id_token_email: tokenInfo.email,
      token: {
        access_token: tokenInfo.accessToken,
        expires_in: expiresIn,
        expiry: expDate.toISOString(),
        refresh_token: tokenInfo.refreshToken || '',
        token_type: 'Bearer',
      },
      writer_id: writerId,
    };
    fs.writeFileSync(tokenFile, JSON.stringify(payload, null, 2), 'utf8');
  } catch (err: any) {
    console.error(`[tokenHelper] Failed to write standalone oauth token: ${err.message}`);
  }

  // 2. Sync to vscode.antigravityUnifiedStateSync.OAuthPreferences (for IDE internal state)
  try {
    const v = vscode as any;
    if (v.antigravityUnifiedStateSync?.OAuthPreferences?.setOAuthTokenInfo) {
      await v.antigravityUnifiedStateSync.OAuthPreferences.setOAuthTokenInfo({
        accessToken: tokenInfo.accessToken,
        refreshToken: tokenInfo.refreshToken || '',
        expiryDateSeconds: tokenInfo.expiryDateSeconds || Math.floor(Date.now() / 1000) + 3600,
        tokenType: 'Bearer',
      });
    }
    if (v.antigravityUnifiedStateSync?.UserStatus?.clearUserStatus) {
      await v.antigravityUnifiedStateSync.UserStatus.clearUserStatus().catch(() => {});
    }
    if (tokenInfo.email) {
      cachedIdeEmail = tokenInfo.email;
    }
  } catch (err: any) {
    console.error(`[tokenHelper] Failed to update IDE state sync token: ${err.message}`);
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
