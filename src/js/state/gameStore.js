import { updateAvailablePairs } from '../utils/hints';

const STORAGE_KEY = 'pair-em-up-store';

export const defaultState = {
  mode: 'classic',
  grid: [],
  score: 0,
  timer: 0,
  moves: 0,
  rows: 3,
  availablePairs: 0,
  availablePairList: [],
  undoHistory: [],
  lastAction: null,
  canUndo: false,
  selectedCell: null,
  assists: {
    hints: 0,
    revert: 0,
    addNumbers: 0,
    shuffle: 0,
    eraser: 0,
  },
  createdAt: null,
};

function loadInitialState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : structuredClone(defaultState);
}

let state = loadInitialState();
const listeners = new Set();

let timerInterval = null;

export const gameStore = {
  getState() {
    return structuredClone(state);
  },

  setState(partial) {
    state = { ...state, ...partial };

    if (partial.grid) {
      updateAvailablePairs(state.grid);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    listeners.forEach((callback) => callback(gameStore.getState()));
  },

  subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  reset(newState) {
    state = { ...defaultState, ...newState };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    listeners.forEach((callback) => callback(gameStore.getState()));
  },

  startNewGame(mode, grid) {
    this.setState(structuredClone(defaultState));

    this.setState({
      mode,
      grid,
      createdAt: new Date().toISOString(),
    });
  },

  pushUndo(entry) {
    state.undoHistory.push(entry);
    this.setState({
      undoHistory: state.undoHistory,
      lastAction: 'pair',
      canUndo: true,
    });
  },

  popUndo() {
    if (state.lastAction !== 'pair') {
      return null;
    }

    const last = state.undoHistory.pop();

    this.setState({
      undoHistory: state.undoHistory,
      lastAction: 'undo',
      canUndo: false,
      assists: {
        ...state.assists,
        revert: state.assists.revert + 1,
      },
    });

    return last;
  },

  markAction(type) {
    // type = "shuffle" | "addNumbers" | "eraser" | "pair" | "undo"
    this.setState({ lastAction: type });
  },

  startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
      const newTime = state.timer + 1;
      this.setState({ timer: newTime });

      const timerEl = document.getElementById('timer');
      if (timerEl) {
        const m = String(Math.floor(newTime / 60)).padStart(2, '0');
        const s = String(newTime % 60).padStart(2, '0');
        timerEl.textContent = `${m}:${s}`;
      }
    }, 1000);
  },

  stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  },

  resetTimer() {
    this.stopTimer();
    this.setState({ timer: 0 });
  },
};
