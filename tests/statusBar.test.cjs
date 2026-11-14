const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');

test('quota from another account cannot replace the selected account quota', () => {
  const { StatusBarManager } = loadTs('src/statusBar.ts', { vscode: {
    window: { createStatusBarItem: () => ({ text: '', show() {}, hide() {} }) },
    StatusBarAlignment: { Left: 1 },
    ThemeColor: class {},
    MarkdownString: class { appendMarkdown() {} },
  } });
  const status = new StatusBarManager({ subscriptions: [] });
  status.updateStatus('active', 'a@example.com', 'pro', 'local');
  status.handleQuotaUpdate({ families: [{ name: 'claude', label: 'Claude', percent: 80 }] }, 'a@example.com');
  const displayed = status.quotaBarItem.text;
  status.handleQuotaUpdate({ families: [{ name: 'claude', label: 'Claude', percent: 0 }] }, 'b@example.com');
  assert.equal(status.quotaBarItem.text, displayed);
  status.updateStatus('active', 'b@example.com', 'pro', 'local');
  assert.equal(status.hasCachedQuota(), false);
  assert.doesNotMatch(status.quotaBarItem.text, /80%/);
});
