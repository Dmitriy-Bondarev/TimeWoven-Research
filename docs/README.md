# TW-CONTENT — документация (timewoven-research)

**Actual as of:** 2026-05-19

## Статус волн

| ID | Документ | Статус |
|----|----------|--------|
| 001 | [TW-CONTENT-001.md](./TW-CONTENT-001.md) | CLOSED (foundation) |
| 001A | [TW-CONTENT-001A.md](./TW-CONTENT-001A.md) | CLOSED (schema) |
| 002 | [TW-CONTENT-002.md](./TW-CONTENT-002.md) | CLOSED |
| 002B | [TW-CONTENT-002B.md](./TW-CONTENT-002B.md) | CLOSED |
| 002C | [TW-CONTENT-002C.md](./TW-CONTENT-002C.md) | CLOSED |
| 002C-FIX | [TW-CONTENT-002C-FIX.md](./TW-CONTENT-002C-FIX.md) | CLOSED |
| 002C-FIXA | [TW-CONTENT-002C-FIXA.md](./TW-CONTENT-002C-FIXA.md) | CLOSED |
| 002C style audit | [TW-CONTENT-002C_STYLE_AUDIT.md](./TW-CONTENT-002C_STYLE_AUDIT.md) | CLOSED (read-only) |
| 002D | [TW-CONTENT-002D.md](./TW-CONTENT-002D.md) | CLOSED |
| 003 | [TW-CONTENT-003.md](./TW-CONTENT-003.md) | **CLOSED** |
| 003A | [TW-CONTENT-003A.md](./TW-CONTENT-003A.md) | **CLOSED** |
| 003A-FIX-HEADER | [TW-CONTENT-003A-FIX-HEADER.md](./TW-CONTENT-003A-FIX-HEADER.md) | CLOSED |
| 005 | [TW-CONTENT-005_DEPLOY_RECORD.md](./TW-CONTENT-005_DEPLOY_RECORD.md) | **DEPLOYED** (PROD) |
| E-0001 | [TW-E-0001_RELEASE_RECORD.md](./TW-E-0001_RELEASE_RECORD.md) | **CLOSED** (PROD VERIFIED) |

## Governance (канон)

- [TW-CONTENT-003_CONTENT_MODEL.md](./TW-CONTENT-003_CONTENT_MODEL.md)
- [TW-CONTENT-003_LIBRARY_IDENTITY.md](./TW-CONTENT-003_LIBRARY_IDENTITY.md)
- [TW-CONTENT-003_RESEARCH_PAGE_CANON.md](./TW-CONTENT-003_RESEARCH_PAGE_CANON.md)
- [TW-CONTENT-003_TEMPLATE_GOVERNANCE.md](./TW-CONTENT-003_TEMPLATE_GOVERNANCE.md)

## PROD

- **URL:** https://research.timewoven.ru
- **Deploy SHA:** `a64817ca0dbd90205d74781b4e2b2f93e65233cd` (TW-E-0001)
- **Rollback SHA:** `58f4b15` (pre-TW-E-0001)
- **Previous foundation deploy:** `3165e05` / rollback `c006d88`
- **Nginx reference:** [nginx/research.timewoven.ru.conf](./nginx/research.timewoven.ru.conf)

## GitHub governance

- **TW-RESEARCH-GITHUB-001** — editorial model: `feature/*` → **`main`** (см. `docs/TW-RESEARCH-GITHUB-001.md`)
- **TW-RESEARCH-OPS-001** — MAC = canonical Git; PROD = editorial only; GitHub = truth (см. `docs/TW-RESEARCH-OPS-001.md`)

## Следующая волна

**TW-E-0002** — следующее эссе (Research).  
**TW-CONTENT-004** — дополнительные публикации research/articles.
