// Aloft shared helpers: storage, keys, time formatting, Markdown export.
// Loaded as a classic script in content scripts and in the popup.
(function (root) {
  'use strict';

  const api = typeof browser !== 'undefined' && browser.storage ? browser : chrome;

  const DEFAULTS = {
    opacity: 100,
    autoResume: true,
    hoverButton: true,
    floatMode: 'window', // 'window' (separate always-on-top window) or 'page' (mini player over the page)
    buttons: {
      play: true,
      seek: true,
      speed: true,
      volume: true,
      bookmark: true,
      link: true,
      opacity: true
    }
  };

  const SPEED_MIN = 0.25;
  const SPEED_MAX = 4;
  const VOLUME_PRESETS = [0, 0.25, 0.5, 0.75, 1];

  function hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  // Stable identifier of a video page, ignoring timecode and tracking params.
  function videoKey(href) {
    let u;
    try { u = new URL(href); } catch (e) { return href; }
    u.hash = '';
    if (/(^|\.)youtube\.com$/.test(u.hostname) && u.searchParams.get('v')) {
      return 'youtube:' + u.searchParams.get('v');
    }
    if (u.hostname === 'youtu.be') return 'youtube:' + u.pathname.slice(1);
    ['t', 'time_continue', 'start', 'si', 'feature', 'pp', 'utm_source', 'utm_medium', 'utm_campaign']
      .forEach((p) => u.searchParams.delete(p));
    return u.origin + u.pathname + u.search;
  }

  // Link that opens the same video at the given second.
  function timeLink(href, seconds) {
    const t = Math.floor(seconds);
    let u;
    try { u = new URL(href); } catch (e) { return href; }
    const host = u.hostname;
    if (/(^|\.)youtube\.com$/.test(host) || host === 'youtu.be') {
      u.searchParams.delete('time_continue');
      u.searchParams.set('t', t + 's');
      u.hash = '';
    } else if (/(^|\.)vimeo\.com$/.test(host)) {
      u.hash = 't=' + t + 's';
    } else if (/(^|\.)twitch\.tv$/.test(host)) {
      u.searchParams.set('t', fmtTwitch(t));
    } else {
      u.hash = 't=' + t;
    }
    return u.toString();
  }

  function fmtTwitch(t) {
    const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    return (h ? h + 'h' : '') + (h || m ? m + 'm' : '') + s + 's';
  }

  function fmtTime(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return h ? h + ':' + pad(m) + ':' + pad(s) : pad(m) + ':' + pad(s);
  }

  function get(area, keys) {
    return new Promise((resolve) => api.storage[area].get(keys, (r) => resolve(r || {})));
  }
  function set(area, obj) {
    return new Promise((resolve, reject) => api.storage[area].set(obj, () => {
      const err = api.runtime.lastError;
      err ? reject(err) : resolve();
    }));
  }
  function remove(area, keys) {
    return new Promise((resolve) => api.storage[area].remove(keys, () => resolve()));
  }

  async function getSettings() {
    const r = await get('sync', 'settings');
    const s = r.settings || {};
    return Object.assign({}, DEFAULTS, s, { buttons: Object.assign({}, DEFAULTS.buttons, s.buttons) });
  }
  async function saveSettings(patch) {
    const cur = await getSettings();
    const next = Object.assign(cur, patch);
    await set('sync', { settings: next });
    return next;
  }

  // Playback positions live in storage.local: pos:<hash> -> { t, d, title, url, at }
  async function getPosition(key) {
    const k = 'pos:' + hash(key);
    return (await get('local', k))[k] || null;
  }
  function savePosition(key, data) {
    return set('local', { ['pos:' + hash(key)]: Object.assign({ at: Date.now() }, data) });
  }
  function clearPosition(key) {
    return remove('local', 'pos:' + hash(key));
  }

  // Bookmarks and frame notes live in storage.sync (falls back to local when quota is hit):
  // bm:<hash> -> { key, url, title, site, items: [{ t, note, at }] }
  async function getBookmarks(key) {
    const k = 'bm:' + hash(key);
    const s = (await get('sync', k))[k];
    if (s) return s;
    return (await get('local', k))[k] || null;
  }
  async function putBookmarks(key, rec) {
    const k = 'bm:' + hash(key);
    if (!rec.items.length) {
      await remove('sync', k);
      await remove('local', k);
      return;
    }
    try {
      await set('sync', { [k]: rec });
      await remove('local', k);
    } catch (e) {
      await set('local', { [k]: rec });
    }
  }
  async function addBookmark(key, info, t, note) {
    const rec = (await getBookmarks(key)) || { key, url: info.url, title: info.title, site: info.site, items: [] };
    rec.url = info.url || rec.url;
    rec.title = info.title || rec.title;
    rec.items.push({ t: Math.floor(t), note: (note || '').trim(), at: Date.now() });
    rec.items.sort((a, b) => a.t - b.t);
    await putBookmarks(key, rec);
    return rec;
  }
  async function removeBookmark(key, index) {
    const rec = await getBookmarks(key);
    if (!rec) return null;
    rec.items.splice(index, 1);
    await putBookmarks(key, rec);
    return rec;
  }
  async function allBookmarks() {
    const [s, l] = await Promise.all([get('sync', null), get('local', null)]);
    const out = {};
    for (const src of [l, s]) {
      for (const k of Object.keys(src)) if (k.startsWith('bm:')) out[k] = src[k];
    }
    return Object.values(out).sort((a, b) => (a.site + a.title).localeCompare(b.site + b.title));
  }

  function toMarkdown(records, heading) {
    const date = new Date().toISOString().slice(0, 10);
    const lines = ['# ' + heading, '', '_' + date + '_', ''];
    for (const r of records) {
      const title = (r.title || r.url).replace(/[\[\]]/g, '');
      lines.push('## [' + title + '](' + r.url + ')', '');
      if (r.site) lines.push('Source: ' + r.site, '');
      for (const it of r.items) {
        const link = '[' + fmtTime(it.t) + '](' + timeLink(r.url, it.t) + ')';
        lines.push('- ' + link + (it.note ? ' — ' + it.note.replace(/\n+/g, ' ') : ''));
      }
      lines.push('');
    }
    return lines.join('\n');
  }

  root.Aloft = {
    api, DEFAULTS, SPEED_MIN, SPEED_MAX, VOLUME_PRESETS,
    hash, videoKey, timeLink, fmtTime,
    getSettings, saveSettings,
    getPosition, savePosition, clearPosition,
    getBookmarks, addBookmark, removeBookmark, allBookmarks, toMarkdown
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
