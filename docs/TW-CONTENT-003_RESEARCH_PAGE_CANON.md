# TW-CONTENT-003 — Research Page Canon

**Actual as of:** 2026-05-19  
**Source of truth (implementation):** `src/styles/research-reading.css`, `src/styles/article-template.css`, `src/layouts/ResearchLayout.astro`, remark/rehype plugins.

Values below are **exact** as implemented after TW-CONTENT-002D (+ 002C-FIXA). No paraphrase.

---

## Article structure canon

| Block | Status | Notes |
|-------|--------|-------|
| Hero | **mandatory** | Category eyebrow, title, description, meta |
| Lead | **mandatory** | First chapter section; drop cap on first lead paragraph |
| Part N (chapter labels) | **mandatory** | `research-chapter` + `research-chapter-label` + H2 |
| Research Body | **mandatory** | Prose within `research-article-shell` |
| Case Studies | **optional** | `:::case` directive → `.research-case` |
| Tables | **optional** | `.research-table-scroll` + `.research-table` |
| Key Findings | **optional** | Frontmatter `keyFindings[]`; injected before practical section |
| Practical Section | **optional** | 20 questions / interview guides / checklists — `.research-questions` family |
| Sources | **mandatory** | `.research-sources` + numbered list |
| Citation | **mandatory** | `.research-citation` — auto from `publicationId` (TW-CONTENT-PUBLISHING-001) |
| Copyright | **mandatory (RU)** | `.research-copyright` — locale via `copyright.ts` |
| Author | **mandatory** | `.research-author` |
| CTA | **mandatory** | `.research-cta` |
| Related research | **mandatory** | `.research-related` (may show editorial empty line) |

**Forbidden on research pages:**

- Aggressive commerce CTAs (see CTA canon)
- Raw HTML layout experiments outside approved directives
- Second unrelated hero or sidebar chrome
- Developer/CMS labels in visible UI

---

## Typography canon

### Font families

| Role | value |
|------|--------|
| Serif (body, hero description, pull quotes, author name) | `'Source Serif 4', 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif` |
| Sans (UI, cases, tables, meta, eyebrows) | `'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif` |

### Body

| property | value |
|----------|--------|
| font-family | `var(--research-serif)` |
| font-size | `1.125rem` (`--research-text-body`) |
| line-height | `1.85` (`--research-lh-body`) |
| letter-spacing | `0.01em` |

### Lead

| property | value |
|----------|--------|
| font-size | `1.375rem` (`--research-text-lead`) |
| line-height | `1.7` (`--research-lh-lead`) |
| drop cap first letter | `font-size: 3.25rem`; `line-height: 0.88`; `font-weight: 600` |

### Heading scale

| element | font-family | font-size | line-height | font-weight | letter-spacing |
|---------|-------------|-----------|-------------|-------------|----------------|
| Hero title `.research-hero-title` | serif | `clamp(2rem, 5vw, 2.75rem)` | `1.12` | `600` | `-0.025em` |
| Chapter H2 `.research-chapter .research-h2` | sans | `clamp(1.4375rem, 3vw, 1.75rem)` | `1.28` | `600` | `-0.02em` |
| Body H2 `.research-h2` | sans | `1.75rem` | `1.28` | `600` | `-0.02em` |
| H3 `.research-h3` | sans | `1.25rem` | `1.35` | `600` | — |
| H4 `.research-h4` | sans | `1.0625rem` | — | `600` | — |
| Pull quote | serif | `1.375rem` | `1.55` | — (italic) | — |

### Eyebrow scale

Shared selectors: `.research-eyebrow`, `.research-hero-category`, `.research-chapter-label`, `.research-questions-eyebrow`, `.research-sources-title`, `.research-author-label`, `.research-related-title`, `.tw-key-findings__title`

| property | value |
|----------|--------|
| font-family | `var(--research-sans)` |
| font-size | `0.6875rem` |
| font-weight | `600` |
| letter-spacing | `0.18em` |
| text-transform | `uppercase` |
| color | `var(--research-ink-soft)` → `#7a736c` |

Case number `.research-case-num`: `0.6875rem`; `letter-spacing: 0.14em`; uppercase.

### Citation scale (in-text)

| property | value |
|----------|--------|
| selector | `.research-cite`, `sup.research-footnote` (in prose) |
| font-family | `var(--research-sans)` |
| font-size | `0.68em` |
| font-weight | `600` |
| vertical-align | `super` |

Footnote marker `.research-footnote`: `0.65em`; `font-weight: 600`; `vertical-align: super`.

### Bibliography scale (sources list)

| property | value |
|----------|--------|
| font-family | `var(--research-sans)` |
| font-size | `0.8125rem` (`--research-text-ui`) |
| line-height | `1.5` |
| row padding | `0.5rem 0 0.625rem` |
| grid | `grid-template-columns: 2rem 1fr` |

---

## Width canon

| Region | max-width |
|--------|-----------|
| Hero inner `.research-hero-inner` | `var(--research-measure-wide)` → **`40rem`** on `.research-page--article` |
| Body shell `.research-article-shell` | **`40rem`** (`--research-measure`) |
| Sources `.research-sources` | **`40rem`** |
| Questions `.research-questions` | within shell (**`40rem`** column) |
| Case `.research-case` | within shell (**`40rem`** column) |
| Author `.research-author` | **`40rem`** |
| CTA `.research-cta` | **`40rem`** |
| Related `.research-related` | **`40rem`** |
| Key findings `.tw-key-findings` | **`40rem`** |

