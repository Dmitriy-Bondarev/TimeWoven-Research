/**
 * TW-CONTENT-002C-FIXA — final polish review screenshots (desktop).
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs/screenshots/tw-content-002c-fixa');
const articleUrl =
  process.env.PREVIEW_URL ?? 'http://127.0.0.1:4321/research/family-memory-third-generation';

const shots = [
  { name: '01-chapter-1-heading', selector: '.research-chapter >> nth=0' },
  { name: '02-lead-dropcap', selector: '.research-lead' },
  {
    name: '02b-block2-opening-no-dropcap',
    selector: 'p.research-p:has-text("Опираясь на социологический фундамент")',
  },
  { name: '03-sources-section', selector: '.research-sources' },
  { name: '04-author-block', selector: '.research-author' },
  { name: '05-cta-block', selector: '.research-cta' },
];

async function waitForServer(base, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      if ((await fetch(base)).ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Preview not ready at ${base}`);
}

async function main() {
  let preview;
  if (!process.env.PREVIEW_URL) {
    preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4321'], {
      cwd: root,
      stdio: 'pipe',
      shell: true,
    });
    await waitForServer('http://127.0.0.1:4321');
  }

  const { chromium } = await import('playwright');
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(articleUrl, { waitUntil: 'networkidle' });

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

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
