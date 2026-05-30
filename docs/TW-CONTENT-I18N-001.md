# TW-CONTENT-I18N-001 — Multilingual Foundation

**Status:** CLOSED (PROD verified — infrastructure only, no publication translations)  
**Environment:** PROD-FIRST  
**Target locales:** RU (default), EN, ZH

## Purpose

Prepare the Research Library (`research.timewoven.ru`) for multilingual operation without duplicating page implementations. This wave adds routing, dictionaries, publication identity, fallback behaviour, and hreflang infrastructure. Content translation waves follow separately (TW-CONTENT-I18N-002 EN, TW-CONTENT-I18N-003 ZH).

## Language registry

Central registry: `src/lib/i18n/languages.ts`

| Code | Default | URL prefix | Label |
|------|---------|------------|-------|
| `ru` | yes | _(none)_ | RU |
| `en` | no | `/en` | EN |
| `zh` | no | `/zh` | 中文 |

All routing and locale checks must use `SUPPORTED_LOCALES`, `DEFAULT_LOCALE`, and `LOCALE_REGISTRY`. Do not hardcode locale strings in pages.

## URL architecture

| Surface | RU (canonical) | EN | ZH |
|---------|----------------|----|----|
| Home | `/` | `/en/` | `/zh/` |
| Research catalog | `/research/` | `/en/research/` | `/zh/research/` |
| Research article | `/research/{slug}/` | `/en/research/{slug}/` | `/zh/research/{slug}/` |
| Essays | `/essays/` | `/en/essays/` | `/zh/essays/` |
| Articles | `/articles/` | `/en/articles/` | `/zh/articles/` |

Path helpers: `src/lib/i18n/paths.ts`

- `localePath(locale, pathname)` — build localized URL
- `parseLocalePath(pathname)` — parse request path
- `switchLocalePath(currentPath, targetLocale)` — language switcher
- `hreflangAlternatesForPath(pathname)` — SEO alternates

## Shared routing model

Page files under `src/pages/` are thin wrappers. Shared UI lives in `src/views/`:

| View | Used by |
|------|---------|
| `HomePage.astro` | `/`, `/en/`, `/zh/` |
| `ResearchCatalogPage.astro` | `*/research/` |
| `ResearchArticlePage.astro` | `*/research/[slug]/` |
| `EssaysCatalogPage.astro` | `*/essays/` |
| `ArticlesCatalogPage.astro` | `*/articles/` |

Each view accepts a `locale: Locale` prop. No duplicated layout logic.

Static paths for research articles: `src/lib/i18n/static-paths.ts` (`researchDetailStaticPaths`).

## Translation dictionaries

UI copy only — `src/lib/i18n/messages.ts`

- Typed keys (`MessageKey`)
- `t(locale, key)` accessor
- RU strings match current production copy
- EN/ZH contain UI shell strings for navigation, catalogs, fallback (not article body)

Templates and views must not contain inline locale-specific UI strings.

## Language switcher

Component: `src/components/LanguageSwitcher.astro`

- Rendered in `Header.astro` on every page
- Shows RU / EN / 中文
- Highlights current locale (`aria-current="page"`)
- Desktop + mobile (wraps in header actions stack)

## Publication model

Schema extensions in `src/content.config.ts`:

```yaml
publicationId: TW-R-0001   # stable across locales
locale: ru                  # ru | en | zh
slug: family-memory-third-generation
```

Rules:

- One `publicationId` = one logical publication
- Each locale is a separate content entry (future waves)
- Example prod research: `TW-R-0001` (RU only today)

Registry helpers: `src/lib/publications.ts`

- `getResearch(locale)` — filter by locale
- `getResearchByPublicationId(id, locale)`
- `getResearchRegistry()` — canonical slugs for static paths

## Fallback model

When a locale route exists but no translation entry:

- HTTP **200** (not 404)
- Component: `src/components/TranslationUnavailable.astro`
- Message from dictionary (`fallback.*`)
- Link back to catalog + home
- Optional link to RU version when viewing EN/ZH

Example: `/en/research/family-memory-third-generation/` until EN markdown exists.

## SEO foundation

`BaseLayout.astro` emits for every page:

- `<html lang="...">` from registry
- `<link rel="alternate" hreflang="..." />` for ru / en / zh-Hans
- `<link rel="alternate" hreflang="x-default" />` → RU URL
- `og:locale` per active locale

No translated SEO titles/descriptions in this wave (RU article SEO unchanged).

Astro config: `i18n.defaultLocale = ru`, `prefixDefaultLocale: false`.

## Future language onboarding

To add locale `de`:

1. Add `de` to `SUPPORTED_LOCALES` and `LOCALE_REGISTRY` in `languages.ts`
2. Add `de` dictionary object in `messages.ts`
3. Add `src/pages/de/**` thin wrappers (copy from `en/`)
4. Add `de` to `astro.config.mjs` `i18n.locales`
5. Add `locale: de` content entries with existing `publicationId`
6. No changes to view components required

## Verify checklist

- [x] RU `/` unchanged copy (from dictionaries)
- [x] RU article `/research/family-memory-third-generation/` renders
- [x] EN `/en/research/family-memory-third-generation/` → fallback 200
- [x] ZH `/zh/research/family-memory-third-generation/` → fallback 200
- [x] Language switcher on all surfaces
- [x] hreflang links in page source (ru / en / zh-Hans / x-default)
- [x] No layout regression desktop/mobile (visual owner review pending)

## Related waves

| Wave | Scope |
|------|-------|
| TW-CONTENT-I18N-002 | English library content |
| TW-CONTENT-I18N-003 | Chinese library content |
