# timewoven-research

Контентный сайт TimeWoven на Astro (SSG).

**Домен (канон):** https://research.timewoven.ru

## MAC

```bash
npm install
npm run dev
npm run build
npm run verify:citations
```

## Структура

- `src/content/` — articles, research, essays, authors
- `src/layouts/` — BaseLayout, ResearchLayout
- `docs/` — TW-CONTENT волны и governance (см. [docs/README.md](./docs/README.md))
- `docs/nginx/research.timewoven.ru.conf` — reference vhost (static)

## Git flow

- `feature/*` → **`develop`** (PR, squash merge)
- `develop` → `main` — release по регламенту владельца

## Статус

- **TW-CONTENT-001..003A** — CLOSED
- **TW-CONTENT-005** — PROD LIVE (`docs/TW-CONTENT-005_DEPLOY_RECORD.md`)
- **TW-CONTENT-004** — следующая волна (контент)
