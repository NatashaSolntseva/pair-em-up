import { gameStore } from '../state/gameStore.js';
import { renderGridFromState } from './createGrid.js';
import { playIfEnabled } from './soundManager.js';
import { updateMoves } from './updateMoves.js';

export function recordMove(removedCells, scoreBefore) {
  const entry = { removed: removedCells, scoreBefore };
  gameStore.pushUndo(entry);
}

export function revertLastMove(gridElement) {
  const last = gameStore.popUndo();
  if (!last) return false;

  const state = gameStore.getState();
  const grid = state.grid.map((cell) => ({ ...cell }));

  last.removed.forEach(({ index, value }) => {
    grid[index] = { value, empty: false };
  });

  gameStore.setState({
    grid,
    score: last.scoreBefore,
  });

  updateMoves('undo');
  renderGridFromState(gridElement, grid);
  playIfEnabled('revert');

  return true;
}
