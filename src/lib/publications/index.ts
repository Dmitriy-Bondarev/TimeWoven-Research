import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../i18n/languages';
import { localePath, publicationDetailPath } from '../i18n/paths';
import {
  contentTypeSection,
  type ContentSection,
  type PublicationEntry,
} from './publication-types';
import {
  getPublicationById,
  getPublicationRegistry,
  getPublicationRepresentation,
  getResearchRegistry,
  registryDetailPath,
  type PublicationIdentity,
  type PublicationRegistryItem,
} from './publication-registry';

export {
  getPublicationById,
  getPublicationRegistry,
  getPublicationRepresentation,
  getPermanentPublicationUrl,
  getAllPublicationIdentities,
  findPublicationIdentityByDetailPath,
  publicationDetailHref,
  publicationSlugForLocale,
  parsePublicationDetailPath,
  switchLocalePathForPublication,
  hreflangAlternatesForPublicationPath,
  type PublicationIdentity,
  type PublicationRegistryItem,
  type PublicationRepresentation,
} from './publication-registry';

export {
  assertPublicationIdentity,
  contentTypeSection,
  parsePublicationId,
  publicationTypeFromId,
  resolvePublicationDate,
  resolvePublicationType,
  type ContentSection,
  type PublicationEntry,
  type PublicationType,
} from './publication-types';

export { buildCitation, formatAuthorForCitation, formatCitationYear, type CitationModel } from './citation';
export { getCopyrightModel, hasCopyright, type CopyrightModel } from './copyright';
export {
  isLiveStatus,
  isMatrixAvailable,
  matrixStatus,
  resolveLocaleStatus,
  type LocaleStatusMap,
  type PublicationLocaleStatus,
} from './publication-status';
export {
  getTranslationMatrix,
  getTranslationMatrixRow,
  matrixCellSymbol,
  matrixStatusForLocale,
  type TranslationMatrixRow,
} from './translation-matrix';

export { getResearchRegistry, registryDetailPath };

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
  const entry = await getPublicationRepresentation(publicationId, locale);
  if (!entry || entry.collection !== 'research') return undefined;
  return entry as CollectionEntry<'research'>;
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

export async function getArticleByPublicationId(
  publicationId: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<CollectionEntry<'articles'> | undefined> {
  const entry = await getPublicationRepresentation(publicationId, locale);
  if (!entry || entry.collection !== 'articles') return undefined;
  return entry as CollectionEntry<'articles'>;
}

export async function getArticleBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<CollectionEntry<'articles'> | undefined> {
  const entries = await getArticles(locale);
  return entries.find((e) => e.data.slug === slug);
}

export async function getEssayBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<CollectionEntry<'essays'> | undefined> {
  const entries = await getEssays(locale);
  return entries.find((e) => e.data.slug === slug);
}

export async function getEssayByPublicationId(
  publicationId: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<CollectionEntry<'essays'> | undefined> {
  const entry = await getPublicationRepresentation(publicationId, locale);
  if (!entry || entry.collection !== 'essays') return undefined;
  return entry as CollectionEntry<'essays'>;
}

export function publicationPath(entry: PublicationEntry, locale: Locale = DEFAULT_LOCALE): string {
  const section = contentTypeSection(entry.data.contentType);
  return publicationDetailPath(locale, section, entry.data.slug);
}

export function catalogPath(section: ContentSection, locale: Locale = DEFAULT_LOCALE): string {
  return localePath(locale, `/${section}`);
}
