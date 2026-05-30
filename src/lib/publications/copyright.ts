import type { Locale } from '../i18n/languages';

export type CopyrightModel = {
  heading: string;
  paragraphs: string[];
};

const COPYRIGHT_BY_LOCALE: Partial<Record<Locale, CopyrightModel>> = {
  ru: {
    heading: '© TimeWoven Research.',
    paragraphs: [
      'Материалы библиотеки могут цитироваться полностью или частично только при обязательном указании автора и активной ссылки на источник.',
      'При использовании материалов в печатных, электронных или иных публикациях ссылка на первоисточник обязательна.',
      'Все права на оригинальные тексты, структуру исследований и редакционные материалы принадлежат TimeWoven.',
    ],
  },
};

export function getCopyrightModel(locale: Locale): CopyrightModel | null {
  return COPYRIGHT_BY_LOCALE[locale] ?? null;
}

export function hasCopyright(locale: Locale): boolean {
  return Boolean(COPYRIGHT_BY_LOCALE[locale]);
}
