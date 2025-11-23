import { createButton } from '../components/button.js';
import { saveStore } from '../state/saveStore.js';
import { gameStore } from '../state/gameStore.js';
import { clearContainer } from '../utils/clearScreen.js';
import { renderGameScreen } from '../screens/gameScreen.js';
import { showNotification } from '../components/notification.js';

export function createGameControls(mode) {
  const controls = document.createElement('div');
  controls.className = 'flex flex-wrap gap-3 mt-6 justify-center';

  const hasSave = saveStore.has(mode);

  const buttons = [
    {
      text: 'Reset',
      variant: 'danger',
      id: 'reset-game-btn',
      onClick: () => {
        gameStore.reset();
        clearContainer(document.body);
        renderGameScreen(mode);
      },
    },

    {
      text: 'Save Game',
      variant: 'primary',
      id: 'save-game-btn',
      onClick: () => {
        const state = gameStore.getState();
        saveStore.save(mode, state);
        showNotification('Game saved 🎉', 'success');
      },
    },

    {
      text: 'Continue Game',
      variant: 'default',
      disabled: !hasSave,
      id: 'continue-game-btn',
      onClick: () => {
        const hasSave = saveStore.has(mode);
        if (!hasSave) return;
        const saved = saveStore.load(mode);
        if (!saved) return;
        clearContainer(document.body);
        renderGameScreen(mode, saved);
      },
    },

    {
      text: '← Back to Menu',
      variant: 'outline',
      id: 'back-game-btn',
      onClick: () => {
        gameStore.reset();
        gameStore.stopTimer();
        window.location.hash = '#/';
      },
    },
  ];

  buttons.forEach((btnData) => {
    const btn = createButton(btnData);
    controls.append(btn);
  });

  const continueBtn = controls.querySelector('#continue-game-btn');

  saveStore.subscribe(() => {
    const hasNow = saveStore.has(mode);

    continueBtn.disabled = !hasNow;

    if (hasNow) {
      continueBtn.classList.remove('opacity-50', 'pointer-events-none');
    } else {
      continueBtn.classList.add('opacity-50', 'pointer-events-none');
    }
  });

  return controls;
}
