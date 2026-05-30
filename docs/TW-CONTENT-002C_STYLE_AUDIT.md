# TW-CONTENT-002C-STYLE-AUDIT — Article Template Style Inventory

**Actual as of:** 2026-05-19  
**Environment:** MAC · `timewoven-research`  
**Target:** `/research/family-memory-third-generation`  
**Status:** Audit only — **no style fixes implemented**

Canonical spec reference: `docs/TW-CONTENT-002C_ARTICLE_LANGUAGE.md`  
CSS sources: `src/styles/research-reading.css`, `src/styles/article-template.css`, `src/styles/global.css`  
Components: `ResearchHero.astro`, `AuthorCard.astro`, `ResearchCTA.astro`, `RelatedResearch.astro`, `Header.astro`, `ResearchLayout.astro`

Screenshots: `docs/screenshots/tw-content-002c-style-audit/` (regenerate: `npm run screenshots:002c-style-audit`)

---

## Design tokens (shared)

| Token | Value | Used by |
|-------|-------|---------|
| `--research-serif` | Source Serif 4, Georgia fallbacks | Body, hero title, pull quotes, author name, CTA text, questions footer |
| `--research-sans` | Instrument Sans, system-ui | Page shell, UI labels, tables, cases, questions, sources, footnotes |
| `--research-ink` | `#1a1816` | Primary text |
| `--research-ink-muted` | `#5c5650` | Secondary text |
| `--research-ink-soft` | `#7a736c` | Meta, labels |
| `--research-paper` | `#faf9f7` | Article background |
| `--research-paper-warm` | `#f3f1ec` | Cards, table headers, case header |
| `--research-line` | `#e8e4dc` | Borders |
| `--research-measure` | `40rem` | Article shell, author, CTA |
| `--research-measure-wide` | `44rem` | Hero, related, sources (partial) |

**Tailwind bleed:** `Header.astro`, `RelatedResearch.astro`, `BaseLayout` body use `neutral-*` utilities — parallel grey scale, not token-based.

---

## Phase 1 — Style inventory

### 1. Header / navigation

| Property | Value |
|----------|-------|
| **Selector** | `header` → `Header.astro` (minimal research mode) |
| font-family | system-ui (Tailwind default), not `--research-sans` explicitly |
| font-size | `text-sm` (0.875rem) logo; nav `text-sm` |
| font-weight | `font-medium` (500) logo |
| color | `text-neutral-900` / `text-neutral-500` |
| max-width | `max-w-6xl` (72rem) |
| padding | `px-4 py-4` |
| border | `border-b` + `border-[var(--research-line)]` |
| background | `bg-white/90` |
| **Source** | `src/components/Header.astro` |

---

### 2. Hero

| Property | Value |
|----------|-------|
| **Selector** | `.research-hero`, `.research-hero-inner`, `.research-hero-title`, … |
| **Component** | `ResearchHero.astro` |
| font-family (title) | `--research-serif` |
| font-size (title) | `clamp(2rem, 5vw, 2.75rem)` (~32–44px) |
| font-weight (title) | 600 |
| line-height (title) | 1.12 |
| color (title) | `--research-ink` |
| font-family (dek) | inherits `--research-sans` from `.research-page` |
| font-size (dek / description) | `1.1875rem` (19px) — **not** spec 1.125rem |
| line-height (dek) | 1.65 |
| color (dek) | `--research-ink-muted` |
| font-size (category) | `0.6875rem`, uppercase, tracking 0.2em |
| max-width (inner) | `44rem` (`--research-measure-wide`) |
| padding | `3.5rem 0 3rem` |
| margin | `0` bottom |
| border | bottom `1px solid --research-line` |
| background | gradient paper → `#fff` |
| **Source** | `research-reading.css` L33–104 |

---

### 3. Metadata row

| Property | Value |
|----------|-------|
| **Selector** | `.research-hero-meta`, `.research-hero-meta-item`, `dt`, `dd` |
| font-family | `--research-sans` (inherited) |
| font-size | `0.875rem` (14px) |
| font-weight | `dt` 500 |
| color | `dd` / row `--research-ink-soft`; `dt` `--research-ink-muted` |
| layout | flex wrap, gap `0.5rem 1.75rem` |
| padding-top | `0.25rem` |
| divider | `.research-hero-divider` — 1px, max-width `4rem`, margin-top `2.5rem` |

