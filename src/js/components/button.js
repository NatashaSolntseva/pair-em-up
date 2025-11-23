export function createButton({
  text,
  variant = 'default',
  onClick,
  href,
  disabled = false,
  id,
} = {}) {
  const btn = document.createElement('button');
  btn.textContent = text;

  const base = 'px-4 py-2 rounded font-medium transition-colors duration-300 cursor-pointer ';

  const variants = {
    default:
      'bg-[#a8b38b] hover:bg-[#98a87c] text-gray-900 ' +
      'dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',

    primary:
      'bg-[#bfc88a] hover:bg-[#b3bf7a] text-gray-900 ' +
      'dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:text-black',

    secondary:
      'bg-[#d4dcb0] hover:bg-[#c6cfa1] text-[#333] ' +
      'dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200',

    danger: 'bg-[#d4746a] hover:bg-[#c85e52] text-white ' + 'dark:bg-red-600 dark:hover:bg-red-500',

    outline:
      'border border-[#8a944d] text-[#6b7338] hover:bg-[#a3ac63] hover:text-black ' +
      'dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  btn.className =
    base + (variants[variant] || variants.default) + (disabled ? ` ${disabledStyles}` : '');

  btn.disabled = disabled;
  btn.id = id;

  btn.addEventListener('click', (e) => {
    if (btn.disabled) {
      e.preventDefault();
      return;
    }
    if (href) {
      window.location.hash = href;
      return;
    }
    if (onClick) onClick(e);
  });

  btn.setDisabled = function (value) {
    btn.disabled = value;
    if (value) {
      btn.classList.add(...disabledStyles.split(' '));
    } else {
      disabledStyles.split(' ').forEach((c) => btn.classList.remove(c));
    }
  };

  return btn;
}
