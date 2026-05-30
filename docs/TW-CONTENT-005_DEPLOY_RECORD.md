# TW-CONTENT-005 — Deploy Record (research.timewoven.ru)

**Actual as of:** 2026-05-19  
**Environment:** PROD  
**Status:** DEPLOYED — **Owner Review: REQUIRED**

## Phase 0 — MAC fingerprint (pre-deploy)

| Field | Value |
|-------|--------|
| pwd | `/Users/continuum/Projects/TimeWoven-Research/timewoven-research` |
| branch | `main` |
| pre-commit SHA (rollback) | `c006d88ac3ed7a490cfb3ac68ab2351df958db41` |
| `npm run build` (pre-commit) | PASS |

## Phase 1 — Commit

| Field | Value |
|-------|--------|
| message | `TW-CONTENT-001..003A research library foundation` |
| deploy SHA | `3165e058102ae6a34ad1352a5c26b2e2c6541985` |
| git status after commit | clean |

## Phase 2–6 — PROD (HOSTKEY / vm-nano)

| Field | Value |
|-------|--------|
| host | `vm-nano` (`193.187.95.221`) — production VPS |
| site root | `/var/www/research.timewoven.ru` |
| nginx vhost | `/etc/nginx/sites-available/research.timewoven.ru` → `sites-enabled/` |
| nginx logs | `/var/log/nginx/research-timewoven-access.log`, `research-timewoven-error.log` |
| TLS | Let's Encrypt `research.timewoven.ru` (certbot 2026-05-19, expires 2026-08-28) |
| runtime | None (static SSG only) |

**Not modified:** `timewoven.ru`, `app.timewoven.ru`, `admin.timewoven.ru` vhosts.

**Artifact transfer:** `tar` over SSH from MAC `dist/` (remote has no `rsync`).

## Phase 7 — PROD verify

| URL | Result |
|-----|--------|
| `https://research.timewoven.ru/` | 200 |
| `https://research.timewoven.ru/research` | 301 → `/research/` → 200 |
| `https://research.timewoven.ru/research/family-memory-third-generation` | 301 → trailing slash → 200 |
| Styles/fonts (Google Fonts + `/_astro/*.css`) | loaded on home HTML |
| Footnotes | `research-cite-link` present on article (66 anchors) |
| CTA | `timewoven.ru` link in article shell |

## Phase 8 — SEO verify

| Check | Result |
|-------|--------|
| `/sitemap-index.xml` | 200 |
| `/robots.txt` | 200 — `Sitemap: https://research.timewoven.ru/sitemap-index.xml` |
| canonical (home) | `https://research.timewoven.ru/` |

## Rollback

1. Remove vhost: `rm /etc/nginx/sites-enabled/research.timewoven.ru && nginx -t && systemctl reload nginx`
2. Optional: clear `/var/www/research.timewoven.ru`
3. Git rollback reference: `c006d88` (pre-foundation Astro stub)

Redeploy previous static tree: restore tarball backup of `/var/www/research.timewoven.ru` if taken; or rebuild from SHA `3165e05` and re-upload `dist/`.

## VERIFY — TW-CONTENT-005

| Check | Result |
|-------|--------|
| Environment | PROD |
| Build | PASS |
| Deploy | PASS |
| Nginx | PASS |
| TLS | PASS |
| Research Home | PASS |
| Research Article | PASS |
| SEO | PASS |
| Rollback SHA | RECORDED (`c006d88`) |
| Owner Review | **REQUIRED** |

## LIVE

```text
https://research.timewoven.ru
```
