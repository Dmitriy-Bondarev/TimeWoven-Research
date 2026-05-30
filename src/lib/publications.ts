import { getCollection, type CollectionEntry } from 'astro:content';

export type PublicationEntry =
  | CollectionEntry<'research'>
  | CollectionEntry<'articles'>
  | CollectionEntry<'essays'>;

export function isPublished(data: PublicationEntry['data']): boolean {
  return !data.draft;
}

export function sortPublications<T extends PublicationEntry>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    if (a.data.featured !== b.data.featured) {
      return a.data.featured ? -1 : 1;
    }
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  });
}

export async function getResearch(): Promise<CollectionEntry<'research'>[]> {
  const entries = await getCollection('research', ({ data }) => isPublished(data));
  return sortPublications(entries);
}

export async function getFeaturedResearch(): Promise<CollectionEntry<'research'>[]> {
  const entries = await getResearch();
  return entries.filter((e) => e.data.featured);
}

export async function getResearchBySlug(
  slug: string,
): Promise<CollectionEntry<'research'> | undefined> {
  const entries = await getResearch();
  return entries.find((e) => e.data.slug === slug);
}

async function safeCollection<T extends 'articles' | 'essays'>(
  name: T,
): Promise<CollectionEntry<T>[]> {
  try {
    const entries = await getCollection(name, ({ data }) => isPublished(data));
    return sortPublications(entries) as CollectionEntry<T>[];
  } catch {
    return [];
  }
}

export async function getArticles(): Promise<CollectionEntry<'articles'>[]> {
  return safeCollection('articles');
}

export async function getEssays(): Promise<CollectionEntry<'essays'>[]> {
  return safeCollection('essays');
}

export function publicationPath(entry: PublicationEntry): string {
  const base =
    entry.data.contentType === 'research'
      ? 'research'
      : entry.data.contentType === 'essay'
        ? 'essays'
        : 'articles';
  return `/${base}/${entry.data.slug}`;
}
