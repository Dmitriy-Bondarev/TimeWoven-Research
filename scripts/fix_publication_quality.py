#!/usr/bin/env python3
"""TW-CONTENT-002C-FIX — repair citations, FIO, tables, and structural splits in canonical MD."""

from __future__ import annotations

import re
from pathlib import Path

PATH = Path(__file__).resolve().parents[1] / "src/content/research/family-memory-third-generation.md"

MAX_SOURCE_NUM = 25

FOOTNOTE = (
    '<sup class="research-cite">'
    '<a href="#source-{n}" class="research-cite-link" id="cite-ref-{n}">{n}</a>'
    "</sup>"
)


def footnote(n: str) -> str:
    return FOOTNOTE.format(n=n)


def is_valid_citation(num: str, text: str, start: int, end: int) -> bool:
    value = int(num)
    if value < 1 or value > MAX_SOURCE_NUM:
        return False
    before = text[max(0, start - 12) : start]
    after = text[end : end + 12]
    if re.search(r"\bв\s*$", before) and after.lstrip().startswith("году"):
        return False
    if re.search(r"дальше\s*$", before) and value >= 50:
        return False
    if re.search(r"\(III,\s*$", before):
        return False
    if re.search(r"–\s*$", before):
        return False
    if re.search(r"Блок\s*$", before, re.IGNORECASE):
        return False
    return True


def upgrade_existing_sup(text: str) -> str:
    return re.sub(
        r'<sup class="research-cite">(\d{1,2})</sup>',
        lambda m: footnote(m.group(1)),
        text,
    )


def cite_glued(text: str) -> str:
    """Attach footnotes after words/quotes; never leave digit glued to letters."""

    def needs_period_before(after: str) -> bool:
        if after.startswith("."):
            return False
        if after == "" or after.startswith("\n") or re.match(r"^\s{2,}", after):
            return True
        return bool(re.match(r"^\s+[А-ЯЁ«]", after))

    def repl(m: re.Match[str]) -> str:
        dot, num = m.group(1), m.group(2)
        if not is_valid_citation(num, text, m.start(), m.end()):
            return m.group(0)
        after = text[m.end() :]
        if not dot and needs_period_before(after):
            dot = "."
        return f"{dot}{footnote(num)}"

    # After Cyrillic, closing quote, or paren: optional dot + 1–2 digit cite
    text = re.sub(
        r"(?<=[а-яёА-ЯЁ»»\"\)»])(\.?)(\d{1,2})(?=[\s,;:\)\.]|\s|$)",
        repl,
        text,
    )
    # Table cells: «…прошлое. 2» at end of cell
    text = re.sub(
        r"(?<=\.)\s+(\d{1,2})(?=\s*\||\s*$)",
        lambda m: f" {footnote(m.group(1))}",
        text,
    )
    # Clause tail before comma: «…) 16,»
    text = re.sub(
        r"(?<=\))\s+(\d{1,2})(?=,)",
        lambda m: f" {footnote(m.group(1))}",
        text,
    )
    return text


def strip_invalid_footnotes(text: str) -> str:
    """Remove erroneous footnote markup (years, stats, Roman numerals)."""

    def restore(m: re.Match[str]) -> str:
        num = m.group(1)
        full = m.group(0)
        # Heuristic: if original had only the number, restore it
        return num

    return re.sub(
        r'<sup class="research-cite"><a href="#source-(\d{1,2})"[^>]*>\d{1,2}</a></sup>',
        restore,
        text,
    )


def cite_line(line: str) -> str:
    if not line.strip():
        return line
    if line.strip().startswith("|"):
        return cite_glued(upgrade_existing_sup(line))
    if line.strip().startswith("#") or line.strip().startswith(":::"):
        return line
    if line.strip().startswith("- ["):
        return line
    text = strip_invalid_footnotes(line)
    text = upgrade_existing_sup(text)
    return cite_glued(text)


def repair_block_headings(body: str) -> str:
    return re.sub(
        r"(?m)^к\s+(\d+\.\s*.+)$",
        r"## Блок \1",
        body,
    )


def merge_fio(body: str) -> str:
    body = re.sub(
        r"профессором Л\.Ю\.\s*\n+\s*Логуновой\.",
        "профессором Л.Ю. Логуновой.",
        body,
    )
    body = re.sub(
        r"генеалогическую экспертизу \(\«Заказывал генеалогическую экспертизу\.\s*\n+\s*Очень интересно!\»\)\.",
        "генеалогическую экспертизу («Заказывал генеалогическую экспертизу. Очень интересно!»).",
        body,
    )
    return body


def main() -> None:
    raw = PATH.read_text(encoding="utf-8")
    end = raw.index("---", 3) + 3
    fm, body = raw[:end], raw[end + 3 :].lstrip("\n")
    body = repair_block_headings(merge_fio(body))
    lines = [cite_line(line) for line in body.splitlines()]
    PATH.write_text(fm + "\n\n" + "\n".join(lines).strip() + "\n", encoding="utf-8")
    print(f"Fixed publication quality in {PATH}")


if __name__ == "__main__":
    main()
