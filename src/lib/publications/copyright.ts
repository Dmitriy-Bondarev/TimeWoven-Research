import type { Locale } from '../i18n/languages';

export type CopyrightModel = {
  heading: string;
  body: string;
};

const COPYRIGHT_BY_LOCALE: Partial<Record<Locale, CopyrightModel>> = {
  ru: {
    heading: '© TimeWoven Research.',
    body:
      'Материалы библиотеки могут цитироваться полностью или частично только при обязательном указании автора и активной ссылки на источник. При использовании материалов в печатных, электронных или иных публикациях ссылка на первоисточник обязательна. Все права на оригинальные тексты, структуру исследований и редакционные материалы принадлежат TimeWoven.',
  },
  en: {
    heading: '© TimeWoven Research.',
    body:
      'Materials from the library may be quoted in full or in part only with proper attribution of the author and an active link to the original source. When using materials in printed, electronic, or other publications, a reference to the original source is required. All rights to original texts, research structures, and editorial materials belong to TimeWoven.',
  },
};

export function getCopyrightModel(locale: Locale): CopyrightModel | null {
  return COPYRIGHT_BY_LOCALE[locale] ?? null;
}

export function hasCopyright(locale: Locale): boolean {
  return Boolean(COPYRIGHT_BY_LOCALE[locale]);
}
