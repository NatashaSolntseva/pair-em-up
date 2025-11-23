import { MAX_ADD_NUMBERS, MAX_ERASER, MAX_HINTS, MAX_SHUFFLES } from '../constants/constants';

function updateHintsButton(btn, state) {
  const pairs = state.availablePairs || 0;
  const used = state.assists.hints || 0;
  const remaining = MAX_HINTS - used;

  btn.textContent = `Hints (${remaining})`;

  const disabled = remaining <= 0 || pairs === 0;
  btn.disabled = disabled;
  btn.classList.toggle('opacity-50', disabled);
  btn.classList.toggle('!cursor-not-allowed', disabled);
}

function updateRevertButton(btn, state) {
  const canUndo = state.canUndo;

  btn.disabled = !canUndo;
  btn.textContent = 'Revert';
  btn.classList.toggle('opacity-50', !canUndo);
  btn.classList.toggle('!cursor-not-allowed', !canUndo);
}

function updateShuffleButton(btn, state) {
  const used = state.assists.shuffle || 0;
  const remaining = MAX_SHUFFLES - used;

  btn.textContent = `Shuffle (${remaining})`;

  const disabled = remaining <= 0;
  btn.disabled = disabled;
  btn.classList.toggle('opacity-50', disabled);
  btn.classList.toggle('!cursor-not-allowed', disabled);
}

function updateAddNumbersButton(btn, state) {
  const used = state.assists.addNumbers || 0;
  const remaining = MAX_ADD_NUMBERS - used;

  btn.textContent = `Add Numbers (${remaining})`;

  const disabled = remaining <= 0;
  btn.disabled = disabled;
  btn.classList.toggle('opacity-50', disabled);
  btn.classList.toggle('!cursor-not-allowed', disabled);
}

function updateEraserButton(btn, state) {
  const used = state.assists.eraser || 0;
  const remaining = MAX_ERASER - used;

  btn.textContent = `Eraser (${remaining})`;

  const disabled = remaining <= 0 || !state.selectedCell;
  btn.disabled = disabled;
  btn.classList.toggle('opacity-50', disabled);
  btn.classList.toggle('!cursor-not-allowed', disabled);
}

export {
  updateAddNumbersButton,
  updateEraserButton,
  updateHintsButton,
  updateRevertButton,
  updateShuffleButton,
};
