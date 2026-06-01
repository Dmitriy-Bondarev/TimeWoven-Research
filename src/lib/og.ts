import fs from 'node:fs';
import path from 'node:path';

/** Site-wide OG fallback until publication-specific art exists. */
export const DEFAULT_OG_IMAGE = '/og/TW-R-0001.jpg';

function publicFileExists(relativePath: string): boolean {
  const normalized = relativePath.replace(/^\//, '');
  return fs.existsSync(path.join(process.cwd(), 'public', normalized));
}

/** Resolve OG image path; fall back to TW-R placeholder when the requested file is missing. */
export function resolveOgImage(image?: string): string {
  const candidate = image?.trim() || DEFAULT_OG_IMAGE;
  if (publicFileExists(candidate)) return candidate;
  if (publicFileExists(DEFAULT_OG_IMAGE)) return DEFAULT_OG_IMAGE;
  return '/favicon.svg';
}
