import type { Locale } from '../i18n/languages';
import type { PublicationRepresentation } from './publication-registry';

/** Per-locale publication state (TW-CONTENT-I18N-002A). */
export type PublicationLocaleStatus =
  | 'draft'
  | 'published'
  | 'translation_pending'
  | 'translation_available';

export function isLiveStatus(status: PublicationLocaleStatus): boolean {
  return status === 'published' || status === 'translation_available';
}

/** Resolve locale status from a content representation, if any. */
export function resolveLocaleStatus(
  representation: PublicationRepresentation | undefined,
): PublicationLocaleStatus {
  if (!representation) return 'translation_pending';
  if (representation.entry.data.draft) return 'draft';
  return 'published';
}

/** Published locales expose `translation_available` in matrix views. */
export function matrixStatus(status: PublicationLocaleStatus): PublicationLocaleStatus {
  return status === 'published' ? 'translation_available' : status;
}

export function isMatrixAvailable(status: PublicationLocaleStatus): boolean {
  return isLiveStatus(matrixStatus(status));
}

export type LocaleStatusMap = Record<Locale, PublicationLocaleStatus>;
