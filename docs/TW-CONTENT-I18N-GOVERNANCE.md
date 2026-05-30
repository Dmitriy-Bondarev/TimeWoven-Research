# TW-CONTENT-I18N-GOVERNANCE — Multilingual Publication Governance

**Status:** IMPLEMENTED  
**Environment:** PROD-FIRST  
**Canon:** TW-CONTENT-I18N-002A

## Purpose

Single ruleset for all current and future library languages so RU / EN / ZH (and later locales) stay aligned through one publication identity.

## publicationId

- Stable key: `TW-R-0001`, `TW-E-0001`, `TW-A-0001`
- Never changes after assignment
- One ID = one logical publication across all languages
- URL slug may match across locales; content store id is `{locale}/{slug}`

## Publication status (per locale)

| Status | Meaning |
|--------|---------|
| `draft` | Content file exists; `draft: true` — not public |
| `published` | Live content in this locale |
| `translation_available` | Matrix alias for `published` (✓) |
| `translation_pending` | No live content for this locale; route shows fallback |

Example **TW-R-0001**:

| Locale | Status |
|--------|--------|
| RU | `published` |
| EN | `published` |
| ZH | `published` |

Implementation: `src/lib/publications/publication-status.ts` — computed from content entries (no manual registry file).

## Translation matrix

Registry: `src/lib/publications/translation-matrix.ts`

```typescript
getTranslationMatrix()        // all publications
getTranslationMatrixRow(id)   // TW-R-0001 row
```

Row shape:

```typescript
{
  publicationId: 'TW-R-0001',
  sourceLocale: 'ru',           // canonical source (DEFAULT_LOCALE when present)
  locales: { ru, en, zh },      // per-locale status
  availableLocales: ['ru', 'en'] // published only
}
```

Matrix symbols: ✓ = live, ✕ = pending, — = draft.

## Canonical source language

**RU** (`DEFAULT_LOCALE`) is the canonical source when a RU representation exists.

- Permanent citation URL for RU uses `/research/{slug}/`
- EN/ZH citation permanent links use locale-prefixed URLs when viewing that locale
- `x-default` hreflang → RU URL

## Language coverage block

Component: `src/components/LanguageCoverage.astro`

- Rendered on live publication pages (after copyright)
- Rendered on translation fallback pages
- Lists **published** locales only — text links, no flags
- Labels: `LOCALE_REGISTRY[locale].coverageLabel` (Русский / English / 中文)
- Current locale shown as plain text; others as links

## Translation notice (fallback)

Component: `src/components/TranslationUnavailable.astro`

When locale content is missing:

- HTTP **200** (not 404)
- Title: `fallback.title`
- Body: `translation.notice.{locale}` — locale-specific legal/editorial notice
- Publication ID visible
- Language coverage links to available versions
- Link back to catalog / home / RU when available

Examples:

| Page locale | Notice |
|-------------|--------|
| EN | This publication has not yet been translated into English. |
| ZH | 该出版物暂未提供中文版本。 |

## Future languages

To add locale `de`:

1. Add to `SUPPORTED_LOCALES` and `LOCALE_REGISTRY` (`coverageLabel` included)
2. Add `translation.notice.de` and UI strings in `messages.ts`
3. Add `src/pages/de/**` wrappers
4. Add content at `src/content/{section}/de/{slug}.md` with same `publicationId`
5. Matrix and coverage update automatically — no changes to status resolver

## Related

- `docs/TW-CONTENT-I18N-001.md` — routing foundation
- `docs/TW-CONTENT-PUBLISHING-001.md` — publication identity
- `docs/TW-CONTENT-I18N-002.md` — English library

## Verify (TW-R-0001)

- [x] RU article — coverage: Русский + English links
- [x] EN article — coverage: Русский + English links
- [x] ZH article — coverage: Русский + English + 中文
- [x] Matrix: RU ✓ EN ✓ ZH ✓
