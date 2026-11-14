const { buildSync } = require('esbuild');
const { createRequire } = require('node:module');
const path = require('node:path');
const vm = require('node:vm');

module.exports = function loadTs(entry, mocks = {}) {
  const filename = path.resolve(__dirname, '..', entry);
  const result = buildSync({ entryPoints: [filename], bundle: true, write: false, platform: 'node', format: 'cjs', external: ['vscode'] });
  const actualRequire = createRequire(filename);
  const mod = { exports: {} };
  const context = { module: mod, exports: mod.exports, require: (name) => Object.hasOwn(mocks, name) ? mocks[name] : actualRequire(name), console, Buffer, process, setTimeout, clearTimeout, setInterval, clearInterval, URL };
  vm.runInNewContext(result.outputFiles[0].text, context, { filename });
  return mod.exports;
};
