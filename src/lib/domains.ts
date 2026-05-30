/** TW-DOMAIN-ARCH-001 — canonical domain URLs (build-time env; prod defaults). */

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

function readBuildEnv(name: string, fallback: string): string {
  const fromProcess =
    typeof process !== 'undefined' && process.env?.[name] ? process.env[name] : undefined;
  const fromImport = import.meta.env?.[name] as string | undefined;
  return stripTrailingSlash(fromProcess ?? fromImport ?? fallback);
}

/** Marketing / landing origin (timewoven.ru). */
export const PUBLIC_SITE_URL = readBuildEnv('PUBLIC_SITE_URL', 'https://timewoven.ru');

/** Research Library static site (research.timewoven.ru). */
export const RESEARCH_SITE_URL = readBuildEnv(
  'RESEARCH_SITE_URL',
  readBuildEnv('SITE', 'https://research.timewoven.ru'),
);

/** Product app origin (app.timewoven.ru). */
export const APP_SITE_URL = readBuildEnv('APP_SITE_URL', 'https://app.timewoven.ru');

/** Staff admin origin (admin.timewoven.ru). */
export const ADMIN_SITE_URL = readBuildEnv('ADMIN_SITE_URL', 'https://admin.timewoven.ru');
