import { COLUMNS, MAX_ROWS } from '../constants/constants';

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function calculateRows(grid) {
  return Math.ceil(grid.length / COLUMNS);
}

export function willExceedRowLimit(grid) {
  const nonEmptyCount = grid.filter((cell) => !cell.empty).length;

  const currentRows = Math.ceil(grid.length / COLUMNS);
  const predictedRows = Math.ceil((grid.length + nonEmptyCount) / COLUMNS);

  const willExceed = predictedRows > MAX_ROWS;

  return {
    willExceed,
    currentRows,
    predictedRows,
  };
}
