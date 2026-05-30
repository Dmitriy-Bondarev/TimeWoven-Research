/**
 * TW-CONTENT-002C Phase 10 — capture review screenshots.
 * Usage: npm run build && node scripts/capture-tw-content-002c-screenshots.mjs
 * Requires: npx playwright install chromium (one-time)
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs/screenshots/tw-content-002c');
const baseUrl = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4321';

const routes = ['/', '/research', '/research/family-memory-third-generation'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

function slugForRoute(route) {
  if (route === '/') return 'home';
  return route.replace(/^\//, '').replace(/\//g, '-');
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Preview not ready at ${url}`);
}

function startPreview() {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4321'], {
      cwd: root,
      stdio: 'pipe',
      shell: true,
    });
    child.on('error', reject);
    resolve(child);
  });
}

async function main() {
  const useExternal = Boolean(process.env.PREVIEW_URL);
  let preview;

  if (!useExternal) {
    preview = await startPreview();
    await waitForServer(baseUrl);
  }

  const { chromium } = await import('playwright');
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch();
  try {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      for (const route of routes) {
        await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
        const file = path.join(outDir, `${vp.name}-${slugForRoute(route)}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log('wrote', file);
      }
      await context.close();
    }
  } finally {
    await browser.close();
    if (preview) preview.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
