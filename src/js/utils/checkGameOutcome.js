import {
  MAX_SHUFFLES,
  MAX_ROWS,
  MAX_ADD_NUMBERS,
  MAX_ERASER,
  TARGET_SCORE,
} from '../constants/constants';
import { gameStore } from '../state/gameStore.js';
import { calculateRows } from './helpers.js';

export function checkGameOutcome(state) {
  const { grid, score, assists } = state;

  if (score >= TARGET_SCORE) {
    return { status: 'win', reason: `Reached ${TARGET_SCORE} points` };
  }

  const rows = calculateRows(grid);

  if (state.rows !== rows) {
    gameStore.setState({ rows });
  }

  if (rows > MAX_ROWS) {
    return { status: 'lose', reason: `Exceeded ${MAX_ROWS} rows limit` };
  }

  const availablePairs = state.availablePairs;
  const helpersUsedUp =
    assists.addNumbers >= MAX_ADD_NUMBERS &&
    assists.shuffle >= MAX_SHUFFLES &&
    assists.eraser >= MAX_ERASER;

  if (availablePairs === 0 && helpersUsedUp) {
    return { status: 'lose', reason: 'No moves left and all helpers used' };
  }

  const noNumbersLeft = grid.every((cell) => cell.empty === true);
  if (noNumbersLeft && score < TARGET_SCORE) {
    return {
      status: 'lose',
      reason: `No numbers left on the board before reaching the ${TARGET_SCORE} points`,
    };
  }

  return { status: 'in-progress' };
}
