# TW-CONTENT-002C — Visual References

**Actual as of:** 2026-05-19  
**Environment:** MAC · TimeWoven Research (`timewoven-research`)  
**Status:** Phase 1 deliverable — owner review before implementation sign-off

> Screenshots for owner review: capture live pages and save under `docs/screenshots/tw-content-002c/references/` using the URLs below. This document describes what to capture and what to borrow.

---

## 1. Stripe Press

**URL:** [https://press.stripe.com](https://press.stripe.com)

**What works**

- Book-quality typography: serif display + restrained sans metadata
- Generous negative space; content feels «дорого» без декора
- Clear separation between title block and reading column
- Slow, intentional pacing — reader enters a «режим чтения»

**Borrow**

- Hero as publication object (title, author, date, reading time — not blog meta)
- Wide margins, single reading column (~65–75 characters)
- Chapter-like section breaks with label + headline (not wall of H2)

**Avoid**

- 3D book WebGL gimmick for research (scope)
- Marketing catalog chrome overwhelming the article

---

## 2. Linear Essays / Read.cv longform

**URL:** [https://linear.app/now](https://linear.app/now) · [https://read.cv](https://read.cv)

**What works**

- Product-grade sans for UI chrome, calm body rhythm
- Short meta line, strong title, immediate start of prose
- No sidebar clutter; focus on text
- Subtle borders and warm neutrals — not clinical docs

**Borrow**

- Minimal header; publication is the page
- Meta row: category · date · reading time in one quiet line
- Link styling: understated underline, no button soup

**Avoid**

- Startup changelog tone (too short, too product)
- Dark-mode-only aesthetic if library stays light editorial

---

## 3. Substack Longform (The Free Press / major publishers)

**URL:** e.g. [https://www.thefp.com](https://www.thefp.com) · typical Substack article layout

**What works**

- Large title + dek (subtitle) before body
- Comfortable 18–20px body on desktop
- Pull quotes and section breaks as breathing room
- Author block at end feels human, not CRM

**Borrow**

- Dek under title (our `seoDescription` / description)
- End-of-article author + soft CTA continuity
- Optional pull quote styling for key sentences

**Avoid**

- Paywall banners, like counts, comment widgets
- Newsletter signup popups mid-article

---

## 4. A List Apart

**URL:** [https://alistapart.com/article/](https://alistapart.com/article/) (any long article)

**What works**

- Editorial discipline: measure, leading, heading scale
- «Article» not «doc» — lists and tables integrated into prose rhythm
- Author bio separated from body with clear typographic step-down

**Borrow**

- H2/H3 scale difference (body serif vs heading sans)
- Table: full-width within measure, header row distinct
- Code/callout patterns → our «insight / statistic / note» blocks

**Avoid**

- 2010-era blog comments thread
- Tag clouds and archive chrome

---

## 5. Works in Progress (Stripe-owned essay series)

**URL:** [https://worksinprogress.co](https://worksinprogress.co)

**What works**

- Long-form essay as first-class product
- Pull quotes, figures, and section titles for skimmability
- Serious tone without academic PDF stiffness

**Borrow**

- Skimmable section titles (our «Часть N» chapters)
- Occasional pull quote for thesis sentences
- Footnotes/endnotes feel intentional

**Avoid**

- Magazine cover art requirements per article
- Too many interactive embeds

---

## 6. Aeon

**URL:** [https://aeon.co/essays](https://aeon.co/essays)

**What works**

- Essay film / essay print hybrid on web
- Large lead paragraph, drop cap or enlarged opening
- Generous space between paragraphs — never dense blocks
- Conclusion feels like arrival, not abrupt stop

**Borrow**

- Lead paragraph typographically distinct from body
- Conclusion block with slightly different weight
- Slow scroll rhythm (padding, not speed)

**Avoid**

- Video hero requirements
- Overly literary ornament (rules, flourishes)

---

## 7. Longreads

**URL:** [https://longreads.com](https://longreads.com)

**What works**

- Story-forward layout: title art optional, text always king
- Chapter headings for navigation in 20+ min reads
- Related reading at bottom — quiet, not aggressive

**Borrow**

- Reading time prominent in hero
- Section length varied (case blocks, tables as «exhibits»)

**Avoid**

- Advertising slots
- Infinite «more stories» before article ends

---

## 8. The Browser (essay links / Letter)

**URL:** [https://thebrowser.com](https://thebrowser.com)

**What works**

- Extreme respect for reader attention
- Typography and whitespace signal «worth your time»
- No visual noise

**Borrow**

- Ruthless reduction of UI chrome on article page
- Sources as bibliography, not link dump

**Avoid**

- Link-list homepage patterns inside article

---

## 9. Wait But Why (long-form)

**URL:** [https://waitbutwhy.com](https://waitbutwhy.com) (e.g. AI essay series)

**What works**

- Custom illustrations + section humor — engagement without losing structure
- Numbered sections and clear H2 landmarks for 30+ min reads
- «Takeaway» feel per section

**Borrow**

- Numbered practical blocks (our 20 questions as cards)
- Visual «zones» for different content types (theory vs practice)
- Skim-friendly hierarchy

**Avoid**

- Stick figures / mandatory custom art per post
- Irreverent tone inappropriate for research library

---

## 10. CSS-Tricks — Designing for Long-Form Articles

**URL:** [https://css-tricks.com/designing-for-long-form-articles/](https://css-tricks.com/designing-for-long-form-articles/)

**What works (reference article, not brand)**

- Explicit rules: 45–75 ch measure, line-height 1.5–1.8, larger body size
- Underline offset for links
- Encouragement to treat article pages differently from marketing pages

**Borrow**

- `ch` units for measure (`max-width: 68ch`)
- Paragraph spacing > line spacing inside paragraph
- Distinct article stylesheet scope (`.tw-article`)

**Avoid**

- Generic blog template shared with docs

---

## Synthesis for TimeWoven Research

| Dimension | Target |
|-----------|--------|
| Mood | Premium essay / institute publication |
| Type | Serif body + sans structure (Stripe Press × Aeon) |
| Measure | 40–44rem (~68ch) |
| Hero | Publication gate (Stripe Press × Substack dek) |
| Skim layer | Key findings grid + chapter labels |
| Practice | Substack card zone × Wait But Why numbered utility |
| Sources | The Browser bibliography × Works in Progress notes |
| Anti-patterns | GitHub Docs, Tailwind docs, SaaS empty states, MD preview |

**Owner action:** Approve references → proceed to `TW-CONTENT-002C_ARTICLE_LANGUAGE.md` → implementation gate.
