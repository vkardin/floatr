// Aloft popup.
(function () {
  'use strict';
  const F = globalThis.Aloft;
  const api = F.api;
  const t = (id, subs) => api.i18n.getMessage(id, subs) || id;
  const $ = (id) => document.getElementById(id);

  const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
  const BUTTONS = ['play', 'seek', 'speed', 'volume', 'bookmark', 'link', 'opacity'];
  let tabId = null;
  let st = null;
  let settings = null;

  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  document.documentElement.lang = api.i18n.getUILanguage().slice(0, 2);
  $('ver').textContent = 'v' + api.runtime.getManifest().version;

  function send(msg) {
    return new Promise((resolve) => {
      if (tabId == null) return resolve(null);
      api.tabs.sendMessage(tabId, msg, (res) => {
        void api.runtime.lastError;
        resolve(res || null);
      });
    });
  }

  function chips(container, values, fmt, onPick) {
    container.innerHTML = '';
    values.forEach((val) => {
      const b = document.createElement('button');
      b.textContent = fmt(val);
      b.dataset.val = val;
      b.addEventListener('click', () => onPick(val));
      container.appendChild(b);
    });
  }
  function mark(container, val) {
    container.querySelectorAll('button').forEach((b) => b.classList.toggle('on', Math.abs(+b.dataset.val - val) < 0.001));
  }

  function render(s) {
    if (!s || !s.ok) { $('main').hidden = true; $('empty').hidden = false; $('exportThis').disabled = true; return; }
    st = s;
    $('main').hidden = false;
    $('empty').hidden = true;
    $('exportThis').disabled = !s.bookmarks.length;
    $('title').textContent = s.info.title;
    $('title').title = s.info.title;
    $('time').textContent = F.fmtTime(s.time) + (s.duration ? ' / ' + F.fmtTime(s.duration) : '');
    $('pip').textContent = s.floating ? t('btnUnfloat') : t('btnFloat');
    $('speedOut').textContent = s.rate + '×';
    $('volOut').textContent = Math.round(s.volume * 100) + '%';
    mark($('speeds'), s.rate);
    mark($('volumes'), s.volume);

    const list = $('bms');
    list.innerHTML = '';
    s.bookmarks.forEach((b, i) => {
      const li = document.createElement('li');
      const tb = document.createElement('button');
      tb.className = 't';
      tb.textContent = F.fmtTime(b.t);
      tb.title = t('jumpTo');
      tb.onclick = () => send({ type: 'seek', t: b.t }).then(render);
      const n = document.createElement('span');
      n.className = 'n';
      n.textContent = b.note || '—';
      n.title = b.note || '';
      const x = document.createElement('button');
      x.className = 'x';
      x.textContent = '✕';
      x.title = t('delete');
      x.onclick = () => send({ type: 'unbookmark', index: i }).then(render);
      li.append(tb, n, x);
      list.appendChild(li);
    });
    $('bmCount').textContent = s.bookmarks.length || '';
    $('bmEmpty').hidden = !!s.bookmarks.length;
  }

  function download(name, text) {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  function slug(s) {
    return (s || 'video').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 50) || 'video';
  }

  function flash(btn, text) {
    const old = btn.textContent;
    btn.textContent = text;
    setTimeout(() => { btn.textContent = old; }, 1300);
  }

  chips($('speeds'), SPEEDS, (v) => v + '×', (v) => send({ type: 'speed', value: v }).then(render));
  chips($('volumes'), F.VOLUME_PRESETS, (v) => Math.round(v * 100) + '%', (v) => send({ type: 'volume', value: v }).then(render));

  $('pip').addEventListener('click', async () => {
    const r = await send({ type: 'pip' });
    if (r && r.ok) { window.close(); return; }
    $('pipHint').hidden = false;
  });

  $('copy').addEventListener('click', async () => {
    const s = await send({ type: 'status' });
    if (!s) return;
    await navigator.clipboard.writeText(s.link);
    flash($('copy'), t('linkCopied'));
  });

  $('markBtn').addEventListener('click', async () => {
    const note = $('note').value;
    const s = await send({ type: 'bookmark', note });
    if (!s) return;
    $('note').value = '';
    render(s);
    flash($('markBtn'), t('bookmarkSaved', [F.fmtTime(s.time)]));
  });

  $('exportThis').addEventListener('click', async () => {
    if (!st) return;
    const rec = await F.getBookmarks(st.key);
    if (!rec) return;
    download('aloft-' + slug(rec.title) + '.md', F.toMarkdown([rec], rec.title));
  });

  $('exportAll').addEventListener('click', async () => {
    const all = await F.allBookmarks();
    if (!all.length) { flash($('exportAll'), t('bookmarksEmpty')); return; }
    download('aloft-bookmarks-' + new Date().toISOString().slice(0, 10) + '.md', F.toMarkdown(all, t('mdHeading')));
  });

  $('opacity').addEventListener('input', (e) => {
    $('opOut').textContent = e.target.value + '%';
    F.saveSettings({ opacity: +e.target.value });
  });
  $('autoResume').addEventListener('change', (e) => F.saveSettings({ autoResume: e.target.checked }));
  $('hoverButton').addEventListener('change', (e) => F.saveSettings({ hoverButton: e.target.checked }));
  $('pageMode').addEventListener('change', (e) => F.saveSettings({ floatMode: e.target.checked ? 'page' : 'window' }));

  async function init() {
    settings = await F.getSettings();
    $('opacity').value = settings.opacity;
    $('opOut').textContent = settings.opacity + '%';
    $('autoResume').checked = settings.autoResume;
    $('hoverButton').checked = settings.hoverButton;
    $('pageMode').checked = settings.floatMode === 'page';
    const box = $('btnToggles');
    BUTTONS.forEach((k) => {
      const l = document.createElement('label');
      const c = document.createElement('input');
      c.type = 'checkbox';
      c.checked = settings.buttons[k] !== false;
      c.addEventListener('change', () => {
        settings.buttons[k] = c.checked;
        F.saveSettings({ buttons: settings.buttons });
      });
      const s = document.createElement('span');
      s.textContent = t('btnGroup_' + k);
      l.append(c, s);
      box.appendChild(l);
    });

    const [tab] = await api.tabs.query({ active: true, currentWindow: true });
    tabId = tab ? tab.id : null;
    render(await send({ type: 'status' }));
  }
  init();
})();
