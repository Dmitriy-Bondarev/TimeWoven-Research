/** TW-CONTENT-I18N-001: central language registry — single source for routing. */
export const DEFAULT_LOCALE = 'ru' as const;

export const SUPPORTED_LOCALES = ['ru', 'en', 'zh'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type LocaleMeta = {
  label: string;
  htmlLang: string;
  ogLocale: string;
  /** URL prefix; empty for default locale (RU). */
  prefix: string;
};

export const LOCALE_REGISTRY: Record<Locale, LocaleMeta> = {
  ru: {
    label: 'RU',
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    prefix: '',
  },
  en: {
    label: 'EN',
    htmlLang: 'en',
    ogLocale: 'en_US',
    prefix: '/en',
  },
  zh: {
    label: '中文',
    htmlLang: 'zh-Hans',
    ogLocale: 'zh_CN',
    prefix: '/zh',
  },
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function localeFromPrefix(segment: string | undefined): Locale | null {
  if (!segment) return null;
  return isLocale(segment) ? segment : null;
}
