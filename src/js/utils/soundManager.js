import { SOUND_FILES } from '../constants/constants';
import { userSettings } from '../state/settingsStore.js';

const basePath = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}/sounds/`;
export const sounds = {};

for (const [key, file] of Object.entries(SOUND_FILES)) {
  const audio = new Audio(`${basePath}${file}`);
  audio.volume = 0.4;
  sounds[key] = audio;
}

let soundSettings = userSettings.load().sound;

export function playSound(type) {
  const sound = sounds[type];
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

export function playIfEnabled(type) {
  if (!soundSettings[type]) return;
  playSound(type);
}

export function stopAll() {
  Object.values(sounds).forEach((a) => {
    a.pause();
    a.currentTime = 0;
  });
}

export function loadAudioSettings() {
  soundSettings = userSettings.load().sound;
}

export function updateAudioSettings(newSettings) {
  soundSettings = newSettings.sound;
  userSettings.save({ ...userSettings.load(), sound: soundSettings });
}
