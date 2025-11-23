import { createButton } from '../components/button.js';
import { Title } from '../components/title.js';
import { MAX_RESULTS } from '../constants/constants.js';
import { scoresStore } from '../state/scoresStore.js';
import { capitalize, formatTime } from '../utils/helpers.js';

export function renderResultsScreen() {
  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-start min-h-screen px-2 pt-6 pb-20 gap-6 text-gray-800 dark:text-gray-200';

  const title = Title({
    text: `${MAX_RESULTS} Last Results`,
    level: 'medium',
    emoji: '🏆',
  });

  const tableWrapper = document.createElement('div');
  tableWrapper.className =
    'w-full max-w-[90vw] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700';

  const table = document.createElement('table');
  table.className = `
    min-w-[600px] text-sm 
    bg-[#f7f7f0]/80 border !border-[#a3ac63]
    dark:bg-gray-800/40 dark:!border-yellow-500
    border-separate border-spacing-0 rounded shadow-lg
  `;

  const thead = document.createElement('thead');
  thead.className = `
    bg-[#e8e8d3] text-gray-700
    dark:bg-gray-700 dark:text-yellow-400
  `;

  const headerRow = document.createElement('tr');
  const headers = ['#', 'Mode', 'Score', 'Result', 'Time', 'Moves', 'Date'];

  headers.forEach((text) => {
    const th = document.createElement('th');
    th.className = 'p-2 font-semibold whitespace-nowrap';
    th.textContent = text;
    headerRow.append(th);
  });

  thead.append(headerRow);

  const tbody = document.createElement('tbody');
  tbody.className = 'divide-y divide-[#e8e8d3] dark:divide-gray-700';

  let scores = scoresStore.load();

  if (!scores || scores.length === 0) {
    const empty = document.createElement('div');
    empty.className = `
      text-center mt-10 opacity-80 
      flex flex-col items-center gap-4
    `;

    const emoji = document.createElement('div');
    emoji.className = 'text-6xl';
    emoji.textContent = '🐣';

    const line1 = document.createElement('p');
    line1.className = 'text-xl';
    line1.textContent = 'No games played yet!';

    const line2 = document.createElement('p');
    line2.className = 'opacity-70';
    line2.textContent = 'Play your first game to see your results here 😎';

    const btn = createButton({
      text: 'Start Game',
      variant: 'primary',
      onClick: () => (window.location.hash = '/'),
    });

    empty.append(emoji, line1, line2, btn);
    container.appendChild(empty);

    const app = document.getElementById('app');
    app.replaceChildren(container);
    return;
  }

  const lastFive = scores.slice(-MAX_RESULTS);
  lastFive.sort((a, b) => a.time - b.time);

  lastFive.forEach((game, index) => {
    const tr = document.createElement('tr');

    tr.className = `
      transition
      ${
        game.result === 'win'
          ? 'bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40'
          : 'bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40'
      }
    `;

    const trophy =
      game.result === 'win'
        ? index === 0
          ? '🥇'
          : index === 1
            ? '🥈'
            : index === 2
              ? '🥉'
              : '🏅'
        : '❌';

    const cells = [
      index + 1,
      capitalize(game.mode),
      game.score,
      trophy,
      formatTime(game.time),
      game.moves ?? '-',
      new Date(game.date).toLocaleString(),
    ];

    cells.forEach((val) => {
      const td = document.createElement('td');
      td.className = 'p-2 whitespace-nowrap';
      td.textContent = val;
      tr.append(td);
    });

    tbody.append(tr);
  });

  table.append(thead, tbody);
  tableWrapper.append(table);

  const backBtn = createButton({
    text: '← Back to Menu',
    href: '#/',
  });

  container.append(title, tableWrapper, backBtn);

  const app = document.getElementById('app');
  app.replaceChildren(container);
}
