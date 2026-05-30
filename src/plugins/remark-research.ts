import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import type { Heading, List, Paragraph, Root, RootContent } from 'mdast';

const DIRECTIVE_CLASS: Record<string, string> = {
  insight: 'research-insight',
  statistic: 'research-statistic',
  note: 'research-note',
  question: 'research-question-block',
};

function headingLabel(node: Heading): string {
  return toString(node).trim();
}

function isSectionHeading(node: RootContent): node is Heading {
  return node.type === 'heading' && (node.depth === 1 || node.depth === 2);
}

function parseChapterHeading(text: string): { num: string; title: string; partLabel: string } | null {
  const ruEn = text.match(/^(?:Блок|Part|Block)\s+(\d+)\.\s*(.+)$/i);
  if (ruEn) {
    const partLabel = /^(?:Part|Block)\s+\d+/i.test(text) ? `Part ${ruEn[1]}` : `Часть ${ruEn[1]}`;
    return { num: ruEn[1], title: ruEn[2].trim(), partLabel };
  }
  const zh = text.match(/^第\s*(\d+)\s*部分[\.．、：:\s]+(.+)$/);
  if (zh) {
    return { num: zh[1], title: zh[2].trim(), partLabel: `第 ${zh[1]} 部分` };
  }
  return null;
}

function isBlockHeading(node: RootContent): node is Heading {
  return node.type === 'heading' && parseChapterHeading(headingLabel(node)) !== null;
}

/** Index of first «Блок N» chapter, else first section heading. */
function firstChapterIndex(tree: Root): number {
  const blockIdx = tree.children.findIndex(isBlockHeading);
  if (blockIdx !== -1) return blockIdx;
  return tree.children.findIndex(isSectionHeading);
}

function html(value: string): RootContent {
  return { type: 'html', value };
}

function isNumberedQuestion(node: RootContent): node is Paragraph {
  if (node.type !== 'paragraph') return false;
  return /^\d{1,2}\.\s/.test(toString(node).trim());
}

function listItemsToCards(list: List, cardBuffer: RootContent[]): void {
  list.children.forEach((item, index) => {
    const text = escapeHtml(toString(item).trim());
    const num = String(index + 1);
    cardBuffer.push(
      html(
        `<article class="research-question-card"><span class="research-question-num" aria-hidden="true">${num}</span><p class="research-question-text">${text}</p></article>`,
      ),
    );
  });
}

