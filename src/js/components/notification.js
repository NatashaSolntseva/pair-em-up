export function showNotification(message, type = 'info') {
  let container = document.getElementById('notification-container');

  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.className = `
      fixed top-4 left-1/2 -translate-x-1/2 z-[9999]
      flex flex-col gap-2 items-center
      pointer-events-none
    `;
    document.body.append(container);
  }

  const typeStyles = {
    success: `
      bg-[#8aa66a] text-white
      dark:bg-[#3d5a2c] dark:text-[#e6f4d7]
    `,
    error: `
      bg-[#d35a5a] text-white
      dark:bg-[#7a2f2f] dark:text-red-100
    `,
    info: `
      bg-[#2ba7a7] text-white
      dark:bg-[#1e7b7b] dark:text-white
    `,
  };

  const toast = document.createElement('div');
  toast.className = `
    px-4 py-2 rounded-lg shadow-lg opacity-0
    transition-all duration-500
    text-sm font-semibold pointer-events-auto
    ${typeStyles[type] || typeStyles.info}
  `;
  toast.textContent = message;

  container.append(toast);

  requestAnimationFrame(() => {
    toast.classList.add('opacity-100', 'translate-y-0');
  });

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');

    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
