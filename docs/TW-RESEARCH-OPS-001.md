# TW-RESEARCH-OPS-001 — MAC as Canonical Git Origin

**Actual as of:** 2026-05-30  
**Environment:** MAC + PROD (`vm-nano`) + GitHub  
**Status:** IMPLEMENTED — **Owner Review: REQUIRED**

## Purpose

Fix repository governance after PROD clone was **ahead of GitHub `main`** (forbidden). Establish roles:

| Environment | Role |
|-------------|------|
| **PROD** (`vm-nano`, `/root/projects/TimeWoven-Research`) | Editorial: edit, build, verify, publish static site |
| **MAC** (`~/Projects/TimeWoven-Research/timewoven-research`) | **Canonical Git:** commit, branch, PR, push |
| **GitHub** (`Dmitriy-Bondarev/TimeWoven-Research`, `main`) | **Source of truth** for repository history |

**Rule:** PROD must **never** remain ahead of GitHub. No `git push` from PROD to GitHub.

## Background

| Item | Value |
|------|--------|
| Orphan commit on PROD (pre-sync) | `e89210f` — *Refine research library homepage copy for editorial review.* |
| GitHub `main` before sync | `318b3e9` (missing `e89210f`) |
| Violation | PROD ≠ GitHub |

## Canonical flow (after OPS-001)

```text
PROD  → edit content → build → verify → publish (dist/)
PROD  → git format-patch / export patch
MAC   → git am (or commit) → branch → PR → merge → origin/main
PROD  → git fetch origin && git reset --hard origin/main
```

Direct `git push origin main` from MAC is **blocked** by ruleset **`Protect editorial — main`** (PR + CI `quality` required). MAC sync uses **PR → merge**, same as other editorial changes.

## Execution record (2026-05-30)

| Phase | Action | Result |
|-------|--------|--------|
| 1 | PROD: `git format-patch -1 e89210f` → `/tmp/TW-CONTENT-PROD-002.patch` | **PASS** (5.8K) |
| 2 | `scp vm-nano:/tmp/...` → `~/Downloads/` | **PASS** |
| 3 | MAC: `git pull --ff-only origin main`, `git am` patch | **PASS** |
| 4 | Content commit on MAC | `494e809` (same tree/parent as `e89210f`; committer identity differs on MAC → different hash) |
| 5 | GitHub sync | **PR #5** → merge `cf18522` on `main` (CI `quality` **pass**) |
| 6 | PROD resync | `git reset --hard origin/main` — working tree **clean** |

### Note on commit hash

ТЗ Phase 4 ожидало `e89210f` на MAC после `git am`. Фактически hash **`494e809`**: тот же parent (`318b3e9`) и author, но **committer** на PROD был `Dmitriy-Bondarev`, на MAC — `Dmitriy Bondarev`. Содержимое коммита совпадает; каноническая история на GitHub — **`494e809`** под merge **`cf18522`**.

## VERIFY

| Check | Status |
|-------|--------|
| Patch export | **PASS** |
| Patch applied (MAC) | **PASS** |
| GitHub sync (`main` contains editorial commit) | **PASS** (via PR #5) |
| PROD resync | **PASS** |
| PROD working tree clean | **PASS** |
| Owner review | **REQUIRED** |

## References

- Governance: **`docs/core/REPOSITORY_GOVERNANCE.md`**
- GitHub editorial model: **`docs/TW-RESEARCH-GITHUB-001.md`**
- PR: https://github.com/Dmitriy-Bondarev/TimeWoven-Research/pull/5
