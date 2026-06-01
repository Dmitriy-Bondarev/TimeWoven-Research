import type { Locale } from './languages';

export type MessageKey = keyof (typeof messages)['ru'];

const messages = {
  ru: {
    'site.name': 'TimeWoven',
    'site.tagline': 'Проект TimeWoven — связь поколений во времени',
    'meta.defaultDescription':
      'Исследования, эссе и материалы команды TimeWoven о семейной памяти и межпоколенческой преемственности.',
    'nav.research': 'Публикации',
    'nav.essays': 'Эссе',
    'nav.articles': 'Статьи',
    'nav.aria': 'Основная навигация',
    'lang.switcherAria': 'Выбор языка',
    'footer.sectionsAria': 'Разделы библиотеки',
    'footer.home': 'Главная',
    'home.seoTitleSuffix': 'библиотека о семейной памяти',
    'home.seoDescription':
      'Исследования и тексты о том, как семейная память передаётся между поколениями — и почему она исчезает.',
    'home.hero.title': 'Библиотека проекта TimeWoven',
    'home.hero.lead':
      'Здесь собраны исследования и публикации, связанные с сохранением памяти и историей семей.',
    'home.hero.purpose':
      'Материалы предназначены для вдумчивого чтения, размышлений и создания новых смыслов.',
    'home.mission.title': 'Для чего мы это делаем?',
    'home.mission.p1':
      'Семейная память — это не только архив фотографий или сформированная родословная. Это то, как мы понимаем и осознаём, откуда мы пришли и что и как мы можем передать дальше.',
    'home.mission.p2':
      'Проект помогает сохранять память семьи, а материалы библиотеки дают возможность взглянуть на обычные вещи по-новому.',
    'home.sections.title': 'Разделы',
    'home.card.research.desc':
      'Развёрнутые тексты о том, как семейная память устроена, передаётся между поколениями и почему исчезает — с опорой на социологию, историю и живые семейные воспоминания.',
    'home.card.essays.desc': 'Размышляем о семье и памяти. Бережно и со смыслом.',
    'home.card.articles.desc':
      'Короткие редакционные публикации: заметки, разборы и практические наблюдения, которые дополняют нашу библиотеку.',
    'home.card.openSection': 'Открыть раздел →',
    'home.featured.title': 'Избранное исследование',
    'home.featured.badge': 'Избранное · Исследование',
    'home.featured.allResearch': 'Все исследования',
    'home.featured.cta': 'Читать исследование →',
    'home.featured.empty': 'Исследования готовятся к публикации.',
    'catalog.sectionEyebrow': 'Раздел',
    'catalog.research.seoDescription':
      'Исследования о семейной памяти, поколениях и межпоколенческой преемственности.',
    'catalog.research.lead':
      'Развёрнутые тексты о том, как семейная память устроена, передаётся между поколениями и почему исчезает — с опорой на социологию, историю и живые семейные воспоминания.',
    'catalog.research.emptyBefore': 'Первые исследования появятся здесь. Пока можно вернуться на',
    'catalog.research.emptyLink': 'главную страницу библиотеки',
    'catalog.essays.seoDescription':
      'Эссе о семейной памяти, преемственности поколений и личном опыте сохранения истории рода.',
    'catalog.essays.lead': 'Размышляем о семье и памяти. Бережно и со смыслом.',
    'catalog.essays.empty.message': 'Первые эссе появятся здесь.',
    'catalog.essays.empty.note':
      'В этом разделе мы будем делиться живыми историями о памяти рода — они дополнят наши более строгие исследования.\n\nПока тексты готовятся, вы можете почитать раздел «Исследования» или вернуться на главную.',
    'catalog.articles.seoDescription':
      'Короткие материалы о семейной памяти — заметки и разборы, которые дополняют библиотеку.',
    'catalog.articles.lead':
      'Короткие редакционные публикации: заметки, разборы и практические наблюдения, которые дополняют нашу библиотеку.',
    'catalog.articles.empty.message': 'Раздел находится в подготовке.',
    'catalog.articles.empty.note':
      'Здесь будут материалы — удобные для чтения за один присест.\n\nПока тексты готовятся, вы можете почитать раздел «Исследования» или вернуться на главную.',
    'catalog.backHomeLibrary': 'Главная библиотеки',
    'publication.featured': 'Избранное',
    'publication.readCta': 'Читать →',
    'publication.readingMinutes': 'мин чтения',
    'publication.type.research': 'Исследование',
    'publication.type.essay': 'Эссе',
    'publication.type.article': 'Статья',
    'research.hero.category': 'Исследование',
    'research.hero.author': 'Автор',
    'research.hero.published': 'Опубликовано',
    'research.hero.reading': 'Чтение',
    'research.hero.readingMinutes': 'мин',
    'research.related.title': 'Другие исследования',
    'research.related.empty': 'Другие исследования появятся здесь.',
    'research.author.headingSr': 'Об авторе',
    'research.author.label': 'Автор',
    'research.cta.text':
      'Память семьи исчезает тише, чем нам кажется. TimeWoven — спокойное пространство, где можно сохранять истории, воспоминания и связи между поколениями, пока их ещё можно услышать.',
    'research.cta.link': 'Узнать о проекте →',
    'fallback.title': 'Перевод недоступен',
    'fallback.message':
      'Этот материал пока не опубликован на выбранном языке. Вы можете вернуться к списку исследований или открыть версию на другом языке.',
    'fallback.publicationId': 'ID публикации',
    'fallback.backResearch': 'К исследованиям',
    'fallback.backHome': 'На главную',
    'citation.heading': 'Цитирование',
    'citation.imprint': 'TimeWoven Research.',
    'citation.permanentUrl': 'Постоянная ссылка:',
    'publication.metaAria': 'Служебная информация о публикации',
    'coverage.heading': 'Доступные языки',
    'translation.notice.ru': 'Эта публикация пока не переведена на русский язык.',
    'translation.notice.en': 'This publication has not yet been translated into English.',
    'translation.notice.zh': '该出版物暂未提供中文版本。',
  },
  en: {
    'site.name': 'TimeWoven',
    'site.tagline': 'The TimeWoven project — generations connected across time',
    'meta.defaultDescription':
      'Research, essays, and materials from TimeWoven on family memory and continuity across generations.',
    'nav.research': 'Publications',
    'nav.essays': 'Essays',
    'nav.articles': 'Articles',
    'nav.aria': 'Main navigation',
    'lang.switcherAria': 'Language selection',
    'footer.sectionsAria': 'Library sections',
    'footer.home': 'Home',
    'home.seoTitleSuffix': 'research library on family memory',
    'home.seoDescription':
      'Research and writing on how family memory travels between generations — and why it disappears.',
    'home.hero.title': 'TimeWoven Research Library',
    'home.hero.lead':
      'Research and publications on preserving memory and the history of families.',
    'home.hero.purpose':
      'Built for slow reading, reflection, and making new meaning together.',
    'home.mission.title': 'Why we built this library',
    'home.mission.p1':
      'Family memory is more than a photo archive or a finished family tree. It is how we understand where we come from — and what we can still pass on.',
    'home.mission.p2':
      'TimeWoven helps families preserve memory. These materials offer a quieter, clearer way to see familiar stories.',
    'home.sections.title': 'Sections',
    'home.card.research.desc':
      'Long-form research on how family memory works, how it moves between generations, and why it fades — grounded in sociology, history, and lived family experience.',
    'home.card.essays.desc': 'Reflective writing on family and memory — careful, personal, and considered.',
    'home.card.articles.desc':
      'Shorter editorial pieces: notes, analyses, and practical observations that extend the library.',
    'home.card.openSection': 'Open section →',
    'home.featured.title': 'Featured research',
    'home.featured.badge': 'Featured · Research',
    'home.featured.allResearch': 'All research',
    'home.featured.cta': 'Read research →',
    'home.featured.empty': 'Research publications are in preparation.',
    'catalog.sectionEyebrow': 'Section',
    'catalog.research.seoDescription':
      'Research on family memory, generations, and continuity across time.',
    'catalog.research.lead':
      'Long-form research on how family memory works, how it passes between generations, and why it disappears — grounded in sociology, history, and lived family experience.',
    'catalog.research.emptyBefore': 'The first research pieces will appear here. For now, return to the',
    'catalog.research.emptyLink': 'library home',
    'catalog.essays.seoDescription':
      'Essays on family memory, generational continuity, and personal experience.',
    'catalog.essays.lead': 'Reflective writing on family and memory — careful, personal, and considered.',
    'catalog.essays.empty.message': 'The first essays will appear here.',
    'catalog.essays.empty.note':
      'This section will hold lived stories about family memory — alongside our more structured research.\n\nWhile new texts are in preparation, explore Research or return home.',
    'catalog.articles.seoDescription':
      'Short materials on family memory — notes and analyses that extend the library.',
    'catalog.articles.lead':
      'Shorter editorial publications: notes, analyses, and practical observations.',
    'catalog.articles.empty.message': 'This section is in preparation.',
    'catalog.articles.empty.note':
      'Materials designed for a single sitting will appear here.\n\nWhile new texts are in preparation, explore Research or return home.',
    'catalog.backHomeLibrary': 'Library home',
    'publication.featured': 'Featured',
    'publication.readCta': 'Read →',
    'publication.readingMinutes': 'min read',
    'publication.type.research': 'Research',
    'publication.type.essay': 'Essay',
    'publication.type.article': 'Article',
    'research.hero.category': 'Research',
    'research.hero.author': 'Author',
    'research.hero.published': 'Published',
    'research.hero.reading': 'Reading time',
    'research.hero.readingMinutes': 'min',
    'research.related.title': 'Other research',
    'research.related.empty': 'More research will appear here.',
    'research.author.headingSr': 'About the author',
    'research.author.label': 'Author',
    'research.cta.text':
      'Family memory fades more quietly than we think. TimeWoven is a calm space to preserve stories and connections between generations.',
    'research.cta.link': 'Learn about the project →',
    'fallback.title': 'Translation unavailable',
    'fallback.message':
      'This material is not yet published in the selected language. You can return to the research list or open another language version.',
    'fallback.publicationId': 'Publication ID',
    'fallback.backResearch': 'Back to research',
    'fallback.backHome': 'Home',
    'citation.heading': 'Citation',
    'citation.imprint': 'TimeWoven Research.',
    'citation.permanentUrl': 'Permanent link:',
    'publication.metaAria': 'Publication metadata',
    'coverage.heading': 'Available languages',
    'translation.notice.ru': 'This publication has not yet been translated into Russian.',
    'translation.notice.en': 'This publication has not yet been translated into English.',
    'translation.notice.zh': 'This publication has not yet been translated into Chinese.',
  },
  zh: {
    'site.name': 'TimeWoven',
    'site.tagline': 'TimeWoven 项目 — 连接世代与时间',
    'meta.defaultDescription':
      'TimeWoven 关于家族记忆与代际传承的研究、随笔与资料。',
    'nav.research': '出版物',
    'nav.essays': '随笔',
    'nav.articles': '文章',
    'nav.aria': '主导航',
    'lang.switcherAria': '语言选择',
    'footer.sectionsAria': '图书馆栏目',
    'footer.home': '首页',
    'home.seoTitleSuffix': '家族记忆研究图书馆',
    'home.seoDescription':
      '关于家族记忆如何在代际之间传递、又为何逐渐消散的研究与出版物。',
    'home.hero.title': 'TimeWoven 研究图书馆',
    'home.hero.lead': '这里汇集与保存家族记忆、家族历史相关的研究与出版物。',
    'home.hero.purpose': '供细读、思考，并在阅读中建立新的理解。',
    'home.mission.title': '我们为什么建立这座图书馆',
    'home.mission.p1':
      '家族记忆不只是照片档案或完成的族谱。它关乎我们如何理解自己从何而来，以及还能向下传递什么。',
    'home.mission.p2': 'TimeWoven 帮助家族保存记忆；本馆材料以更为沉静、清晰的方式呈现熟悉的故事。',
    'home.sections.title': '栏目',
    'home.card.research.desc':
      '关于家族记忆如何运作、如何在代际之间传递、又为何逐渐消散的长文——结合社会学、历史学与真实的家族经验。',
    'home.card.essays.desc': '关于家族与记忆的随笔——温和、个人化、有分寸。',
    'home.card.articles.desc': '短篇编辑内容：笔记、分析与观察，延伸本馆的研究体系。',
    'home.card.openSection': '进入栏目 →',
    'home.featured.title': '精选研究',
    'home.featured.badge': '精选 · 研究',
    'home.featured.allResearch': '全部研究',
    'home.featured.cta': '阅读研究 →',
    'home.featured.empty': '研究内容正在准备中。',
    'catalog.sectionEyebrow': '栏目',
    'catalog.research.seoDescription': '关于家族记忆、代际关系与历史传承的研究。',
    'catalog.research.lead':
      '关于家族记忆如何运作、如何在代际之间传递、又为何逐渐消散的长文——结合社会学、历史学与真实的家族经验。',
    'catalog.research.emptyBefore': '首批研究将在此发布。请先返回',
    'catalog.research.emptyLink': '图书馆首页',
    'catalog.essays.seoDescription': '关于家族记忆、代际连续性与个人经验的随笔。',
    'catalog.essays.lead': '关于家族与记忆的随笔——温和、个人化、有分寸。',
    'catalog.essays.empty.message': '首批随笔将在此发布。',
    'catalog.essays.empty.note':
      '本栏目将呈现关于家族记忆的真实故事，与更为系统的研究形成补充。\n\n内容准备期间，请浏览研究栏目或返回首页。',
    'catalog.articles.seoDescription': '关于家族记忆的短篇材料——笔记与分析。',
    'catalog.articles.lead': '短篇编辑出版物：笔记、分析与观察。',
    'catalog.articles.empty.message': '本栏目正在准备中。',
    'catalog.articles.empty.note':
      '适合一次读完的短篇内容将在此发布。\n\n内容准备期间，请浏览研究栏目或返回首页。',
    'catalog.backHomeLibrary': '图书馆首页',
    'publication.featured': '精选',
    'publication.readCta': '阅读 →',
    'publication.readingMinutes': '分钟阅读',
    'publication.type.research': '研究',
    'publication.type.essay': '随笔',
    'publication.type.article': '文章',
    'research.hero.category': '研究',
    'research.hero.author': '作者',
    'research.hero.published': '发布日期',
    'research.hero.reading': '阅读时间',
    'research.hero.readingMinutes': '分钟',
    'research.related.title': '其他研究',
    'research.related.empty': '更多研究将在此发布。',
    'research.author.headingSr': '关于作者',
    'research.author.label': '作者',
    'research.cta.text':
      '家族记忆消失得比想象中更安静。TimeWoven 是一个保存故事与代际联系的平静空间。',
    'research.cta.link': '了解项目 →',
    'fallback.title': '译文不可用',
    'fallback.message':
      '该材料尚未以所选语言发布。您可以返回研究列表或打开其他语言版本。',
    'fallback.publicationId': '出版物 ID',
    'fallback.backResearch': '返回研究',
    'fallback.backHome': '首页',
    'citation.heading': '引用方式',
    'citation.imprint': 'TimeWoven Research',
    'citation.permanentUrl': '永久链接：',
    'publication.metaAria': '出版物信息',
    'coverage.heading': '可用语言',
    'translation.notice.ru': '该出版物暂未提供俄语版本。',
    'translation.notice.en': '该出版物暂未提供英语版本。',
    'translation.notice.zh': '该出版物暂未提供中文版本。',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export { messages };

export function t(locale: Locale, key: MessageKey): string {
  return messages[locale][key];
}
