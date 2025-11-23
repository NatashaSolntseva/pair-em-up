export function generateBaseNumbers() {
  const numbers = [];
  for (let i = 1; i <= 19; i++) {
    if (i === 10) continue;
    const digits = i.toString().split('').map(Number);
    numbers.push(...digits);
  }
  return numbers;
}

export function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
