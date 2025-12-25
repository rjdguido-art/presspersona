const filterButtons = document.querySelectorAll('[data-filter]');
const menuCards = document.querySelectorAll('[data-category]');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    filterButtons.forEach((item) => item.classList.remove('is-active'));
    btn.classList.add('is-active');

    menuCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const matches = filter === 'all' || category === filter;
      card.style.display = matches ? 'grid' : 'none';
    });
  });
});
