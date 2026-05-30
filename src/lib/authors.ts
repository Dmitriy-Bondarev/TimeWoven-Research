import { getEntry, getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n/languages';

export type AuthorProfile = {
  name: string;
  role: string;
  bio: string;
};

export async function getAuthorById(id: string) {
  const authors = await getCollection('authors');
  const match = authors.find((a) => a.data.id === id);
  if (match) return match;
  return getEntry('authors', id);
}

export function getAuthorProfile(
  author: CollectionEntry<'authors'>,
  locale: Locale,
): AuthorProfile {
  const { name, role, bio, nameEn, roleEn, bioEn, nameZh, roleZh, bioZh } = author.data;

  if (locale === 'en' && nameEn) {
    return {
      name: nameEn,
      role: roleEn ?? role,
      bio: bioEn ?? bio,
    };
  }

  if (locale === 'zh' && nameZh) {
    return {
      name: nameZh,
      role: roleZh ?? role,
      bio: bioZh ?? bio,
    };
  }

  return { name, role, bio };
}

/** Latin-script name for citation blocks (EN/ZH use nameEn when available). */
export function getAuthorCitationName(
  author: CollectionEntry<'authors'>,
  locale: Locale,
): string {
  if ((locale === 'en' || locale === 'zh') && author.data.nameEn) {
    return author.data.nameEn;
  }
  return getAuthorProfile(author, locale).name;
}
