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
  zh: {
    heading: '© TimeWoven Research.',
    body:
      '本馆材料可在完整或部分引用时使用，但须注明作者并提供指向原文的有效链接。在印刷品、电子出版物或其他出版物中使用本馆材料时，必须注明原始出处。TimeWoven 保留所有原创文本、研究结构与编辑材料的相关权利。',
  },
};

export function getCopyrightModel(locale: Locale): CopyrightModel | null {
  return COPYRIGHT_BY_LOCALE[locale] ?? null;
}

export function hasCopyright(locale: Locale): boolean {
  return Boolean(COPYRIGHT_BY_LOCALE[locale]);
}
