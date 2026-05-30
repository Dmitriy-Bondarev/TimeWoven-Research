/** Shared citation punctuation helpers (TW-CONTENT-PUBLISHING-001B). */

/** Word or closing delimiter immediately before an inline cite (letters only — not digits). */
export const CITATION_ANCHOR_END = /[\p{L}»"\)）》。」』]$/u;

/** Punctuation already present before cite — do not inject another mark. */
export const SENTENCE_ENDING_BEFORE_CITE = /[.,:;!?»"\)）。，：；！？」』]$/;

const CJK_LAST_CHAR = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]$/;

/** Sentence-ending mark to insert before a cite, based on preceding script. */
export function sentencePeriodFor(textBefore: string): string {
  return CJK_LAST_CHAR.test(textBefore) ? '。' : '.';
}

/** Whether a period/full stop should be inserted before the cite. */
export function needsSentencePeriodBeforeCite(after: string): boolean {
  if (after.startsWith('.') || after.startsWith('。')) return false;
  if (after === '') return true;
  if (/^\n/.test(after)) return true;
  if (/^\s{2,}/.test(after)) return true;
  if (/^\s+[A-ZА-ЯЁ«"\u4e00-\u9fff]/.test(after)) return true;
  return false;
}

export function endsWithCitationAnchor(text: string): boolean {
  return CITATION_ANCHOR_END.test(text);
}

export function hasSentenceEndingBeforeCite(text: string): boolean {
  return SENTENCE_ENDING_BEFORE_CITE.test(text);
}

/** Lookbehind fragment: letter/closing char before cite (Unicode-aware; excludes digits). */
export const CITATION_LOOKBEHIND = String.raw`(?<=[\p{L}»"\)»）」。』])`;
