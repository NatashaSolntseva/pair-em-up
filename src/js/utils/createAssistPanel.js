import { createButton } from '../components/button.js';
import { shuffleArray } from '../utils/generateNumbers.js';
import { MAX_ADD_NUMBERS, MAX_SHUFFLES, MAX_ERASER, MAX_HINTS } from '../constants/constants.js';
import { gameStore } from '../state/gameStore.js';
import { highlightHint } from './hints.js';
import { updateMoves } from './updateMoves.js';
import { revertLastMove } from './revertMove.js';
import {
  updateAddNumbersButton,
  updateEraserButton,
  updateHintsButton,
  updateRevertButton,
  updateShuffleButton,
} from './updateAssistant.js';
import { playIfEnabled } from './soundManager.js';
import { handleGameProgress } from './handleGameProgress.js';
import { willExceedRowLimit } from './helpers.js';
import { openAddNumbersWarningModal } from '../components/numbersWarningModal.js';

export function createAssistPanel(grid, onGridUpdate) {
  const assists = document.createElement('div');
  assists.className =
    'flex flex-wrap gap-2 mt-4 justify-center text-sm text-gray-200 transition-colors duration-300';

  const assistButtons = {};

  const assistActions = {
    Hints: () => {
      const state = gameStore.getState();
      const usedHints = state.assists.hints || 0;
      const remaining = MAX_HINTS - usedHints;

      if (remaining <= 0) {
        return;
      }

      highlightHint();
      playIfEnabled('hint');
    },

    Revert: () => {
      const state = gameStore.getState();
      if (!state.canUndo) return;
      revertLastMove(grid);
    },

    AddNumbers: () => {
      const state = gameStore.getState();
      const usedAdds = state.assists.addNumbers || 0;
      const remainingAdds = MAX_ADD_NUMBERS - usedAdds;

      if (remainingAdds <= 0) {
        return;
      }

      const check = willExceedRowLimit(state.grid);

      const applyAddNumbers = () => {
        const stateLatest = gameStore.getState();
        const { mode: currentMode, grid } = stateLatest;

        const nonEmpty = grid.filter((c) => !c.empty);
        const count = nonEmpty.length;

        let newCells = [];

        if (currentMode === 'classic') {
          playIfEnabled('add');
          newCells = nonEmpty.map((c) => ({
            value: c.value,
            empty: false,
          }));
        } else if (currentMode === 'random') {
          playIfEnabled('add');
          const values = nonEmpty.map((c) => c.value);
          const shuffled = shuffleArray(values);
          newCells = shuffled.map((v) => ({
            value: v,
            empty: false,
          }));
        } else if (currentMode === 'chaotic') {
          playIfEnabled('add');
          newCells = Array.from({ length: count }, () => ({
            value: Math.floor(Math.random() * 9) + 1,
            empty: false,
          }));
        }

        const updatedGrid = [...grid, ...newCells];
        const newCount = (stateLatest.assists.addNumbers || 0) + 1;

        gameStore.setState({
          grid: updatedGrid,
          assists: {
            ...stateLatest.assists,
            addNumbers: newCount,
          },
          lastAction: 'addNumbers',
        });

        updateMoves('addNumbers');

        if (onGridUpdate) onGridUpdate(updatedGrid);

        handleGameProgress();
      };

      if (check.willExceed) {
        openAddNumbersWarningModal({
          currentRows: check.currentRows,
          nextRows: check.predictedRows,
          onConfirm: applyAddNumbers,
        });
        return;
      }

      applyAddNumbers();
    },

    Shuffle: () => {
      const state = gameStore.getState();
      const usedShuffles = state.assists.shuffle || 0;
      const remaining = MAX_SHUFFLES - usedShuffles;

      if (remaining <= 0) {
        return;
      }

      const currentGrid = [...state.grid];
      const nonEmptyValues = currentGrid.filter((c) => !c.empty).map((c) => c.value);
      const shuffledValues = shuffleArray(nonEmptyValues);

      let idx = 0;
      const shuffledGrid = currentGrid.map((cell) =>
        cell.empty ? cell : { ...cell, value: shuffledValues[idx++] }
      );

      const newShuffles = usedShuffles + 1;

      gameStore.setState({
        grid: shuffledGrid,
        assists: {
          ...state.assists,
          shuffle: newShuffles,
        },
        lastAction: 'shuffle',
      });

      updateMoves('shuffle');
      playIfEnabled('shuffle');
      handleGameProgress();

      if (onGridUpdate) onGridUpdate(shuffledGrid);
    },

    Eraser: () => {
      const state = gameStore.getState();
      const used = state.assists.eraser || 0;
      const remaining = MAX_ERASER - used;

      if (remaining <= 0) {
        return;
      }

      const selectedCell = grid.querySelector('.selected');
      if (!selectedCell) {
        return;
      }

      const index = Number(selectedCell.dataset.index);

      const gridCopy = state.grid.map((c) => ({ ...c }));

      if (gridCopy[index].empty) {
        return;
      }

      gridCopy[index] = { value: null, empty: true };

      gameStore.setState({
        grid: gridCopy,
        assists: {
          ...state.assists,
          eraser: used + 1,
        },
        lastAction: 'eraser',
      });

      updateMoves('eraser');
      playIfEnabled('erase');
      handleGameProgress();

      if (onGridUpdate) onGridUpdate(gridCopy);
    },
  };

  const assistNames = Object.keys(assistActions);

  assistNames.forEach((name) => {
    let btnText;
    const stateStore = gameStore.getState();

    if (name === 'Hints') {
      btnText = `Hints (${MAX_HINTS})`;
    } else if (name === 'Shuffle') {
      btnText = `Shuffle (${MAX_SHUFFLES})`;
    } else if (name === 'AddNumbers') {
      btnText = `Add Numbers (${MAX_ADD_NUMBERS})`;
    } else if (name === 'Eraser') {
      const used = stateStore.assists.eraser || 0;
      const remaining = MAX_ERASER - used;
      btnText = `Eraser (${remaining})`;
    } else {
      btnText = name.replace(/([A-Z])/g, ' $1').trim();
    }

    const btn = createButton({
      text: btnText,
      variant: 'secondary',
      onClick: assistActions[name],
    });

    btn.id = name.toLowerCase().replace(/\s+/g, '-');
    assists.append(btn);
    assistButtons[name] = btn;
  });

  gameStore.subscribe((state) => {
    if (assistButtons['Hints']) updateHintsButton(assistButtons['Hints'], state);
    if (assistButtons['Revert']) updateRevertButton(assistButtons['Revert'], state);
    if (assistButtons['Shuffle']) updateShuffleButton(assistButtons['Shuffle'], state);
    if (assistButtons['AddNumbers']) updateAddNumbersButton(assistButtons['AddNumbers'], state);
    if (assistButtons['Eraser']) updateEraserButton(assistButtons['Eraser'], state);
  });

  return assists;
}
