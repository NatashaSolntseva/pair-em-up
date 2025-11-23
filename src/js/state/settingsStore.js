const SETTINGS_KEY = 'pair-em-up-settings';

const defaultSettings = {
  theme: 'dark',

  sound: {
    all: true,

    start: true,
    win: true,
    lose: true,

    select: true,
    success: true,
    error: true,

    shuffle: true,
    revert: true,
    hint: true,
    add: true,
    erase: true,
  },
};

export const userSettings = {
  load() {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : { ...defaultSettings };
    } catch {
      return { ...defaultSettings };
    }
  },

  save(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  update(partial) {
    const current = this.load();
    const updated = {
      ...current,
      ...partial,
      sound: { ...current.sound, ...(partial.sound || {}) },
    };

    if (partial.sound && 'all' in partial.sound === false) {
      const vals = Object.entries(updated.sound)
        .filter(([k]) => k !== 'all')
        .map(([, v]) => v);

      updated.sound.all = vals.every(Boolean);
    }

    this.save(updated);
    return updated;
  },

  reset() {
    this.save(defaultSettings);
  },
};
