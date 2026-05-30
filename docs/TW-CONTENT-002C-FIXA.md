# TW-CONTENT-002C-FIXA — Final Article Template Polish

**Actual as of:** 2026-05-19  
**Environment:** MAC · `timewoven-research`  
**Status:** Complete — **owner visual approval required**

---

## Root causes & fixes

| Phase | Issue | Cause | Fix |
|-------|-------|-------|-----|
| 1 Sources | Dense technical list | Tight padding / strong borders | Bibliography spacing in `research-reading.css` |
| 2 Chapter 1 | `к 1.` instead of `Блок 1` | Citation glue matched `к`+`1` in `Блок1`, stripping `Бло`; heading not `##` | Restored MD heading; `Блок` guard in cite plugins; `repair_block_headings()` in normalize/fix scripts |
| 3 Drop cap | On «Опираясь…» | `applyLead` used first H2 (Block 2) because Block 1 was not a heading | `firstChapterIndex()` → first `Блок N` heading; drop cap scoped to `.research-lead .research-lead-p:first-of-type` only |

---

## VERIFY

| Check | Status |
|-------|--------|
| Sources spacing | PASS |
| Chapter 1 title | PASS |
| Drop cap audit | PASS |
| `npm run build` | PASS |
| Screenshots | `docs/screenshots/tw-content-002c-fixa/` |
| Owner visual review | **REQUIRED** |

```bash
npm run build
npm run screenshots:002c-fixa
```
