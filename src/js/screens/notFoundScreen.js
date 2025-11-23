import { createButton } from '../components/button';

export function renderNotFoundScreen() {
  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-center min-h-screen  text-white p-6 text-center gap-6 animate-fadeIn';

  const title = document.createElement('h1');
  title.className = 'text-5xl font-bold text-yellow-400 drop-shadow-lg tracking-wider';
  title.textContent = '404';

  const subtitle = document.createElement('p');
  subtitle.className = 'text-xl text-gray-300 max-w-md leading-relaxed font-light';
  subtitle.textContent = "Oops! You've wandered outside the grid…";

  const emoji = document.createElement('div');
  emoji.textContent = '🌀';
  emoji.className = 'text-6xl animate-spin-slow';

  const hint = document.createElement('p');
  hint.className = 'text-sm text-gray-500 italic';
  hint.textContent = 'Press the button below to return to safety';

  const backBtn = createButton({
    text: '← Back to Menu',
    variant: 'primary',
    href: '#/',
  });

  container.append(title, subtitle, emoji, hint, backBtn);
  return container;
}
