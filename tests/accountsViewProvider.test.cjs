const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');

test('late state responses cannot undo a newer selected-account display', async () => {
  const { AccountsViewProvider } = loadTs('src/accountsViewProvider.ts', { vscode: {} });
  const queued = [];
  const messages = [];
  const provider = new AccountsViewProvider({}, () => true, () => new Promise((resolve) => queued.push(resolve)), () => '', async () => {}, () => {}, async () => {});
  provider.view = { webview: { postMessage: (message) => messages.push(message) } };
  const first = provider.pushFullState();
  const second = provider.pushFullState();
  queued[3]({ currentEmail: 'new@example.com' });
  queued[4]({ accounts: [] });
  queued[5]({ providers: [] });
  await second;
  queued[0]({ currentEmail: 'old@example.com' });
  queued[1]({ accounts: [] });
  queued[2]({ providers: [] });
  await first;
  assert.equal(messages.length, 1);
  assert.equal(messages[0].data.currentEmail, 'new@example.com');
});
