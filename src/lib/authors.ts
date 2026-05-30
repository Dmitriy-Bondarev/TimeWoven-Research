import { getEntry, getCollection } from 'astro:content';

export async function getAuthorById(id: string) {
  const authors = await getCollection('authors');
  const match = authors.find((a) => a.data.id === id);
  if (match) return match;
  return getEntry('authors', id);
}
