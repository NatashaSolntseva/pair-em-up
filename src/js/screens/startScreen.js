import { createButton } from '../components/button';
import { Title } from '../components/title';
import { GAME_MODES } from '../constants/constants';
import { capitalize } from '../utils/helpers';
import { saveStore } from '../state/saveStore';
import { openContinueModal } from '../components/continueModal';

export function renderStartScreen() {
  const root = document.createElement('div');
  root.className =
    'flex flex-col items-center justify-center min-h-screen text-white gap-6 transition-opacity duration-700 opacity-0';
  document.body.append(root);

  requestAnimationFrame(() => {
    root.classList.remove('opacity-0');
    root.classList.add('opacity-100');
  });

  const title = Title({ text: "Pair 'em Up" });
  root.append(title);

  const author = document.createElement('a');
  author.href = 'https://github.com/NatashaSolntseva';
  author.target = '_blank';
  author.textContent = 'by @NatashaSolntseva';
  author.className = 'text-blue-400 hover:underline';
  root.append(author);

  const modeWrapper = document.createElement('div');
  modeWrapper.className = 'flex gap-3 mt-4';

  GAME_MODES.forEach((mode) => {
    const btn = createButton({
      text: capitalize(mode),
      onClick: () => (window.location.hash = `#/game/${mode.toLowerCase()}`),
    });
    modeWrapper.append(btn);
  });
  root.append(modeWrapper);

  const hasAnySave =
    saveStore.has('classic') || saveStore.has('random') || saveStore.has('chaotic');

  const continueBtn = createButton({
    text: 'Continue game',
    disabled: !hasAnySave,
    onClick: () => {
      openContinueModal((selectedMode) => {
        window.location.hash = `#/game/${selectedMode}?load=true`;
      });
    },
  });

  root.append(continueBtn);

  const footer = document.createElement('div');
  footer.className = 'flex gap-4 mt-6';

  const settingsBtn = createButton({
    text: 'Settings',
    variant: 'outline',
    href: '#/settings',
  });

  const resultsBtn = createButton({
    text: 'Results',
    variant: 'outline',
    href: '#/results',
  });

  const rulesBtn = createButton({
    text: 'Rules',
    variant: 'outline',
    href: '#/rules',
  });

  footer.append(rulesBtn, settingsBtn, resultsBtn);
  root.append(footer);
}
