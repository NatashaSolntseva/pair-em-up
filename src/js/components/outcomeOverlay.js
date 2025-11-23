import { createButton } from './button.js';
import { formatTime } from '../utils/helpers.js';
import { gameStore } from '../state/gameStore.js';

export function GameOverlay({ status, message, score, time, mode, onRestart, onMenu }) {
  gameStore.reset();
  gameStore.stopTimer();

  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  const overlay = document.createElement('div');
  overlay.className = `
    fixed inset-0 flex items-center justify-center 
    bg-black/70 backdrop-blur-sm z-50
    animate-fade-in
  `;

  const box = document.createElement('div');
  box.className = `
    text-center p-8 rounded-2xl shadow-2xl
    w-[90%] max-w-sm border-4 transition-colors duration-300
    ${
      status === 'win'
        ? 'border-green-400 bg-green-900/40 text-green-100 dark:bg-green-800/60'
        : 'border-red-400 bg-red-900/40 text-red-100 dark:bg-red-800/60'
    }
  `;

  const title = document.createElement('h2');
  title.className = 'text-3xl font-bold mb-2';
  title.textContent = status === 'win' ? '🎉 You Win!' : '💀 Game Over';

  const desc = document.createElement('p');
  desc.className = 'text-lg mb-4 opacity-90';
  desc.textContent = message;

  const stats = document.createElement('div');
  stats.className = `
    text-base mb-6 p-4 rounded-lg 
    bg-black/20 dark:bg-black/30
  `;

  const modeEl = document.createElement('p');
  modeEl.textContent = `Mode: ${mode}`;

  const scoreEl = document.createElement('p');
  scoreEl.textContent = `Score: ${score}`;

  const timeEl = document.createElement('p');
  timeEl.textContent = `Time: ${formatTime(time)}`;

  stats.append(modeEl, scoreEl, timeEl);

  const actions = document.createElement('div');
  actions.className = 'flex flex-col md:flex-row gap-4 justify-center';

  const cleanup = () => {
    overlay.remove();
    document.body.style.overflow = prevOverflow || '';
  };

  const restartBtn = createButton({
    text: 'Play Again',
    variant: status === 'primary',
    onClick: () => {
      cleanup();
      if (onRestart) onRestart();
    },
  });

  const menuBtn = createButton({
    text: '← Back to Menu',
    variant: 'outline',
    onClick: () => {
      cleanup();
      if (onMenu) onMenu();
    },
  });

  actions.append(restartBtn, menuBtn);

  box.append(title, desc, stats, actions);
  overlay.append(box);

  return overlay;
}
