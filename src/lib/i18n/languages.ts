/** TW-CONTENT-I18N-001: central language registry — single source for routing. */
export const DEFAULT_LOCALE = 'ru' as const;

export const SUPPORTED_LOCALES = ['ru', 'en', 'zh'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type LocaleMeta = {
  label: string;
  /** Human-readable name in language coverage blocks. */
  coverageLabel: string;
  htmlLang: string;
  ogLocale: string;
  /** URL prefix; empty for default locale (RU). */
  prefix: string;
};

export const LOCALE_REGISTRY: Record<Locale, LocaleMeta> = {
  ru: {
    label: 'RU',
    coverageLabel: 'Русский',
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    prefix: '',
  },
  en: {
    label: 'EN',
    coverageLabel: 'English',
    htmlLang: 'en',
    ogLocale: 'en_US',
    prefix: '/en',
  },
  zh: {
    label: '中文',
    coverageLabel: '中文',
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
