// Language switcher shared by all pages: RU / UK / EN, remembered in localStorage.
(function () {
  const LANGS = ['en', 'ru', 'uk'];
  let saved = null;
  try { saved = localStorage.getItem('video-drift-lang'); } catch (e) {}
  const nav = (navigator.language || 'en').slice(0, 2);
  let lang = LANGS.includes(saved) ? saved : (LANGS.includes(nav) ? nav : 'en');

  // English text lives in the HTML itself and is kept as the fallback.
  document.querySelectorAll('[data-i18n]').forEach((el) => { el._en = el.innerHTML; });
  const enTitle = document.title;

  function apply(l) {
    lang = l;
    const dict = (window.I18N && window.I18N[l]) || {};
    document.documentElement.lang = l;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = dict[el.dataset.i18n];
      el.innerHTML = v != null ? v : el._en;
    });
    document.title = dict['_title_' + document.body.dataset.page] || enTitle;
    document.querySelectorAll('.langs button').forEach((b) => b.classList.toggle('on', b.dataset.lang === l));
    try { localStorage.setItem('video-drift-lang', l); } catch (e) {}
  }

  document.querySelectorAll('.langs button').forEach((b) => b.addEventListener('click', () => apply(b.dataset.lang)));
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
  apply(lang);
})();
