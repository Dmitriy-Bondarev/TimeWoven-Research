/* TW-LEGAL-COOKIE-001 — editorial cookie consent (Landing + Research) */
(function () {
  const STORAGE_KEY = 'tw_cookie_consent_v1';
  const LEGACY_KEY = 'tw_cookie_consent';
  const CONSENT_VERSION = 1;

  const MESSAGES = {
    ru: {
      bannerLabel: 'Уведомление о cookie',
      bannerText:
        'Мы используем технически необходимые cookie и локальное хранилище для работы сайта, выбора языка и защиты форм. Аналитические cookie сейчас не применяются.',
      accept: 'Принять',
      preferences: 'Настройки',
      policy: 'Политика cookie',
      privacy: 'Конфиденциальность',
      prefsTitle: 'Настройки cookie',
      prefsClose: 'Закрыть',
      prefsSave: 'Сохранить',
      necessaryTitle: 'Необходимые',
      necessaryDesc: 'Нужны для безопасности, языка и работы форм. Отключить нельзя.',
      analyticsTitle: 'Аналитические',
      analyticsDesc: 'Сейчас не используются. Появятся только после отдельного уведомления.',
      analyticsOff: 'Не используется',
      alwaysOn: 'Всегда включены',
    },
    en: {
      bannerLabel: 'Cookie notice',
      bannerText:
        'We use strictly necessary cookies and local storage for site operation, language preference, and form protection. Analytics cookies are not used at this time.',
      accept: 'Accept',
      preferences: 'Preferences',
      policy: 'Cookie policy',
      privacy: 'Privacy',
      prefsTitle: 'Cookie preferences',
      prefsClose: 'Close',
      prefsSave: 'Save',
      necessaryTitle: 'Necessary',
      necessaryDesc: 'Required for security, language, and forms. Always active.',
      analyticsTitle: 'Analytics',
      analyticsDesc: 'Not in use today. Will only be enabled after a separate notice.',
      analyticsOff: 'Not in use',
      alwaysOn: 'Always on',
    },
    zh: {
      bannerLabel: 'Cookie 提示',
      bannerText:
        '我们使用严格必要的技术性 Cookie 与本地存储，用于网站运行、语言偏好与表单保护。目前不使用分析类 Cookie。',
      accept: '接受',
      preferences: '偏好设置',
      policy: 'Cookie 政策',
      privacy: '隐私政策',
      prefsTitle: 'Cookie 偏好设置',
      prefsClose: '关闭',
      prefsSave: '保存',
      necessaryTitle: '必要 Cookie',
      necessaryDesc: '用于安全、语言与表单，始终启用，无法关闭。',
      analyticsTitle: '分析 Cookie',
      analyticsDesc: '当前未使用。若将来启用，将另行告知。',
      analyticsOff: '未使用',
      alwaysOn: '始终启用',
    },
  };

  function readConfig() {
    const el = document.getElementById('tw-cookie-config');
    if (!el) return { locale: 'ru', cookiesUrl: '/legal/cookies', privacyUrl: '/legal' };
    try {
      return JSON.parse(el.textContent || '{}');
    } catch {
      return { locale: 'ru', cookiesUrl: '/legal/cookies', privacyUrl: '/legal' };
    }
  }

  function t(locale, key) {
    const pack = MESSAGES[locale] || MESSAGES.ru;
    return pack[key] || MESSAGES.ru[key] || key;
  }

  function readConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.version === CONSENT_VERSION) return parsed;
      }
      if (localStorage.getItem(LEGACY_KEY) === 'accepted') {
        return migrateLegacy();
      }
    } catch {
      /* ignore */
    }
    return null;
  }

  function migrateLegacy() {
    const record = {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: false,
      decidedAt: new Date().toISOString(),
      source: 'legacy_tw_cookie_consent',
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      localStorage.removeItem(LEGACY_KEY);
    } catch {
      /* ignore */
    }
    return record;
  }

  function writeConsent(analytics) {
    const record = {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: !!analytics,
      decidedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      localStorage.removeItem(LEGACY_KEY);
    } catch {
      /* ignore */
    }
    return record;
  }

  function buildUI(cfg) {
    const locale = cfg.locale || 'ru';
    const root = document.createElement('div');
    root.id = 'tw-cookie-root';
    root.innerHTML = `
      <div id="tw-cookie-prefs" class="tw-cookie-prefs" role="dialog" aria-modal="true" aria-labelledby="tw-cookie-prefs-title" hidden>
        <div class="tw-cookie-prefs-card">
          <div class="tw-cookie-prefs-head">
            <h2 id="tw-cookie-prefs-title" class="tw-cookie-prefs-title">${t(locale, 'prefsTitle')}</h2>
            <button type="button" class="tw-cookie-prefs-close" id="tw-cookie-prefs-close" aria-label="${t(locale, 'prefsClose')}">×</button>
          </div>
          <div class="tw-cookie-pref-row">
            <div class="tw-cookie-pref-copy">
              <strong>${t(locale, 'necessaryTitle')}</strong>
              <p>${t(locale, 'necessaryDesc')}</p>
            </div>
            <span class="tw-cookie-pref-badge">${t(locale, 'alwaysOn')}</span>
          </div>
          <div class="tw-cookie-pref-row tw-cookie-pref-row--muted">
            <div class="tw-cookie-pref-copy">
              <strong>${t(locale, 'analyticsTitle')}</strong>
              <p>${t(locale, 'analyticsDesc')}</p>
            </div>
            <span class="tw-cookie-pref-badge tw-cookie-pref-badge--off">${t(locale, 'analyticsOff')}</span>
          </div>
          <div class="tw-cookie-prefs-actions">
            <button type="button" class="tw-cookie-btn tw-cookie-btn--primary" id="tw-cookie-prefs-save">${t(locale, 'prefsSave')}</button>
          </div>
        </div>
      </div>
      <div id="tw-cookie-banner" class="tw-cookie-banner" role="region" aria-label="${t(locale, 'bannerLabel')}" hidden>
        <div class="tw-cookie-banner-inner">
          <p class="tw-cookie-banner-text">${t(locale, 'bannerText')}</p>
          <div class="tw-cookie-banner-actions">
            <button type="button" class="tw-cookie-btn tw-cookie-btn--primary" id="tw-cookie-accept">${t(locale, 'accept')}</button>
            <button type="button" class="tw-cookie-btn tw-cookie-btn--ghost" id="tw-cookie-prefs-open">${t(locale, 'preferences')}</button>
            <a class="tw-cookie-btn tw-cookie-btn--link" href="${cfg.cookiesUrl}">${t(locale, 'policy')}</a>
            <a class="tw-cookie-btn tw-cookie-btn--link" href="${cfg.privacyUrl}">${t(locale, 'privacy')}</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(root);
    return root;
  }

  function showBanner() {
    const banner = document.getElementById('tw-cookie-banner');
    if (!banner) return;
    banner.hidden = false;
    banner.removeAttribute('aria-hidden');
    document.body.classList.add('tw-cookie-banner-visible');
  }

  function hideBanner() {
    const banner = document.getElementById('tw-cookie-banner');
    const prefs = document.getElementById('tw-cookie-prefs');
    if (banner) {
      banner.hidden = true;
      banner.setAttribute('aria-hidden', 'true');
    }
    if (prefs) {
      prefs.hidden = true;
    }
    document.body.classList.remove('tw-cookie-banner-visible');
    document.body.classList.remove('tw-cookie-prefs-visible');
  }

  function openPrefs() {
    const prefs = document.getElementById('tw-cookie-prefs');
    if (!prefs) return;
    prefs.hidden = false;
    document.body.classList.add('tw-cookie-prefs-visible');
    document.getElementById('tw-cookie-prefs-close')?.focus();
  }

  function closePrefs() {
    const prefs = document.getElementById('tw-cookie-prefs');
    if (prefs) prefs.hidden = true;
    document.body.classList.remove('tw-cookie-prefs-visible');
  }

  function init() {
    if (readConsent()) return;

    const cfg = readConfig();
    buildUI(cfg);
    showBanner();

    document.getElementById('tw-cookie-accept')?.addEventListener('click', () => {
      writeConsent(false);
      hideBanner();
    });

    document.getElementById('tw-cookie-prefs-open')?.addEventListener('click', openPrefs);
    document.getElementById('tw-cookie-prefs-close')?.addEventListener('click', closePrefs);

    document.getElementById('tw-cookie-prefs-save')?.addEventListener('click', () => {
      writeConsent(false);
      hideBanner();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePrefs();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
