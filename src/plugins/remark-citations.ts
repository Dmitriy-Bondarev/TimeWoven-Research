import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import {
  CITATION_LOOKBEHIND,
  needsSentencePeriodBeforeCite,
  sentencePeriodFor,
} from './citation-punctuation.ts';

const GLUED_CITE = new RegExp(
  `${CITATION_LOOKBEHIND}([\\.。]?)(\\d{1,2})(?=[\\s,;:\\)\\.]|\\s|$)`,
  'gu',
);
const TABLE_CELL_CITE = /(?<=\.)\s+(\d{1,2})(?=\s*$)/g;
const TABLE_ROW_CITE = /(?<=\.)\s+(\d{1,2})(?=\s*\|)/g;
const PAREN_COMMA_CITE = /(?<=\))\s+(\d{1,2})(?=,)/g;
const PLAIN_SUP = /<sup class="research-cite">(\d{1,2})<\/sup>/g;
const LINKED_CITE_SUP =
  /<sup class="research-cite"><a href="#source-\d{1,2}" class="research-cite-link" id="cite-ref-\d{1,2}">\d{1,2}<\/a><\/sup>/g;
const MAX_SOURCE_NUM = 25;

export { needsSentencePeriodBeforeCite } from './citation-punctuation.ts';

function footnoteHtml(n: string): string {
  return `<sup class="research-cite"><a href="#source-${n}" class="research-cite-link" id="cite-ref-${n}">${n}</a></sup>`;
}

function isValidCitation(num: string, value: string, start: number, end: number): boolean {
  const valueNum = Number(num);
  if (valueNum < 1 || valueNum > MAX_SOURCE_NUM) return false;
  const before = value.slice(Math.max(0, start - 12), start);
  const after = value.slice(end, end + 12);
  if (/\bв\s*$/.test(before) && after.trimStart().startsWith('году')) return false;
  if (/дальше\s*$/.test(before) && valueNum >= 50) return false;
  if (/\(III,\s*$/.test(before)) return false;
  if (/–\s*$/.test(before)) return false;
  if (/Блок\s*$/i.test(before)) return false;
  return true;
}

/** Insert sentence punctuation before linked footnote when missing (TW-CONTENT-003A / 001B). */
export function ensureCitationPunctuation(value: string): string {
  const re = new RegExp(
    `${CITATION_LOOKBEHIND}(?<!\\.|。)(?:${LINKED_CITE_SUP.source})(?!\\s*[\\.。])(?=(?:\\s*\\n|\\s*$|\\s{2,}|\\s+[A-ZА-ЯЁ«"\\u4e00-\\u9fff]))`,
    'gu',
  );
  return value.replace(re, (sup, offset, full) => {
    const before = full.slice(0, offset);
    return `${sentencePeriodFor(before)}${sup}`;
  });
}

export function replaceCitationsInString(value: string): string {
  let out = value.replace(PLAIN_SUP, (_, n: string) => footnoteHtml(n));
  out = out.replace(GLUED_CITE, (match, dot: string, n: string, offset: number) => {
    const end = offset + match.length;
    if (!isValidCitation(n, out, offset, end)) return match;
    const after = out.slice(end);
    const before = out.slice(0, offset);
    let punctuation = dot;
    if (!punctuation && needsSentencePeriodBeforeCite(after)) {
      punctuation = sentencePeriodFor(before);
    }
    return `${punctuation}${footnoteHtml(n)}`;
  });
  out = out.replace(TABLE_ROW_CITE, (_, n: string) => ` ${footnoteHtml(n)}`);
  out = out.replace(TABLE_CELL_CITE, (_, n: string) => ` ${footnoteHtml(n)}`);
  out = out.replace(PAREN_COMMA_CITE, (_, n: string) => ` ${footnoteHtml(n)}`);
  return ensureCitationPunctuation(out);
}

/** Normalize inline citations to linked superscript footnotes. */
export function remarkCitations() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === 'html' && 'value' in node) {
        node.value = replaceCitationsInString(node.value);
        return;
      }
      if (node.type === 'text' && 'value' in node) {
        node.value = replaceCitationsInString(node.value);
      }
    });
  };
}
