// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import rehypeRaw from 'rehype-raw';
import { remarkCitations } from './src/plugins/remark-citations.ts';
import { remarkCases } from './src/plugins/remark-cases.ts';
import { remarkResearch } from './src/plugins/remark-research.ts';
import { remarkKeyFindings } from './src/plugins/remark-key-findings.ts';
import { rehypeResearch } from './src/plugins/rehype-research.ts';
import { rehypeFootnotes } from './src/plugins/rehype-footnotes.ts';
import { rehypeCitationPunctuation } from './src/plugins/rehype-citation-punctuation.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://research.timewoven.ru',

  markdown: {
    remarkPlugins: [remarkDirective, remarkCitations, remarkCases, remarkResearch, remarkKeyFindings],
    rehypePlugins: [rehypeRaw, rehypeResearch, rehypeFootnotes, rehypeCitationPunctuation],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
