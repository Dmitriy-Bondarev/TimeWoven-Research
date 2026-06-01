import type { Locale } from '../i18n/languages';

/** Estimate reading time from plain text (TW-A-0001 canon). */
export function estimateReadingTime(text: string, locale: Locale): number {
  const body = text.trim();
  if (!body) return 1;

  if (locale === 'zh') {
    const chars = body.replace(/\s+/g, '').length;
    return Math.max(1, Math.ceil(chars / 300));
  }

  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
