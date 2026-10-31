import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

function getHomeDir(): string {
  return process.env.HOME || process.env.USERPROFILE || '';
}

function getMcpConfigPath(): string {
  return path.join(getHomeDir(), '.gemini', 'config', 'mcp_config.json');
}

function getAgyBinPath(): string | null {
  const agyDefault = path.join(getHomeDir(), '.gemini', 'bin', 'agy');
  if (fs.existsSync(agyDefault)) {
    return agyDefault;
  }
  return null;
}

export function getObsidianStatus(context: vscode.ExtensionContext): { linked: boolean; vaultPath?: string } {
  const savedPath = context.globalState.get<string>('obsidianVaultPath');
  const mcpPath = getMcpConfigPath();
  if (fs.existsSync(mcpPath)) {
    try {
      const content = fs.readFileSync(mcpPath, 'utf-8');
      if (content.trim()) {
        const config = JSON.parse(content);
        if (config.mcpServers?.obsidian) {
          const args: string[] = config.mcpServers.obsidian.args || [];
          const vaultArg = args.find((a) => a.startsWith('vault=') || a.includes('='));
          const extractedPath = vaultArg ? vaultArg.split('=', 2)[1] : undefined;
          return {
            linked: true,
            vaultPath: extractedPath || savedPath,
          };
        }
      }
    } catch {
      // ignore parse error
    }
  }
  if (savedPath && fs.existsSync(savedPath)) {
    return { linked: true, vaultPath: savedPath };
  }
  return { linked: false };
}

export async function linkObsidianVault(
  context: vscode.ExtensionContext,
  customPath?: string
): Promise<string | null> {
  let vaultPath = customPath;

  if (!vaultPath) {
    const uris = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: 'Select Obsidian Vault',
      title: 'AntiLoop: Select Obsidian Vault for Zero-Hallucination Grounding',
    });

    if (uris && uris.length > 0) {
      vaultPath = uris[0].fsPath;
    } else {
      vaultPath = await vscode.window.showInputBox({
        title: 'AntiLoop: Link Obsidian Vault',
        prompt: 'Enter the absolute directory path to your Obsidian vault',
        placeHolder: '/home/username/Documents/Obsidian/MyVault',
        ignoreFocusOut: true,
      });
    }
  }

  if (!vaultPath || !vaultPath.trim()) {
    return null;
  }

  vaultPath = vaultPath.trim();

  if (!fs.existsSync(vaultPath)) {
    vscode.window.showErrorMessage(`AntiLoop: The specified directory does not exist: "${vaultPath}"`);
    return null;
  }

  const stat = fs.statSync(vaultPath);
  if (!stat.isDirectory()) {
    vscode.window.showErrorMessage(`AntiLoop: The specified path is not a directory: "${vaultPath}"`);
    return null;
  }

  // Ensure default zero-hallucination memory note exists in the vault
  const memoryNotePath = path.join(vaultPath, 'AntiLoop-Zero-Hallucination-Memory.md');
  if (!fs.existsSync(memoryNotePath)) {
    try {
      const initialContent = `# AntiLoop AI Grounding & Knowledge Bank
*Linked to Antigravity & Gemini via Model Context Protocol (obsidian-mcp) to eliminate hallucinations.*

## Grounding Protocol
1. **Source of Truth**: Any factual statements, workspace constraints, architecture designs, and historical project context documented here serve as the primary source of truth.
2. **Real-time Memory**: The AI retrieves existing notes with \`search_notes\` and \`read_note\` before answering, and records key verified decisions with \`append_note\` or \`update_note\`.
3. **Zero Hallucination**: When knowledge is not documented in this vault or the workspace, the AI reports it as unknown rather than fabricating details.

## Project Memory Log
- **Integration Initialized**: ${new Date().toISOString()}
- **Vault Location**: \`${vaultPath}\`
`;
      fs.writeFileSync(memoryNotePath, initialContent, 'utf-8');
    } catch (err: any) {
      // Non-fatal if read-only
    }
  }

  // Update mcp_config.json
  const mcpPath = getMcpConfigPath();
  const mcpDir = path.dirname(mcpPath);
  if (!fs.existsSync(mcpDir)) {
    fs.mkdirSync(mcpDir, { recursive: true });
  }

  let mcpConfig: any = { mcpServers: {} };
  if (fs.existsSync(mcpPath)) {
    try {
      const raw = fs.readFileSync(mcpPath, 'utf-8');
      if (raw.trim()) {
        mcpConfig = JSON.parse(raw);
      }
    } catch {
      mcpConfig = { mcpServers: {} };
    }
  }
  if (!mcpConfig.mcpServers || typeof mcpConfig.mcpServers !== 'object') {
    mcpConfig.mcpServers = {};
  }

  mcpConfig.mcpServers.obsidian = {
    command: 'npx',
    args: ['-y', 'obsidian-mcp', 'serve', '--vault', `vault=${vaultPath}`],
    disabled: false,
  };

  fs.writeFileSync(mcpPath, JSON.stringify(mcpConfig, null, 2), 'utf-8');

  // Also call agy mcp add if agy binary is present
  const agy = getAgyBinPath();
  if (agy) {
    exec(
      `"${agy}" mcp add obsidian npx -y obsidian-mcp serve --vault vault="${vaultPath}"`,
      (error) => {
        if (error) {
          // Non-fatal since mcp_config.json was already updated directly
        }
      }
    );
  }

  await context.globalState.update('obsidianVaultPath', vaultPath);

  vscode.window
    .showInformationMessage(
      `AntiLoop: Obsidian Vault successfully linked at "${path.basename(vaultPath)}"! Gemini is now grounded with zero hallucinations via Obsidian MCP.`,
      'Open Grounding Note'
    )
    .then((choice) => {
      if (choice === 'Open Grounding Note' && fs.existsSync(memoryNotePath)) {
        vscode.workspace.openTextDocument(memoryNotePath).then((doc) => {
          vscode.window.showTextDocument(doc);
        });
      }
    });

  return vaultPath;
}

