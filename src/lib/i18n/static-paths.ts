import type { Locale } from './languages';
import { getResearchRegistry } from '../publications';

export async function researchDetailStaticPaths(locale: Locale) {
  const registry = await getResearchRegistry();
  return registry.map((item) => ({
    params: { slug: item.slug },
    props: {
      locale,
      publicationId: item.publicationId,
      slug: item.slug,
    },
  }));
}
