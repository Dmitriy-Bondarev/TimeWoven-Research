# TW-CONTENT-001 — Infrastructure Foundation

**STATUS:** IMPLEMENTED (MAC)  
**Actual as of:** 2026-05-19  
**Environment:** MAC only — no FastAPI / staging / prod / nginx / deploy

## VERIFY

| Check | Result |
|-------|--------|
| `npm run dev` | PASS |
| `npm run build` | PASS |
| Content Collections | PASS |
| Tailwind | PASS |
| SEO (site, canonical, robots, sitemap) | PASS |

## Path

`~/Projects/TimeWoven-Research/timewoven-research`

## Note (Astro 6)

Конфиг коллекций: `src/content.config.ts` + `glob()` loaders (не legacy `src/content/config.ts`).

## Follow-up

- **TW-CONTENT-001A** — hardened `publicationSchema` (slug, contentType, featured, readingTime, SEO/OG fields)

## Next

TW-CONTENT-002 — Publishing System + первая публикация «После третьего поколения становится тихо».
