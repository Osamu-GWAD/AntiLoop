const { test } = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const loadTs = require('./load-ts.cjs');

class Socket extends EventEmitter {
  destroyed = false;
  setEncoding() {}
  write(data, cb) { cb?.(); return true; }
  destroy() { this.destroyed = true; this.emit('close'); }
}

function client() {
  const { DaemonClient } = loadTs('src/daemonClient.ts');
  return new DaemonClient('/test-extension', { appendLine() {} });
}

test('dispose rejects in-flight account changes immediately', async () => {
  const c = client();
  c.attachSocket(new Socket(), 0);
  const request = c.send('selectAccount', { id: 2 });
  c.dispose();
  await assert.rejects(request, /disposed/);
  assert.equal(c.pendingRequests.size, 0);
});

test('new connection discards a partial frame from the old daemon', async () => {
  const c = client();
  const old = new Socket();
  c.attachSocket(old, 0);
  old.emit('data', '{"jsonrpc":');
  const fresh = new Socket();
  c.attachSocket(fresh, 0);
  const request = c.send('selectAccount', { id: 2 });
  fresh.emit('data', '{"id":1,"result":{"currentEmail":"b@example.com"}}\n');
  assert.equal((await request).currentEmail, 'b@example.com');
  old.destroy();
  assert.equal(c.isRunning, true);
  c.dispose();
});

test('reconnection continues after a failed attempt', async () => {
  const c = client();
  c.restartDelays.fill(1);
  let attempts = 0;
  c.doConnect = async () => {
    attempts++;
    if (attempts < 3) throw new Error('temporarily unavailable');
    c.attachSocket(new Socket(), 0);
  };
  let timeout;
  try {
    await Promise.race([
      new Promise((resolve) => { c.setOnReady(resolve); c.scheduleReconnect(); }),
      new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error('reconnect did not recover')), 1000); }),
    ]);
    assert.equal(attempts, 3);
    assert.equal(c.isRunning, true);
  } finally { clearTimeout(timeout); c.dispose(); }
});

test('stopped connection attempts cannot attach a socket', () => {
  const c = client();
  c.dispose();
  const late = new Socket();
  assert.throws(() => c.attachSocket(late, 0), /cancelled/);
  assert.equal(late.destroyed, true);
});
