import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
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

export interface ActiveIdeToken {
  accessToken: string;
  refreshToken?: string;
  expiryDateSeconds?: number;
  email: string;
}

let tokenWrite: Promise<void> = Promise.resolve();
let cachedIdeAccount: { accessToken: string; email: string } | null = null;

export function waitForIdeTokenUpdate(): Promise<void> {
  return tokenWrite;
}

export function encodeUserStatus(email: string, name?: string): string {
  const parts: Buffer[] = [];
  // Field 1: pro (bool = true) -> tag (1 << 3) | 0 = 0x08, value 0x01
  parts.push(Buffer.from([0x08, 0x01]));

  const userName = name || email.split('@')[0];
  const nameBuf = Buffer.from(userName, 'utf8');
  // Field 3: name (string) -> tag (3 << 3) | 2 = 0x1a, length varint
  parts.push(Buffer.from([0x1a, nameBuf.length]), nameBuf);

  const emailBuf = Buffer.from(email, 'utf8');
  // Field 7: email (string) -> tag (7 << 3) | 2 = 0x3a, length varint
  parts.push(Buffer.from([0x3a, emailBuf.length]), emailBuf);

  return Buffer.concat(parts).toString('base64');
}

export function setIdeToken(tokenInfo: ActiveIdeToken): Promise<void> {
  const next = { ...tokenInfo };
  const write = tokenWrite.catch(() => {}).then(async () => {
    if (!next.accessToken) throw new Error('Cannot switch to an empty access token');
    const sync = (vscode as any).antigravityUnifiedStateSync;
    if (!sync?.OAuthPreferences?.setOAuthTokenInfo) {
      throw new Error('The IDE does not expose its account token update API');
    }

    // 1. Update OAuth Token
    await sync.OAuthPreferences.setOAuthTokenInfo({
      accessToken: next.accessToken,
      refreshToken: next.refreshToken || '',
      expiryDateSeconds: next.expiryDateSeconds || Math.floor(Date.now() / 1000) + 3600,
      tokenType: 'Bearer',
    });

    // 2. Ensure auth state in uss-oauth is marked as signedIn
    try {
      await sync.pushUpdate?.({
        topicName: 'uss-oauth',
        appliedUpdate: {
          key: 'authStateWithContextSentinelKey',
          newRow: {
            value: JSON.stringify({
              state: 'signedIn',
              context: {
                project: '',
                showProjectError: false,
                errorMessage: '',
                ineligibleMessage: '',
                verificationUrl: '',
                isGcpTos: false,
                browserOpenFailed: false,
                appealUrl: '',
                appealLinkText: '',
              },
            }),
            eTag: 0,
          },
        },
      });
    } catch (err: any) {
      console.error(`[tokenHelper] Failed to update authStateWithContext: ${err.message}`);
    }

    // 3. Update UserStatus with active user email & name (without wiping status)
    if (next.email) {
      try {
        await sync.pushUpdate?.({
          topicName: 'uss-userStatus',
          appliedUpdate: {
            key: 'userStatusSentinelKey',
            newRow: {
              value: encodeUserStatus(next.email),
              eTag: 0,
            },
          },
        });
      } catch (err: any) {
        console.error(`[tokenHelper] Failed to update userStatus: ${err.message}`);
      }
    }

    // 4. Sync ~/.gemini/jetski-standalone-oauth-token for CLI/language server fallback
    if (next.email && next.accessToken) {
      try {
        const geminiDir = path.join(os.homedir(), '.gemini');
        if (!fs.existsSync(geminiDir)) {
          fs.mkdirSync(geminiDir, { recursive: true });
        }
        const tokenFile = path.join(geminiDir, 'jetski-standalone-oauth-token');
        let writerId = '1GJ6_-43mI_KcAO22uF6Lg';
        if (fs.existsSync(tokenFile)) {
          try {
            const old = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
            if (old.writer_id) writerId = old.writer_id;
          } catch {}
        }
        const expSec = next.expiryDateSeconds || Math.floor(Date.now() / 1000) + 3600;
        const expDate = new Date(expSec * 1000);
        const payload = {
          token: {
            access_token: next.accessToken,
            token_type: 'Bearer',
            refresh_token: next.refreshToken || '',
            expiry: expDate.toISOString(),
            expires_in: Math.max(0, expSec - Math.floor(Date.now() / 1000)),
          },
          auth_method: 'consumer',
          id_token_email: next.email,
          writer_id: writerId,
        };
        fs.writeFileSync(tokenFile, JSON.stringify(payload, null, 2), { encoding: 'utf8', mode: 0o600 });
      } catch (err: any) {
        console.error(`[tokenHelper] Failed to sync standalone token file: ${err.message}`);
      }
    }

    cachedIdeAccount = next.email ? { accessToken: next.accessToken, email: next.email } : null;
  });
  tokenWrite = write;
  return write;
}

export async function getIdeEmail(token?: IdeTokenInfo | null): Promise<string | null> {
  const currentToken = token === undefined ? await getIdeToken() : token;
  if (!currentToken?.accessToken) {
    cachedIdeAccount = null;
    return null;
  }
  if (cachedIdeAccount?.accessToken === currentToken.accessToken) {
    return cachedIdeAccount.email;
  }
  cachedIdeAccount = null;

  // 1. Check UserStatus via Unified State Sync
  try {
    const v = vscode as any;
    const rawStatus = await v.antigravityUnifiedStateSync?.UserStatus?.getUserStatus?.();
    if (rawStatus && typeof rawStatus === 'string') {
      const decoded = Buffer.from(rawStatus, 'base64').toString('utf-8');
      const match = decoded.match(new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'));
      if (match) {
        cachedIdeAccount = { accessToken: currentToken.accessToken, email: match[0] };
        return match[0];
      }
    }
  } catch {}

  // 2. Check standalone token file
  try {
    const tokenFile = path.join(os.homedir(), '.gemini', 'jetski-standalone-oauth-token');
    if (fs.existsSync(tokenFile)) {
      const data = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
      if (data?.token?.access_token === currentToken.accessToken && data?.id_token_email) {
        cachedIdeAccount = { accessToken: currentToken.accessToken, email: data.id_token_email };
        return data.id_token_email;
      }
    }
  } catch {}

  // 3. Check JWT payload of accessToken
  try {
    const parts = currentToken.accessToken.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
      if (payload.email) {
        cachedIdeAccount = { accessToken: currentToken.accessToken, email: payload.email };
        return payload.email;
      }
    }
  } catch {}

  return null;
}