---

### 4. Opening lead

| Property | Value |
|----------|-------|
| **Selector** | `.research-lead`, `.research-lead-p`, `::first-letter` |
| **Markup** | `remark-research.ts` → `applyLead()` |
| font-family | `--research-serif` (via `.research-prose`) |
| font-size | `1.375rem` (22px) — matches spec |
| line-height | `1.68` — spec says 1.85 for body; lead differs |
| font-weight | 400 |
| color | `--research-ink-muted` |
| letter-spacing | `-0.015em` |
| max-width | constrained by shell `40rem` |
| padding | wrapper `0 0 2.5rem` |
| margin | `0 0 3.5rem` |
| border | bottom `1px solid --research-line` |
| drop cap | `3.5rem` serif, weight 600, `--research-ink` (not muted) |
| **Source** | `research-reading.css` L151–174 |

**Screenshot zone:** `01-hero-and-lead.png` — gap between hero gradient, lead block, chapter 1.

---

### 5. Chapter label (ЧАСТЬ N)

| Property | Value |
|----------|-------|
| **Selector** | `.research-chapter-label` |
| font-family | `--research-sans` |
| font-size | `0.6875rem` (11px) |
| font-weight | 600 |
| letter-spacing | `0.2em` |
| text-transform | uppercase |
| color | `--research-ink-soft` |
| margin | `0 0 0.75rem` |
| **Source** | `remark-research.ts` `applyChapterHeadings()` |

---

### 6. Chapter title

| Property | Value |
|----------|-------|
| **Selector** | `.research-chapter .research-h2` (in chapter) vs `.research-prose .research-h2` (orphan) |
| font-family | `--research-sans` |
| font-size (in chapter) | `clamp(1.5rem, 3.5vw, 2rem)` (24–32px) |
| font-size (orphan h2) | `1.625rem` (26px) — **two scales** |
| font-weight | 600 |
| line-height | 1.25 (chapter); 1.25 + margin 3.5rem (standalone) |
| color | `--research-ink` |
| margin (chapter block) | chapter wrapper `4rem 0 2rem`, padding-top `2.5rem`, border-top |
| **Source** | `research-reading.css` L176–199, L255–265 |

---

### 7. Body paragraph

| Property | Value |
|----------|-------|
| **Selector** | `.research-prose`, `.research-p` |
| font-family | `--research-serif` |
| font-size | `1.125rem` (18px) |
| line-height | `1.88` — spec doc 1.85 (minor drift) |
| font-weight | 400 |
| color | `--research-ink` |
| max-width | shell `40rem` |
| margin (paragraph) | `0 0 1.75rem` |
| padding | shell `2.5rem 0 4rem` |
| hyphens | auto |
| **Source** | `research-reading.css` L107–122, L284–288 |

---

### 8. Footnotes

| Property | Value |
|----------|-------|
| **Selector** | `.research-cite`, `.research-footnote`, `.research-cite-link` |
| font-family | `--research-sans` |
| font-size | `0.68em` of parent (~12.2px on 18px body) |
| font-weight | 600 |
| color | `--research-ink-soft` |
| margin | `0 0.2em 0 0.12em` |
| vertical-align | super |
| link hover | underline, `--research-ink` |
| **Source** | `research-reading.css` L124–149 |

---

### 9. Tables

| Property | Value |
|----------|-------|
| **Selector** | `.research-table-scroll`, `.research-table`, `th`, `td` |
| font-family | `--research-sans` |
| font-size | `0.875rem` body; `th` `0.75rem` uppercase |
| line-height | 1.5 |
| color | `--research-ink` / muted headers |
| max-width | scroll wrapper full shell width |
| padding (cells) | `0.875rem 1rem` |
| margin | `2rem 0 2.25rem` |
| border | wrapper `1px`; rows `--research-line` |
| background | wrapper `--research-paper`; header row `--research-paper-warm` |
| **Source** | `research-reading.css` L320–358; `rehype-research.ts` |

