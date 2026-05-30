/**
 * TW-CONTENT-003A — regression checks for citation punctuation.
 */
import assert from 'node:assert/strict';
import {
  ensureCitationPunctuation,
  needsSentencePeriodBeforeCite,
  replaceCitationsInString,
} from '../src/plugins/remark-citations.ts';

const linked = (n) =>
  `<sup class="research-cite"><a href="#source-${n}" class="research-cite-link" id="cite-ref-${n}">${n}</a></sup>`;

// Sentence boundary without period before cite
const raw = `социальный конструкт${linked(1)}\n\nЭта двойственная`;
const fixed = ensureCitationPunctuation(raw);
assert.ok(fixed.includes('конструкт.'), `expected period before cite, got: ${fixed.slice(0, 80)}`);
assert.ok(!fixed.includes('..'), `double period: ${fixed.slice(0, 80)}`);

// Already has period before cite
const ok = `социальный конструкт.${linked(1)}\n\nДалее`;
assert.equal(ensureCitationPunctuation(ok), ok);

// Period after cite (style 2)
const tail = `социальный конструкт${linked(1)}.\n\nДалее`;
assert.equal(ensureCitationPunctuation(tail), tail);

// Mid-clause comma — no injected period
const mid = `памяти${linked(2)}, и далее`;
assert.equal(ensureCitationPunctuation(mid), mid);

// Glued digit at sentence end
const glued = replaceCitationsInString('социальный конструкт1\n\nЭта');
assert.ok(glued.includes('конструкт.'), glued);

// Mid-clause lowercase continuation
const gluedMid = replaceCitationsInString('памяти1 и далее');
assert.ok(!gluedMid.includes('памяти.'), gluedMid);

assert.ok(needsSentencePeriodBeforeCite('\n\nЭта'));
assert.ok(!needsSentencePeriodBeforeCite(', и'));

console.log('verify-citation-punctuation: PASS');
