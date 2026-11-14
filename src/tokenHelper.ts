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

function stripFieldFromProto(buf: Buffer, fieldToDrop: number): Buffer {
  const parts: Buffer[] = [];
  let i = 0;
  while (i < buf.length) {
    const start = i;
    let key = 0;
    let shift = 0;
    while (i < buf.length) {
      const b = buf[i++];
      key |= (b & 0x7f) << shift;
      if ((b & 0x80) === 0) break;
      shift += 7;
    }
    const fieldNum = key >> 3;
    const wireType = key & 0x7;
    if (wireType === 0) {
      while (i < buf.length) {
        const b = buf[i++];
        if ((b & 0x80) === 0) break;
      }
    } else if (wireType === 2) {
      let len = 0;
      shift = 0;
      while (i < buf.length) {
        const b = buf[i++];
        len |= (b & 0x7f) << shift;
        if ((b & 0x80) === 0) break;
        shift += 7;
      }
      i += len;
    } else if (wireType === 1) {
      i += 8;
    } else if (wireType === 5) {
      i += 4;
    } else {
      break;
    }
    if (fieldNum !== fieldToDrop) {
      parts.push(buf.subarray(start, i));
    }
  }
  return Buffer.concat(parts);
}

function encodeVarint(val: number): Buffer {
  const bytes: number[] = [];
  let v = val;
  while (v >= 0x80) {
    bytes.push((v & 0x7f) | 0x80);
    v >>>= 7;
  }
  bytes.push(v & 0x7f);
  return Buffer.from(bytes);
}

function encodeLengthDelimited(fieldNum: number, payload: Buffer): Buffer {
  const tag = encodeVarint((fieldNum << 3) | 2);
  const len = encodeVarint(payload.length);
  return Buffer.concat([tag, len, payload]);
}

export function encodeUserStatus(email: string, name?: string, existingBase64?: string): string {
  const userName = name || email.split('@')[0];
  const nameBuf = Buffer.from(userName, 'utf8');
  const emailBuf = Buffer.from(email, 'utf8');

  // If existing protobuf data is provided, preserve fields (especially field 33 cascadeModelConfigData, field 8 userTier)
  if (existingBase64) {
    try {
      const raw = Buffer.from(existingBase64, 'base64');
      const preservedChunks: Buffer[] = [];
      let i = 0;
      while (i < raw.length) {
        const start = i;
        let key = 0;
        let shift = 0;
        while (i < raw.length) {
          const b = raw[i++];
          key |= (b & 0x7f) << shift;
          if ((b & 0x80) === 0) break;
          shift += 7;
        }
        const fieldNum = key >> 3;
        const wireType = key & 0x7;
        let subLen = 0;
        if (wireType === 0) {
          while (i < raw.length) {
            const b = raw[i++];
            if ((b & 0x80) === 0) break;
          }
        } else if (wireType === 2) {
          shift = 0;
          while (i < raw.length) {
            const b = raw[i++];
            subLen |= (b & 0x7f) << shift;
            if ((b & 0x80) === 0) break;
            shift += 7;
          }
          i += subLen;
        } else if (wireType === 1) {
          i += 8;
        } else if (wireType === 5) {
          i += 4;
        } else {
          break;
        }

        // Keep all fields EXCEPT field 1 (pro), field 3 (name), and field 7 (email) which we overwrite
        if (fieldNum !== 1 && fieldNum !== 3 && fieldNum !== 7) {
          if (fieldNum === 33 && wireType === 2) {
            try {
              // Strip field 6 (errorMessage) from cascadeModelConfigData so stale error banners are never preserved
              const payload = raw.subarray(i - subLen, i);
              const cleaned = stripFieldFromProto(payload, 6);
              if (cleaned.length > 0) {
                preservedChunks.push(encodeLengthDelimited(33, cleaned));
              }
            } catch {
              preservedChunks.push(raw.subarray(start, i));
            }
          } else {
            preservedChunks.push(raw.subarray(start, i));
          }
        }
      }

      const parts: Buffer[] = [
        Buffer.from([0x08, 0x01]),
        ...preservedChunks,
        Buffer.from([0x1a, nameBuf.length]),
        nameBuf,
        Buffer.from([0x3a, emailBuf.length]),
        emailBuf,
      ];
      return Buffer.concat(parts).toString('base64');
    } catch {}
  }

  const parts: Buffer[] = [];
  // Field 1: pro (bool = true) -> tag (1 << 3) | 0 = 0x08, value 0x01
  parts.push(Buffer.from([0x08, 0x01]));

  // Field 3: name (string) -> tag (3 << 3) | 2 = 0x1a, length varint
  parts.push(Buffer.from([0x1a, nameBuf.length]), nameBuf);

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

    // 3. Update UserStatus with active user email & name (preserving existing model config data)
    if (next.email) {
      try {
        let existingBase64: string | undefined;
        try {
          const raw = await sync.UserStatus?.getUserStatus?.();
          if (typeof raw === 'string' && raw.length > 0) {
            existingBase64 = raw;
          }
        } catch {}

        await sync.pushUpdate?.({
          topicName: 'uss-userStatus',
          appliedUpdate: {
            key: 'userStatusSentinelKey',
            newRow: {
              value: encodeUserStatus(next.email, undefined, existingBase64),
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
