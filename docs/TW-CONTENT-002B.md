# TW-CONTENT-002B — Premium Research Reading Experience

**Environment:** MAC ONLY  
**Actual as of:** 2026-05-19  
**Replaces:** visual layer of TW-CONTENT-002 (routing/collections unchanged)

## Automatic pipeline

Any `src/content/research/*.md` file receives:

- Research hero (category, title, `seoDescription`, metadata)
- Editorial lead (first paragraph before first H2)
- Custom typography (~42rem measure, Source Serif 4 + Instrument Sans)
- Pull quotes, tables, footnotes, academic sources block
- Special section: H2 matching «20 вопросов» / «Эпилог»
- Special section: H2 «Источники» (numbered references)

### Optional directives (Markdown)

```md
:::insight
Текст наблюдения.
:::

:::statistic
Цифра или факт.
:::

:::note
Уточнение для читателя.
:::

:::question
Отдельный вопрос для размышления.
:::
```

Plugins: `src/plugins/remark-research.ts`, `src/plugins/rehype-research.ts`

## Verify

```bash
cd ~/Projects/TimeWoven-Research/timewoven-research
npm run dev
npm run build
```

Review at 390px / 768px / 1440px:

- `/`
- `/research/family-memory-third-generation`

**Owner Visual Review:** REQUIRED
