import { toString } from 'mdast-util-to-string';
import type { Heading, Root, RootContent } from 'mdast';

function html(value: string): RootContent {
  return { type: 'html', value };
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function isCaseHeading(node: RootContent): node is Heading {
  return node.type === 'heading' && node.depth === 3 && /^Кейс\s+\d+:/i.test(toString(node));
}

function parseCaseHeading(node: Heading): { num: string; title: string } | null {
  const text = toString(node).trim();
  const match = text.match(/^Кейс\s+(\d+):\s*(.+)$/i);
  if (!match) return null;
  return { num: match[1], title: match[2].trim() };
}

/** Wrap «Кейс N: …» blocks in editorial case articles. */
export function remarkCases() {
  return (tree: Root) => {
    const children = [...tree.children];
    const out: RootContent[] = [];
    let i = 0;

    while (i < children.length) {
      const node = children[i];
      if (!isCaseHeading(node)) {
        out.push(node);
        i += 1;
        continue;
      }

      const parsed = parseCaseHeading(node);
      if (!parsed) {
        out.push(node);
        i += 1;
        continue;
      }

      out.push(html('<article class="research-case">'));
      out.push(
        html(
          `<header class="research-case-header"><span class="research-case-num" aria-hidden="true">Кейс ${parsed.num}</span><h3 class="research-case-title">${escapeHtml(parsed.title)}</h3></header>`,
        ),
      );
      out.push(html('<div class="research-case-body">'));
      i += 1;

      while (i < children.length) {
        const next = children[i];
        if (
          (next.type === 'heading' && next.depth === 2) ||
          (next.type === 'heading' && next.depth === 3 && isCaseHeading(next))
        ) {
          break;
        }
        out.push(next);
        i += 1;
      }

      out.push(html('</div></article>'));
    }

    tree.children = out;
  };
}
