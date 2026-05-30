# TW-CONTENT-PUBLISHING-001 — Publication Identity & Copyright System

**Status:** IMPLEMENTED (PROD)  
**Environment:** PROD-FIRST  
**Scope:** Infrastructure only — no translations, no new content, no style redesign

## Purpose

Canonical publication identity for TimeWoven Research across all locales (RU / EN / ZH / future). Stable IDs, permanent URIs, automated citation and copyright blocks.

## Publication ID format

| Prefix | Type | Example |
|--------|------|---------|
| `TW-R-` | Research | `TW-R-0001` |
| `TW-E-` | Essay | `TW-E-0001` |
| `TW-A-` | Article | `TW-A-0001` |

**Rules:**

- ID never changes after assignment
- One `publicationId` per logical publication across all language versions
- Prefix must match `publicationType` / `contentType`

## Schema (frontmatter)

```yaml
publicationId: TW-R-0001
publicationType: research      # optional; derived from contentType / ID prefix
publicationDate: 2026-05-30    # optional; defaults to publishedAt
author: bondarev               # author registry id
locale: ru
contentType: research
slug: family-memory-third-generation
publishedAt: 2026-05-30
```

## Publication Identity Layer

Implementation: `src/lib/publications/`

| Module | Responsibility |
|--------|----------------|
| `publication-types.ts` | ID parsing, type resolution, validation |
| `publication-registry.ts` | `getPublicationById()`, registry, permanent URL |
| `citation.ts` | Citation model and formatting |
| `copyright.ts` | Locale-specific copyright text |
| `index.ts` | Public API (queries, paths) |

### Key API

```typescript
getPublicationById('TW-R-0001')           // cross-locale identity
getPublicationRepresentation(id, locale)  // locale-specific entry
getPermanentPublicationUrl(identity)      // RU canonical URL
buildCitation(model)                      // citation block data
getCopyrightModel(locale)                 // copyright paragraphs (RU today)
```

## Permanent URI model

Language-specific URLs; identity is language-independent:

| Locale | URL |
|--------|-----|
| RU | `/research/family-memory-third-generation/` |
| EN | `/en/research/family-memory-third-generation/` |
| ZH | `/zh/research/family-memory-third-generation/` |

**Permanent citation URL** always uses default locale (RU) path — independent of active page language.

## Citation Rules

- Rendered by `PublicationCitation.astro` on every published article page
- Built from: author name, title, imprint, `publicationId`, year, permanent URL
- RU author format: `Бондарев Д.` (surname + initial)
- Labels via `src/lib/i18n/messages.ts` (`citation.*`) for future EN/ZH content

## Copyright Rules

- Rendered by `PublicationCopyright.astro` below citation
- **RU text active** in `copyright.ts`
- **EN / ZH:** architecture ready (`getCopyrightModel` returns `null` until texts added)
- No copyright block on translation-unavailable fallback pages

## Language Independence

Adding a new locale:

1. Add content entry with same `publicationId` and target `locale`
2. Add `citation.*` / copyright strings in `messages.ts` / `copyright.ts`
3. No changes to `ResearchLayout`, registry, or routing

## Components

| Component | Location |
|-----------|----------|
| Citation | `src/components/PublicationCitation.astro` |
| Copyright | `src/components/PublicationCopyright.astro` |

Article page order (after prose): **Citation → Copyright → Author → CTA → Related**

## Verify checklist

- [x] Publication registry (`getPublicationById`)
- [x] TW-R-0001 metadata in frontmatter
- [x] Citation block on RU article
- [x] Copyright block on RU article
- [x] EN/ZH fallback unchanged
- [x] No visual redesign (existing research typography tokens)

## Related

- **TW-CONTENT-I18N-001** — locale routing foundation
- **TW-CONTENT-003_RESEARCH_PAGE_CANON.md** — page structure canon (updated)
