const SAVE_KEY = 'pair-em-up-saves';

const listeners = new Set();

function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
  } catch {
    return {};
  }
}

function notify(allSaves) {
  listeners.forEach((callback) => callback(allSaves));
}

function saveAll(data) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  notify(data);
}

export const saveStore = {
  save(mode, gameState) {
    const all = loadAll();
    all[mode] = {
      ...gameState,
      savedAt: new Date().toISOString(),
    };

    saveAll(all);
  },

  load(mode) {
    const all = loadAll();
    return all[mode] || null;
  },

  clear(mode) {
    const all = loadAll();
    delete all[mode];
    saveAll(all);
  },

  clearAll() {
    localStorage.removeItem(SAVE_KEY);
  },

  has(mode) {
    const all = loadAll();
    return Boolean(all[mode]);
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
