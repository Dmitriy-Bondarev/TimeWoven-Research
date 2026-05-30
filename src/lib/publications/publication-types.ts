import type { CollectionEntry } from 'astro:content';

export type PublicationType = 'research' | 'essay' | 'article';

export type PublicationIdPrefix = 'TW-R' | 'TW-E' | 'TW-A';

export const PUBLICATION_ID_PREFIX: Record<PublicationType, PublicationIdPrefix> = {
  research: 'TW-R',
  essay: 'TW-E',
  article: 'TW-A',
};

export const PUBLICATION_TYPE_FROM_PREFIX: Record<PublicationIdPrefix, PublicationType> = {
  'TW-R': 'research',
  'TW-E': 'essay',
  'TW-A': 'article',
};

export type PublicationEntry =
  | CollectionEntry<'research'>
  | CollectionEntry<'articles'>
  | CollectionEntry<'essays'>;

export type ContentSection = 'research' | 'essays' | 'articles';

export type PublicationFrontmatter = PublicationEntry['data'];

const CONTENT_TYPE_TO_SECTION: Record<PublicationFrontmatter['contentType'], ContentSection> = {
  research: 'research',
  essay: 'essays',
  article: 'articles',
};

const CONTENT_TYPE_TO_PUBLICATION_TYPE: Record<
  PublicationFrontmatter['contentType'],
  PublicationType
> = {
  research: 'research',
  essay: 'essay',
  article: 'article',
};

export function publicationTypeFromContentType(
  contentType: PublicationFrontmatter['contentType'],
): PublicationType {
  return CONTENT_TYPE_TO_PUBLICATION_TYPE[contentType];
}

export function contentTypeSection(contentType: PublicationFrontmatter['contentType']): ContentSection {
  return CONTENT_TYPE_TO_SECTION[contentType];
}

export function parsePublicationId(publicationId: string): {
  prefix: PublicationIdPrefix;
  sequence: string;
} | null {
  const match = publicationId.match(/^(TW-(?:R|E|A))-(\d{4})$/);
  if (!match) return null;
  return { prefix: match[1] as PublicationIdPrefix, sequence: match[2] };
}

export function publicationTypeFromId(publicationId: string): PublicationType | null {
  const parsed = parsePublicationId(publicationId);
  if (!parsed) return null;
  return PUBLICATION_TYPE_FROM_PREFIX[parsed.prefix];
}

export function resolvePublicationType(data: PublicationFrontmatter): PublicationType {
  if (data.publicationType) return data.publicationType;
  const fromId = publicationTypeFromId(data.publicationId);
  if (fromId) return fromId;
  return publicationTypeFromContentType(data.contentType);
}

export function resolvePublicationDate(data: PublicationFrontmatter): Date {
  return data.publicationDate ?? data.publishedAt;
}

export function assertPublicationIdentity(data: PublicationFrontmatter): void {
  const type = resolvePublicationType(data);
  const fromId = publicationTypeFromId(data.publicationId);
  if (fromId && fromId !== type) {
    throw new Error(
      `publicationId ${data.publicationId} (${fromId}) does not match publicationType ${type}`,
    );
  }
  const expectedPrefix = PUBLICATION_ID_PREFIX[type];
  if (!data.publicationId.startsWith(`${expectedPrefix}-`)) {
    throw new Error(
      `publicationId ${data.publicationId} must use prefix ${expectedPrefix} for type ${type}`,
    );
  }
}
