import { GameOverlay } from '../components/outcomeOverlay';
import { gameStore } from '../state/gameStore';
import { checkGameOutcome } from './checkGameOutcome';
import { renderGameScreen } from '../screens/gameScreen';
import { clearContainer } from './clearScreen';
import { scoresStore } from '../state/scoresStore';
import { playIfEnabled } from './soundManager';

export function handleGameProgress() {
  const state = gameStore.getState();
  const result = checkGameOutcome(state);

  if (result.status === 'in-progress') return false;

  scoresStore.addFromGameState(state);

  if (result.status === 'win') {
    playIfEnabled('win');
  } else if (result.status === 'lose') {
    playIfEnabled('lose');
  }

  const overlay = GameOverlay({
    status: result.status,
    message: result.reason,
    score: state.score,
    time: state.timer,
    mode: state.mode,

    onRestart: () => {
      const mode = state.mode;
      clearContainer(document.body);
      renderGameScreen(mode);
    },

    onMenu: () => {
      window.location.hash = '#/';
    },
  });

  document.body.appendChild(overlay);

  return true;
}
