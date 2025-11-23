import { Subtitle } from './subtitle.js';
import { SectionBlock } from './sectionBlock.js';
import { userSettings } from '../state/settingsStore.js';
import { updateAudioSettings } from '../utils/soundManager.js';
import { createButton } from './button.js';
import { clearContainer } from '../utils/clearScreen.js';

export function AudioControls() {
  const title = Subtitle({ text: 'Audio Controls', emoji: '🔊' });

  const settingsContainer = document.createElement('div');
  settingsContainer.className = 'flex flex-col gap-2 text-gray-800 dark:text-gray-200';

  function renderSettings() {
    clearContainer(settingsContainer);

    const settings = userSettings.load();

    const toggleAllBtn = createButton({
      text: settings.sound.all ? 'Disable All' : 'Enable All',
      variant: 'primary',
      onClick: () => {
        const newVal = !settings.sound.all;

        const updated = userSettings.update({
          sound: Object.fromEntries(Object.keys(settings.sound).map((k) => [k, newVal])),
        });

        updateAudioSettings(updated);
        renderSettings();
      },
    });

    settingsContainer.append(toggleAllBtn);

    const soundOptions = [
      { key: 'start', label: 'Game Start' },
      { key: 'win', label: 'Win' },
      { key: 'lose', label: 'Lose' },
      { key: 'select', label: 'Cell Selection' },
      { key: 'success', label: 'Successful Pair' },
      { key: 'error', label: 'Invalid Pair' },
      { key: 'shuffle', label: 'Shuffle' },
      { key: 'revert', label: 'Revert' },
      { key: 'hint', label: 'Show Hint' },
      { key: 'add', label: 'Add Numbers' },
      { key: 'erase', label: 'Eraser' },
    ];

    soundOptions.forEach(({ key, label }) => {
      const item = document.createElement('label');
      item.className =
        'flex items-center justify-between bg-[#f5f5eb]/60 dark:bg-gray-700 px-3 py-2 rounded cursor-pointer hover:bg-[#e8e8d3] dark:hover:bg-gray-600 transition';

      const span = document.createElement('span');
      span.textContent = label;

      const toggle = document.createElement('input');
      toggle.type = 'checkbox';
      toggle.className = 'accent-[#8a944d] dark:accent-yellow-500 cursor-pointer';
      toggle.checked = settings.sound[key];

      toggle.addEventListener('change', () => {
        const updated = userSettings.update({
          sound: { [key]: toggle.checked },
        });
        updateAudioSettings(updated);
        renderSettings();
      });

      item.append(span, toggle);
      settingsContainer.append(item);
    });
  }

  renderSettings();

  return SectionBlock({
    children: [title, settingsContainer],
  });
}
