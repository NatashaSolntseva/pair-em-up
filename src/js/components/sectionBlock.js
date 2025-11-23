export function SectionBlock({ children = [] } = {}) {
  const section = document.createElement('section');

  section.className =
    'w-full max-w-md rounded p-4 shadow-lg transition-colors duration-300 ' +
    'bg-[#f7f7f0]/80 border border-[#a3ac63] ' +
    'dark:bg-gray-800/40 dark:border-yellow-500';

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (child) section.append(child);
    });
  } else if (children instanceof HTMLElement) {
    section.append(children);
  }

  return section;
}
