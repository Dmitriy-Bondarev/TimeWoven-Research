# timewoven-research

Редакционная платформа TimeWoven на Astro (SSG).

**Домен (канон):** https://research.timewoven.ru

## Editorial workflow

```text
PROD → publish / edit → git commit → GitHub (main)
```

Нет редакционного staging. Ветка **`develop`** не участвует в обычной публикации.

## MAC

```bash
npm install
npm run dev
npm run build
npm run verify:citations
```

```bash
cd ~/Projects/TimeWoven-Research/timewoven-research
git checkout main
git pull origin main
```

## Структура

- `src/content/` — articles, research, essays, authors
- `src/layouts/` — BaseLayout, ResearchLayout
- `docs/` — TW-CONTENT волны и governance (см. [docs/README.md](./docs/README.md))
- `docs/nginx/research.timewoven.ru.conf` — reference vhost (static)

## Git flow (TW-RESEARCH-GITHUB-001)

| Step | Rule |
|------|------|
| Default branch | **`main`** |
| Publishing | **`feature/*` → PR → `main`** (или короткая ветка контента → PR) |
| `develop` | Архив; не обязателен |

См. [`docs/core/Rules_of_work.md`](./docs/core/Rules_of_work.md), [`docs/core/REPOSITORY_GOVERNANCE.md`](./docs/core/REPOSITORY_GOVERNANCE.md), [`docs/TW-RESEARCH-GITHUB-001.md`](./docs/TW-RESEARCH-GITHUB-001.md).

**Pull requests (base `main`):** https://github.com/Dmitriy-Bondarev/TimeWoven-Research/pulls?q=is%3Aopen+base%3Amain

## Статус

- **TW-CONTENT-001..003A** — CLOSED
- **TW-CONTENT-005** — PROD LIVE (`docs/TW-CONTENT-005_DEPLOY_RECORD.md`)
- **TW-RESEARCH-GITHUB-001** — editorial GitHub governance
