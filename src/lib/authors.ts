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
  const { name, role, bio, nameEn, roleEn, bioEn } = author.data;

  if (locale === 'en' && nameEn) {
    return {
      name: nameEn,
      role: roleEn ?? role,
      bio: bioEn ?? bio,
    };
  }

  return { name, role, bio };
}
