import type { Locale } from '../i18n/languages';
import { t } from '../i18n/messages';

export type CitationModel = {
  locale: Locale;
  authorName: string;
  title: string;
  publicationId: string;
  publicationYear: number;
  permanentUrl: string;
};

export function formatAuthorForCitation(authorName: string, locale: Locale): string {
  const trimmed = authorName.trim();
  if (!trimmed) return '';

  if (locale === 'ru') {
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      const surname = parts[parts.length - 1];
      const initial = parts[0].charAt(0).toUpperCase();
      return `${surname} ${initial}.`;
    }
    return trimmed;
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    const surname = parts[parts.length - 1];
    const initial = parts[0].charAt(0).toUpperCase();
    return `${surname}, ${initial}.`;
  }
  return trimmed;
}

export function formatCitationYear(date: Date): number {
  return date.getFullYear();
}

export function buildCitation(model: CitationModel): {
  heading: string;
  lines: string[];
  permanentUrlLabel: string;
  permanentUrl: string;
} {
  const authorLine = formatAuthorForCitation(model.authorName, model.locale);
  const imprint = t(model.locale, 'citation.imprint');

  const lines = [
    authorLine,
    `${model.title}.`,
    imprint,
    model.publicationId,
    `${model.publicationYear}.`,
  ].filter(Boolean);

  return {
    heading: t(model.locale, 'citation.heading'),
    lines,
    permanentUrlLabel: t(model.locale, 'citation.permanentUrl'),
    permanentUrl: model.permanentUrl,
  };
}
