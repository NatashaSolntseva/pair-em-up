export function calculateScore(a, b) {
  if (a === 5 && b === 5) return 3;
  if (a === b) return 1;
  return 2;
}
