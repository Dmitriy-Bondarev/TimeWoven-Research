# TW-DOMAIN-ARCH-001 — Future International Domain Readiness

**Status:** Architectural preparation (no migration, no URL changes)  
**Date:** 2026-05-20  
**Scope:** TimeWoven (FastAPI) + Research Library (Astro)

---

## Goal

Prepare both products for a possible international domain in the future.  
**No domain purchase. No migration. No runtime URL changes.**  
Only a single configuration layer so that `PUBLIC_SITE_URL` (and siblings) can be changed without mass search-and-replace.

---

## Phase 1 — Domain inventory

### Current production topology

| Host | Role | Product |
|------|------|---------|
| `timewoven.ru` / `www.timewoven.ru` | Marketing landing, early-access form | Static + FastAPI API |
| `research.timewoven.ru` | Research Library (RU/EN/ZH) | Astro static |
| `app.timewoven.ru` | Family product, onboarding, public API | FastAPI |
| `admin.timewoven.ru` | Staff admin, legal CRM | FastAPI (same app) |

See also: `TimeWoven/docs/architecture/TW_DOMAIN_TOPOLOGY_001.md`.

### Runtime hardcodes audited (before fix)

#### Research Library (`TimeWoven-Research`)

| File | Domain | Category | Resolution |
|------|--------|----------|------------|
| `astro.config.mjs` | `research.timewoven.ru` | Astro / sitemap | → `RESEARCH_SITE_URL` env |
| `src/lib/site.ts` | `research.timewoven.ru` | config | → `src/lib/domains.ts` |
| `public/robots.txt` | `research.timewoven.ru` | robots | → `src/pages/robots.txt.ts` (dynamic) |
| `src/components/ResearchCTA.astro` | `timewoven.ru` | CTA | → `PUBLIC_SITE_URL` |
| `src/layouts/BaseLayout.astro` | via `SITE` | canonical, hreflang, OG | → `RESEARCH_SITE_URL` |
| `src/lib/publications/publication-registry.ts` | via `SITE` | permanent links, citation | → `RESEARCH_SITE_URL` |

#### TimeWoven FastAPI (`TimeWoven`)

| File | Domain | Category | Resolution |
|------|--------|----------|------------|
| `app/core/public_app_url.py` | `app.timewoven.ru` | config | → `app/core/domain_config.py` |
| `app/admin_inbox/mailbox_resolve.py` | `@timewoven.ru` | emails | → `MAIL_DOMAIN` + `mailbox_address()` |
| `app/superadmin/mailbox_access.py` | `@timewoven.ru` | admin messages | → `domain_config.inbox_scope_label_for_role()` |
| `app/core/tw_admin_i18n/admin_lexicon.py` | `@timewoven.ru` | admin UI copy | → computed from `domain_config` |
| `app/web/templates/pages/legal*.html` | `www.timewoven.ru/legal`, `privacy@` | legal | → Jinja `tw_public_legal_ref`, `tw_privacy_email` |
| `app/web/templates/site/landing*.html` | `hello@timewoven.ru` | early access CTA | → Jinja `tw_hello_email` |
| `app/legal/services/reply_templates.py` | `@timewoven.ru` | emails | → `mailbox_address()` |
| `app/legal/services/early_access_intake_relay.py` | `@timewoven.ru` | early access | → `domain_config` |
| `app/superadmin/services/ops_health_service.py` | `app.timewoven.ru` | ops | → `ops_prod_snapshot_url()` |
| `app/core/middleware/admin_site_split_middleware.py` | — | admin host | Already env: `TW_ADMIN_CANONICAL_HOST` |

### Residual hardcodes (documented, low priority)

| Location | Notes |
|----------|-------|
| `locales/*/landing.yml` | YAML i18n examples; landing templates now use Jinja globals |
| `scripts/watcher.py` | Dev script; use `APP_SITE_URL` when touching |
| `app/services/ops_continuity_metrics.py` | Let's Encrypt filesystem paths on VPS |
| `docs/**`, `tests/**`, nginx snippets | Documentation / fixtures — not runtime |
| `docs/integrations/max/n8n/*.json` | n8n workflow exports |
| `dist/**` | Build output — regenerated on deploy |

---

## Phase 2 — Canonical config layer

### Environment variables

| Variable | Default (prod) | Purpose |
|----------|----------------|---------|
| `PUBLIC_SITE_URL` | `https://timewoven.ru` | Marketing / landing |
| `RESEARCH_SITE_URL` | `https://research.timewoven.ru` | Research Library |
| `APP_SITE_URL` | `https://app.timewoven.ru` | Product app |
| `ADMIN_SITE_URL` | `https://admin.timewoven.ru` | Staff admin |
| `MAIL_DOMAIN` | `timewoven.ru` | Mailbox addresses (`hello@`, `privacy@`, …) |
| `PUBLIC_LEGAL_PAGE_REF` | `www.timewoven.ru/legal` | Legal page display reference |