/** Editorial lead: first sentence of opening paragraph after first «Блок N» chapter. */
function applyLead(tree: Root): void {
  const chapterIndex = firstChapterIndex(tree);
  if (chapterIndex === -1) return;

  let pIndex = chapterIndex + 1;
  while (pIndex < tree.children.length && tree.children[pIndex].type !== 'paragraph') {
    pIndex += 1;
  }
  const candidate = tree.children[pIndex];
  if (!candidate || candidate.type !== 'paragraph') return;

  const full = toString(candidate);
  const match = full.match(/^(.+?[.!?…])(\s+)([\s\S]+)$/);

  if (!match?.[3]?.trim()) {
    tree.children.splice(pIndex, 1);
    tree.children.splice(
      chapterIndex,
      0,
      html('<div class="research-lead">'),
      candidate,
      html('</div>'),
    );
    return;
  }

  const leadPara: Paragraph = {
    type: 'paragraph',
    children: [{ type: 'text', value: match[1] }],
  };
  const restPara: Paragraph = {
    type: 'paragraph',
    children: [{ type: 'text', value: match[3].trim() }],
  };

  tree.children.splice(pIndex, 1, restPara);
  tree.children.splice(
    chapterIndex,
    0,
    html('<div class="research-lead">'),
    leadPara,
    html('</div>'),
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

/** «Блок N. Заголовок» → editorial chapter header */
function applyChapterHeadings(tree: Root): void {
  visit(tree, 'heading', (node, index, parent) => {
    if (!parent || index == null || (node.depth !== 1 && node.depth !== 2)) return;
    const text = headingLabel(node);
    const parsed = parseChapterHeading(text);
    if (!parsed) return;

    const { num, title, partLabel } = parsed;
    const id = slugify(title);

    parent.children.splice(
      index,
      1,
      html('<div class="research-chapter">'),
      html(`<span class="research-chapter-label">${partLabel}</span>`),
      html(`<h2 class="research-h2" id="${id}">${title}</h2>`),
      html('</div>'),
    );
  });
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrapQuestionsSection(nodes: RootContent[]): RootContent[] {
  const heading = nodes.find(
    (node): node is Heading => node.type === 'heading' && node.depth === 2,
  );
  const label = heading ? headingLabel(heading) : '';
  const eyebrow = /问题|结语|questions|epilogue/i.test(label)
    ? /[\u4e00-\u9fff]/.test(label)
      ? '实践'
      : /questions|epilogue/i.test(label)
        ? 'Practice'
        : 'Практика'
    : 'Практика';

  const out: RootContent[] = [
    html('<section class="research-questions" aria-labelledby="research-questions-title">'),
    html(`<p class="research-questions-eyebrow">${eyebrow}</p>`),
  ];
  const closing: RootContent[] = [];
  const cardBuffer: RootContent[] = [];

  const flushCards = () => {
    if (cardBuffer.length === 0) return;
    out.push(html('<div class="research-questions-grid">'));
    out.push(...cardBuffer.splice(0));
    out.push(html('</div>'));
  };

  for (const node of nodes) {
    if (isSectionHeading(node) && node.depth === 2) {
      const title = escapeHtml(headingLabel(node));
      out.push(
        html(
          `<h2 id="research-questions-title" class="research-questions-title">${title}</h2>`,
        ),
      );
      continue;
    }

    if (node.type === 'paragraph' && /(?:Пока эти вопросы|While there is still someone|只要还能)/i.test(toString(node))) {
      closing.push(node);
      continue;
    }

    if (node.type === 'paragraph') {
      const p = node as Paragraph;
      (p.data ??= {}).hProperties = { className: ['research-questions-intro-p'] };
    }

    if (node.type === 'list' && node.ordered) {
      listItemsToCards(node, cardBuffer);
      continue;
    }

    if (isNumberedQuestion(node)) {
      const text = escapeHtml(toString(node).replace(/^\d{1,2}\.\s*/, ''));
      const num = toString(node).match(/^(\d{1,2})\./)?.[1] ?? '';
      cardBuffer.push(
        html(
          `<article class="research-question-card"><span class="research-question-num" aria-hidden="true">${num}</span><p class="research-question-text">${text}</p></article>`,
        ),
      );
      continue;
    }

    flushCards();
    out.push(node);
  }

  flushCards();

  if (closing.length > 0) {
    out.push(html('<div class="research-questions-footer">'));
    out.push(...closing);
    out.push(html('</div>'));
  }

  out.push(html('</section>'));
  return out;
}

function wrapSourcesSection(nodes: RootContent[]): RootContent[] {
  const heading = nodes.find(
    (node): node is Heading => node.type === 'heading' && node.depth === 2,
  );
  const headingLabelText = heading ? headingLabel(heading) : '';
  const sourcesTitle = /^sources$/i.test(headingLabelText)
    ? 'Sources'
    : /^(?:来源|参考资料)$/i.test(headingLabelText)
      ? '来源'
      : 'Источники';

  const out: RootContent[] = [
    html('<section class="research-sources" aria-labelledby="research-sources-title">'),
  ];

  for (const node of nodes) {
    if (isSectionHeading(node) && node.depth === 2) {
      out.push(
        html(`<h2 id="research-sources-title" class="research-sources-title">${sourcesTitle}</h2>`),
      );
      continue;
    }
    if (node.type === 'list') {
      const data = (node.data ??= {});
      const props = (data.hProperties ??= {});
      props.className = ['research-sources-list'];
      out.push(node);
      continue;
    }
    out.push(node);
  }

  out.push(html('</section>'));
  return out;
}

function partitionSections(tree: Root): void {
  const children = [...tree.children];
  const next: RootContent[] = [];
  let buffer: RootContent[] = [];
  let mode: 'body' | 'questions' | 'sources' = 'body';

  const flush = () => {
    if (buffer.length === 0) return;
    if (mode === 'questions') next.push(...wrapQuestionsSection(buffer));
    else if (mode === 'sources') next.push(...wrapSourcesSection(buffer));
    else next.push(...buffer);
    buffer = [];
  };

  for (const node of children) {
    if (isSectionHeading(node) && node.depth === 2) {
      const label = headingLabel(node);
      if (/20 вопросов|20 questions|20个|20 个|эпилог|epilogue|结语/i.test(label)) {
        flush();
        mode = 'questions';
        buffer = [node];
        continue;
      }
      if (/^источники$/i.test(label) || /^sources$/i.test(label) || /^(?:来源|参考资料)$/i.test(label)) {
        flush();
        mode = 'sources';
        buffer = [node];
        continue;
      }
      if (mode !== 'body') {
        flush();
        mode = 'body';
      }
    }

    if (mode === 'body') {
      next.push(node);
    } else {
      buffer.push(node);
    }
  }

  flush();
  tree.children = next;
}

function applyDirectives(tree: Root): void {
  visit(tree, (node) => {
    if (node.type === 'containerDirective' || node.type === 'leafDirective') {
      const name = 'name' in node ? String(node.name) : '';
      const className = DIRECTIVE_CLASS[name];
      if (className) {
        const data = (node.data ??= {});
        data.hName = 'aside';
        data.hProperties = { className: [className] };
      }
    }
  });
}

/** Remark pipeline: lead, special sections, TimeWoven directives. */
export function remarkResearch() {
  return (tree: Root) => {
    applyLead(tree);
    applyChapterHeadings(tree);
    partitionSections(tree);
    applyDirectives(tree);
  };
}
