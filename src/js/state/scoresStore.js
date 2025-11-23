import { TARGET_SCORE } from '../constants/constants';

const SCORES_KEY = 'pair-em-up-scores';

export const scoresStore = {
  load() {
    try {
      return JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
    } catch {
      return [];
    }
  },

  save(list) {
    localStorage.setItem(SCORES_KEY, JSON.stringify(list));
  },

  addFromGameState(state) {
    if (!state) return;

    const record = {
      mode: state.mode,
      score: state.score,
      result: state.score >= TARGET_SCORE ? 'win' : 'lose',
      time: state.timer || 0,
      moves: state.moves || 0,
      date: new Date().toISOString(),
    };

    let list = this.load();
    list.push(record);
    this.save(list);
  },

  clear() {
    localStorage.removeItem(SCORES_KEY);
  },
};
