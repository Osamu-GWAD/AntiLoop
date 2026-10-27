import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

function log(msg: string) {
  console.log(`[antiloop-uninstall] ${msg}`);
}

function getSettingsFromBreadcrumb(): string | null {
  try {
    const metaPath = path.join(__dirname, '..', '.cleanup-meta.json');
    if (!fs.existsSync(metaPath)) return null;
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    if (meta.settingsPath && fs.existsSync(meta.settingsPath)) {
      return meta.settingsPath;
    }
  } catch {}
  return null;
}

function getPotentialSettingsPaths(): string[] {
  const home = os.homedir();
  const list: string[] = [];

  const portable = process.env.VSCODE_PORTABLE;
  if (portable) {
    list.push(path.join(portable, 'user-data', 'User', 'settings.json'));
  }

  const appNames = [
    'Antigravity IDE',
    'antigravity-ide',
    'Antigravity',
    'Code',
    'Code - Insiders',
    'Cursor',
    'VSCodium',
  ];
  switch (process.platform) {
    case 'darwin':
      for (const name of appNames) {
        list.push(path.join(home, 'Library', 'Application Support', name, 'User', 'settings.json'));
      }
      break;
    case 'win32': {
      const appdata = process.env.APPDATA || path.join(home, 'AppData', 'Roaming');
      for (const name of appNames) {
        list.push(path.join(appdata, name, 'User', 'settings.json'));
      }
      break;
    }
    case 'linux':
      for (const name of appNames) {
        list.push(path.join(home, '.config', name, 'User', 'settings.json'));
      }
      break;
  }
  return list;
}

function cleanSettingsFile(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf-8');
  const regex = new RegExp('^[ \\t]*(?:\\/\\/\\s*)?"jetski\\.cloudCodeUrl"\\s*:.*(?:,?\\s*\\r?\\n|\\r?\\n)?', 'gm');
  if (content.search(regex) === -1) return false;

  regex.lastIndex = 0;
  let cleaned = content.replace(regex, '');
  cleaned = cleaned.replace(new RegExp(',(\\s*\\r?\\n\\s*[}\\]])', 'g'), '$1');
  fs.writeFileSync(filePath, cleaned, 'utf-8');
  return true;
}

try {
  const crumb = getSettingsFromBreadcrumb();
  if (crumb) {
    if (cleanSettingsFile(crumb)) {
      log(`Cleaned jetski.cloudCodeUrl from ${crumb}`);
    }
  } else {
    log('No breadcrumb found, trying common settings paths...');
    for (const p of getPotentialSettingsPaths()) {
      try {
        if (cleanSettingsFile(p)) {
          log(`Cleaned jetski.cloudCodeUrl from ${p}`);
        }
      } catch (err: any) {
        log(`Skipped ${p}: ${err.message}`);
      }
    }
  }
} catch (err: any) {
  log(`Uninstall cleanup failed (non-critical): ${err.message}`);
}
