document.addEventListener('DOMContentLoaded', () => {
  const frame = document.getElementById('brandgen-frame');
  const status = document.querySelector('[data-frame-status]');
  const year = document.getElementById('brandgen-year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (frame && status) {
    const hideStatus = () => {
      status.textContent = 'BrandGen is ready.';
      status.classList.add('is-ready');
      setTimeout(() => {
        status.hidden = true;
      }, 600);
    };

    // If the frame loads successfully, fade the status chip away.
    frame.addEventListener('load', hideStatus, { once: true });

    // Fallback in case the iframe refuses to load due to CSP.
    setTimeout(() => {
      if (!status.hidden) {
        status.textContent = 'BrandGen is available in a new tab if blocked here.';
      }
    }, 5000);
  }
});
