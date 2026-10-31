// Video Drift background: relays keyboard commands to the active tab.
const api = typeof browser !== 'undefined' && browser.commands ? browser : chrome;

api.commands.onCommand.addListener(async (command) => {
  const [tab] = await api.tabs.query({ active: true, currentWindow: true });
  if (!tab || tab.id == null) return;
  try {
    await api.tabs.sendMessage(tab.id, { type: 'command', command });
  } catch (e) {
    // No content script on this page (browser pages, store pages).
  }
});

api.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason !== 'install') return;
  const r = await api.storage.sync.get('settings');
  if (!r.settings) await api.storage.sync.set({ settings: {} });
});
