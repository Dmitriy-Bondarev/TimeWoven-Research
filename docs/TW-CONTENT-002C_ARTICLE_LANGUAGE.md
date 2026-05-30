# TW-CONTENT-002C — Article Visual Language

**Actual as of:** 2026-05-19  
**Environment:** MAC · TimeWoven Research  
**Status:** Implemented (002C) — owner visual approval before new publications

Canonical scope: **one article template** applied to all `src/content/research/*.md` via layout + remark/rehype pipeline. No per-article CSS.

---

## 1. Typography

| Role | Family | Size (desktop) | Weight | Notes |
|------|--------|----------------|--------|-------|
| Display title | Source Serif 4 | 2.5–2.75rem | 600 | Hero only |
| Dek | Instrument Sans | 1.125rem | 400 | `description` / seoDescription |
| Lead | Source Serif 4 | 1.375rem | 400 | 1–2 sentences, optional drop cap |
| Body | Source Serif 4 | 1.125rem (18px) | 400 | line-height **1.85** |
| H2 chapter | Instrument Sans | 1.75rem | 600 | After label «Часть N» |
| Chapter label | Instrument Sans | 0.6875rem | 600 | uppercase, tracking 0.2em |
| H3 case title | Instrument Sans | 0.8125rem | 600 | uppercase in case header |
| Meta | Instrument Sans | 0.875rem | 500 | Hero metadata |
| Finding title | Instrument Sans | 1.25rem | 600 | Key findings cards |
| Finding body | Instrument Sans | 0.875rem | 400 | Key findings cards |
| Sources | Instrument Sans | 0.8125rem | 400 | Bibliography |
| CTA | Source Serif 4 | 1.0625rem | 400 | Editorial, not button-first |

**Scale:** 4–6 sizes only. No Tailwind `prose` defaults exposed to reader.

---

## 2. Spacing

| Element | Spacing |
|---------|---------|
| Hero padding top/bottom | 3.5rem / 3rem |
| After hero → lead | 2.5rem |
| Between paragraphs | 1.75rem margin-bottom |
| Before H2 chapter | 4rem margin-top, 2.5rem padding-top, border-top |
| After H2 | 1.5rem |
| Key findings section | 4rem vertical margin, 2.5rem internal padding |
| Case card gap | 1.25rem between cases |
| Questions zone | 4rem margin, 2.5rem padding, distinct background |
| Sources | 4rem margin-top, 2.5rem padding-top |
| Author / CTA | 3rem between blocks |

Vertical rhythm uses **8px base** (0.5rem steps).

---

## 3. Page width

| Zone | Max width |
|------|-----------|
| Hero inner | 44rem |
| Article body | **40rem** (~68ch) |
| Key findings grid | 48rem (slightly wider for 2×2 cards) |
| Questions grid | 48rem |
| Homepage hero | 42rem |
| Header / footer | 72rem |

Article is **centered** on warm paper background (`#faf9f7`), white cards on top where needed.

---

## 4. Hero structure

```
[ИССЛЕДОВАНИЕ]          ← category, uppercase, tracked
Title (display serif)
Dek (sans, muted)
Author · Date · N мин     ← meta row
──────────                ← short rule, max 4rem wide
```

No body text in hero. No buttons. Reader must feel «вхожу в публикацию».

---

## 5. Lead structure

- Rendered **before** first chapter (Часть 1)
- 1–2 sentences from opening or `lead` frontmatter
- Larger size, muted color
- Optional **drop cap** on first letter (desktop)
- Bottom border separating lead from main body

---

## 6. Pull quotes

- `blockquote` → `.tw-pull-quote`
- Serif italic, 1.35rem, left border 2px `#3d3832`
- Margin 2.5rem vertical
- No default grey box

---

## 7. Statistics / figures

Directive `:::statistic` or auto «finding» cards:

- Sans, 1.0625rem, medium weight
- Background `#f3f1ec`, border 1px `#e8e4dc`
- Padding 1.25rem 1.5rem
- Used in body and in **Key Findings** grid

---

## 8. Tables

- Wrapper `.tw-table-scroll` — horizontal scroll on narrow viewports
- Table `.tw-table` — sans 0.875rem
- Header row: uppercase labels, warm grey background
- Cell padding 0.875rem 1rem
- Border 1px `#e8e4dc`, radius on wrapper 0.5rem
- Never raw browser default

---

## 9. Sources

- Section title: «Источники», small caps style
- Ordered list appearance via CSS counters (not bare bullets)
- Two-column grid on desktop optional; single column mobile
- Links: muted, underline offset, break-all on long URLs
- Separated from body by top border + 2.5rem padding

---

## 10. Questions (practical section)

- Zone title: «Практика» + H2 epilog title
- Background `#f3f1ec`, rounded 0.75rem, padding 2.5rem
- Questions: **numbered cards**, 2 columns ≥640px
- Closing line centered, italic serif — emotional beat
- Must read as **tool**, not appendix

---

## 11. Author card

- Label «Автор»
- Avatar circle with initial (no photo required)
- Name serif 1.25rem, role sans muted, bio sans 0.9375rem
- Top border separation from article

---

## 12. CTA

- No primary button block
- Serif sentence + text link with underline
- Tone: continuation, not conversion funnel
- Link to timewoven.ru

---

## 13. Homepage

```
[TimeWoven Research]     ← eyebrow
H1 mission headline
Lead paragraph
Purpose paragraph (why library exists)
────────────────
Featured publication card (single research OK)
Link: Все исследования
```

Warm hero band, white card for featured item, no empty SaaS dashboard.

---

## 14. Catalog cards

- White card, border, hover shadow
- Badge «Избранное» if featured
- Title serif 1.5rem
- Description 2–3 lines
- Meta: date · reading time

---

## 15. Color

| Token | Value |
|-------|-------|
| Ink | `#1a1816` |
| Ink muted | `#5c5650` |
| Ink soft | `#7a736c` |
| Paper | `#faf9f7` |
| Paper warm | `#f3f1ec` |
| Line | `#e8e4dc` |
| Accent | `#3d3832` |

No brand purple/indigo SaaS gradients on article pages.

---

## 16. Markdown contract (author)

Authors write normal Markdown. Template adds automatically:

| Feature | Mechanism |
|---------|-----------|
| Hero / meta | frontmatter + `ResearchLayout` |
| Lead | remark `applyLead` or `lead` field |
| Chapters | `## Блок N.` → chapter label + H2 |
| Key findings | frontmatter `keyFindings[]` → injected before epilog |
| Cases | `### Кейс N:` → case cards |
| Questions | `## Эпилог` + numbered list |
| Sources | `## Источники` |
| Directives | `:::insight`, `:::statistic`, `:::note` |

---

## 17. Owner approval gate

Implementation in `src/styles/article-template.css` + `ResearchLayout` must match this document.

**No new research files** until owner marks:

`TW-CONTENT-002C ARTICLE TEMPLATE APPROVED`
