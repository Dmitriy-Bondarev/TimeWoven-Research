/**
 * TW-CONTENT-002C-STYLE-AUDIT — annotated review screenshots (desktop).
 * No style changes; capture only.
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs/screenshots/tw-content-002c-style-audit');
const articleUrl =
  process.env.PREVIEW_URL ?? 'http://127.0.0.1:4321/research/family-memory-third-generation';

const shots = [
  { name: '01-hero-and-lead', selector: '.research-hero, .research-lead', fullWidth: true },
  { name: '02-chapter-1-and-body', selector: '.research-lead, .research-chapter >> nth=0', clipAfterChapter: true },
  { name: '03-case-block', selector: '.research-case >> nth=0' },
  { name: '04-sources-section', selector: '.research-sources', fullWidth: true },
  { name: '05-questions-section', selector: '.research-questions' },
  { name: '06-vertical-rhythm-sample', fullPageTop: true },
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
    const file = path.join(outDir, `desktop-${shot.name}.png`);

    if (shot.fullPageTop) {
      await page.screenshot({
        path: file,
        clip: { x: 0, y: 0, width: 1440, height: 2400 },
      });
    } else {
    const loc = page.locator(shot.selector).first();
    await loc.scrollIntoViewIfNeeded();

    if (shot.clipAfterChapter) {
      const lead = page.locator('.research-lead').first();
      const chapter = page.locator('.research-chapter').first();
      const thirdP = page.locator('.research-prose > p.research-p').nth(2);
      await lead.scrollIntoViewIfNeeded();
      const b0 = await lead.boundingBox();
      const b3 = await thirdP.boundingBox();
      if (b0 && b3) {
        await page.screenshot({
          path: file,
          clip: {
            x: Math.max(0, (b0?.x ?? 200) - 60),
            y: b0.y,
            width: 920,
            height: Math.min(b3.y + b3.height - b0.y + 24, 780),
          },
        });
      } else {
        await loc.screenshot({ path: file });
      }
    } else {
      await loc.screenshot({ path: file });
    }
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
