const buttons = document.querySelectorAll('[data-font]');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const direction = btn.getAttribute('data-font');
    document.body.classList.remove('size-up', 'size-down');
    if (direction === 'up') {
      document.body.classList.add('size-up');
    } else if (direction === 'down') {
      document.body.classList.add('size-down');
    }
  });
});
