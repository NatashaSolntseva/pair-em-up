export function clearContainer(target) {
  if (!target) return;

  let el = target;

  if (typeof target === 'string') {
    el = document.querySelector(target);
  }

  if (!el) return;

  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
