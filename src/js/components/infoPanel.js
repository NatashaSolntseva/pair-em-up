import { gameStore } from '../state/gameStore';

export function InfoPanel() {
  const panel = document.createElement('div');
  panel.className =
    'flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-4xl transition-colors duration-300';

  function createInfo(labelText) {
    const wrap = document.createElement('div');
    wrap.className =
      'text-sm text-[#4c4c3b] dark:text-gray-200 bg-[#e6e6cf]/40 dark:bg-transparent px-2 py-1 rounded flex items-center gap-1';

    const label = document.createElement('span');
    label.className =
      'font-mono text-sm text-[#5a5a40] dark:text-gray-300 bg-[#f2f2df]/30 dark:bg-transparent  rounded';
    label.textContent = labelText;

    const value = document.createElement('span');
    value.className =
      'font-mono text-sm text-[#5a5a40] dark:text-gray-300 bg-[#f2f2df]/30 dark:bg-transparent  rounded';

    wrap.append(label, value);

    return { wrap, value };
  }

  const pairsObj = createInfo('Available pairs:');
  const rowsObj = createInfo('Rows:');

  panel.append(pairsObj.wrap, rowsObj.wrap);

  function update(state) {
    rowsObj.value.textContent = state.rows.toString();

    const ap = state.availablePairs;
    pairsObj.value.textContent = ap > 5 ? '5+' : ap.toString();
  }

  update(gameStore.getState());

  gameStore.subscribe((newState) => {
    update(newState);
  });

  return panel;
}
