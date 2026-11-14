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
    const port = Number(content);
    return Number.isInteger(port) && port > 0 && port <= 65535 ? port : 0;
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
  private reconnectTimer: NodeJS.Timeout | null = null;
  private connectionGeneration = 0;
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
    if (this.disposed) throw new Error('Daemon client is disposed');
    if (this.connectPromise) {
      return this.connectPromise;
    }
    if (this.isRunning) return;
    this.intentionalStop = false;
    this.cancelReconnect();
    const generation = this.connectionGeneration;
    const pending = this.doConnect(storagePath, generation).finally(() => {
      if (this.connectPromise === pending) this.connectPromise = null;
    });
    this.connectPromise = pending;
    return pending;
  }

  private async doConnect(storagePath: string, generation: number): Promise<void> {
    this.storagePath = storagePath;
    const existingPort = readDaemonPort(storagePath);
    if (existingPort > 0) {
      const opts = { port: existingPort, host: '127.0.0.1' };
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const socket = await this.tryConnect(opts);
          this.attachSocket(socket, generation);
          this.log(`Connected to existing daemon at 127.0.0.1:${existingPort} (attempt ${attempt + 1})`);
          return;
        } catch {
          this.checkConnectionGeneration(generation);
          if (attempt < 1) {
            this.log(`Connect attempt ${attempt + 1} to port ${existingPort} failed, retrying...`);
            await new Promise((r) => setTimeout(r, 200));
          }
        }
      }
      this.log(`Stale port file (port=${existingPort}), spawning fresh daemon...`);
    }

    this.log('No existing daemon found, spawning fresh...');
    this.checkConnectionGeneration(generation);
    this.spawnDaemon(storagePath);
    const socket = await this.waitForDaemon(storagePath, 50, 200, generation);
    this.attachSocket(socket, generation);
    this.log('Connected to new daemon');
  }

  private checkConnectionGeneration(generation: number) {
    if (this.disposed || generation !== this.connectionGeneration) {
      throw new Error('Daemon connection cancelled');
    }
  }

  private attachSocket(socket: net.Socket, generation: number) {
    try {
      this.checkConnectionGeneration(generation);
    } catch (err) {
      socket.destroy();
      throw err;
    }
    this.buffer = '';
    this.socket = socket;
    this.setupSocketHandlers(socket);
    this.crashCount = 0;
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

  private async waitForDaemon(storagePath: string, retries: number, delayMs: number, generation: number): Promise<net.Socket> {
    for (let i = 0; i < retries; i++) {
      this.checkConnectionGeneration(generation);
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

  private setupSocketHandlers(socket: net.Socket) {
    socket.setEncoding('utf8');
    socket.on('data', (chunk: string) => {
      if (this.socket === socket) this.handleData(chunk);
    });

    socket.on('close', () => {
      if (this.socket !== socket) return;
      this.log('Daemon connection closed');
      this.socket = null;
      this.buffer = '';
      this.rejectPending(new Error('Daemon connection closed'));

      if (this.intentionalStop) {
        this.log('Intentional stop, skipping auto-reconnect');
        return;
      }
      this.scheduleReconnect();
    });

    socket.on('error', (err) => {
      this.log(`Socket error: ${err.message}`);
    });
  }

  private rejectPending(error: Error) {
    for (const req of this.pendingRequests.values()) {
      clearTimeout(req.timer);
      req.reject(error);
    }
    this.pendingRequests.clear();
  }

  private cancelReconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
  }

  private scheduleReconnect() {
    if (this.disposed || this.intentionalStop || this.reconnectTimer) return;
    if (this.crashCount >= this.maxCrashRestarts) {
      this.log(`Max reconnect attempts (${this.maxCrashRestarts}) exceeded`);
      this.onDeadCallback?.();
      return;
    }
    const delay = this.restartDelays[this.crashCount++] || 10000;
    this.log(`Reconnect attempt ${this.crashCount}/${this.maxCrashRestarts} in ${delay}ms...`);
    this.reconnectTimer = setTimeout(async () => {
      this.reconnectTimer = null;
      if (this.disposed || this.intentionalStop) return;
      try {
        await this.connect(this.storagePath);
        this.log('Reconnected successfully');
        this.onReadyCallback?.();
      } catch {
        this.log('Reconnect failed');
        this.scheduleReconnect();
      }
    }, delay);
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
      const fail = (err: Error) => {
        clearTimeout(timer);
        this.pendingRequests.delete(id);
        reject(err);
      };
      try {
        this.socket!.write(JSON.stringify(req) + '\n', (err) => {
          if (err) fail(err);
        });
      } catch (err) {
        fail(err as Error);
      }
      this.log(`→ ${method} (id=${id})`);
    });
  }

  public async stop(): Promise<void> {
    this.intentionalStop = true;
    this.connectionGeneration++;
    this.cancelReconnect();
    this.connectPromise = null;
    const socket = this.socket;
    if (socket) {
      try {
        await this.send('shutdown', undefined, 3000);
      } catch {}
      if (!socket.destroyed) {
        await new Promise<void>((resolve) => {
          const timer = setTimeout(() => {
            socket.destroy();
            resolve();
          }, 1000);
          socket.once('close', () => {
            clearTimeout(timer);
            resolve();
          });
        });
      }
    }
    if (this.socket === socket) this.socket = null;
    this.buffer = '';
    this.rejectPending(new Error('Daemon stopped'));
  }

  public dispose() {
    this.disposed = true;
    this.connectionGeneration++;
    this.cancelReconnect();
    this.connectPromise = null;
    this.rejectPending(new Error('Daemon client disposed'));
    this.buffer = '';
    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
    }
  }
}
