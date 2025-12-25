const accordionItems = document.querySelectorAll('.accordion-item');
const triggers = document.querySelectorAll('.accordion-trigger');

triggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    if (!item) return;
    const isOpen = item.classList.contains('is-open');
    accordionItems.forEach((entry) => entry.classList.remove('is-open'));
    triggers.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
    if (!isOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});