export async function unlinkObsidianVault(context: vscode.ExtensionContext): Promise<boolean> {
  const mcpPath = getMcpConfigPath();
  if (fs.existsSync(mcpPath)) {
    try {
      const raw = fs.readFileSync(mcpPath, 'utf-8');
      if (raw.trim()) {
        const mcpConfig = JSON.parse(raw);
        if (mcpConfig.mcpServers?.obsidian) {
          delete mcpConfig.mcpServers.obsidian;
          fs.writeFileSync(mcpPath, JSON.stringify(mcpConfig, null, 2), 'utf-8');
        }
      }
    } catch {
      // ignore
    }
  }

  const agy = getAgyBinPath();
  if (agy) {
    exec(`"${agy}" mcp remove obsidian`, () => {});
  }

  await context.globalState.update('obsidianVaultPath', undefined);

  vscode.window.showInformationMessage('AntiLoop: Obsidian Vault unlinked from Gemini MCP.');
  return true;
}

export async function showObsidianStatusDialog(context: vscode.ExtensionContext): Promise<void> {
  const status = getObsidianStatus(context);
  if (status.linked && status.vaultPath) {
    const choice = await vscode.window.showInformationMessage(
      `AntiLoop: Obsidian Vault is ACTIVE for Zero-Hallucination Grounding.\nVault: ${status.vaultPath}`,
      'Open Note',
      'Change Vault',
      'Unlink Vault'
    );
    if (choice === 'Open Note') {
      const memoryNote = path.join(status.vaultPath, 'AntiLoop-Zero-Hallucination-Memory.md');
      if (fs.existsSync(memoryNote)) {
        vscode.workspace.openTextDocument(memoryNote).then((doc) => vscode.window.showTextDocument(doc));
      } else {
        vscode.window.showInformationMessage(`Vault path: ${status.vaultPath}`);
      }
    } else if (choice === 'Change Vault') {
      await linkObsidianVault(context);
    } else if (choice === 'Unlink Vault') {
      await unlinkObsidianVault(context);
    }
  } else {
    const choice = await vscode.window.showInformationMessage(
      'AntiLoop: No Obsidian vault currently linked for Zero-Hallucination Grounding.',
      'Link Vault Now'
    );
    if (choice === 'Link Vault Now') {
      await linkObsidianVault(context);
    }
  }
}