**Legacy aliases** (still supported): `TW_PUBLIC_BASE_URL`, `TW_DEFAULT_PUBLIC_BASE_URL`, `TW_ADMIN_CANONICAL_HOST`, `TW_PUBLIC_SITE_HOSTS`, `EARLY_ACCESS_ARCHIVE_EMAIL`.

### Implementation

| Repo | Module |
|------|--------|
| Research | `src/lib/domains.ts` |
| TimeWoven | `app/core/domain_config.py` |
| TimeWoven (Jinja) | `app/core/domain_jinja.py` |

Example — change marketing domain only:

```bash
PUBLIC_SITE_URL=https://timewoven.global
MAIL_DOMAIN=timewoven.global
```

Then rebuild Research / restart FastAPI. No template edits required.

---

## Phase 3 — Astro (Research Library)

| Surface | Uses |
|---------|------|
| `astro.config.mjs` `site` | `RESEARCH_SITE_URL` |
| `BaseLayout.astro` — canonical, hreflang, OG | `SITE` ← `RESEARCH_SITE_URL` |
| `publication-registry.ts` — permanent links | `SITE` |
| `ResearchCTA.astro` | `PUBLIC_SITE_URL` |
| `robots.txt` | `src/pages/robots.txt.ts` → `RESEARCH_SITE_URL` |
| `@astrojs/sitemap` | Astro `site` (env-driven) |

Language switcher uses **relative paths** (`src/lib/i18n/paths.ts`); absolute URLs built from `SITE` in `BaseLayout`.

---

## Phase 4 — FastAPI (TimeWoven)

| Surface | Uses |
|---------|------|
| Landing early-access fallback email | `tw_hello_email` (Jinja global) |
| Legal pages | `tw_public_legal_ref`, `tw_privacy_email` |
| Admin inbox / CRM copy | `domain_config` at import |
| Mailbox resolution | `mailbox_addresses_by_key()` |
| Public app links | `app_site_url()` / `absolute_app_base_url()` |
| Ops health snapshots | `ops_prod_snapshot_url()` |

Jinja globals registered in `app/main.py` → `_ensure_jinja_i18n_globals()` via `install_jinja_domains()`.

---

## Phase 5 — Future domain strategy (documentation only)

### Current

- Primary market: **RU**
- Domains: `timewoven.ru` ecosystem (see topology table)

### Future options (not chosen)

| Option | Example | Notes |
|--------|---------|-------|
| Global TLD | `timewoven.global` | International brand; RU stays on `.ru` |
| Family TLD | `timewoven.family` | Thematic; may confuse with product name |
| Other | `timewoven.com`, regional TLDs | Depends on availability and legal entity |

### Migration scenarios (not implemented)

#### A — RU + International (dual home)

- `timewoven.ru` — RU marketing + legal (152-FZ context)
- `timewoven.global` (or similar) — EN/ZH marketing
- `research.timewoven.ru` unchanged or `research.timewoven.global`
- `app.*` / `admin.*` — single backend; env per deployment zone

#### B — International primary

- New global domain becomes `PUBLIC_SITE_URL`
- `timewoven.ru` → redirect or RU-only mirror
- Research and app follow env on each VPS

#### C — Research split

- Product stays on `app.timewoven.ru`
- Research moves to dedicated host (e.g. `research.timewoven.global`)
- Only `RESEARCH_SITE_URL` changes; citation permalinks follow rebuild

**Invariant:** No scenario requires content file edits — only env + DNS + TLS + redeploy.

---

## Phase 6 — Verify

After setting env vars and rebuilding:

1. Research canonical / OG / sitemap / robots use `RESEARCH_SITE_URL`
2. CTA links to `PUBLIC_SITE_URL`
3. FastAPI legal + landing show configured mailbox / legal ref
4. Grep for hardcoded hosts in `src/` and `app/` (excluding tests/docs) should find **defaults only** inside `domain_config.py` / `domains.ts`

```bash
# Research
rg 'timewoven\.ru' TimeWoven-Research/src --glob '!**/*.md'

# FastAPI runtime
rg 'timewoven\.ru' TimeWoven/app --glob '!**/tw_admin_i18n/**'
```

---

## Acceptance checklist

- [x] Domain inventory exists (this document)
- [x] Hardcoded URLs audited
- [x] Config layer exists (`domains.ts`, `domain_config.py`)
- [x] Astro uses config
- [x] FastAPI uses config
- [x] Future migration documented (Phase 5)
- [x] No runtime URL changes (defaults = current prod)
- [x] No domain purchase or DNS changes

**READY FOR:** architectural implementation only; actual migration is a separate ops project.
