# Repository governance (TimeWoven Research)

**Actual as of:** 2026-05-30  
**Canon:** **TW-RESEARCH-GITHUB-001** (editorial model) + **TW-RESEARCH-OPS-001** (MAC = Git, GitHub = truth).

## Environments (TW-RESEARCH-OPS-001)

| Environment | Role | Git operations |
|-------------|------|----------------|
| **PROD** (`vm-nano`, `/root/projects/TimeWoven-Research`) | Edit, build, verify, publish `dist/` | Local commits for editorial work only; **no push to GitHub** |
| **MAC** (`~/Projects/TimeWoven-Research/timewoven-research`) | Canonical Git workstation | Branch, commit, **PR**, push branches; merge to `main` via GitHub |
| **GitHub** (`main`) | Source of truth | Protected `main`; PROD must **`reset --hard origin/main`** after MAC merge |

**Invariant:** PROD must **never** stay ahead of GitHub `main`. If PROD has unpushed commits → export patch (`git format-patch`) → apply on MAC → PR → merge → PROD resync.

См. отчёт: **`docs/TW-RESEARCH-OPS-001.md`**.

## Not the same as TimeWoven (app)

| Aspect | TimeWoven (FastAPI app) | TimeWoven-Research (this repo) |
|--------|-------------------------|--------------------------------|
| Purpose | Product runtime | Editorial publishing (SSG) |
| Staging | staging.timewoven.ru | **None** (editorial) |
| Integration branch | `develop` | **None required** |
| Publish path | develop → main → deploy | **PROD edit → MAC git → PR → `main` → PROD resync** |
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
