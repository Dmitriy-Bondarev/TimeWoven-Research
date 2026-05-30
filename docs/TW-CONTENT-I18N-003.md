# TW-CONTENT-I18N-003 — Chinese Library

**Status:** IMPLEMENTED (PROD)  
**Environment:** PROD-FIRST  
**Depends on:** TW-CONTENT-I18N-001, TW-CONTENT-I18N-002, TW-CONTENT-I18N-002A

## Scope

Full Simplified Chinese (简体中文) content layer — no routing, registry, matrix, or style changes.

## Deliverables

| Phase | Result |
|-------|--------|
| ZH site copy | `src/lib/i18n/messages.ts` — editorial zh-Hans strings |
| TW-R-0001 ZH | `src/content/research/zh/family-memory-third-generation.md` |
| ZH citation | 引用方式, `/zh/research/...` permanent link |
| ZH copyright | `copyright.ts` zh block |
| Plugin support | 第N部分, 案例 N, 来源, 结语 patterns |
| Author profile | `nameZh`, `roleZh`, `bioZh` on bondarev |

## Content layout

```text
src/content/research/
  family-memory-third-generation.md     # ru
  en/family-memory-third-generation.md
  zh/family-memory-third-generation.md  # locale: zh, publicationId: TW-R-0001
```

Content store id: `zh/family-memory-third-generation` via `generateId: locale/slug`.

## TW-R-0001 translation matrix (after wave)

| Locale | Status |
|--------|--------|
| RU | published ✓ |
| EN | published ✓ |
| ZH | published ✓ |

Language coverage on all three: Русский · English · 中文

## Verify

- [x] `/zh/` — Chinese homepage
- [x] `/zh/research/` — catalog
- [x] `/zh/research/family-memory-third-generation/` — full article
- [x] Citation + copyright localized
- [x] hreflang ru / en / zh-Hans / x-default
- [x] RU / EN unchanged

## Related

- `docs/TW-CONTENT-I18N-GOVERNANCE.md`
- `docs/TW-CONTENT-I18N-002.md`
