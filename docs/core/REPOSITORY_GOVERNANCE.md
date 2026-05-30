# Repository governance (TimeWoven Research)

**Actual as of:** 2026-05-19

## Alignment with TimeWoven

| Setting | TimeWoven (app) | TimeWoven-Research (this repo) |
|---------|-----------------|--------------------------------|
| Default branch | `main` | `main` |
| Integration branch | `develop` | `develop` |
| Feature → develop | Squash merge | Squash merge |
| develop → main | Merge commit | Merge commit |
| Branch rulesets | `develop` + `main` | Same pattern (CI `quality`) |
| Runtime | FastAPI VPS | Astro SSG + nginx |

Полный аудит-канон: репозиторий **TimeWoven** — `docs/audit/It_audit_Spec_v5/TW_GOV_001_*`.

## Initial repo repair (2026-05-19)

До выравнивания:

- default branch на GitHub был `develop` при пустом `develop` и полным кодом на `main`;
- не было CI и branch protection;
- в git попал `scripts/__pycache__/`.

После `chore/TW-GOV-repo-alignment`:

- CI `quality`, rulesets, `main` как default;
- PR #1 squash → `develop`, затем release PR `develop` → `main`.
