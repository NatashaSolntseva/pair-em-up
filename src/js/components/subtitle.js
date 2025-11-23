export function Subtitle({ text, emoji = '' } = {}) {
  const subtitle = document.createElement('h2');

  const base = 'font-semibold mb-3 transition-colors duration-300';
  const color = 'text-[#6b7338] dark:text-yellow-300';
  const size = 'text-lg';

  subtitle.className = `${size} ${base} ${color}`;
  subtitle.textContent = emoji ? `${emoji} ${text}` : text;

  return subtitle;
}