---

### 10. Case blocks

| Property | Value |
|----------|-------|
| **Selector** | `.research-case`, `.research-case-header`, `.research-case-num`, `.research-case-title`, `.research-case-body`, `.research-case-body .research-p` |
| **Markup** | `remark-cases.ts` |
| font-family (header/title) | `--research-sans` |
| font-size (num) | `0.6875rem`, uppercase, tracking 0.14em |
| font-size (title) | `1.0625rem` (17px) — spec said 0.8125rem uppercase; **implementation diverged** |
| font-family (body) | `--research-serif` (inherits `.research-prose`) |
| font-size (body) | `1.125rem` same as main body |
| line-height (body) | `1.88` |
| margin (case) | `2.5rem 0` |
| padding (header) | `1.25rem 1.5rem 1rem` |
| padding (body) | `1.25rem 1.5rem 1.5rem` |
| paragraph margin inside | `1.25rem` between; last `0` |
| border | `1px solid --research-line`, radius `0.5rem` |
| background | header warm; body `#fff` |
| box-shadow | `0 2px 12px` + `article-template` `0 2px 14px` |
| **Source** | `research-reading.css` L201–253; `article-template.css` L87–89 |

**Screenshot zone:** `03-case-block.png` — empty header band vs dense body.

---

### 11. Key findings

| Property | Value |
|----------|-------|
| **Selector** | `.tw-key-findings`, `.tw-finding-card`, `.tw-finding-card__title`, `.tw-finding-card__summary` |
| font-family | **all sans** (cards) vs serif body |
| font-size (label) | `0.6875rem` uppercase |
| font-size (intro) | `0.9375rem`, lh 1.6 |
| font-size (card title) | `1.25rem` (20px) |
| font-size (card summary) | `0.875rem`, lh 1.55 |
| max-width | `48rem` (wider than body) |
| margin | `4rem auto` |
| padding | `2.5rem 0` |
| border | top + bottom `1px` |
| card padding | `1.5rem` |
| background | cards `#fff` |
| **Source** | `article-template.css` L8–75; `remark-key-findings.ts` |

---

### 12. 20 questions section

| Property | Value |
|----------|-------|
| **Selector** | `.research-questions`, `.research-questions-eyebrow`, `.research-questions-title`, `.research-question-card`, `.research-question-text`, … |
| font-family | **sans throughout** (intro, cards, numbers) |
| font-size (eyebrow) | `0.6875rem` |
| font-size (title) | `clamp(1.375rem, 3vw, 1.75rem)` |
| font-size (intro p) | `1rem` sans — **smaller than body** |
| font-size (card text) | `0.9375rem`, lh 1.55 |
| max-width | breaks out of measure with negative margin |
| margin | `4rem` vertical; horizontal `calc(-1 * clamp(...))` |
| padding | `clamp(2rem, 5vw, 3rem)` × horizontal clamp |
| border | `1px`, radius `0.75rem` |
| background | `--research-paper-warm` |
| card padding | `1.125rem 1.25rem` |
| footer | serif italic `1.0625rem` centered |
| **Source** | `research-reading.css` L408–560; `article-template.css` L91–98 |

**Screenshot zone:** `05-questions-section.png` — sans island inside serif article.

---

### 13. Sources section

| Property | Value |
|----------|-------|
| **Selector** | `.research-sources`, `.research-sources-title`, `.research-sources-list > li`, `::before`, `a` |
| font-family | `--research-sans` |
| font-size | `0.8125rem` (13px) list; title `0.75rem` uppercase |
| line-height | **1.72** |
| font-weight | number 500 |
| color | `--research-ink-muted` |
| max-width | section `44rem` (wider than 40rem body) |
| margin (section) | `4rem 0 0` |
| padding (section) | `2.75rem 0 0` |
| padding (row) | **`1.125rem 0 1.25rem`** per item ≈ **37–40px vertical per entry** |
| border | section top `1px`; row `1px` at 65% opacity |
| background | none (inherits paper) |
| grid | `2.5rem` + `1fr`, gap `0.5rem 1.25rem` |
| title margin-bottom | `2rem` |
| **Source** | `research-reading.css` L562–638 |

