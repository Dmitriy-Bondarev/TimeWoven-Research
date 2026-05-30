# TimeWoven Research — Rules of Work

**Actual as of:** 2026-05-19  
**Canonical source (org):** `Dmitriy-Bondarev/TimeWoven` — `docs/core/Rules_of_work.md` (TW-GOV-004).

Этот репозиторий следует **тому же Git flow**, что и основное приложение TimeWoven.

## Branches

| Branch | Role |
|--------|------|
| `develop` | Integration — все фичи через PR |
| `main` | Release / PROD static deploy reference |
| `feature/*` | Задачи TW-CONTENT-* |

## Merge policy (TW-GOV-004)

- **`feature/*` → `develop`:** GitHub PR, **Squash merge only** (один PR → один коммит в `develop`).
- **`develop` → `main`:** Release PR, **Merge commit only** (не squash).
- **Запрещено:** direct push в `main`, force push в `main`.

## Daily cycle (MAC)

```bash
cd ~/Projects/TimeWoven-Research/timewoven-research
git checkout develop
git pull origin develop
npm ci
npm run build
```

Feature:

```bash
git checkout -b feature/TW-CONTENT-XXX-short-name
# work…
git commit -m "TW-CONTENT-XXX: description"
git push -u origin feature/TW-CONTENT-XXX-short-name
# gh pr create --base develop
```

## Deploy (research.timewoven.ru)

- **Static only:** `npm run build` → `dist/` → `/var/www/research.timewoven.ru` (см. `docs/TW-CONTENT-005_DEPLOY_RECORD.md`).
- **Не трогать:** `timewoven.ru`, `app.timewoven.ru`, `admin.timewoven.ru`.

## CI

PR в `develop` / `main` требуют check **`quality`** (`.github/workflows/ci.yml`).
