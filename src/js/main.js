import { initRouter } from './router';
import { loadAudioSettings } from './utils/soundManager';
import { loadTheme } from './utils/themeManager';

window.addEventListener('load', () => {
  loadTheme();
  loadAudioSettings();
  initRouter();
});
