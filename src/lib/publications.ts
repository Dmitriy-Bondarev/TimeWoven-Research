import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from './i18n/languages';
import { localePath, publicationDetailPath } from './i18n/paths';

export type PublicationEntry =
  | CollectionEntry<'research'>
  | CollectionEntry<'articles'>
  | CollectionEntry<'essays'>;

export type ContentSection = 'research' | 'essays' | 'articles';

export type PublicationRegistryItem = {
  publicationId: string;
  slug: string;
  contentType: PublicationEntry['data']['contentType'];
};

export function isPublished(data: PublicationEntry['data']): boolean {
  return !data.draft;
}

export function contentTypeSection(contentType: PublicationEntry['data']['contentType']): ContentSection {
  if (contentType === 'research') return 'research';
  if (contentType === 'essay') return 'essays';
  return 'articles';
}

export function sortPublications<T extends PublicationEntry>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    if (a.data.featured !== b.data.featured) {
      return a.data.featured ? -1 : 1;
    }
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  });
}

function matchesLocale(data: PublicationEntry['data'], locale: Locale): boolean {
  return (data.locale ?? DEFAULT_LOCALE) === locale;
}

export async function getResearch(locale: Locale = DEFAULT_LOCALE): Promise<CollectionEntry<'research'>[]> {
  const entries = await getCollection('research', ({ data }) => isPublished(data) && matchesLocale(data, locale));
  return sortPublications(entries);
}

export async function getFeaturedResearch(
  locale: Locale = DEFAULT_LOCALE,
): Promise<CollectionEntry<'research'>[]> {
  const entries = await getResearch(locale);
  return entries.filter((e) => e.data.featured);
}

export async function getResearchBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<CollectionEntry<'research'> | undefined> {
  const entries = await getResearch(locale);
  return entries.find((e) => e.data.slug === slug);
}

export async function getResearchByPublicationId(
  publicationId: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<CollectionEntry<'research'> | undefined> {
  const entries = await getResearch(locale);
  return entries.find((e) => e.data.publicationId === publicationId);
}

export async function getResearchRegistry(): Promise<PublicationRegistryItem[]> {
  const entries = await getCollection('research', ({ data }) => isPublished(data));
  const byId = new Map<string, PublicationRegistryItem>();

  for (const entry of entries) {
    const existing = byId.get(entry.data.publicationId);
    if (!existing || entry.data.locale === DEFAULT_LOCALE) {
      byId.set(entry.data.publicationId, {
        publicationId: entry.data.publicationId,
        slug: entry.data.slug,
        contentType: entry.data.contentType,
      });
    }
  }

  return [...byId.values()];
}

async function safeCollection<T extends 'articles' | 'essays'>(
  name: T,
  locale: Locale = DEFAULT_LOCALE,
): Promise<CollectionEntry<T>[]> {
  try {
    const entries = await getCollection(
      name,
      ({ data }) => isPublished(data) && matchesLocale(data, locale),
    );
    return sortPublications(entries) as CollectionEntry<T>[];
  } catch {
    return [];
  }
}

export async function getArticles(locale: Locale = DEFAULT_LOCALE): Promise<CollectionEntry<'articles'>[]> {
  return safeCollection('articles', locale);
}

export async function getEssays(locale: Locale = DEFAULT_LOCALE): Promise<CollectionEntry<'essays'>[]> {
  return safeCollection('essays', locale);
}

export function publicationPath(entry: PublicationEntry, locale: Locale = DEFAULT_LOCALE): string {
  const section = contentTypeSection(entry.data.contentType);
  return publicationDetailPath(locale, section, entry.data.slug);
}

export function registryDetailPath(
  item: PublicationRegistryItem,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const section = contentTypeSection(item.contentType);
  return publicationDetailPath(locale, section, item.slug);
}

export function catalogPath(section: ContentSection, locale: Locale = DEFAULT_LOCALE): string {
  return localePath(locale, `/${section}`);
}
