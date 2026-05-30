# TW-RESEARCH-GITHUB-001 — Align GitHub Governance with PROD-Editorial Model

**Actual as of:** 2026-05-19  
**Environment:** GitHub (`Dmitriy-Bondarev/TimeWoven-Research`)  
**Status:** IMPLEMENTED — **Owner Review: REQUIRED**

## Phase 1 — Governance review (before)

| Item | State (before) |
|------|----------------|
| Default branch | `main` ✓ |
| Visibility | `public` |
| Branches | `main`, `develop` (archival content) |
| Ruleset `Protect integration — develop` | **active** — required CI on `develop` |
| Ruleset `Protect production — main` | **active** — PR + CI `quality`, merge only |
| CI `on.pull_request.branches` | `develop`, `main` |
| CI `on.push.branches` | `develop`, `main` |
| Docs / README | Described **TimeWoven app** flow: `feature/*` → `develop` → `main` |

**Problem:** Editorial publishing is **PROD-first**; there is no staging and no need for a permanent `develop` integration branch.

## Phase 2–4 — GitHub changes (applied)

| Action | Result |
|--------|--------|
| Delete ruleset `Protect integration — develop` (id `17061884`) | **DONE** |
| Rename/update main ruleset → **`Protect editorial — main`** | **DONE** |
| Default branch | **`main`** (unchanged) |
| `develop` ruleset | **Removed** — not required for publish |

### Main ruleset (after)

- `non_fast_forward` — blocks force push
- `pull_request` — PR required; merge methods **squash**, **merge**
- `required_status_checks` — **`quality`**

## Phase 5–6 — Documentation (repo)

Updated:

- `README.md`
- `docs/core/Rules_of_work.md`
- `docs/core/REPOSITORY_GOVERNANCE.md`
- `.cursorrules`
- `.github/workflows/ci.yml` — PR/push **`main` only**
- `docs/TW-CONTENT-003_TEMPLATE_GOVERNANCE.md` — squash target **`main`**

### Canonical branch strategy

| Change type | Path |
|-------------|------|
| Small content / post-PROD sync | Short branch → PR → **`main`** |
| Template / runtime / plugins | **`feature/*`** → PR → **`main`** |
| Large redesign | **`feature/*`** → PR → **`main`** |
| `develop` | Optional archive only |

### Editorial workflow

```text
PROD (research.timewoven.ru)
  → edit / publish
  → git commit (Mac)
  → push → GitHub (main via PR)
```

## Phase 7 — CI review

| Check | Result |
|-------|--------|
| Workflow triggers PR → `main` | **PASS** (configured) |
| Workflow triggers push → `main` | **PASS** (configured) |
| Job `quality` unchanged | **PASS** (`npm ci`, `verify:citations`, `build`) |
| Ruleset expects context `quality` | **PASS** (aligned) |

**Note:** Full CI run on merge PR should be verified after PR merge (Owner / GitHub Actions).

## VERIFY — TW-RESEARCH-GITHUB-001

| Check | Result |
|-------|--------|
| Environment | GitHub |
| Default Branch | PASS |
| Main Protection | PASS |
| Develop Dependency Removed | PASS |
| Governance Docs Updated | PASS |
| README Updated | PASS |
| CI Review | PASS (config) |
| Owner Review | **REQUIRED** |

## Result

TimeWoven-Research governance aligned with **PROD editorial** workflow; no longer mirrors TimeWoven application `develop` integration model.
