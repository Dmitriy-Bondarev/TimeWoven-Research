# TimeWoven Research — Rules of Work

**Actual as of:** 2026-05-19  
**Governance:** **TW-RESEARCH-GITHUB-001** (editorial / PROD-first; not TimeWoven app flow).

Этот репозиторий — **редакционная платформа** (Astro SSG). Публикация идёт на **PROD**; staging-ветки и `develop` **не** являются частью обычного цикла.

## Editorial workflow (канон)

```text
PROD (research.timewoven.ru)
  → правка / публикация материала
  → commit в git (Mac)
  → push в GitHub (ветка main)
```

Нет редакционного staging. Нет обязательного `develop`.

## Branches

| Branch | Role |
|--------|------|
| **`main`** | Единственная рабочая ветка; зеркало опубликованного состояния |
| **`feature/*`** | Шаблон, runtime, крупные изменения — только через PR в `main` |
| **`develop`** | Опционально, архив / история; **не** требуется для публикации |

## Merge policy

- **`feature/*` → `main`:** GitHub PR; **Squash merge** (рекомендуется) или merge commit.
- **Запрещено:** force push в `main`; прямой push в `main` блокируется ruleset (кроме явного bypass владельца).
- **Не используется:** `feature/*` → `develop` → `main`.

## Daily cycle (MAC)

```bash
cd ~/Projects/TimeWoven-Research/timewoven-research
git checkout main
git pull origin main
npm ci
npm run build
```

После правки на PROD / в репозитории:

```bash
git checkout -b feature/TW-CONTENT-XXX-short-name   # или chore/content-…
git commit -m "TW-CONTENT-XXX: description"
git push -u origin feature/TW-CONTENT-XXX-short-name
gh pr create --base main
```

Мелкие контентные правки можно вести в короткой ветке от `main` и смержить одним PR (squash).

## Deploy (research.timewoven.ru)

- **Static:** `npm run build` → `dist/` → `/var/www/research.timewoven.ru` (см. `docs/TW-CONTENT-005_DEPLOY_RECORD.md`).
- **Не трогать:** `timewoven.ru`, `app.timewoven.ru`, `admin.timewoven.ru`.

## CI

PR и push в **`main`** требуют check **`quality`** (`.github/workflows/ci.yml`).
