import { visit } from 'unist-util-visit';
import type { Element, Root, Text } from 'hast';

function getClassList(node: Element): string[] {
  const cls = node.properties?.className;
  if (Array.isArray(cls)) return cls.map(String);
  if (typeof cls === 'string') return [cls];
  return [];
}

function hasClass(node: Element, token: string): boolean {
  return getClassList(node).some((c) => c.includes(token));
}

function elementText(node: Element): string {
  const parts: string[] = [];
  visit(node, 'text', (t) => {
    parts.push((t as Text).value);
  });
  return parts.join('');
}

function ensureCiteLink(sup: Element): void {
  const num = elementText(sup).trim();
  if (!num || !/^\d{1,2}$/.test(num)) return;

  const existing = sup.children.find(
    (c): c is Element => c.type === 'element' && c.tagName === 'a',
  );
  if (existing) {
    existing.properties = {
      ...existing.properties,
      href: `#source-${num}`,
      className: ['research-cite-link'],
      id: `cite-ref-${num}`,
    };
    return;
  }

  sup.children = [
    {
      type: 'element',
      tagName: 'a',
      properties: {
        href: `#source-${num}`,
        className: ['research-cite-link'],
        id: `cite-ref-${num}`,
      },
      children: [{ type: 'text', value: num }],
    },
  ];
}

/** Link footnotes to bibliography; add return anchors on sources. */
export function rehypeFootnotes() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'sup' && hasClass(node, 'research-cite')) {
        ensureCiteLink(node);
      }
    });

    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index == null) return;
      if (node.tagName !== 'ol' || !hasClass(node, 'research-sources-list')) return;

      const items = node.children.filter(
        (c): c is Element => c.type === 'element' && c.tagName === 'li',
      );

      items.forEach((li, i) => {
        const num = String(i + 1);
        li.properties = { ...li.properties, id: `source-${num}` };

        const back: Element = {
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#cite-ref-${num}`,
            className: ['research-source-back'],
            'aria-label': `Вернуться к сноске ${num}`,
          },
          children: [{ type: 'text', value: ' ↩' }],
        };

        const last = li.children[li.children.length - 1];
        if (last?.type === 'element' && last.tagName === 'p') {
          last.children.push(back);
        } else {
          li.children.push(back);
        }
      });
    });
  };
}
