import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

const GLUED_CITE = /(?<=[а-яёА-ЯЁ»»"\)»])(\.?)(\d{1,2})(?=[\s,;:\)\.]|\s|$)/g;
const TABLE_CELL_CITE = /(?<=\.)\s+(\d{1,2})(?=\s*$)/g;
const TABLE_ROW_CITE = /(?<=\.)\s+(\d{1,2})(?=\s*\|)/g;
const PAREN_COMMA_CITE = /(?<=\))\s+(\d{1,2})(?=,)/g;
const PLAIN_SUP = /<sup class="research-cite">(\d{1,2})<\/sup>/g;
const LINKED_CITE_SUP =
  /<sup class="research-cite"><a href="#source-\d{1,2}" class="research-cite-link" id="cite-ref-\d{1,2}">\d{1,2}<\/a><\/sup>/g;
const MAX_SOURCE_NUM = 25;

/** Canonical style: period immediately before superscript (`слово.¹`). */
export function needsSentencePeriodBeforeCite(after: string): boolean {
  if (after.startsWith('.')) return false;
  if (after === '') return true;
  if (/^\n/.test(after)) return true;
  if (/^\s{2,}/.test(after)) return true;
  if (/^\s+[А-ЯЁ«]/.test(after)) return true;
  return false;
}

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

/** Insert `.` before linked footnote when sentence ends without punctuation (TW-CONTENT-003A). */
export function ensureCitationPunctuation(value: string): string {
  const re = new RegExp(
    `(?<=[а-яёА-ЯЁ»»"\\)»])(?<!\\.)(?:${LINKED_CITE_SUP.source})(?!\\s*\\.)(?=(?:\\s*\\n|\\s*$|\\s{2,}|\\s+[А-ЯЁ«]))`,
    'g',
  );
  return value.replace(re, (sup) => `.${sup}`);
}

export function replaceCitationsInString(value: string): string {
  let out = value.replace(PLAIN_SUP, (_, n: string) => footnoteHtml(n));
  out = out.replace(GLUED_CITE, (match, dot: string, n: string, offset: number) => {
    const end = offset + match.length;
    if (!isValidCitation(n, out, offset, end)) return match;
    const after = out.slice(end);
    let punctuation = dot;
    if (!punctuation && needsSentencePeriodBeforeCite(after)) {
      punctuation = '.';
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
