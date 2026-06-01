# TW-RESEARCH-HEADER-001 — Research Header Alignment

**Actual as of:** 2026-05-30  
**Environment:** MAC (`~/Projects/TimeWoven-Research/timewoven-research`)  
**Governance:** NO COMMIT · NO PUSH · NO PR · NO DEPLOY

## Task 1 — Nav label

| Locale | Before | After |
|--------|--------|-------|
| RU | Исследования | **Публикации** |
| EN | Research | **Publications** |
| ZH | 研究 | **出版物** |

`nav.research` in `src/lib/i18n/messages.ts` (all locales).

## Task 2 — Brand block (two lines)

| Line | RU (production) |
|------|-----------------|
| 1 | **TimeWoven** (`site.name`) |
| 2 | **Проект TimeWoven — связь поколений во времени** (`site.tagline`) |

EN: `TimeWoven` / `The TimeWoven project — generations connected across time`  
ZH: `TimeWoven` / `TimeWoven 项目 — 连接世代与时间`

Also updated `src/lib/site.ts` constants.

## Task 3 — Language switcher (3 local variants)

Aligned with owner reference (CleanShot): nav in **#1a1816**, lang switcher with **soft gray pill** on active locale.

| Variant | Style | Role |
|---------|-------|------|
| **reference** | RU / EN / 中文 — inactive gray, active = rounded `rgba(26,24,22,0.07)` pill | **Production default** |
| **1** | Text only, no pill | Preview compare |
| **2** | Underline active | Preview compare |
| **3** | Uppercase | Preview compare |

Preview: http://127.0.0.1:4321/preview/header-lang-variants

## Files changed

- `src/lib/i18n/messages.ts`
- `src/lib/site.ts`
- `src/components/LanguageSwitcher.astro`
- `src/components/Header.astro`
- `src/layouts/BaseLayout.astro` (`hideChrome` for preview)
- `src/pages/preview/header-lang-variants.astro`
- `scripts/capture-tw-research-header-001.mjs`

## Verify — screenshots

`docs/screenshots/tw-research-header-001/`

| File | Content |
|------|---------|
| `header-variant-1-desktop.png` | Variant 1 @ 1440 |
| `header-variant-1-mobile.png` | Variant 1 @ 390 |
| `header-variant-2-desktop.png` | Variant 2 @ 1440 |
| `header-variant-2-mobile.png` | Variant 2 @ 390 |
| `header-variant-3-desktop.png` | Variant 3 @ 1440 |
| `header-variant-3-mobile.png` | Variant 3 @ 390 |
| `header-production-desktop.png` | Live header `/` (v2) |
| `header-production-mobile.png` | Live header mobile |

### Regenerate

```bash
cd ~/Projects/TimeWoven-Research/timewoven-research
npm run build
npm run preview -- --host 127.0.0.1 --port 4321
SITE_URL=http://127.0.0.1:4321 node scripts/capture-tw-research-header-001.mjs
```

## READY FOR

```text
READY FOR:
- COMMIT: NO
- PUSH: NO
- PR: NO
- DEPLOY: NO
```

Owner: confirm language switcher variant (1 / 2 / 3) before production deploy.
