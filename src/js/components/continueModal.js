import { GAME_MODES } from '../constants/constants';
import { saveStore } from '../state/saveStore';
import { formatTime } from '../utils/helpers';
import { createButton } from '../components/button';

export function openContinueModal(onSelect) {
  const overlay = document.createElement('div');
  overlay.className = `
    fixed inset-0 
    bg-black/60 dark:bg-black/70 
    backdrop-blur-sm 
    z-50 flex items-center justify-center p-4
  `;

  const box = document.createElement('div');
  box.className = `
    w-full max-w-md p-6 rounded-xl shadow-xl border-2
    bg-[#f5f5eb] text-gray-800 border-[#8a944d]        
    dark:bg-gray-900 dark:text-gray-200 dark:border-yellow-500
    transition-colors
  `;

  const title = document.createElement('h2');
  title.className = `
    text-2xl font-bold mb-4 text-center 
    text-[#8a944d] dark:text-yellow-400
  `;
  title.textContent = 'Continue Saved Game';

  const list = document.createElement('div');
  list.className = 'flex flex-col gap-3 mb-4';

  const saves = GAME_MODES.map((mode) => ({ mode, data: saveStore.load(mode) })).filter(
    (x) => x.data
  );

  if (saves.length === 0) {
    overlay.remove();
    return;
  }

  saves.forEach(({ mode, data }) => {
    const item = document.createElement('div');
    item.className = `
      flex justify-between items-center p-3 rounded border
      bg-[#e8e8d3] border-[#babf8b]                
      dark:bg-gray-800 dark:border-gray-700
      transition-colors
    `;

    const info = document.createElement('div');

    const modeEl = document.createElement('div');
    modeEl.className = `
      font-semibold capitalize 
      text-[#6b7338] dark:text-yellow-300
    `;
    modeEl.textContent = mode;

    const detailsEl = document.createElement('div');
    detailsEl.className = 'text-sm opacity-80';
    detailsEl.textContent = `Moves: ${data.moves}, Time: ${formatTime(data.timer)}`;

    info.append(modeEl, detailsEl);

    const continueBtn = createButton({
      text: 'Continue',
      variant: 'primary',
      onClick: () => {
        overlay.remove();
        onSelect(mode);
        window.location.hash = `#/game/${mode}?load=true`;
      },
    });

    item.append(info, continueBtn);
    list.append(item);
  });

  const cancelBtn = createButton({
    text: 'Cancel',
    variant: 'outline',
    onClick: () => overlay.remove(),
  });

  cancelBtn.classList.add('mt-2', 'w-full');

  box.append(title, list, cancelBtn);
  overlay.append(box);
  document.body.append(overlay);
}
