# TW-CONTENT-003A-FIX-HEADER — Header Tagline Width

**Actual as of:** 2026-05-19  
**Environment:** MAC ONLY (`timewoven-research`)

## Problem

Site tagline wrapped after «историей» because `.header-brand` had `max-width: 28rem`, not because of copy length.

## Fix

- Removed `max-width: 28rem` on editorial header brand
- Editorial header row: CSS grid `minmax(0, 1fr) auto` — brand uses space left of nav
- Nav: `shrink-0`, right-aligned on desktop
- Mobile (`≤767px`): single column stack

**Not changed:** tagline font size or wording.

## VERIFY

| Viewport | Expectation |
|----------|-------------|
| 1440px | Tagline one line |
| 1280px | Tagline one line |
| 1024px | One line if space allows |
| 768px | Wrap only if needed |
| 390px | Natural multi-line wrap |

Screenshots: `docs/screenshots/tw-content-003a-fix-header/`

```bash
npm run build
npm run screenshots:003a-fix-header
```