Default token before article override: `--research-measure-wide: 44rem`; article page sets `--research-measure-wide: var(--research-measure)`.

---

## Case canon

| element | class | typography / layout |
|---------|-------|---------------------|
| Case Number | `.research-case-num` | sans `0.6875rem`; weight `600`; letter-spacing `0.14em`; uppercase; color `#7a736c`; margin `0 0 0.25rem` |
| Case Title | `.research-case-title` | sans `1.125rem`; weight `600`; line-height `1.35`; letter-spacing `-0.015em` |
| Case Body | `.research-case-body .research-p` | sans `0.9375rem` (`--research-text-case`); line-height `1.6` (`--research-lh-case`); color `#5c5650` |
| Container | `.research-case` | margin `2rem 0`; padding `0 0 0 1.125rem`; `border-left: 2px solid #e8e4dc`; no card shadow |

---

## Table canon

| property | value |
|----------|--------|
| wrapper | `.research-table-scroll` |
| margin | `2rem 0 2.25rem` |
| overflow-x | `auto` |
| -webkit-overflow-scrolling | `touch` |
| border | `1px solid #e8e4dc` |
| border-radius | `0.5rem` |
| background | `#faf9f7` |
| table min-width | `32rem` |
| table font | sans `0.875rem`; line-height `1.5` |
| th | `0.75rem`; uppercase; letter-spacing `0.04em`; padding `0.875rem 1rem` |
| td | padding `0.875rem 1rem` |

---

## Footnote canon

| element | requirement |
|---------|-------------|
| Superscript in text | `<sup class="research-cite">` or `.research-footnote`; link to `#source-N` |
| Anchor | `id="cite-ref-N"` on cite link; `id="source-N"` on source row |
| Return link | `.research-source-back` — `font-size: 0.75rem`; shown after source entry |

---

## Key findings canon

| rule | value |
|------|--------|
| position | Inserted before practical section (20 questions / epilog heading) |
| title | `Ключевые выводы` |
| intro | `1.0625rem` serif; line-height `1.85` |
| quantity | From frontmatter `keyFindings` (canonical example: **4** cards) |
| grid | 1 col; `@media (min-width: 640px)` → `repeat(2, minmax(0, 1fr))`; gap `1rem` |
| card | `.tw-finding-card`; left rule `2px solid #e8e4dc`; title sans `1.0625rem`; summary `0.8125rem` / lh `1.6` |
| section padding | `2rem 0`; top+bottom border `1px solid #e8e4dc` |

---

## Practical section canon

One block family: `.research-questions` (+ eyebrow, title, intro, numbered list / grid).

| property | value |
|----------|--------|
| margin | `3rem 0` (`--research-space-section`) |
| padding | `2rem 1.5rem` |
| background | `#f3f1ec` |
| border | `1px solid #e8e4dc` |
| border-radius | `0.5rem` |
| question cards | sans `0.9375rem`; lh `1.55`; padding `0.875rem 1rem` |
| grid | 1 col; `@media (min-width: 640px)` → 2 columns |

Includes: questions, checklists, interview guides, family exercises — same visual system.

---

## CTA canon

**Allowed (current implementation):**

- Calm project explanation + link text equivalent to **«Узнать о проекте →»** (`ResearchCTA.astro`)
- Related research links (**«Другие исследования»**)

**Allowed copy patterns (future, owner-approved):**

- Learn about TimeWoven / Узнать о TimeWoven
- Read related research / Читать связанные исследования

**Forbidden:**

- Buy now / Купить сейчас
- Subscribe immediately / Подписаться немедленно
- Aggressive conversion prompts, countdowns, discount banners

| property | value |
|----------|--------|
| `.research-cta-text` | serif `1.0625rem`; lh `1.65` |
| `.research-cta-link` | sans `0.875rem`; weight `500`; underline via `border-bottom: 1px solid` |

---

## Spacing tokens

| token | value |
|-------|--------|
| `--research-space-section` | `3rem` |
| `--research-space-paragraph` | `1.5rem` |

---

## Publication Identity Layer (TW-CONTENT-PUBLISHING-001)

| Concern | Source |
|---------|--------|
| Publication Registry | `src/lib/publications/publication-registry.ts` — `getPublicationById()` |
| ID format | `TW-R-0001` / `TW-E-0001` / `TW-A-0001` — stable across locales |
| Citation Rules | `src/lib/publications/citation.ts` + `PublicationCitation.astro` |
| Copyright Rules | `src/lib/publications/copyright.ts` + `PublicationCopyright.astro` |
| Language Independence | Same `publicationId` in per-locale content entries; no layout changes for new languages |

Permanent citation URL uses RU canonical path (`prefixDefaultLocale: false`).

Full spec: **`docs/TW-CONTENT-PUBLISHING-001.md`**.

---

## Owner approval

All future research publications must match this canon until a **TW-CONTENT-XXX** template change is approved per **`TW-CONTENT-003_TEMPLATE_GOVERNANCE.md`**.
