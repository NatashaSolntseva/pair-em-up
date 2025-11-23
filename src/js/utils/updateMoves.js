import { gameStore } from '../state/gameStore.js';

export function updateMoves(action) {
  const state = gameStore.getState();
  let delta = 0;

  switch (action) {
    case 'pair':
    case 'shuffle':
    case 'addNumbers':
    case 'eraser':
      delta = 1;
      break;
    case 'undo':
      delta = -1;
      break;
    default:
      return;
  }

  const newMoves = (state.moves || 0) + delta;
  gameStore.setState({ moves: newMoves });
}
