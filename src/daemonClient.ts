import * as net from 'net';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as cp from 'child_process';
import * as vscode from 'vscode';
import { JsonRpcRequest, JsonRpcResponse } from './types';

export function readPortFile(storagePath: string, fileName: string): number {
  const filePath = path.join(storagePath, fileName);
  try {
    const content = fs.readFileSync(filePath, 'utf8').trim();
    const port = parseInt(content, 10);
    return isNaN(port) ? 0 : port;
  } catch {
    return 0;
  }
}

export function readDaemonPort(storagePath: string): number {
  return readPortFile(storagePath, 'daemon.port');
}

export function readAdminHttpPort(storagePath: string): number {
  return readPortFile(storagePath, 'daemon-http.port');
}

export function getPlatformBinaryName(platform: string, arch: string): string {
  let name = 'antiloop';
  if (platform === 'darwin') {
    name += arch === 'arm64' ? '-darwin-arm64' : '-darwin-amd64';
  } else if (platform === 'linux') {
    if (arch === 'arm64') {
      name += '-linux-arm64';
    } else if (arch === 'arm') {
      name += '-linux-arm';
    } else {
      name += '-linux-amd64';
    }
  } else if (platform === 'win32') {
    name += arch === 'arm64' ? '-windows-arm64.exe' : '-windows-amd64.exe';
  }
  return name;
}

export class DaemonClient {
  public extensionPath: string;
  public socket: net.Socket | null = null;
  private nextId = 1;
  private pendingRequests = new Map<
    number,
    { resolve: (val: any) => void; reject: (err: Error) => void; timer: NodeJS.Timeout }
  >();
  private buffer = '';
  private notificationHandler: ((method: string, params: any) => void) | null = null;
  private disposed = false;
  private intentionalStop = false;
  private crashCount = 0;
  private readonly maxCrashRestarts = 5;
  private readonly restartDelays = [1000, 2000, 4000, 8000, 15000];
  private onReadyCallback: (() => void) | null = null;
  private onDeadCallback: (() => void) | null = null;
  public storagePath = '';
  private connectPromise: Promise<void> | null = null;
  private outputChannel: vscode.OutputChannel;

  constructor(extensionPath: string, outputChannel: vscode.OutputChannel) {
    this.extensionPath = extensionPath;
    this.outputChannel = outputChannel;
  }

  public get isRunning(): boolean {
    return this.socket !== null && !this.socket.destroyed;
  }

  public log(msg: string) {
    const time = new Date().toISOString().substring(11, 23);
    this.outputChannel.appendLine(`[${time}] ${msg}`);
  }

  public setOnReady(cb: () => void) {
    this.onReadyCallback = cb;
  }

  public setOnDead(cb: () => void) {
    this.onDeadCallback = cb;
  }

  public resetCrashCount() {
    this.crashCount = 0;
  }

  public onNotification(handler: (method: string, params: any) => void) {
    this.notificationHandler = handler;
  }

  public getBinaryName(): string {
    const platform = os.platform();
    const arch = os.arch();
    const targeted = getPlatformBinaryName(platform, arch);
    const targetPath = path.join(this.extensionPath, 'go-core', 'bin', targeted);
    if (fs.existsSync(targetPath)) {
      return targeted;
    }
    return platform === 'win32' ? 'antiloop.exe' : 'antiloop';
  }

  public getBinaryPath(): string {
    return path.join(this.extensionPath, 'go-core', 'bin', this.getBinaryName());
  }

  public async connect(storagePath: string): Promise<void> {
    if (this.socket) {
      this.log('Already connected to daemon');
      return;
    }
    if (this.connectPromise) {
      return this.connectPromise;
    }
    this.connectPromise = this.doConnect(storagePath).catch((err) => {
      this.connectPromise = null;
      throw err;
    });
    return this.connectPromise;
  }

