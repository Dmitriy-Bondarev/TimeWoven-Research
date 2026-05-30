/**
 * TW-CONTENT-002D — review screenshots (desktop).
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs/screenshots/tw-content-002d');
const url =
  process.env.PREVIEW_URL ?? 'http://127.0.0.1:4321/research/family-memory-third-generation';

const shots = [
  { name: '01-hero-lead', selector: '.research-hero, .research-lead' },
  { name: '02-chapter-opening', selector: '.research-lead, .research-chapter >> nth=0', clipLeadChapter: true },
  { name: '03-body-section', selector: '.research-prose > p.research-p >> nth=8' },
  { name: '04-case-block', selector: '.research-case >> nth=0' },
  { name: '05-questions-section', selector: '.research-questions' },
  { name: '06-sources-section', selector: '.research-sources' },
  { name: '07-author-cta', selector: '.research-author, .research-cta' },
  { name: '08-vertical-rhythm', fullClip: { x: 0, y: 0, width: 1440, height: 2800 } },
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
  await page.goto(url, { waitUntil: 'networkidle' });

  for (const shot of shots) {
    const file = path.join(outDir, `desktop-${shot.name}.png`);

    if (shot.fullClip) {
      await page.screenshot({ path: file, clip: shot.fullClip });
    } else if (shot.clipLeadChapter) {
      const lead = page.locator('.research-lead').first();
      const ch = page.locator('.research-chapter').first();
      const p = page.locator('.research-prose > p.research-p').nth(1);
      await lead.scrollIntoViewIfNeeded();
      const b0 = await lead.boundingBox();
      const b2 = await p.boundingBox();
      if (b0 && b2) {
        await page.screenshot({
          path: file,
          clip: { x: Math.max(0, b0.x - 60), y: b0.y, width: 920, height: Math.min(b2.y + b2.height - b0.y + 24, 720) },
        });
      }
    } else {
      const loc = page.locator(shot.selector).first();
      await loc.scrollIntoViewIfNeeded();
      await loc.screenshot({ path: file });
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
