import { AudioControls } from '../components/audioControls';
import { createButton } from '../components/button';
import { ThemeSelector } from '../components/themeSelector';
import { Title } from '../components/title';

export function renderSettingsScreen() {
  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-start min-h-screen text-white p-6 gap-6';

  const title = Title({ text: 'Settings Panel', level: 'medium', emoji: '⚙️' });
  const subtitle = document.createElement('p');
  subtitle.className = 'text-gray-600 dark:text-gray-300 text-center max-w-md';
  subtitle.textContent =
    'Customize your gameplay experience — toggle sounds, change theme, and adjust visual preferences.';

  const themeSection = ThemeSelector();
  const audio = AudioControls();
  const backBtn = createButton({ text: '← Back to Menu', href: '#/' });

  container.append(title, subtitle, themeSection, audio, backBtn);
  const app = document.getElementById('app');
  app.replaceChildren(container);
}
