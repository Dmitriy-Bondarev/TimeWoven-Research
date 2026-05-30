# TW-CONTENT-003 — Template Governance

**Actual as of:** 2026-05-19

## Rule

Any change to the **canonical research publication template** (structure, typography, width, components, remark/rehype pipeline, or `research-reading.css` / `article-template.css` semantics) requires:

1. A dedicated **TW-CONTENT-XXX** task approved by the owner.
2. A **Template Change Record** in the task doc (what changed, why, before/after screenshots, verify commands).

## In scope of “template”

- `src/layouts/ResearchLayout.astro`
- `src/styles/research-reading.css`, `src/styles/article-template.css`
- Remark plugins: `remark-research`, `remark-cases`, `remark-citations`, `remark-key-findings`
- Rehype: `rehype-footnotes`, `rehype-research`
- `ResearchCTA.astro`, author block, related research block
- Frontmatter fields that drive layout (`keyFindings`, etc.)

## Out of scope (separate tasks)

- New markdown publications (blocked until TW-CONTENT-004)
- Library home/catalog copy (`library-home.css`, catalog pages) — TW-CONTENT-003 library phases
- Product app (timewoven.ru main repo)

## Drift prevention

After **5 / 10 / 20 / 50** publications, do **not** “tweak locally per article.” Batch visual review → single TW-CONTENT task → one squash commit to **`main`** (PR).

## Canonical reference

Frozen standard: **`docs/TW-CONTENT-003_RESEARCH_PAGE_CANON.md`** (approved with TW-CONTENT-003).

## Template Change Record (template)

```markdown
## Template Change Record — TW-CONTENT-XXX

- Date:
- Owner approval:
- Files touched:
- User-visible change:
- Breaking for existing MD:
- Verify: npm run build; screenshots:00Xd
```
