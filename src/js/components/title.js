export function Title({ text, level = 'large', emoji = '' } = {}) {
  const title = document.createElement('h1');

  const base =
    'font-bold drop-shadow-lg text-[#708238] dark:text-yellow-400 transition-colors duration-500';
  const sizes = {
    large: 'text-5xl',
    medium: 'text-3xl',
  };

  title.className = `${sizes[level] || sizes.large} ${base}`;
  title.textContent = emoji ? `${emoji} ${text}` : text;

  return title;
}
