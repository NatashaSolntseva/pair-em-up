import { isValidPair, areCellsConnectable } from './pairLogic.js';
import { gameStore } from '../state/gameStore.js';

export function findAvailablePairs(grid) {
  const pairs = [];

  for (let i = 0; i < grid.length; i++) {
    const a = grid[i];
    if (a.empty) continue;

    for (let j = i + 1; j < grid.length; j++) {
      const b = grid[j];
      if (b.empty) continue;

      if (isValidPair(a.value, b.value) && areCellsConnectable(i, j, grid)) {
        pairs.push({ i, j });
      }
    }
  }

  return {
    count: pairs.length,
    pairs,
  };
}

export function updateAvailablePairs(grid) {
  const { count, pairs } = findAvailablePairs(grid);

  gameStore.setState({
    availablePairs: count,
    availablePairList: pairs,
  });
}

export function highlightHint() {
  const state = gameStore.getState();
  if (!state.availablePairList.length) return;

  const { i, j } = state.availablePairList[0];

  const grid = document.querySelector('.grid');
  grid.children[i].classList.add('hint');
  grid.children[j].classList.add('hint');

  const used = state.assists.hints || 0;

  gameStore.setState({
    assists: {
      ...state.assists,
      hints: used + 1,
    },
  });
}
