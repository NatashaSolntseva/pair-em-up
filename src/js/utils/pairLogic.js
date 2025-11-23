import { playIfEnabled } from './soundManager.js';
import { calculateScore } from './calculateScore.js';
import { gameStore } from '../state/gameStore.js';
import { COLUMNS } from '../constants/constants.js';
import { updateMoves } from './updateMoves.js';
import { recordMove } from './revertMove.js';
import { renderGridFromState } from './createGrid.js';
import { handleGameProgress } from './handleGameProgress.js';

export function initPairLogic(gridElement) {
  let selected = [];

  gridElement.addEventListener('click', (e) => {
    const cell = e.target.closest('.cell');
    if (!cell) return;

    const state = gameStore.getState();

    const index = Number(cell.dataset.index);
    const cellData = state.grid[index];
    if (!cellData || cellData.empty) return;
    playIfEnabled('select');

    if (selected.includes(index)) {
      selected = selected.filter((i) => i !== index);
      cell.classList.remove('selected');

      gameStore.setState({ selectedCell: null });
      return;
    }

    selected.push(index);
    cell.classList.add('selected');

    gameStore.setState({ selectedCell: index });

    if (selected.length !== 2) return;

    const [iA, iB] = selected;
    const a = state.grid[iA].value;
    const b = state.grid[iB].value;

    if (a == null || b == null) {
      clearSelection(gridElement, selected);
      selected = [];
      gameStore.setState({ selectedCell: null });
      return;
    }

    if (isValidPair(a, b) && areCellsConnectable(iA, iB, state.grid)) {
      playIfEnabled('success');

      recordMove(
        selected.map((i) => ({ index: i, value: state.grid[i].value })),
        state.score
      );

      const gained = calculateScore(a, b);
      state.score += gained;

      updateMoves('pair');
      gameStore.markAction('pair');

      selected.forEach((i) => {
        state.grid[i] = { value: null, empty: true };
      });

      gameStore.setState({
        grid: state.grid,
        score: state.score,
        selectedCell: null,
      });

      renderGridFromState(gridElement, state.grid);
      handleGameProgress();
    } else {
      playIfEnabled('error');
      flashInvalid(gridElement, selected);
    }

    clearSelection(gridElement, selected);

    selected = [];
    gameStore.setState({ selectedCell: null });
  });
}

function clearSelection(gridEl, indexes) {
  indexes.forEach((i) => gridEl.children[i]?.classList.remove('selected'));
}

function flashInvalid(gridEl, indexes) {
  indexes.forEach((i) => {
    const cell = gridEl.children[i];
    if (!cell) return;

    cell.classList.add('flash-error-light');
    cell.classList.add('flash-error-dark');

    setTimeout(() => {
      cell.classList.remove('flash-error-light', 'flash-error-dark', 'selected');
    }, 300);
  });
}

export function isValidPair(a, b) {
  return a === b || a + b === 10;
}

export function areCellsConnectable(indexA, indexB, grid) {
  const cols = COLUMNS;

  const rowA = Math.floor(indexA / cols);
  const rowB = Math.floor(indexB / cols);
  const colA = indexA % cols;
  const colB = indexB % cols;

  if (rowA === rowB && Math.abs(colA - colB) === 1) return true;
  if (colA === colB && Math.abs(rowA - rowB) === 1) return true;

  if (rowA === rowB) {
    const [start, end] = indexA < indexB ? [indexA, indexB] : [indexB, indexA];
    return grid.slice(start + 1, end).every((c) => c.empty);
  }

  if (colA === colB) {
    const [start, end] = rowA < rowB ? [indexA, indexB] : [indexB, indexA];
    for (let i = start + cols; i < end; i += cols) {
      if (!grid[i].empty) return false;
    }
    return true;
  }

  const [start, end] = indexA < indexB ? [indexA, indexB] : [indexB, indexA];
  return grid.slice(start + 1, end).every((c) => c.empty);
}
