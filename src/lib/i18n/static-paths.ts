import type { Locale } from './languages';
import { getAllPublicationIdentities } from '../publications/publication-registry';
import type { PublicationType } from '../publications/publication-types';

async function publicationDetailStaticPaths(locale: Locale, publicationType: PublicationType) {
  const identities = await getAllPublicationIdentities();

  return identities
    .filter((item) => item.publicationType === publicationType)
    .map((identity) => {
      const rep = identity.representations.find((r) => r.locale === locale);
      const slug = rep?.slug ?? identity.canonicalSlug;
      return {
        params: { slug },
        props: {
          locale,
          publicationId: identity.publicationId,
          slug,
        },
      };
    });
}

export async function researchDetailStaticPaths(locale: Locale) {
  return publicationDetailStaticPaths(locale, 'research');
}

export async function essayDetailStaticPaths(locale: Locale) {
  return publicationDetailStaticPaths(locale, 'essay');
}

export async function articleDetailStaticPaths(locale: Locale) {
  return publicationDetailStaticPaths(locale, 'article');
}
