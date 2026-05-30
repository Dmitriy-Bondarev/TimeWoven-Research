# TW-CONTENT-002D — Typography Unification & Editorial Consistency

**Actual as of:** 2026-05-19  
**Environment:** MAC · `timewoven-research`  
**Status:** Implemented — **owner visual approval required**

Implements approved `TW-CONTENT-002C_STYLE_AUDIT.md` fix groups A–F (option **E1** for lead).

---

## Typography system (canonical)

| Role | Family | Size | Line-height | Weight |
|------|--------|------|-------------|--------|
| Hero title | Serif | clamp 2–2.75rem | 1.12 | 600 |
| Hero dek | Serif | 1.125rem | 1.85 | 400 |
| Lead | Serif | 1.375rem | 1.7 | 400 |
| Body | Serif | 1.125rem | 1.85 | 400 |
| Chapter title | Sans | clamp 1.44–1.75rem | 1.28 | 600 |
| Case body | Sans | 0.9375rem | 1.6 | 400 |
| Case title | Sans | 1.125rem | 1.35 | 600 |
| UI / bibliography | Sans | 0.8125rem | 1.5 | 400–600 |
| Eyebrows | Sans | 0.6875rem | — | 600 |

**Column:** `40rem` for hero inner, body, sources, findings, footer.

---

## Changes by phase

| Phase | Summary |
|-------|---------|
| 1 Sources | Row padding `0.5rem/0.625rem`, lh 1.5, lighter dividers |
| 2 Cases | Left-rule editorial block; sans body; no card chrome |
| 3 Typography | CSS variables + unified eyebrows + serif/sans zones |
| 4 Lead E1 | Hero paper bg; no double borders; lead → Part 1 seamless |
| 5 Rhythm | `--research-space-section: 3rem`, paragraph `1.5rem` |
| 6 Hierarchy | Findings demoted to left-rule; questions panel toned down |

---

## Files touched

- `src/styles/research-reading.css`
- `src/styles/article-template.css`
- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/RelatedResearch.astro`

---

## VERIFY

| Check | Status |
|-------|--------|
| Sources compacting | PASS |
| Case redesign | PASS |
| Typography unification | PASS |
| Lead E1 | PASS |
| Vertical rhythm | PASS |
| Screenshots | `docs/screenshots/tw-content-002d/` |
| `npm run build` | PASS |
| Owner visual review | **REQUIRED** |

```bash
npm run build
npm run screenshots:002d
```