  private async doConnect(storagePath: string): Promise<void> {
    this.storagePath = storagePath;
    const existingPort = readDaemonPort(storagePath);
    if (existingPort > 0) {
      const opts = { port: existingPort, host: '127.0.0.1' };
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          this.socket = await this.tryConnect(opts);
          this.log(`Connected to existing daemon at 127.0.0.1:${existingPort} (attempt ${attempt + 1})`);
          this.setupSocketHandlers();
          this.crashCount = 0;
          this.intentionalStop = false;
          return;
        } catch {
          if (attempt < 1) {
            this.log(`Connect attempt ${attempt + 1} to port ${existingPort} failed, retrying...`);
            await new Promise((r) => setTimeout(r, 200));
          }
        }
      }
      this.log(`Stale port file (port=${existingPort}), spawning fresh daemon...`);
    }

    this.log('No existing daemon found, spawning fresh...');
    this.spawnDaemon(storagePath);
    this.socket = await this.waitForDaemon(storagePath, 50, 200);
    this.log('Connected to new daemon');
    this.setupSocketHandlers();
    this.crashCount = 0;
    this.intentionalStop = false;
  }

  private tryConnect(opts: { port: number; host: string }): Promise<net.Socket> {
    return new Promise((resolve, reject) => {
      const sock = net.connect(opts.port, opts.host);
      const timer = setTimeout(() => {
        sock.destroy();
        reject(new Error('Connection timeout'));
      }, 2000);

      sock.once('connect', () => {
        clearTimeout(timer);
        resolve(sock);
      });
      sock.once('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  private async waitForDaemon(storagePath: string, retries: number, delayMs: number): Promise<net.Socket> {
    for (let i = 0; i < retries; i++) {
      const port = readDaemonPort(storagePath);
      if (port > 0) {
        try {
          const sock = await this.tryConnect({ port, host: '127.0.0.1' });
          this.log(`Daemon connectable on port ${port} (attempt ${i + 1}/${retries})`);
          return sock;
        } catch {}
      }
      await new Promise((r) => setTimeout(r, delayMs));
    }
    throw new Error(`Daemon not connectable after ${retries} retries (${((retries * delayMs) / 1000).toFixed(0)}s)`);
  }

  public spawnDaemon(storagePath: string) {
    const binPath = this.getBinaryPath();
    this.log(`Spawning daemon: ${binPath} ${storagePath}`);
    fs.mkdirSync(storagePath, { recursive: true });

    const logFile = path.join(storagePath, 'daemon.log');
    const logFd = fs.openSync(logFile, 'a');
    this.log(`Daemon log: ${logFile}`);

    const spawnOpts: cp.SpawnOptions = {
      detached: true,
      stdio: ['ignore', 'ignore', logFd],
    };
    if (process.platform === 'win32') {
      (spawnOpts as any).windowsHide = true;
    }

    const proc = cp.spawn(binPath, [storagePath], spawnOpts);
    proc.unref();
    fs.closeSync(logFd);

    proc.on('error', (err) => {
      this.log(`Daemon spawn error: ${err.message}`);
    });
  }

  private setupSocketHandlers() {
    if (!this.socket) return;

    this.socket.on('data', (chunk: Buffer) => {
      this.handleData(chunk.toString('utf8'));
    });

    this.socket.on('close', () => {
      this.log('Daemon connection closed');
      this.socket = null;
      this.connectPromise = null;

      if (this.intentionalStop) {
        this.intentionalStop = false;
        for (const [, req] of this.pendingRequests) {
          clearTimeout(req.timer);
        }
        this.pendingRequests.clear();
        this.log('Intentional stop — skipping auto-reconnect');
        return;
      }

      for (const [, req] of this.pendingRequests) {
        clearTimeout(req.timer);
        req.reject(new Error('Daemon connection closed'));
      }
      this.pendingRequests.clear();

      if (this.disposed) return;

      this.crashCount++;
      if (this.crashCount <= this.maxCrashRestarts) {
        const delay = this.restartDelays[this.crashCount - 1] || 10000;
        this.log(`Disconnect #${this.crashCount}/${this.maxCrashRestarts}, reconnecting in ${delay}ms...`);
        setTimeout(async () => {
          if (this.disposed) return;
          try {
            await this.connect(this.storagePath);
            this.log('Reconnected successfully');
            this.onReadyCallback?.();
          } catch {
            this.log('Reconnect failed');
            if (this.crashCount >= this.maxCrashRestarts) {
              this.onDeadCallback?.();
            }
          }
        }, delay);
      } else {
        this.log(`Max reconnect attempts (${this.maxCrashRestarts}) exceeded`);
        this.onDeadCallback?.();
      }
    });

    this.socket.on('error', (err) => {
      this.log(`Socket error: ${err.message}`);
    });
  }

  private handleData(incoming: string) {
    const raw = (this.buffer + incoming).split('\n');
    this.buffer = raw.pop() || '';

    for (const line of raw) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const msg: JsonRpcResponse = JSON.parse(trimmed);
        if (msg.id !== undefined && msg.id !== null) {
          const pending = this.pendingRequests.get(msg.id);
          if (pending) {
            clearTimeout(pending.timer);
            this.pendingRequests.delete(msg.id);
            if (msg.error) {
              this.log(`← Error (id=${msg.id}): ${msg.error.message}`);
              pending.reject(new Error(msg.error.message));
            } else {
              this.log(`← OK (id=${msg.id})`);
              pending.resolve(msg.result);
            }
          }
        } else if (msg.method) {
          this.log(`← Notification: ${msg.method}`);
          this.notificationHandler?.(msg.method, msg.params);
        }
      } catch (err: any) {
        this.log(`Failed to parse daemon message: ${line}`);
      }
    }
  }

  public async send(method: string, params?: any, timeoutMs = 30000): Promise<any> {
    if (this.connectPromise) {
      await this.connectPromise;
    }
    if (!this.socket || this.socket.destroyed) {
      throw new Error('Not connected to daemon');
    }

    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pendingRequests.delete(id);
        reject(new Error(`Request ${method} timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      this.pendingRequests.set(id, { resolve, reject, timer });
      const req: JsonRpcRequest = {
        jsonrpc: '2.0',
        id,
        method,
        params,
      };
      this.socket!.write(JSON.stringify(req) + '\n');
      this.log(`→ ${method} (id=${id})`);
    });
  }

  public async stop(): Promise<void> {
    if (this.socket) {
      this.intentionalStop = true;
      try {
        await this.send('shutdown', undefined, 3000);
      } catch {}
      if (this.socket) {
        this.socket.destroy();
        this.socket = null;
      }
      this.connectPromise = null;
    }
  }

  public dispose() {
    this.disposed = true;
    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
    }
  }
}
