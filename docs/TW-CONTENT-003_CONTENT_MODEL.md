# TW-CONTENT-003 — Content Model (Taxonomy)

**Actual as of:** 2026-05-19  
**Status:** DRAFT — owner approval required  
**Environment:** MAC (timewoven-research)

## Purpose

Define what belongs in TimeWoven Research and what does not, before new publications are added.

## Research

**Definition:** Deep analytical publications about family memory, generations, and continuity.

**Belongs:**

- Multi-chapter analytical texts with theory, cases, and sources
- Social-scientific framing with reader-facing language
- Canonical template: Hero → Lead → Parts → Body → optional Cases/Tables → Key Findings → optional Practical → Sources → Author → CTA

**Does not belong:**

- Product release notes or changelog copy
- API or implementation documentation
- One-paragraph announcements
- Marketing landing pages disguised as research

## Essays

**Definition:** Reflective longform writing — personal, calm, without academic apparatus.

**Belongs:**

- First-person or intimate third-person reflection on family and memory
- Narrative arcs that do not require footnotes, case grids, or formal Key Findings
- Texts that complement research but are not substitutes for it

**Does not belong:**

- Full research template (cases, bibliography blocks, 20 questions) unless explicitly approved under a new TW-CONTENT task
- News digests or listicles
- Republished press releases

## Articles

**Definition:** Short editorial publications — notes and explainers beside research.

**Belongs:**

- Single-topic pieces readable in one sitting (typically shorter than essays)
- Practical observations, glossaries, or focused arguments
- Material that points readers to related research

**Does not belong:**

- Full research-length manuscripts
- Raw interview transcripts without editorial framing
- SEO-only stub pages

## Cross-cutting rules

| Rule | Requirement |
|------|-------------|
| Language | Russian reader-facing copy; no CMS/developer jargon on public surfaces |
| Approval | New section types or template changes require owner approval + TW-CONTENT-XXX task |
| Placement | Collection folder must match `contentType` in frontmatter |
| Featured | At most one featured research on home until catalog policy is revised |

## Owner gate

No new publication in any section until **TW-CONTENT-003** is owner-approved and **TW-CONTENT-004** is unblocked per program plan.
