import { visit } from 'unist-util-visit';
import type { Element, Root, Text } from 'hast';
import {
  endsWithCitationAnchor,
  hasSentenceEndingBeforeCite,
  needsSentencePeriodBeforeCite,
  sentencePeriodFor,
} from './citation-punctuation.ts';

function hasClass(node: Element, token: string): boolean {
  const cls = node.properties?.className;
  if (Array.isArray(cls)) return cls.map(String).some((c) => c.includes(token));
  if (typeof cls === 'string') return cls.includes(token);
  return false;
}

function textAfterSibling(parent: Element, index: number): string {
  const next = parent.children[index + 1];
  if (!next) return '';
  if (next.type === 'text') return (next as Text).value;
  return '';
}

/**
 * MD often splits `word<sup>` across nodes; ensure sentence punctuation before cite (TW-CONTENT-003A / 001B).
 */
export function rehypeCitationPunctuation() {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index == null) return;
      if (node.tagName !== 'sup' || !hasClass(node, 'research-cite')) return;

      const prev = parent.children[index - 1];
      if (!prev || prev.type !== 'text') return;

      const text = (prev as Text).value;
      if (!endsWithCitationAnchor(text) || hasSentenceEndingBeforeCite(text)) return;

      const after = textAfterSibling(parent, index);
      if (after.startsWith('.') || after.startsWith('。')) return;

      if (needsSentencePeriodBeforeCite(after || '\n')) {
        (prev as Text).value = `${text}${sentencePeriodFor(text)}`;
      }
    });
  };
}
