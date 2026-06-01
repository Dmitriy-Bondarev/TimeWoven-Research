import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '../i18n/languages';
import {
  getAllPublicationIdentities,
  type PublicationIdentity,
} from './publication-registry';
import {
  isMatrixAvailable,
  matrixStatus,
  resolveLocaleStatus,
  type LocaleStatusMap,
  type PublicationLocaleStatus,
} from './publication-status';

export type TranslationMatrixRow = {
  publicationId: string;
  canonicalSlug: string;
  section: PublicationIdentity['section'];
  /** Per-locale URL slugs for publication detail links. */
  slugByLocale: Partial<Record<Locale, string>>;
  /** Canonical source language (default locale representation). */
  sourceLocale: Locale;
  locales: LocaleStatusMap;
  /** Locales with a live (published) translation. */
  availableLocales: Locale[];
};

function buildRow(identity: PublicationIdentity): TranslationMatrixRow {
  const locales = {} as LocaleStatusMap;

  for (const code of SUPPORTED_LOCALES) {
    const representation = identity.representations.find((item) => item.locale === code);
    locales[code] = resolveLocaleStatus(representation);
  }

  const availableLocales = SUPPORTED_LOCALES.filter((code) =>
    isMatrixAvailable(locales[code]),
  );

  const sourceLocale =
    identity.representations.find((item) => item.locale === DEFAULT_LOCALE)?.locale ??
    availableLocales[0] ??
    DEFAULT_LOCALE;

  const slugByLocale: Partial<Record<Locale, string>> = {};
  for (const rep of identity.representations) {
    slugByLocale[rep.locale] = rep.slug;
  }

  return {
    publicationId: identity.publicationId,
    canonicalSlug: identity.canonicalSlug,
    section: identity.section,
    slugByLocale,
    sourceLocale,
    locales,
    availableLocales,
  };
}

export async function getTranslationMatrix(): Promise<TranslationMatrixRow[]> {
  const identities = await getAllPublicationIdentities();
  return identities.map(buildRow);
}

export async function getTranslationMatrixRow(
  publicationId: string,
): Promise<TranslationMatrixRow | undefined> {
  const matrix = await getTranslationMatrix();
  return matrix.find((row) => row.publicationId === publicationId);
}

export function matrixCellSymbol(status: PublicationLocaleStatus): '✓' | '✕' | '—' {
  if (isMatrixAvailable(status)) return '✓';
  if (status === 'draft') return '—';
  return '✕';
}

export function matrixStatusForLocale(
  row: TranslationMatrixRow,
  locale: Locale,
): PublicationLocaleStatus {
  return matrixStatus(row.locales[locale]);
}
