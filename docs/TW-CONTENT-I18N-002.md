# TW-CONTENT-I18N-002 — English Library

**Status:** IMPLEMENTED (PROD)  
**Environment:** PROD-FIRST  
**Depends on:** TW-CONTENT-I18N-001, TW-CONTENT-PUBLISHING-001

## Scope

Full English content layer for Research Library — no routing, registry, or style changes.

## Deliverables

| Phase | Result |
|-------|--------|
| EN site copy | `src/lib/i18n/messages.ts` — editorial EN strings |
| TW-R-0001 EN | `src/content/research/en/family-memory-third-generation.md` |
| EN citation | Locale-aware permanent link (`/en/research/...`) |
| EN copyright | `src/lib/publications/copyright.ts` |
| Plugin support | `remark-research.ts`, `remark-cases.ts` — Part/Case/Sources EN patterns |
| Content IDs | `generateId: locale/slug` in `content.config.ts` |

## Content layout

```text
src/content/research/
  family-memory-third-generation.md     # locale: ru
  en/family-memory-third-generation.md  # locale: en, same slug + publicationId
```

## Verify

- [x] `/en/` — EN homepage copy
- [x] `/en/research/` — catalog with TW-R-0001
- [x] `/en/research/family-memory-third-generation/` — full article
- [x] EN citation + copyright
- [x] Language switch RU ↔ EN
- [x] hreflang alternates
- [x] RU runtime unchanged

## Next

**TW-CONTENT-I18N-003** — Chinese Library
