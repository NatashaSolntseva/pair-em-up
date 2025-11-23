import { createButton } from './button.js';

export function openAddNumbersWarningModal({ currentRows, nextRows, onConfirm }) {
  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  const overlay = document.createElement('div');
  overlay.className = `
    fixed inset-0 bg-black/70 backdrop-blur-sm z-50
    flex items-center justify-center p-4
    animate-fade-in
  `;

  const box = document.createElement('div');
  box.className = `
    w-full max-w-md p-6 rounded-xl shadow-xl text-center
    bg-[#f5f5eb] text-gray-800 border-2 border-[#8a944d]
    dark:bg-gray-900 dark:text-gray-100 dark:border-yellow-500
    transition
  `;

  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold mb-3 text-yellow-700 dark:text-yellow-300';
  title.textContent = '⚠️ This move will end the game';

  const desc = document.createElement('p');
  desc.className = 'opacity-90 mb-4 leading-relaxed';
  desc.textContent = `This move will turn your board into a skyscraper (${nextRows} rows).
Game rules say skyscrapers = instant death 😵‍💫
Still want to do it?`;

  const info = document.createElement('p');
  info.className = 'text-sm opacity-70 mb-6';
  info.textContent = `Current rows: ${currentRows} → After: ${nextRows}`;

  const actions = document.createElement('div');
  actions.className = 'flex gap-4 justify-center';

  const cleanup = () => {
    overlay.remove();
    document.body.style.overflow = prevOverflow || '';
  };

  const yesBtn = createButton({
    text: 'Proceed Anyway',
    variant: 'danger',
    onClick: () => {
      cleanup();
      onConfirm?.();
    },
  });

  const cancelBtn = createButton({
    text: 'Cancel',
    variant: 'outline',
    onClick: () => cleanup(),
  });

  actions.append(yesBtn, cancelBtn);
  box.append(title, desc, info, actions);
  overlay.append(box);

  document.body.append(overlay);
}
