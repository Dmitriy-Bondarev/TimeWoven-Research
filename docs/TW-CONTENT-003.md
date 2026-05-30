# TW-CONTENT-003 — Research Library Governance & Page Canon

**Actual as of:** 2026-05-19  
**Environment:** MAC ONLY (`timewoven-research`)  
**Status:** IMPLEMENTED — superseded by **TW-CONTENT-003A** (copy + footnote fix). **CLOSED** after owner approves 003A.

## Prerequisites (declared)

- TW-CONTENT-002D APPROVED
- TW-CONTENT-002C-FIXA APPROVED
- Canonical article template visually approved (owner)

## Scope delivered

| Phase | Deliverable |
|-------|-------------|
| 1 Copy audit | `/`, `/research`, `/essays`, `/articles` — reader language; removed longform/CMS/dev jargon |
| 2 Library UX | Unified `surface="library"`, `library-home.css`, catalog cards, section grid on home |
| 3 Empty states | `LibraryEmptyState.astro` — editorial copy for essays & articles |
| 4 Taxonomy | `docs/TW-CONTENT-003_CONTENT_MODEL.md` |
| 5 Page canon | `docs/TW-CONTENT-003_RESEARCH_PAGE_CANON.md` |
| 6 Identity | `docs/TW-CONTENT-003_LIBRARY_IDENTITY.md` |
| 7 Navigation | Header/footer on library + research surfaces; back links on empty catalogs |
| 8 Governance | `docs/TW-CONTENT-003_TEMPLATE_GOVERNANCE.md` |
| 9 Review package | `docs/screenshots/tw-content-003/` via `npm run screenshots:003` |

## Code touched

- `src/pages/index.astro`, `research/index.astro`, `essays/index.astro`, `articles/index.astro`
- `src/components/LibraryEmptyState.astro`, `PublicationCard.astro`, `Footer.astro`
- `src/layouts/BaseLayout.astro`
- `src/styles/library-home.css`
- `scripts/capture-tw-content-003-screenshots.mjs`
- `package.json` — `screenshots:003`

## VERIFY — TW-CONTENT-003

| Check | Result |
|-------|--------|
| Environment | MAC |
| Library Copy Audit | PASS |
| Library Experience | PASS |
| Empty States | PASS |
| Content Taxonomy | PASS |
| Research Page Canon | PASS |
| Library Identity | PASS |
| Navigation Review | PASS |
| Template Governance | PASS |
| Review Package | PASS (after `npm run build && npm run screenshots:003`) |
| `npm run build` | PASS (run in session) |
| Owner Review | **REQUIRED** |

## Blocking

- **TW-CONTENT-004** — BLOCKED until owner approves TW-CONTENT-003
- **TW-CONTENT-005** — BLOCKED

No new research publications until approval.

## Commands

```bash
cd /Users/continuum/Projects/TimeWoven-Research/timewoven-research
npm run build
npm run screenshots:003
```
