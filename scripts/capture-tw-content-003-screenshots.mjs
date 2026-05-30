/**
 * TW-CONTENT-003 — library review screenshots (desktop).
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs/screenshots/tw-content-003');
const base = process.env.PREVIEW_URL?.replace(/\/$/, '') ?? 'http://127.0.0.1:4321';

const pages = [
  { name: '01-home', path: '/' },
  { name: '02-research-catalog', path: '/research' },
  { name: '03-research-article', path: '/research/family-memory-third-generation' },
  { name: '04-essays-empty', path: '/essays' },
  { name: '05-articles-empty', path: '/articles' },
  { name: '06-navigation', path: '/', captureHeader: true },
];

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Preview not ready at ${url}`);
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

  for (const shot of pages) {
    const file = path.join(outDir, `desktop-${shot.name}.png`);
    await page.goto(`${base}${shot.path}`, { waitUntil: 'networkidle' });

    if (shot.captureHeader) {
      const header = page.locator('header').first();
      const footer = page.locator('footer').first();
      await header.scrollIntoViewIfNeeded();
      const h = await header.boundingBox();
      const f = await footer.boundingBox();
      if (h && f) {
        await page.screenshot({
          path: file,
          clip: {
            x: 0,
            y: 0,
            width: 1440,
            height: Math.min(f.y + f.height + 8, 900),
          },
        });
      } else {
        await page.screenshot({ path: file, fullPage: false });
      }
    } else if (shot.path.includes('family-memory')) {
      await page.screenshot({
        path: file,
        clip: { x: 0, y: 0, width: 1440, height: 1200 },
      });
    } else {
      await page.screenshot({ path: file, fullPage: true });
    }
    console.log('wrote', file);
  }

  await browser.close();
  if (preview) preview.kill('SIGTERM');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
