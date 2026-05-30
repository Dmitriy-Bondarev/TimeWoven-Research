import { DEFAULT_LOCALE, LOCALE_REGISTRY, SUPPORTED_LOCALES, type Locale } from './languages';

export type ParsedLocalePath = {
  locale: Locale;
  /** Path without locale prefix, always starts with `/`. */
  pathname: string;
};

/** Parse request pathname into locale + canonical path (no locale prefix). */
export function parseLocalePath(pathname: string): ParsedLocalePath {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  for (const locale of SUPPORTED_LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    const prefix = LOCALE_REGISTRY[locale].prefix;
    if (normalized === prefix) {
      return { locale, pathname: '/' };
    }
    if (normalized.startsWith(`${prefix}/`)) {
      return { locale, pathname: normalized.slice(prefix.length) || '/' };
    }
  }

  return { locale: DEFAULT_LOCALE, pathname: normalized };
}

/** Build localized URL from canonical path (e.g. `/research/foo`). */
export function localePath(locale: Locale, pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const prefix = LOCALE_REGISTRY[locale].prefix;
  if (path === '/') {
    return prefix || '/';
  }
  return `${prefix}${path}`;
}

/** Switch current URL to another locale, preserving canonical path. */
export function switchLocalePath(currentPathname: string, targetLocale: Locale): string {
  const { pathname } = parseLocalePath(currentPathname);
  return localePath(targetLocale, pathname);
}

export function contentSectionPath(
  locale: Locale,
  section: 'research' | 'essays' | 'articles',
): string {
  return localePath(locale, `/${section}`);
}

export function publicationDetailPath(
  locale: Locale,
  section: 'research' | 'essays' | 'articles',
  slug: string,
): string {
  return localePath(locale, `/${section}/${slug}`);
}

/** hreflang alternate links for a canonical path. */
export function hreflangAlternatesForPath(
  pathname: string,
): Array<{ locale: Locale; href: string }> {
  const { pathname: canonical } = parseLocalePath(pathname);
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
    href: localePath(locale, canonical),
  }));
}
