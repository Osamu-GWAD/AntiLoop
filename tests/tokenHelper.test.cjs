const { test } = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');

test('rapid account changes apply IDE credentials in arrival order', async () => {
  const applied = [];
  let release;
  const blocked = new Promise((resolve) => { release = resolve; });
  const helper = loadTs('src/tokenHelper.ts', { vscode: { antigravityUnifiedStateSync: {
    OAuthPreferences: { async setOAuthTokenInfo(token) { if (token.accessToken === 'first') await blocked; applied.push(token.accessToken); } },
    UserStatus: { clearUserStatus() {} },
  } } });
  const first = helper.setIdeToken({ email: 'a@example.com', accessToken: 'first' });
  const second = helper.setIdeToken({ email: 'b@example.com', accessToken: 'second' });
  await new Promise(setImmediate);
  assert.deepEqual(applied, []);
  release();
  await Promise.all([first, second]);
  assert.deepEqual(applied, ['first', 'second']);
});

test('failed IDE update rejects and does not block the next switch', async () => {
  const applied = [];
  const helper = loadTs('src/tokenHelper.ts', { vscode: { antigravityUnifiedStateSync: {
    OAuthPreferences: { async setOAuthTokenInfo(token) { if (token.accessToken === 'broken') throw new Error('write failed'); applied.push(token.accessToken); } },
  } } });
  await assert.rejects(helper.setIdeToken({ email: 'a@example.com', accessToken: 'broken' }), /write failed/);
  await helper.setIdeToken({ email: 'b@example.com', accessToken: 'good' });
  assert.deepEqual(applied, ['good']);
});

test('cached IDE email is invalidated after sign-out or another token', async () => {
  let token = { accessToken: 'a' };
  let email = 'a@example.com';
  const helper = loadTs('src/tokenHelper.ts', { vscode: { antigravityUnifiedStateSync: {
    OAuthPreferences: { getOAuthTokenInfo: () => token },
    UserStatus: { getUserStatus: () => Buffer.from(email).toString('base64') },
  } } });
  assert.equal(await helper.getIdeEmail(), 'a@example.com');
  token = null;
  assert.equal(await helper.getIdeEmail(), null);
  token = { accessToken: 'b' };
  email = 'b@example.com';
  assert.equal(await helper.getIdeEmail(), 'b@example.com');
});

test('pushUpdate includes eTag: 0 so BigInt(eTag) does not throw', async () => {
  const updates = [];
  const helper = loadTs('src/tokenHelper.ts', { vscode: { antigravityUnifiedStateSync: {
    OAuthPreferences: { async setOAuthTokenInfo() {} },
    async pushUpdate(param) {
      // Simulate Antigravity IDE internal pushUpdate wrapper:
      assert.doesNotThrow(() => {
        BigInt(param.appliedUpdate.newRow.eTag);
      }, 'BigInt(eTag) must not throw');
      updates.push(param);
    },
  } } });

  await helper.setIdeToken({ email: 'test@example.com', accessToken: 'token123' });
  assert.equal(updates.length, 2);
  assert.equal(updates[0].topicName, 'uss-oauth');
  assert.equal(updates[0].appliedUpdate.newRow.eTag, 0);
  assert.equal(updates[1].topicName, 'uss-userStatus');
  assert.equal(updates[1].appliedUpdate.newRow.eTag, 0);
});
