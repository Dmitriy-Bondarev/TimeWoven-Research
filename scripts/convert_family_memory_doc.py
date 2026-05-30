#!/usr/bin/env python3
"""One-off: convert exported docx text to research markdown body."""

from __future__ import annotations

import re
from pathlib import Path

SRC = Path("/tmp/family-memory-full.txt")
OUT_BODY = Path(__file__).resolve().parents[1] / "src/content/research/_body.md"

TABLE_HEADERS = {
    "Аналитический критерий",
    "Глубина семейной памяти",
}


def is_table_header(line: str) -> bool:
    return line.strip() in TABLE_HEADERS


def convert_table(lines: list[str], start: int) -> tuple[list[str], int]:
    out: list[str] = []
    i = start
    rows: list[list[str]] = []
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            if rows:
                break
            i += 1
            continue
        if line.startswith("Блок ") or line.startswith("Кейс ") or line in (
            "Заключение",
            "Источники",
        ):
            break
        rows.append([cell.strip() for cell in line.split("\t") if cell.strip()] or [line])
        i += 1
    if not rows:
        return [], start
    header = rows[0]
    out.append("| " + " | ".join(header) + " |")
    out.append("| " + " | ".join(["---"] * len(header)) + " |")
    for row in rows[1:]:
        while len(row) < len(header):
            row.append("")
        out.append("| " + " | ".join(row[: len(header)]) + " |")
    out.append("")
    return out, i


def convert_line(line: str) -> str:
    line = line.strip()
    if not line:
        return ""
    if re.match(r"^Блок \d+\.", line):
        return f"## {line}"
    if re.match(r"^Кейс \d+:", line):
        return f"### {line}"
    if line == "Заключение":
        return "## Заключение"
    if line == "Источники":
        return "## Источники"
    if line.startswith("•\t") or line.startswith("\t•"):
        text = line.lstrip("•\t").strip()
        m = re.match(r"^(.+?),\s*дата последнего обращения:", text)
        if m:
            title = m.group(1).strip()
            url_m = re.search(r"https?://\S+", text)
            if url_m:
                return f"- [{title}]({url_m.group(0).rstrip(')')})"
        return f"- {text}"
    # Preserve in-text citation markers (e.g. .16) as superscript notes
    line = re.sub(
        r"\.(\d{1,2})(?=\s|$|[,.;:\)])",
        r"[^\\1]",
        line,
    )
    return line


def main() -> None:
    raw = SRC.read_text(encoding="utf-8")
    lines = raw.splitlines()
    # Skip title line (in frontmatter)
    if lines and "третьем поколении" in lines[0]:
        lines = lines[1:]

    out: list[str] = []
    i = 0
    footnotes: dict[str, str] = {}

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            if out and out[-1] != "":
                out.append("")
            i += 1
            continue

        if is_table_header(stripped):
            table_lines, i = convert_table(lines, i)
            out.extend(table_lines)
            continue

        # Tab-separated table rows (SuperJob block)
        if "\t" in line and i > 0 and is_table_header(lines[i - 1].strip()):
            table_lines, i = convert_table(lines, i - 1)
            out.extend(table_lines)
            continue

        converted = convert_line(line)
        if converted:
            out.append(converted)
        i += 1

    body = "\n".join(out)
    # Collapse excessive blank lines
    body = re.sub(r"\n{3,}", "\n\n", body).strip() + "\n"
    OUT_BODY.write_text(body, encoding="utf-8")
    print(f"Wrote {OUT_BODY} ({len(body)} chars)")


if __name__ == "__main__":
    main()
