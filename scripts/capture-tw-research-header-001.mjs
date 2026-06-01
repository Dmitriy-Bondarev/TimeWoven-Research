/**
 * TW-RESEARCH-HEADER-001 — header + language switcher variant screenshots.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs/screenshots/tw-research-header-001');
const site = (process.env.SITE_URL ?? 'http://127.0.0.1:4321').replace(/\/+$/, '');

const variants = ['reference', '1', '2', '3'];
const viewports = {
  desktop: { width: 1440, height: 220 },
  mobile: { width: 390, height: 280 },
};

async function shotHeader(page, selector, file) {
  const header = page.locator(selector).locator('header').first();
  await header.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  const box = await header.boundingBox();
  if (box) {
    await page.screenshot({
      path: file,
      clip: { x: 0, y: Math.max(0, box.y - 2), width: box.width, height: Math.ceil(box.height + 4) },
    });
  } else {
    await header.screenshot({ path: file });
  }
  console.log('wrote', file);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();

  for (const v of variants) {
    for (const [suffix, vp] of Object.entries(viewports)) {
      const page = await browser.newPage({ viewport: vp });
      await page.goto(`${site}/preview/header-lang-variants#variant-${v}`, {
        waitUntil: 'networkidle',
      });
      await shotHeader(
        page,
        `#variant-${v}`,
        path.join(outDir, `header-variant-${v}-${suffix}.png`),
      );
      await page.close();
    }
  }

  const prod = await browser.newPage({ viewport: viewports.desktop });
  await prod.goto(`${site}/`, { waitUntil: 'networkidle' });
  await shotHeader(prod, 'body', path.join(outDir, 'header-production-desktop.png'));
  await prod.close();

  const prodM = await browser.newPage({ viewport: viewports.mobile });
  await prodM.goto(`${site}/`, { waitUntil: 'networkidle' });
  await shotHeader(prodM, 'body', path.join(outDir, 'header-production-mobile.png'));
  await prodM.close();

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
