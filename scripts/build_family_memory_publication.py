#!/usr/bin/env python3
"""Build family-memory-third-generation.md from canonical DOCX export (textutil)."""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCX = Path(
    "/Users/continuum/Downloads/Создание статьи о семейной памяти (1).docx"
)
DOCX_TXT = Path("/tmp/family-memory-docx.txt")
OUT = ROOT / "src/content/research/family-memory-third-generation.md"

ASSMANN_TABLE_ROWS = [
    ("Содержательное ядро", "Исторический опыт, вплетенный в рамки индивидуальных автобиографий; недавнее прошлое. 2", 'Мифическая предыстория, эпохи прошлого, события, перенесенные в абсолютное время ("in illo tempore"). 2'),
    ("Формальная структура", "Неформальная, неструктурированная; возникает органически из повседневных взаимодействий и бесед. 7", "Высокая степень формализации, институционализации; инициированная, церемониальная коммуникация. 7"),
    ("Медиа-проводники", "Живая, воплощенная память (embodied memory); устная речь на обыденном языке. 2", "Опосредована (mediated) текстами, монументами, визуальным искусством, ритуалами; классический язык. 2"),
    ("Структура участия", "Диффузная: носителями выступают свидетели-современники внутри сообщества. 2", "Иерархическая: специализированные носители (эксперты, жрецы, историки, культурные элиты). 2"),
    ("Временной горизонт", "Короткий горизонт: 80–100 лет, охватывающий 3–4 взаимодействующих поколения (движущийся горизонт). 2", 'Длинный горизонт: тысячелетия, «глубокое время», абсолютное прошлое (например, "3000 лет"). 2'),
]

SUPERJOB_ROWS = [
    ("Только 1 поколение (исключительно родители)", "5% (каждый двадцатый)", "Критический уровень разрыва межпоколенческих связей. 16"),
    ("2 поколения (родители, бабушки/дедушки)", "30%", "Отсутствие памяти о прародителях, живших до середины XX века. 16"),
    ("3 поколения (до прабабушек/прадедушек)", "40% (4 из 10)", "Максимальный естественный предел коммуникативной памяти (тот самый горизонт в 80-100 лет). 16"),
    ("4 поколения (прапрадеды)", "12%", "Преодоление барьера коммуникативной трансляции, начало работы с архивами. 16"),
    ("5 поколений и глубже", "3% (2% — пятое, 1% — шестое+)", "Статистическая погрешность, требующая профессиональной институциональной поддержки (генеалогии). 16"),
]


def export_docx() -> None:
    if not DOCX.exists():
        raise SystemExit(f"DOCX not found: {DOCX}")
    subprocess.run(
        ["textutil", "-convert", "txt", "-stdout", str(DOCX)],
        check=True,
        stdout=DOCX_TXT.open("w", encoding="utf-8"),
    )


def cite(text: str) -> str:
    foot = (
        '<sup class="research-cite">'
        '<a href="#source-{n}" class="research-cite-link" id="cite-ref-{n}">{n}</a>'
        "</sup>"
    )

    def footnote(n: str) -> str:
        return foot.format(n=n)

    text = re.sub(
        r'<sup class="research-cite">(\d{1,2})</sup>',
        lambda m: footnote(m.group(1)),
        text,
    )

    def glued(m: re.Match[str]) -> str:
        return f"{m.group(1)}{footnote(m.group(2))}"

    text = re.sub(
        r"(?<=[а-яёА-ЯЁ»»\"\)»])(\.?)(\d{1,2})(?=[\s,;:\)\.]|\s|$)",
        glued,
        text,
    )
    text = re.sub(
        r"(?<=\.)\s+(\d{1,2})(?=\s*\||\s*$)",
        lambda m: f" {footnote(m.group(1))}",
        text,
    )
    text = re.sub(
        r"(?<=\))\s+(\d{1,2})(?=,)",
        lambda m: f" {footnote(m.group(1))}",
        text,
    )
    return text


def md_table(headers: tuple[str, ...], rows: list[tuple[str, ...]]) -> str:
    lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join(["---"] * len(headers)) + " |",
    ]
    for row in rows:
        lines.append("| " + " | ".join(cite(c) for c in row) + " |")
    return "\n".join(lines) + "\n"


