# TW-CONTENT-001A — Publishing Architecture Hardening

**STATUS:** IMPLEMENTED (MAC)  
**Actual as of:** 2026-05-19  
**Project:** `~/Projects/TimeWoven-Research/timewoven-research`

## Goal

Freeze a publication frontmatter contract before dozens of posts exist — extend only via explicit migration.

## Publication schema (`publicationSchema` in `src/content.config.ts`)

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Reader-facing title |
| `description` | yes | Summary / deck |
| `author` | yes | Author `id` (e.g. `bondarev`) |
| `publishedAt` | yes | ISO date |
| `updatedAt` | no | |
| `coverImage` | no | |
| `tags` | no (default `[]`) | |
| `draft` | no (default `false`) | |
| `slug` | yes | Stable URL key; `[a-z0-9-]+` |
| `contentType` | yes | `essay` \| `research` \| `article` |
| `featured` | no (default `false`) | Home highlights |
| `readingTime` | no | Minutes; manual until automated |
| `seoTitle` | no | When SERP title ≠ `title` |
| `seoDescription` | no | Search snippet |
| `ogImage` | no | Telegram / VK / Dzen preview |

Collection folder (`essays/`, `research/`, `articles/`) should match `contentType` for catalog routing.

## VERIFY

```bash
npm run build
```
