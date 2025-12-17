document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('research-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
