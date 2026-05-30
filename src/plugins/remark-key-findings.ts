import { toString } from 'mdast-util-to-string';
import type { Heading, Root, RootContent } from 'mdast';

type Finding = { title: string; summary: string };

function html(value: string): RootContent {
  return { type: 'html', value };
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function findingsSection(findings: Finding[]): RootContent[] {
  const cards = findings
    .map(
      (f) =>
        `<article class="tw-finding-card"><h3 class="tw-finding-card__title">${escapeHtml(f.title)}</h3><p class="tw-finding-card__summary">${escapeHtml(f.summary)}</p></article>`,
    )
    .join('');

  return [
    html('<section class="tw-key-findings" aria-labelledby="tw-key-findings-title">'),
    html('<h2 id="tw-key-findings-title" class="tw-key-findings__title">Ключевые выводы</h2>'),
    html('<p class="tw-key-findings__intro">Краткая карта исследования — можно прочитать перед основным текстом или вернуться после.</p>'),
    html(`<div class="tw-key-findings__grid">${cards}</div>`),
    html('</section>'),
  ];
}

function epilogIndex(children: RootContent[]): number {
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    if (node.type === 'html' && node.value.includes('research-questions')) {
      return i;
    }
    if (node.type === 'heading') {
      const text = toString(node as Heading);
      if (/20 вопросов|эпилог/i.test(text)) return i;
    }
  }
  return children.length;
}

/** Inject key findings from frontmatter before practical (questions) section. */
export function remarkKeyFindings() {
  return (tree: Root, file: { data?: { astro?: { frontmatter?: Record<string, unknown> } } }) => {
    const findings = file.data?.astro?.frontmatter?.keyFindings as Finding[] | undefined;
    if (!findings?.length) return;

    const idx = epilogIndex(tree.children);
    tree.children.splice(idx, 0, ...findingsSection(findings));
  };
}