def parse_sources(lines: list[str], start: int) -> str:
    items: list[str] = []
    for i in range(start + 1, len(lines)):
        line = lines[i].strip()
        if not line:
            continue
        if line.startswith("•") or line.startswith("\t•"):
            text = line.lstrip("•\t").strip()
            url_m = re.search(r"(https?://\S+)", text)
            if url_m:
                url = url_m.group(1).rstrip(")")
                title = text.split(", дата")[0].strip()
                items.append(f"- [{cite(title)}]({url})")
            else:
                items.append(f"- {cite(text)}")
    return "\n".join(items) + "\n"


def format_epilogue(lines: list[str], start: int) -> tuple[str, int]:
    """From 'Эпилог:' line through bullets until 'Источники'."""
    title_line = lines[start].strip()
    out = [f"## {title_line}", ""]
    i = start + 1
    bullets: list[str] = []
    while i < len(lines):
        stripped = lines[i].strip()
        if stripped == "Источники":
            break
        if stripped.startswith("•") or stripped.startswith("\t•"):
            bullets.append(cite(stripped.lstrip("•\t").strip()))
        elif stripped and not bullets:
            out.append(cite(stripped))
            out.append("")
        elif stripped.startswith("Пока эти вопросы"):
            out.append("")
            out.append(cite(stripped))
        i += 1
    for n, item in enumerate(bullets, 1):
        out.append(f"{n}. {item}")
    out.append("")
    return "\n".join(out), i


def convert_body(lines: list[str]) -> str:
    out: list[str] = []
    i = 1

    while i < len(lines):
        stripped = lines[i].strip()

        if not stripped:
            if out and out[-1] != "":
                out.append("")
            i += 1
            continue

        if stripped == "Аналитический критерий":
            out.append(
                md_table(
                    ("Аналитический критерий", "Коммуникативная память", "Культурная память"),
                    ASSMANN_TABLE_ROWS,
                )
            )
            while i < len(lines) and not lines[i].strip().startswith(
                "Именно в этой структурной дихотомии"
            ):
                i += 1
            continue

        if stripped == "Глубина семейной памяти":
            out.append(
                md_table(
                    ("Глубина семейной памяти", "Доля респондентов", "Комментарий исследователей"),
                    SUPERJOB_ROWS,
                )
            )
            while i < len(lines) and not lines[i].strip().startswith("Эти данные органично"):
                i += 1
            continue

        if stripped.startswith("Эпилог:"):
            ep_md, i = format_epilogue(lines, i)
            out.append(ep_md)
            continue

        if re.match(r"^Блок \d+\.", stripped):
            out.append(f"## {stripped}")
            i += 1
            continue

        if re.match(r"^Кейс \d+:", stripped):
            out.append(f"### {stripped}")
            i += 1
            continue

        if stripped == "Заключение":
            out.append("## Заключение")
            i += 1
            continue

        if stripped == "Источники":
            out.append("## Источники")
            out.append("")
            out.append(parse_sources(lines, i).rstrip())
            break

        out.append(cite(stripped))
        i += 1

    body = "\n".join(out)
    lines = body.splitlines()
    spaced: list[str] = []
    for idx, line in enumerate(lines):
        spaced.append(line)
        if idx + 1 < len(lines):
            nxt = lines[idx + 1]
            if (
                line.strip()
                and nxt.strip()
                and not line.startswith("##")
                and not nxt.startswith("##")
                and not nxt.startswith("|")
                and not re.match(r"^\d+\.\s", nxt)
                and re.search(r"[.!?…»\"]\s*$", line)
            ):
                spaced.append("")
    return "\n".join(spaced)


def frontmatter() -> str:
    return """---
title: "Почему память семьи исчезает уже в третьем поколении"
description: "Социокультурный анализ механизмов утраты семейной памяти, коммуникативной памяти и межпоколенческой трансмиссии."
slug: "family-memory-third-generation"
contentType: "research"
author: "bondarev"
featured: true
publishedAt: "2026-05-30"
readingTime: 18
seoTitle: "Почему память семьи исчезает уже в третьем поколении"
seoDescription: "Социокультурный анализ механизмов утраты семейной памяти, коммуникативной памяти и межпоколенческой трансмиссии."
draft: false
---

"""


def main() -> None:
    export_docx()
    lines = DOCX_TXT.read_text(encoding="utf-8").splitlines()
    body = convert_body(lines)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(frontmatter() + body.strip() + "\n", encoding="utf-8")
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
