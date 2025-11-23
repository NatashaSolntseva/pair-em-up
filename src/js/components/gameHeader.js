import { TARGET_SCORE } from '../constants/constants.js';
import { gameStore } from '../state/gameStore.js';
import { capitalize, formatTime } from '../utils/helpers.js';

export function GameHeader() {
  const state = gameStore.getState();

  const header = document.createElement('div');
  header.className =
    'flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-4xl mb-4 gap-2 transition-colors duration-300';

  const modeInfo = document.createElement('p');
  modeInfo.textContent = `Mode: ${capitalize(state.mode)}`;
  modeInfo.className = 'text-lg font-semibold text-[#6b7338] dark:text-yellow-400';

  const scoreBox = document.createElement('div');
  scoreBox.className =
    'text-sm text-[#4c4c3b] dark:text-gray-200 bg-[#e6e6cf]/40 dark:bg-transparent px-2 py-1 rounded flex items-center gap-1';

  const scoreLabel = document.createElement('span');
  scoreLabel.textContent = 'Score: ';

  const scoreValue = document.createElement('span');
  scoreValue.id = 'score';
  scoreValue.textContent = state.score;

  const targetEl = document.createElement('span');
  targetEl.textContent = ` / ${TARGET_SCORE}`;

  scoreBox.append(scoreLabel, scoreValue, targetEl);

  const timer = document.createElement('span');
  timer.id = 'timer';
  timer.textContent = formatTime(state.timer);
  timer.className =
    'font-mono text-sm text-[#5a5a40] dark:text-gray-300 bg-[#f2f2df]/30 dark:bg-transparent px-2 py-1 rounded';

  const movesEl = document.createElement('span');
  movesEl.id = 'moves';
  movesEl.textContent = `Moves: ${state.moves || 0}`;
  movesEl.className =
    'font-mono text-sm text-[#5a5a40] dark:text-gray-300 bg-[#f2f2df]/30 dark:bg-transparent px-2 py-1 rounded';

  header.append(modeInfo, scoreBox, timer, movesEl);

  gameStore.subscribe((newState) => {
    scoreValue.textContent = newState.score;
    timer.textContent = formatTime(newState.timer);
    movesEl.textContent = `Moves: ${newState.moves}`;
    modeInfo.textContent = `Mode: ${capitalize(newState.mode)}`;
  });

  return header;
}
