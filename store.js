const cartCount = document.querySelector('[data-cart-count]');
const addButtons = document.querySelectorAll('[data-add]');
const toast = document.querySelector('[data-toast]');
let count = 0;
let toastTimer;

function showToast() {
  if (!toast) return;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 1800);
}

addButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    count += 1;
    if (cartCount) {
      cartCount.textContent = String(count);
    }
    showToast();
  });
});
