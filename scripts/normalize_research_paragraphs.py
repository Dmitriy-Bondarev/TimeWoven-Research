#!/usr/bin/env python3
"""Split wall-of-text lines into readable Markdown paragraphs."""

from __future__ import annotations

import re
from pathlib import Path

PATH = Path(__file__).resolve().parents[1] / "src/content/research/family-memory-third-generation.md"

SENTENCE_BREAK = re.compile(
    r"(?<=[.!?…»\"])\s+(?=[А-ЯA-Z«])|(?<=</sup>)\s+(?=[А-ЯA-Z«])"
)
CASE_LINE = re.compile(r"^(### Кейс \d+:[^.]+\.)(.+)$", re.DOTALL)
BLOCK_HEADING = re.compile(
    r"^(#{1,6}\s+)?Блок\s+\d+\.\s*.+$",
    re.IGNORECASE,
)
CORRUPT_BLOCK = re.compile(
    r"^к\s+(\d+\.\s*.+)$",
    re.IGNORECASE,
)


def is_structural(line: str) -> bool:
    s = line.strip()
    if not s:
        return True
    if BLOCK_HEADING.match(s):
        return True
    if re.match(r"^#{1,6}\s", s):
        return True
    if s.startswith("|") or s.startswith("---"):
        return True
    if s.startswith(":::"):
        return True
    if re.match(r"^[-•\d]", s):
        return True
    return False


def split_prose_line(line: str) -> list[str]:
    parts = SENTENCE_BREAK.split(line.strip())
    return [p.strip() for p in parts if p.strip()]


def expand_case_heading(line: str) -> list[str]:
    m = CASE_LINE.match(line.strip())
    if not m:
        return [line]
    out = [m.group(1).strip(), ""]
    out.extend(split_prose_line(m.group(2)))
    return out


def repair_block_headings(body: str) -> str:
    """Restore chapter headings corrupted by citation glue (Блок → к N.)."""
    lines = []
    for line in body.splitlines():
        stripped = line.strip()
        m = CORRUPT_BLOCK.match(stripped)
        if m:
            lines.append(f"## Блок {m.group(1)}")
            continue
        if BLOCK_HEADING.match(stripped) and not stripped.startswith("#"):
            lines.append(f"## {stripped}")
            continue
        lines.append(line)
    return "\n".join(lines)


def merge_structural_splits(body: str) -> str:
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
    body = merge_structural_splits(body)
    body = repair_block_headings(body)

    out: list[str] = []
    lines = body.splitlines()
    for i, line in enumerate(lines):
        if not line.strip():
            out.append(line)
            continue
        if line.startswith("### Кейс"):
            expanded = expand_case_heading(line)
            for i, chunk in enumerate(expanded):
                out.append(chunk)
                if chunk and i < len(expanded) - 1 and expanded[i + 1]:
                    if not chunk.startswith("###"):
                        pass
            continue
        if is_structural(line):
            out.append(line)
            if re.match(r"^#{1,6}\s", line.strip()):
                nxt = lines[i + 1] if i + 1 < len(lines) else ""
                if nxt.strip() and not re.match(r"^#{1,6}\s", nxt.strip()):
                    out.append("")
            continue
        chunks = split_prose_line(line)
        for i, chunk in enumerate(chunks):
            out.append(chunk)
            if i < len(chunks) - 1:
                out.append("")

    text = fm + "\n\n" + "\n".join(out).strip() + "\n"
    text = re.sub(r"\n{4,}", "\n\n\n", text)
    text = text.replace("\n# Блок", "\n## Блок")
    PATH.write_text(text, encoding="utf-8")
    print(f"Normalized paragraphs in {PATH}")


if __name__ == "__main__":
    main()
