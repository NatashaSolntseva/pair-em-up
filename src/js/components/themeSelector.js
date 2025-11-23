import { applyTheme, loadTheme } from '../utils/themeManager.js';
import { userSettings } from '../state/settingsStore.js';
import { Subtitle } from './subtitle.js';
import { SectionBlock } from './sectionBlock.js';

export function ThemeSelector() {
  const title = Subtitle({ text: 'Theme Selection', emoji: '🎨' });

  const themes = [
    { name: 'Dark Mode 🌙', value: 'dark' },
    { name: 'Light Mode ☀️', value: 'light' },
  ];

  const currentTheme = loadTheme();
  const wrapper = document.createElement('div');
  wrapper.className = 'flex flex-col gap-2 text-gray-800 dark:text-gray-200';

  themes.forEach((theme) => {
    const label = document.createElement('label');
    label.className =
      'flex items-center gap-2 cursor-pointer transition hover:text-[#6b7338] dark:hover:text-yellow-300';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'theme';
    input.value = theme.value;
    input.checked = theme.value === currentTheme;
    input.className = 'accent-[#8a944d] dark:accent-yellow-400 cursor-pointer';

    input.addEventListener('change', () => {
      applyTheme(theme.value);
      userSettings.update({ theme: theme.value });
    });

    const span = document.createElement('span');
    span.textContent = theme.name;

    label.append(input, span);
    wrapper.append(label);
  });

  const section = SectionBlock({
    children: [title, wrapper],
  });
  return section;
}
