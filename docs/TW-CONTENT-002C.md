# TW-CONTENT-002C — Canonical Article Template

**Actual as of:** 2026-05-19  
**Environment:** MAC · `timewoven-research`  
**Status:** Implementation complete — **owner visual approval required**

Supersedes TW-CONTENT-003 / 004 / 005 until template is approved. No new research publications until approval.

---

## Deliverables

| Phase | Artifact | Status |
|-------|----------|--------|
| 1 | `docs/TW-CONTENT-002C_VISUAL_REFERENCES.md` | Done |
| 2 | `docs/TW-CONTENT-002C_ARTICLE_LANGUAGE.md` | Done |
| 3–9 | Layout, plugins, styles, homepage | Done |
| 10 | `docs/screenshots/tw-content-002c/*.png` | Done (Playwright) |

---

## Implementation summary

- **Schema:** `keyFindings[]`, optional `lead` in `publicationSchema`
- **Remark:** `remark-key-findings.ts` — injects findings grid before practical (20 questions) section
- **Styles:** `src/styles/article-template.css` (key findings, case/questions polish)
- **Homepage:** mission + catalog purpose sections on `/`
- **Canonical article:** `/research/family-memory-third-generation` with frontmatter key findings
- **Screenshots:** `npm run screenshots:002c` (after `npm run build`)

---

## VERIFY (MAC)

| Check | Result |
|-------|--------|
| Visual References doc | PASS |
| Article Language doc | PASS |
| Hero / Lead / Body composition | PASS (review in browser) |
| Key Findings layer | PASS (4 cards in build output) |
| Tables / Cases / Questions / Sources | PASS (002B pipeline + 002C polish) |
| Homepage rebuild | PASS |
| Desktop / Tablet / Mobile screenshots | PASS |
| `npm run build` | PASS |
| `npm run dev` | Owner spot-check |
| **Owner Visual Approval** | **REQUIRED** |

---

## Owner acceptance test

Open `/research/family-memory-third-generation` — must feel like a **premium long-form publication**, not markdown/docs/blog.

Review package: `docs/screenshots/tw-content-002c/`

After approval, record: **`TW-CONTENT-002C ARTICLE TEMPLATE APPROVED`** — then only may new research files be added.
