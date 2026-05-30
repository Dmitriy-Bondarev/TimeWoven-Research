import { getCollection } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../i18n/languages';
import { publicationDetailPath } from '../i18n/paths';
import { SITE } from '../site';
import {
  assertPublicationIdentity,
  contentTypeSection,
  publicationTypeFromId,
  resolvePublicationDate,
  resolvePublicationType,
  type ContentSection,
  type PublicationEntry,
  type PublicationType,
} from './publication-types';

export type PublicationRepresentation = {
  locale: Locale;
  slug: string;
  title: string;
  entry: PublicationEntry;
};

export type PublicationIdentity = {
  publicationId: string;
  publicationType: PublicationType;
  section: ContentSection;
  /** Canonical slug from default-locale representation. */
  canonicalSlug: string;
  publicationDate: Date;
  representations: PublicationRepresentation[];
};

export type PublicationRegistryItem = {
  publicationId: string;
  slug: string;
  publicationType: PublicationType;
  contentType: PublicationEntry['data']['contentType'];
};

function isPublished(data: PublicationEntry['data']): boolean {
  return !data.draft;
}

async function getAllPublishedEntries(): Promise<PublicationEntry[]> {
  const collections = ['research', 'articles', 'essays'] as const;
  const entries: PublicationEntry[] = [];

  for (const name of collections) {
    try {
      const batch = await getCollection(name, ({ data }) => isPublished(data));
      entries.push(...(batch as PublicationEntry[]));
    } catch {
      // Collection may be empty or undefined during bootstrap.
    }
  }

  return entries;
}

function pickCanonicalRepresentation(
  representations: PublicationRepresentation[],
): PublicationRepresentation {
  return (
    representations.find((item) => item.locale === DEFAULT_LOCALE) ??
    representations[0]
  );
}

export async function getPublicationRegistry(): Promise<PublicationRegistryItem[]> {
  const identities = await getAllPublicationIdentities();
  return identities.map((identity) => ({
    publicationId: identity.publicationId,
    slug: identity.canonicalSlug,
    publicationType: identity.publicationType,
    contentType: identity.representations[0]?.entry.data.contentType ?? 'research',
  }));
}

/** @deprecated Use getPublicationRegistry — kept for static path generation. */
export async function getResearchRegistry(): Promise<PublicationRegistryItem[]> {
  const registry = await getPublicationRegistry();
  return registry.filter((item) => item.publicationType === 'research');
}

export async function getAllPublicationIdentities(): Promise<PublicationIdentity[]> {
  const entries = await getAllPublishedEntries();
  const grouped = new Map<string, PublicationRepresentation[]>();

  for (const entry of entries) {
    assertPublicationIdentity(entry.data);
    const publicationId = entry.data.publicationId;
    const locale = entry.data.locale ?? DEFAULT_LOCALE;
    const list = grouped.get(publicationId) ?? [];
    list.push({
      locale,
      slug: entry.data.slug,
      title: entry.data.title,
      entry,
    });
    grouped.set(publicationId, list);
  }

  const identities: PublicationIdentity[] = [];

  for (const [publicationId, representations] of grouped) {
    const canonical = pickCanonicalRepresentation(representations);
    const publicationType =
      resolvePublicationType(canonical.entry.data) ??
      publicationTypeFromId(publicationId) ??
      'research';

    identities.push({
      publicationId,
      publicationType,
      section: contentTypeSection(canonical.entry.data.contentType),
      canonicalSlug: canonical.slug,
      publicationDate: resolvePublicationDate(canonical.entry.data),
      representations,
    });
  }

  return identities.sort((a, b) => a.publicationId.localeCompare(b.publicationId));
}

export async function getPublicationById(
  publicationId: string,
): Promise<PublicationIdentity | undefined> {
  const identities = await getAllPublicationIdentities();
  return identities.find((item) => item.publicationId === publicationId);
}

export async function getPublicationRepresentation(
  publicationId: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<PublicationEntry | undefined> {
  const identity = await getPublicationById(publicationId);
  if (!identity) return undefined;
  return identity.representations.find((item) => item.locale === locale)?.entry;
}

export function getPermanentPublicationUrl(identity: PublicationIdentity): string {
  const path = publicationDetailPath(DEFAULT_LOCALE, identity.section, identity.canonicalSlug);
  return new URL(path, SITE).href;
}

export function registryDetailPath(
  item: PublicationRegistryItem,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const section = contentTypeSection(item.contentType);
  return publicationDetailPath(locale, section, item.slug);
}
