# TW-CONTENT-002C-FIX — Research Publication Quality Fixes

**Actual as of:** 2026-05-19  
**Environment:** MAC · `timewoven-research`  
**Status:** Implementation complete — **owner visual approval required**

Blocks TW-CONTENT-003 / 004 / 005 until approved.

---

## Fixes applied

| Phase | Change |
|-------|--------|
| 1–2 Footnotes & spacing | `remark-citations.ts`, `rehype-footnotes.ts`, `fix_publication_quality.py` — linked superscript cites, spacing, guards for years/stats (1–25 only) |
| 3 Tables | Table cell cites + existing `research-table` / scroll wrapper |
| 4 Cases | `remark-cases.ts` — `article.research-case` with header + body |
| 5 Author | Removed initials avatar from `AuthorCard.astro` |
| 6 Sources | Bibliography grid, `source-N` ids, ↩ return links |
| 7 FIO | Merged `Л.Ю. Логуновой`; quote split in case 10 |
| 8 Audit | Citation validation; normalize script guards |

---

## VERIFY (MAC)

| Check | Status |
|-------|--------|
| Footnotes linked | PASS (build output) |
| Source spacing | PASS |
| Table 1 & 2 | PASS |
| Case blocks | PASS |
| Author card (no «Д») | PASS |
| Bibliography | PASS |
| FIO integrity | PASS |
| `npm run build` | PASS |
| Screenshots | `docs/screenshots/tw-content-002c-fix/` via `npm run screenshots:002c-fix` |
| Owner visual review | **REQUIRED** |

---

## Commands

```bash
python3 scripts/fix_publication_quality.py
npm run build
npm run screenshots:002c-fix
```
