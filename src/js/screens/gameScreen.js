import {
  createClassicGridData,
  createRandomGridData,
  createChaoticGridData,
  createGridWrapper,
  renderGridFromState,
} from '../utils/createGrid.js';
import { initPairLogic } from '../utils/pairLogic.js';
import { GameHeader } from '../components/GameHeader';
import { createGameControls } from '../utils/createGameControls.js';
import { createAssistPanel } from '../utils/createAssistPanel.js';
import { gameStore } from '../state/gameStore.js';
import { clearContainer } from '../utils/clearScreen.js';
import { playIfEnabled } from '../utils/soundManager.js';
import { InfoPanel } from '../components/infoPanel.js';

export function renderGameScreen(mode, savedState = null) {
  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-start min-h-screen text-white p-6 gap-4';

  const header = GameHeader();
  container.append(header);

  let gridData;
  let state = gameStore.getState();

  if (savedState) {
    gameStore.setState(savedState);
    gridData = savedState.grid;
  } else if (state.grid && state.grid.length > 0 && state.mode === mode) {
    gridData = state.grid;
  } else {
    gridData =
      mode === 'classic'
        ? createClassicGridData()
        : mode === 'random'
          ? createRandomGridData()
          : createChaoticGridData();

    gameStore.startNewGame(mode, gridData);
  }

  const grid = createGridWrapper();
  renderGridFromState(grid, gridData);
  container.append(grid);

  const assists = createAssistPanel(grid, (updatedGrid) => {
    clearContainer(grid);
    renderGridFromState(grid, updatedGrid);
  });
  container.append();

  const controls = createGameControls(mode);
  container.append(controls);

  const info = InfoPanel();

  container.append(info, assists, controls);

  document.body.append(container);

  playIfEnabled('start');

  gameStore.startTimer();

  initPairLogic(grid);

  return container;
}
