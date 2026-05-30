# TW-CONTENT-002 — First Research Publication Runtime

**Environment:** MAC ONLY (`~/Projects/TimeWoven-Research/timewoven-research`)  
**Actual as of:** 2026-05-19  
**Status:** IMPLEMENTED — verify local

## Source document

Canonical export: `~/Downloads/Создание статьи о семейной памяти (1).docx`  
Regenerate markdown: `python3 scripts/build_family_memory_publication.py`

## Routes

| Route | Page |
|-------|------|
| `/` | Homepage + featured research (`featured: true`) |
| `/research` | Research catalog (content collection) |
| `/research/[slug]` | Publication (`slug` from frontmatter) |
| `/articles` | Articles catalog (empty until content added) |
| `/essays` | Essays catalog (empty until content added) |

First publication: `/research/family-memory-third-generation`

## Verify

```bash
cd ~/Projects/TimeWoven-Research/timewoven-research
python3 scripts/build_family_memory_publication.py
npm run dev
npm run build
```

Checklist: layout, typography, author card (`bondarev`), CTA, related block, SEO canonical + OG + sitemap.

## Notes

- Epilogue «20 вопросов» included from DOCX (numbered list 1–20).
- Test essay removed (`essays/test.md`).
- No changes to TimeWoven FastAPI repo, staging, or prod.
