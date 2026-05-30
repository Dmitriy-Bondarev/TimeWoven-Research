/**
 * TW-CONTENT-003A-FIX-HEADER — header block at review breakpoints.
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs/screenshots/tw-content-003a-fix-header');
const base = process.env.PREVIEW_URL?.replace(/\/$/, '') ?? 'http://127.0.0.1:4321';

const widths = [1440, 1280, 1024, 768, 390];

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

  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 220 } });
    await page.goto(`${base}/research`, { waitUntil: 'networkidle' });
    const header = page.locator('header').first();
    await header.scrollIntoViewIfNeeded();
    const box = await header.boundingBox();
    const file = path.join(outDir, `header-${width}px.png`);
    if (box) {
      await page.screenshot({
        path: file,
        clip: { x: 0, y: 0, width, height: Math.ceil(box.height + 2) },
      });
    } else {
      await header.screenshot({ path: file });
    }
    console.log('wrote', file);
    await page.close();
  }

  await browser.close();
  if (preview) preview.kill('SIGTERM');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