**Owner concern #1:** Row padding + lh 1.72 + long URLs → **~48–56px minimum row**, often multi-line **80–120px+**.

**Screenshot zone:** `04-sources-section.png`

---

### 14. Author card

| Property | Value |
|----------|-------|
| **Selector** | `.research-author`, `.research-author-inner`, `.research-author-name`, … |
| **Component** | `AuthorCard.astro` |
| font-family (name) | `--research-serif`, `1.25rem`, 600 |
| font-family (label, role, bio) | inherits sans from `.research-page` |
| font-size (label) | `0.6875rem` uppercase |
| font-size (role) | `0.875rem` |
| font-size (bio) | `0.9375rem`, lh 1.65 |
| max-width | `40rem` |
| margin | `4rem auto 0` |
| padding | `2.5rem 0 0` top border; inner `1.75rem 0 0` |
| border | top `1px --research-line` |
| **Source** | `research-reading.css` L640–682 |

---

### 15. CTA

| Property | Value |
|----------|-------|
| **Selector** | `.research-cta`, `.research-cta-inner`, `.research-cta-text`, `.research-cta-link` |
| **Component** | `ResearchCTA.astro` |
| font-family (text) | `--research-serif`, `1.0625rem`, lh 1.65 |
| font-family (link) | `--research-sans`, `0.875rem`, 500 |
| color | muted text; ink link |
| max-width | `40rem` text `36rem` |
| margin | `3rem auto 0` |
| padding | `2rem 0 0`; inner `1.75rem 0` + top border |
| **Source** | `research-reading.css` L684–719 |

---

### 16. Related research

| Property | Value |
|----------|-------|
| **Selector** | `.research-related`, `.research-related-title`, Tailwind on links |
| font-family | mixed: title uses CSS; links `font-medium` Tailwind (sans) |
| font-size | title `0.6875rem`; links default ~1rem; meta `text-sm` |
| color | `text-[var(--research-ink)]` + `text-sm text-[var(--research-ink-soft)]` |
| max-width | `44rem` |
| margin | `3rem auto 0` |
| padding | `2rem 0 0` |
| border | top `1px` |
| **Source** | `research-reading.css` L721–742; `RelatedResearch.astro` |

---

## Phase 2 — Inconsistencies

