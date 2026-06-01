#!/usr/bin/env python3
"""Prepare TW-A-0001 markdown for Research Library content collections.

Usage:
  python scripts/import_tw_a_0001.py \\
    --ru ~/Downloads/TW-A-0001_ru_семья_память.md \\
    --en ~/Downloads/TW-A-0001_en_family_memory.md \\
    --zh ~/Downloads/TW-A-0001_zh_家族记忆.md

Copies files into src/content/articles/ with canonical frontmatter merged.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "src/content/articles"

SLUG = "tw-a-0001"
PUBLICATION_ID = "TW-A-0001"
PUBLISHED = "2026-06-01"

META = {
    "ru": {
        "title": "Что теряет семья, когда уходит старшее поколение",
        "description": "Когда уходит бабушка или дед, семья теряет не просто человека — она теряет архив. О том, что именно исчезает и как это можно изменить.",
        "seoTitle": "Что теряет семья, когда уходит старшее поколение — TimeWoven Research",
        "seoDescription": "Когда уходит бабушка или дед, семья теряет не просто человека — она теряет архив. О том, что именно исчезает и как это можно изменить.",
        "locale": "ru",
        "path": ARTICLES / f"{SLUG}.md",
    },
    "en": {
        "title": "What a Family Loses When the Oldest Generation Is Gone",
        "description": "When a grandparent dies, a family loses more than a person — it loses an archive. On what exactly disappears, and what can still be done.",
        "seoTitle": "What a Family Loses When the Oldest Generation Is Gone — TimeWoven Research",
        "seoDescription": "When a grandparent dies, a family loses more than a person — it loses an archive. On what exactly disappears, and what can still be done.",
        "locale": "en",
        "path": ARTICLES / "en" / f"{SLUG}.md",
    },
    "zh": {
        "title": "当家中最年长的人离去，家族失去了什么",
        "description": "当祖父或祖母离去，家族失去的不只是一个人，而是一座档案馆。关于究竟失去了什么，以及还能做些什么。",
        "seoTitle": "当家中最年长的人离去，家族失去了什么 — TimeWoven Research",
        "seoDescription": "当祖父或祖母离去，家族失去的不只是一个人，而是一座档案馆。关于究竟失去了什么，以及还能做些什么。",
        "locale": "zh",
        "path": ARTICLES / "zh" / f"{SLUG}.md",
    },
}


def strip_frontmatter(text: str) -> str:
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            return text[end + 4 :].lstrip("\n")
    return text


def estimate_reading_time(body: str, locale: str) -> int:
    body = body.strip()
    if locale == "zh":
        chars = len(re.sub(r"\s+", "", body))
        return max(1, (chars + 299) // 300)
    words = len(body.split())
    return max(1, (words + 199) // 200)


def build_frontmatter(locale: str, body: str) -> str:
    m = META[locale]
    reading = estimate_reading_time(body, locale)
    return f"""---
publicationId: "{PUBLICATION_ID}"
publicationType: "article"
contentType: "article"
locale: "{m['locale']}"
slug: "{SLUG}"
author: "bondarev"
publishedAt: "{PUBLISHED}"
publicationDate: "{PUBLISHED}"
draft: false
featured: true
readingTime: {reading}
title: "{m['title']}"
description: "{m['description']}"
seoTitle: "{m['seoTitle']}"
seoDescription: "{m['seoDescription']}"
ogImage: "/og/TW-A-0001.jpg"
tags: ["семейная память", "поколения", "коммуникативная память"]
---

"""


def import_locale(locale: str, source: Path) -> None:
    if not source.exists():
        raise SystemExit(f"Missing source for {locale}: {source}")
    body = strip_frontmatter(source.read_text(encoding="utf-8"))
    out = META[locale]["path"]
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(build_frontmatter(locale, body) + body.strip() + "\n", encoding="utf-8")
    print(f"Wrote {out} ({out.stat().st_size} bytes, {estimate_reading_time(body, locale)} min)")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ru", type=Path, required=True)
    parser.add_argument("--en", type=Path, required=True)
    parser.add_argument("--zh", type=Path, required=True)
    args = parser.parse_args()
    import_locale("ru", args.ru)
    import_locale("en", args.en)
    import_locale("zh", args.zh)


if __name__ == "__main__":
    main()
