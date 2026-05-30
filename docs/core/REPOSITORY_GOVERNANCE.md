# Repository governance (TimeWoven Research)

**Actual as of:** 2026-05-19  
**Canon:** **TW-RESEARCH-GITHUB-001** — editorial PROD-first model.

## Not the same as TimeWoven (app)

| Aspect | TimeWoven (FastAPI app) | TimeWoven-Research (this repo) |
|--------|-------------------------|--------------------------------|
| Purpose | Product runtime | Editorial publishing (SSG) |
| Staging | staging.timewoven.ru | **None** (editorial) |
| Integration branch | `develop` | **None required** |
| Publish path | develop → main → deploy | **PROD → git → `main`** |
| Default branch | `main` | **`main`** |
| Protected branch | `develop` + `main` | **`main` only** |

См. отчёт: **`docs/TW-RESEARCH-GITHUB-001.md`**.

## GitHub settings (after TW-RESEARCH-GITHUB-001)

| Setting | Value |
|---------|--------|
| Visibility | `public` |
| Default branch | `main` |
| Delete branch on merge | `true` |
| Ruleset | **`Protect editorial — main`** only |
| CI | `quality` on PR/push to **`main`** |

### Ruleset `main`

- PR required before merge
- Status check **`quality`** required
- **non_fast_forward** (no force push)
- Merge methods: **squash**, **merge**

### `develop`

- Ветка может существовать как **архив** (история до TW-RESEARCH-GITHUB-001).
- **Нет** ruleset, **не** default, **не** в CI triggers.

## Branch strategy (canonical)

| Change type | Git path |
|-------------|----------|
| Small content / post-PROD text sync | Commit → PR → **`main`** (короткая ветка от `main`) |
| Template / remark plugins / CSS runtime | **`feature/*`** → PR → **`main`** |
| Large redesign | **`feature/*`** → PR → **`main`** |

No permanent dependency on **`develop`**.

## Historical note (2026-05-19)

До TW-RESEARCH-GITHUB-001 репозиторий временно копировал app-flow (`develop` + rulesets). Это снято; канон — редакционная модель выше.
