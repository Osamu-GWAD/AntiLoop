const esbuild = require('esbuild');

const isProd = process.argv.includes('--production');
const isWatch = process.argv.includes('--watch');

async function build() {
  const extensionConfig = {
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outfile: 'out/extension.js',
    external: ['vscode'],
    format: 'cjs',
    platform: 'node',
    target: 'node18',
    sourcemap: !isProd,
    minify: isProd,
    logLevel: 'info',
  };

  const uninstallConfig = {
    entryPoints: ['src/uninstall.ts'],
    bundle: true,
    outfile: 'out/uninstall.js',
    external: ['vscode'],
    format: 'cjs',
    platform: 'node',
    target: 'node18',
    sourcemap: !isProd,
    minify: isProd,
    logLevel: 'info',
  };

  if (isWatch) {
    const extCtx = await esbuild.context(extensionConfig);
    const unCtx = await esbuild.context(uninstallConfig);
    await Promise.all([extCtx.watch(), unCtx.watch()]);
    console.log('Watching for changes...');
  } else {
    await Promise.all([
      esbuild.build(extensionConfig),
      esbuild.build(uninstallConfig),
    ]);
    console.log('Build complete.');
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
