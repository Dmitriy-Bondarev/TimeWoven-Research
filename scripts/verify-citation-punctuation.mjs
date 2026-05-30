/**
 * TW-CONTENT-003A / TW-CONTENT-PUBLISHING-001B — citation punctuation regression checks.
 */
import assert from 'node:assert/strict';
import {
  ensureCitationPunctuation,
  needsSentencePeriodBeforeCite,
  replaceCitationsInString,
} from '../src/plugins/remark-citations.ts';
import { sentencePeriodFor } from '../src/plugins/citation-punctuation.ts';

const linked = (n) =>
  `<sup class="research-cite"><a href="#source-${n}" class="research-cite-link" id="cite-ref-${n}">${n}</a></sup>`;

// RU — sentence boundary without period before cite
const rawRu = `социальный конструкт${linked(1)}\n\nЭта двойственная`;
const fixedRu = ensureCitationPunctuation(rawRu);
assert.ok(fixedRu.includes('конструкт.'), `RU expected period before cite, got: ${fixedRu.slice(0, 80)}`);
assert.ok(!fixedRu.includes('..'), `RU double period: ${fixedRu.slice(0, 80)}`);

// EN — sentence boundary without period before cite
const rawEn = `social construct${linked(1)}\n\nThat dual`;
const fixedEn = ensureCitationPunctuation(rawEn);
assert.ok(fixedEn.includes('construct.'), `EN expected period before cite, got: ${fixedEn.slice(0, 80)}`);

// ZH — sentence boundary without period before cite
const rawZh = `复杂社会建构${linked(1)}\n\n这一双重`;
const fixedZh = ensureCitationPunctuation(rawZh);
assert.ok(fixedZh.includes('建构。'), `ZH expected full stop before cite, got: ${fixedZh.slice(0, 80)}`);

// Already has period before cite
const ok = `социальный конструкт.${linked(1)}\n\nДалее`;
assert.equal(ensureCitationPunctuation(ok), ok);

const okEn = `social construct.${linked(1)}\n\nThat`;
assert.equal(ensureCitationPunctuation(okEn), okEn);

const okZh = `复杂社会建构。${linked(1)}\n\n这一`;
assert.equal(ensureCitationPunctuation(okZh), okZh);

// Period after cite (style 2)
const tail = `социальный конструкт${linked(1)}.\n\nДалее`;
assert.equal(ensureCitationPunctuation(tail), tail);

// Mid-clause comma — no injected period
const mid = `памяти${linked(2)}, и далее`;
assert.equal(ensureCitationPunctuation(mid), mid);

const midEn = `memory${linked(2)}, and further`;
assert.equal(ensureCitationPunctuation(midEn), midEn);

// Glued digit at sentence end
const gluedRu = replaceCitationsInString('социальный конструкт1\n\nЭта');
assert.ok(gluedRu.includes('конструкт.'), gluedRu);

const gluedEn = replaceCitationsInString('social construct1\n\nThat');
assert.ok(gluedEn.includes('construct.'), gluedEn);

const gluedZh = replaceCitationsInString('复杂社会建构1\n\n这一');
assert.ok(gluedZh.includes('建构。'), gluedZh);

// Explicit punctuation preserved with glued digit
const dottedEn = replaceCitationsInString('social construct.1\n\nThat');
assert.ok(dottedEn.includes('construct.<sup'), dottedEn);

// Mid-clause lowercase continuation
const gluedMid = replaceCitationsInString('памяти1 и далее');
assert.ok(!gluedMid.includes('памяти.'), gluedMid);

assert.ok(needsSentencePeriodBeforeCite('\n\nЭта'));
assert.ok(needsSentencePeriodBeforeCite('\n\nThat'));
assert.ok(needsSentencePeriodBeforeCite('\n\n这一'));
assert.ok(!needsSentencePeriodBeforeCite(', и'));
assert.ok(!needsSentencePeriodBeforeCite(', and'));

assert.equal(sentencePeriodFor('конструкт'), '.');
assert.equal(sentencePeriodFor('construct'), '.');
assert.equal(sentencePeriodFor('复杂社会建构'), '。');

console.log('verify-citation-punctuation: PASS');
