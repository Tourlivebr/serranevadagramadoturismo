import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const astroEntry = path.join(projectRoot, 'node_modules', 'astro', 'astro.js');

const args = ['dev', ...process.argv.slice(2)];

const storeTmp = path.join(projectRoot, '.astro', 'data-store.json.tmp');
const store = path.join(projectRoot, '.astro', 'data-store.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function safeRemove(filePath) {
  try {
    await rm(filePath, { force: true });
  } catch {
  }
}

async function cleanDataStore() {
  await safeRemove(storeTmp);
  await safeRemove(store);
}

async function runWithRetries(maxRetries) {
  let attempt = 0;

  while (attempt <= maxRetries) {
    let stderrBuffer = '';

    const child = spawn(process.execPath, [astroEntry, ...args], {
      cwd: projectRoot,
      stdio: ['inherit', 'inherit', 'pipe'],
    });

    child.stderr.on('data', (chunk) => {
      const text = chunk.toString();
      stderrBuffer += text;
      process.stderr.write(text);
    });

    const exitCode = await new Promise((resolve) => {
      child.on('close', resolve);
    });

    if (exitCode === 0) {
      process.exit(0);
    }

    const isWindowsRenameEperm =
      process.platform === 'win32' &&
      stderrBuffer.includes('EPERM') &&
      stderrBuffer.includes('data-store.json.tmp') &&
      stderrBuffer.includes('data-store.json');

    if (!isWindowsRenameEperm) {
      process.exit(exitCode ?? 1);
    }

    attempt += 1;
    if (attempt > maxRetries) {
      process.exit(exitCode ?? 1);
    }

    await cleanDataStore();
    await sleep(750);
  }
}

await runWithRetries(3);
