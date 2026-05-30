/**
 * TW-CONTENT-002C-FIX — targeted review screenshots (desktop).
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs/screenshots/tw-content-002c-fix');
const url = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4321/research/family-memory-third-generation';

const shots = [
  { name: '01-footnotes', selector: '.research-cite-link' },
  { name: '02-table-assmann', selector: '.research-table-scroll' },
  { name: '03-table-superjob', selector: '.research-table-scroll >> nth=1' },
  { name: '04-case-block', selector: '.research-case' },
  { name: '05-sources', selector: '.research-sources' },
  { name: '06-author', selector: '.research-author' },
];

async function waitForServer(base, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(base);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Preview not ready at ${base}`);
}

function startPreview() {
  return spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4321'], {
    cwd: root,
    stdio: 'pipe',
    shell: true,
  });
}

async function main() {
  const useExternal = Boolean(process.env.PREVIEW_URL);
  let preview;
  if (!useExternal) {
    preview = await startPreview();
    await waitForServer('http://127.0.0.1:4321');
  }

  const { chromium } = await import('playwright');
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle' });

  for (const shot of shots) {
    const loc = page.locator(shot.selector).first();
    await loc.scrollIntoViewIfNeeded();
    const file = path.join(outDir, `desktop-${shot.name}.png`);
    await loc.screenshot({ path: file });
    console.log('wrote', file);
  }

  await browser.close();
  if (preview) preview.kill('SIGTERM');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
