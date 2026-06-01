# TW-E-0001 — Release Record (research.timewoven.ru)

**Status:** CLOSED — PROD VERIFIED  
**Actual as of:** 2026-06-01  
**Environment:** MAC → GitHub → PROD (static SSG)

---

## Release summary

| Item | Status |
|------|--------|
| Feature branch | PASS |
| Build | PASS |
| RU essay | PASS |
| EN essay | PASS |
| ZH essay | PASS |
| Language switch | PASS |
| PR #9 | MERGED |
| GitHub `main` | `a64817c` |
| PROD deploy | PASS |
| research.timewoven.ru | LIVE |

---

## SHA ledger

| Role | SHA |
|------|-----|
| **Deploy SHA** | `a64817c` |
| **Rollback SHA** | `58f4b15` |
| Feature commit (pre-squash) | `84002ea` |

---

## Scope

### Essay publishing framework

- `EssayLayout`, `EssayArticlePage`, `RelatedEssays`
- Multilingual `[slug].astro` routes (RU / EN / ZH)
- Locale-aware `static-paths`, `publication-registry`, `translation-matrix`
- `LanguageSwitcher` + `LanguageCoverage` (per-locale slugs)
- Header updates (TW-RESEARCH-HEADER-001, single wave with TW-E-0001)
- `docs/localization-guidelines.md`

### First publication — TW-E-0001

| Locale | Title | URL slug |
|--------|-------|----------|
| RU | Голос, которого больше нет | `golos-kotorogo-bolshe-net` |
| EN | The Voice That Is Gone | `the-voice-that-is-gone` |
| ZH | 那已消逝的声音 | `na-yi-xiaoshi-de-shengyin` |

**Canonical URLs (PROD):**

- `https://research.timewoven.ru/essays/golos-kotorogo-bolshe-net/`
- `https://research.timewoven.ru/en/essays/the-voice-that-is-gone/`
- `https://research.timewoven.ru/zh/essays/na-yi-xiaoshi-de-shengyin/`

Note: URL uses frontmatter `slug`, not filename (`tw-e-0001-*.md`).

---

## Git pipeline

| Step | Result |
|------|--------|
| Branch | `feature/TW-E-0001-essay` |
| Commit | `84002ea` — 34 files |
| PR | [#9](https://github.com/Dmitriy-Bondarev/TimeWoven-Research/pull/9) |
| Merge | Squash → `a64817c` on `main` |
| CI | PASS |

---

## PROD deploy

| Field | Value |
|-------|--------|
| Host | `vm-nano` (`193.187.95.221`) |
| Git clone | `/root/projects/TimeWoven-Research` |
| Static root | `/var/www/research.timewoven.ru` |
| Method | `git reset --hard origin/main` → `npm run build` → `cp dist/*` |
| Pre-deploy clone SHA | `3357b86` (behind; no server-only commits — synced via PR #8) |

### PROD verify

| URL | Result |
|-----|--------|
| `https://research.timewoven.ru/` | 200 |
| `/essays/golos-kotorogo-bolshe-net/` | 200 (301 trailing slash OK) |
| `/en/essays/the-voice-that-is-gone/` | 200 |
| `/zh/essays/na-yi-xiaoshi-de-shengyin/` | 200 |

---

## Alignment (post-release)

| Layer | SHA / state |
|-------|-------------|
| GitHub `main` | `a64817c` |
| PROD clone | `a64817c` |
| PROD static | TW-E-0001 live |

---

## Rollback

1. On server: `cd /root/projects/TimeWoven-Research && git reset --hard 58f4b15`
2. `npm install && npm run build`
3. `rm -rf /var/www/research.timewoven.ru/* && cp -R dist/* /var/www/research.timewoven.ru/`

Removes essay framework and TW-E-0001; restores pre-essay Research library at PR #8 tip.

---

## Next candidates (project priority)

1. **TW-MEMORY-DETAIL-AUDIT-001** — memory card revision (TimeWoven app)
2. **TW-OPS-STAGING-DEPLOY-001** — `deploy_staging.sh` vs staging config (TimeWoven)
3. **TW-E-0002** — next Research essay
