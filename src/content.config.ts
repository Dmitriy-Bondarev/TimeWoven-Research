import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SUPPORTED_LOCALES } from './lib/i18n/languages';

/** Stable publication contract (TW-CONTENT-001A). Extend here only with a migration plan. */
export const contentTypeSchema = z.enum(['essay', 'research', 'article']);

export const localeSchema = z.enum(SUPPORTED_LOCALES);

export const publicationIdSchema = z.string().regex(/^TW-(R|A|E)-\d{4}$/, {
  message: 'publicationId must match TW-R-0001 / TW-A-0001 / TW-E-0001',
});

export const publicationSchema = z.object({
  /** Stable identity across locales (TW-CONTENT-I18N-001). */
  publicationId: publicationIdSchema,
  /** Locale of this representation; default RU for legacy entries. */
  locale: localeSchema.default('ru'),
  title: z.string(),
  description: z.string(),
  author: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),

  /** URL slug; stable after publish — do not rename without redirect plan */
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase ASCII with single hyphens',
  }),
  contentType: contentTypeSchema,
  featured: z.boolean().default(false),
  /** Minutes; optional until automated estimator exists */
  readingTime: z.number().int().positive().optional(),

  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  /** Social preview (Telegram / VK / Dzen); falls back to coverImage when unset */
  ogImage: z.string().optional(),

  /** Optional editorial lead; falls back to auto-extract from first paragraph */
  lead: z.string().optional(),

  /** Skimmable key findings — rendered before practical section */
  keyFindings: z
    .array(
      z.object({
        title: z.string(),
        summary: z.string(),
      }),
    )
    .default([]),
});

const authors = defineCollection({
  loader: glob({ base: './src/content/authors', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: publicationSchema,
});

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
  schema: publicationSchema,
});

const essays = defineCollection({
  loader: glob({ base: './src/content/essays', pattern: '**/*.{md,mdx}' }),
  schema: publicationSchema,
});

export const collections = { articles, research, essays, authors };
