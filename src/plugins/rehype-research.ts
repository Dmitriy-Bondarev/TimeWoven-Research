import { visit } from 'unist-util-visit';
import type { Element, Root, Text } from 'hast';

function hasClass(node: Element, token: string): boolean {
  const cls = node.properties?.className;
  if (Array.isArray(cls)) {
    return cls.map(String).some((c) => c.includes(token));
  }
  if (typeof cls === 'string') {
    return cls.includes(token);
  }
  return false;
}

function elementText(node: Element): string {
  const parts: string[] = [];
  visit(node, 'text', (t) => {
    parts.push((t as Text).value);
  });
  return parts.join('');
}

function questionCardsFromList(list: Element): Element {
  const items = list.children.filter(
    (c): c is Element => c.type === 'element' && c.tagName === 'li',
  );

  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['research-questions-grid'] },
    children: items.map((li, index) => ({
      type: 'element',
      tagName: 'article',
      properties: { className: ['research-question-card'] },
      children: [
        {
          type: 'element',
          tagName: 'span',
          properties: { className: ['research-question-num'], 'aria-hidden': 'true' },
          children: [{ type: 'text', value: String(index + 1) }],
        },
        {
          type: 'element',
          tagName: 'p',
          properties: { className: ['research-question-text'] },
          children: [{ type: 'text', value: elementText(li) }],
        },
      ],
    })),
  };
}

function addClass(node: Element, className: string): void {
  const existing = node.properties?.className;
  const list = Array.isArray(existing)
    ? existing.map(String)
    : existing
      ? [String(existing)]
      : [];
  if (!list.includes(className)) {
    node.properties = { ...node.properties, className: [...list, className] };
  }
}

/** Rehype pass: semantic classes for research typography blocks. */
export function rehypeResearch() {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index == null) return;

      if (node.tagName === 'ol' && hasClass(node, 'research-ol')) {
        parent.children[index] = questionCardsFromList(node);
        return;
      }

      const tag = node.tagName;

      if (tag === 'blockquote') {
        addClass(node, 'research-pull-quote');
      }

      if (tag === 'table') {
        const wrap: Element = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['research-table-scroll'] },
          children: [node],
        };
        parent.children[index] = wrap;
        addClass(node, 'research-table');
      }

      if (tag === 'sup') {
        addClass(node, 'research-footnote');
        addClass(node, 'research-cite');
      }

      if (tag === 'h2') addClass(node, 'research-h2');
      if (tag === 'h3') {
        addClass(node, 'research-h3');
        if (/^(?:Кейс|Case)\s+\d+/i.test(elementText(node))) {
          addClass(node, 'research-case-title');
        }
      }
      if (tag === 'h4') addClass(node, 'research-h4');

      if (tag === 'ul') addClass(node, 'research-ul');
      if (tag === 'ol' && !node.properties?.className?.toString().includes('research-sources')) {
        addClass(node, 'research-ol');
      }

      if (tag === 'p') {
        const parentEl = parent as Element;
        if (parentEl.tagName === 'div' && parentEl.properties?.className?.toString().includes('research-lead')) {
          addClass(node, 'research-lead-p');
        } else {
          addClass(node, 'research-p');
        }
      }

      if (tag === 'aside') {
        const cls = node.properties?.className?.toString() ?? '';
        if (cls.includes('research-insight')) addClass(node, 'research-insight');
      }
    });
  };
}
