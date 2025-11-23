import { clearContainer } from './clearScreen';
import { generateBaseNumbers, shuffleArray } from './generateNumbers';

export function createGridWrapper() {
  const grid = document.createElement('div');
  grid.className = `
    grid grid-cols-9 gap-[0.3rem] 
    bg-[#e6e6cf] dark:bg-gray-900 
    p-3 rounded-lg shadow-xl 
    border-4 border-[#8a944d] dark:border-yellow-500 
    w-full max-w-[95vw] sm:max-w-[500px] mx-auto 
    transition-all duration-300
  `;
  return grid;
}

export function createClassicGridData() {
  const numbers = generateBaseNumbers();
  return numbers.map((num) => ({ value: num, empty: false }));
}

export function createRandomGridData() {
  const numbers = shuffleArray(generateBaseNumbers());
  return numbers.map((num) => ({ value: num, empty: false }));
}

export function createChaoticGridData() {
  const numbers = Array.from({ length: 27 }, () => Math.floor(Math.random() * 9) + 1);
  return numbers.map((num) => ({ value: num, empty: false }));
}

export function renderGridFromState(container, gridData) {
  clearContainer(container);

  gridData.forEach((cellData, index) => {
    const cell = document.createElement('div');
    cell.className =
      'cell flex items-center justify-center aspect-square rounded shadow text-[clamp(0.8rem,2.2vw,1.2rem)] transition ' +
      (cellData.empty
        ? 'bg-[#c6c6ad] dark:bg-gray-800 cursor-default'
        : 'bg-[#bfc88a] text-[#333] font-bold cursor-pointer hover:bg-[#d4dcb0] ' +
          'dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400');

    cell.dataset.index = index;
    if (!cellData.empty) {
      cell.dataset.value = cellData.value;
      cell.textContent = cellData.value;
    } else {
      cell.textContent = '';
    }

    container.append(cell);
  });
}
