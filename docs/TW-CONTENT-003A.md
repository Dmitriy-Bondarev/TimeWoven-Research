# TW-CONTENT-003A — Library Copy Refinement + Footnote Punctuation Fix

**Actual as of:** 2026-05-19  
**Environment:** MAC ONLY (`timewoven-research`)  
**Status:** IMPLEMENTED — **Owner Review: REQUIRED**

## Scope

| Phase | Change |
|-------|--------|
| 1 Header identity | `SITE_NAME` = «Проект TimeWoven»; tagline in header (library/research surfaces) |
| 2 Research catalog | «живые семейные воспоминания» on `/research` |
| 3 Essays copy | Short section lead on `/essays` |
| 4 Essays empty state | Two-paragraph editorial note |
| 5 Articles copy | «дополняют нашу библиотеку» |
| 6 Articles empty state | Revised note (two paragraphs) |
| 7 Vertical spacing | Catalog header top padding reduced; library `main` `sm:py-4` (was `sm:py-8`) |
| 8 Footnote punctuation | `remark-citations.ts` — period before superscript at sentence boundaries |
| 9 Regression | `npm run verify:citations` |

## Footnote canon (003A)

**Style:** period immediately before superscript — `слово.¹` (not `слово¹` at clause end).

**Implementation:**

- `needsSentencePeriodBeforeCite()` — newline, paragraph break, or next sentence (capital)
- `ensureCitationPunctuation()` — post-pass on linked `<sup>` in MD/HTML
- `replaceCitationsInString()` — remark pass on text/html MD nodes
- `rehype-citation-punctuation.ts` — fixes split MDAST nodes (`слово` + `<sup>` siblings)

**Not modified:** source `.md` files (fix is pipeline-only).

## VERIFY — TW-CONTENT-003A

| Check | Result |
|-------|--------|
| Environment | MAC |
| Header Identity | PASS |
| Research Copy | PASS |
| Essays Copy | PASS |
| Essays Empty State | PASS |
| Articles Copy | PASS |
| Articles Empty State | PASS |
| Vertical Spacing Review | PASS |
| Footnote Punctuation | PASS |
| Regression | PASS (`npm run verify:citations`) |
| `npm run build` | PASS |
| Owner Review | **REQUIRED** |

## Commands

```bash
cd /Users/continuum/Projects/TimeWoven-Research/timewoven-research
npm run verify:citations
npm run build
```

## Follow-up: TW-CONTENT-003A-FIX-HEADER

Header tagline premature wrap — fixed layout (`max-width` on `.header-brand` removed). See `docs/TW-CONTENT-003A-FIX-HEADER.md`.

## Relation to TW-CONTENT-003

On owner approval of **003A**, **TW-CONTENT-003** may be marked **CLOSED**; **TW-CONTENT-004** unblocks per program plan.
