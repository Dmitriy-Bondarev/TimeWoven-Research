import type { Locale } from './i18n/languages';

const INTL_LOCALE: Record<Locale, string> = {
  ru: 'ru-RU',
  en: 'en-US',
  zh: 'zh-CN',
};

export function formatPublicationDate(date: Date, locale: Locale = 'ru'): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
