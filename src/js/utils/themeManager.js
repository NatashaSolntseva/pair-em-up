import { userSettings } from '../state/settingsStore.js';

export function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  userSettings.update({ theme });
}

export function loadTheme() {
  const settings = userSettings.load();
  const theme = settings.theme || 'dark';
  applyTheme(theme);
  return theme;
}