| ID | Where | Current | Why it conflicts | Proposed direction |
|----|-------|---------|------------------|-------------------|
| I-01 | Sources rows | `padding: 1.125rem 0 1.25rem`, lh 1.72, 13px | Feels like API list; 25 items × ~50px+ = fatigue | Compact bibliography: ~0.5rem vertical padding, lh ~1.5, optional hanging indent |
| I-02 | Body vs case body | Both serif 1.125rem / 1.88 | Spec intent: case body readable but **visually distinct** | Case body → sans 0.9375–1rem OR reduce card padding; keep serif only for longform outside cards |
| I-03 | Chapter title vs case title | Chapter: clamp 24–32px sans; Case: 17px sans in card | Case feels like footnote, chapter like magazine — **hierarchy inverted** inside examples | Case title → 1.125–1.1875rem; optional semibold; align with “editorial example” spec |
| I-04 | Opening stack | Hero sans dek 19px + gradient; lead serif 22px muted + border; then chapter border-top | Three visual regimes before first body ¶ — **disconnected** (owner #4) | Unify: hero→lead transition (remove double borders); align dek to 1.125rem; reduce lead margin-bottom |
| I-05 | Lead drop cap | 3.5rem **ink** serif cap; lead text **muted** 22px | Cap darker than lead — intentional? but only one instance | Either cap muted too, or document as sole editorial accent; do not repeat elsewhere |
| I-06 | Serif/sans split | Body serif; tables, cases header, questions, sources, findings **all sans** | Spec allows dual family but **6+ sans islands** break “one article voice” | Define zones: serif = continuous reading; sans = meta, labels, tables, UI chrome only |
| I-07 | Questions intro | `1rem` sans vs body `1.125rem` serif | Reads as sidebar, not chapter prose | Intro → serif 1.0625rem or match body |
| I-08 | Key findings | Full sans cards at 48rem width | Competes with chapter H2 scale; feels like marketing grid | Titles 1.0625rem; summary 0.8125rem; tighten vertical padding |
| I-09 | Case empty space | Header padding + body padding + 1.25rem between short ¶s | Card taller than content (owner #3) | Header `1rem 1.25rem 0.75rem`; body `1rem 1.25rem`; ¶ margin `0.875rem` |
| I-10 | Max-width drift | Body 40rem; hero/sources/related 44rem; findings 48rem | Subtle horizontal “creep” breaks column | Single column 40rem OR explicit 40/44/48 ladder in spec only |
| I-11 | Header/footer | Tailwind `neutral-*` | Different grey ramp than `--research-ink-*` | Map header to research tokens |
| I-12 | Related links | Tailwind utilities, not `.research-*` | Inconsistent with rest of footer stack | Use bibliography-adjacent link styles |
| I-13 | Hero description | 1.1875rem | Spec dek 1.125rem | Set to 1.125rem |
| I-14 | `.research-h2` duplicate rules | Orphan h2 1.625rem vs chapter h2 clamp | Epilogue/Заключение may pick wrong rule | Scope orphan h2 or unify to chapter scale |
| I-15 | Article shell top padding | `2.5rem` after hero | Adds to lead `3.5rem` margin — large dead zone | Shell top `1.5rem`; lead margin `2.5rem` |

### Required checks (answers)

| Question | Finding |
|----------|---------|
| Body vs case body same system? | **Yes — same serif/size** → cases don’t feel like “examples”, feel like boxed body (I-02, I-09) |
| Chapter vs case titles too different? | **Yes** — chapter much larger (I-03) |
| Lead intentional? | **Partially** — spec-aligned size, but spacing/borders make it feel accidental (I-04, I-05) |
| Drop cap coherent? | **Only on lead** — coherent if documented; cap color vs muted lead is slightly inconsistent (I-05) |
| Sources spacing excessive? | **Yes** (I-01) — primary owner concern |
| Source rows too tall? | **Yes** — padding + multi-line URLs |
| Case blocks too empty? | **Yes** — padding stack (I-09) |
| Headings balanced? | **Chapter strong, case weak, questions title strong** — unbalanced tertiary hierarchy |
| Serif/sans intentional? | **Partially** — tables/footnotes intentional; questions/findings/case headers over-sans (I-06) |

---

## Phase 3 — Screenshot annotation

| File | Annotated problem zones |
|------|-------------------------|
| `01-hero-and-lead.png` | A: Hero gradient vs flat paper below. B: Dek size/family vs lead. C: Lead bottom border + large gap before Часть 1. D: Drop cap weight vs muted lead. |
| `02-chapter-1-and-body.png` | E: Chapter border-top stacking with lead border. F: Chapter title scale vs body. G: Paragraph rhythm 1.75rem. |
| `03-case-block.png` | H: Warm header band height. I: Title 17px vs chapter 24–32px. J: White body padding vs short text. |
| `04-sources-section.png` | K: Section top padding 2.75rem. L: Row height / URL wrap. M: 44rem width vs 40rem body. |
| `05-questions-section.png` | N: Full-bleed warm panel. O: Sans 0.9375rem cards vs serif body. P: 2-column grid density. |
| `06-vertical-rhythm-sample.png` | Q: Repeated border-top sections. R: Alternating serif blocks and sans panels. S: Vertical margin stack (4rem zones). |

---

## Phase 4 — Proposed fix plan (implementation **not** started)

### A. Typography unification

| # | Selector / component | Current | Proposed | Effect |
|---|----------------------|---------|----------|--------|
| A1 | `.research-hero-description` | 1.1875rem | 1.125rem | Hero aligns with spec dek |
| A2 | `.research-prose` | lh 1.88 | 1.85 | Match ARTICLE_LANGUAGE |
| A3 | `.research-questions-intro-p` | sans 1rem | serif 1.0625rem | Questions intro reads as chapter prose |
| A4 | `.research-case-body .research-p` | serif 1.125 | sans 0.9375rem, lh 1.6 | Cases visually distinct from main text |
| A5 | `.tw-finding-card__summary` | 0.875 sans | keep or 0.8125rem | Tighter supporting text |
| A6 | `Header.astro` | neutral-* | `--research-ink-*` tokens | Site chrome matches article |

### B. Spacing rhythm

| # | Selector | Current | Proposed | Effect |
|---|----------|---------|----------|--------|
| B1 | `.research-article-shell` | padding-top 2.5rem | 1.5rem | Less gap after hero |
| B2 | `.research-lead` | margin-bottom 3.5rem | 2.5rem | Tighter hero→chapter flow |
| B3 | `.research-chapter` | margin 4rem 0 2rem | 3rem 0 1.5rem | Consistent chapter cadence |
| B4 | `.research-prose .research-p` | margin-bottom 1.75rem | 1.5rem (optional) | Slightly denser longform |
| B5 | Section margins (sources, author, key findings) | 4rem top | 3rem top | Unified section breaks |

### C. Sources compacting

| # | Selector | Current | Proposed | Effect |
|---|----------|---------|----------|--------|
| C1 | `.research-sources-list > li` | padding 1.125rem 0 1.25rem | 0.5rem 0 0.625rem | Shorter rows |
| C2 | `.research-sources-list > li` | lh 1.72 | 1.5 | Less line spread |
| C3 | `.research-sources-title` | margin-bottom 2rem | 1.25rem | Less header dead space |
| C4 | `.research-sources` | padding-top 2.75rem | 2rem | Section enters sooner |
| C5 | `.research-sources-list a` | underline always | subtle underline on hover only (optional) | Calmer bibliography |

### D. Case block redesign

| # | Selector | Current | Proposed | Effect |
|---|----------|---------|----------|--------|
| D1 | `.research-case-header` | padding 1.25/1.5/1rem | 1rem 1.25rem 0.75rem | Shorter header |
| D2 | `.research-case-body` | padding 1.25/1.5/1.5rem | 1rem 1.25rem 1.125rem | Less empty box |
| D3 | `.research-case-title` | 1.0625rem | 1.125rem, lh 1.35 | Stronger example title |
| D4 | `.research-case` | margin 2.5rem 0 | 2rem 0 | Fits rhythm grid |
| D5 | `.research-case-body .research-p` | margin 1.25rem | 0.875rem | Denser case narrative |

### E. Opening lead decision

| Option | Action |
|--------|--------|
| **E1 (recommended)** | Keep lead + drop cap; remove duplicate border between lead and chapter 1 (drop chapter `border-top` when preceded by lead); align cap color to muted or lead to ink |
| **E2** | Remove drop cap; lead remains 1.375rem muted — simpler system |
| **E3** | Merge hero dek + lead into one “opening” block — largest structural change |

### F. Component hierarchy

| # | Area | Current | Proposed | Effect |
|---|------|---------|----------|--------|
| F1 | Max-width | 40/44/48rem mix | body 40rem; breakout panels (questions) full-bleed within shell only | One clear column |
| F2 | `.research-questions` | negative margin breakout | margin 0; internal padding only | Less layout jump |
| F3 | `.research-related` | Tailwind | `.research-sources-list`-like link styles | Footer cohesion |
| F4 | Eyebrow labels | 0.6875–0.75rem mixed tracking | single `.research-eyebrow` utility | Часть / Практика / Источники unified |

---

## VERIFY

| Check | Status |
|-------|--------|
| Style inventory (16 blocks) | **PASS** |
| Inconsistency map | **PASS** (15 issues + owner 5 mapped) |
| Screenshot package (6) | **PASS** — `docs/screenshots/tw-content-002c-style-audit/` |
| Fix plan (A–F) | **PASS** — no implementation |
| No style/CSS fixes | **PASS** (only audit doc + screenshot script in `package.json`) |
| `npm run build` | **PASS** |
| Owner review | **REQUIRED** |

---

## BLOCKING

TW-CONTENT-003 / 004 / 005 remain **blocked** until owner approves this audit and the proposed fix plan (or selects options E1/E2/E3).

**Next implementation task (after approval):** TW-CONTENT-002C-STYLE-FIX (or similar) — execute groups A–F in priority order: **C Sources → D Cases → B Spacing → A Typography → E Lead → F Hierarchy**.
