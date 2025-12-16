document.addEventListener('DOMContentLoaded', () => {
  const frame = document.getElementById('brandgen-frame');
  const status = document.querySelector('[data-frame-status]');
  const year = document.getElementById('brandgen-year');
  const header = document.querySelector('.brandgen-header');
  const frameWrapper = document.querySelector('.frame-wrapper');
  let expandThreshold = 70;
  let compactThreshold = 200;
  let scrollTicking = false;
  let resizeTicking = false;
  let isCompact = false;

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const computeThresholds = () => {
    if (!header || !frameWrapper) return;
    const headerHeight = header.offsetHeight;
    const wrapperTop = frameWrapper.getBoundingClientRect().top + window.scrollY;
    const compactStart = Math.max(wrapperTop - headerHeight - 20, headerHeight);
    const expandStart = Math.max(compactStart - headerHeight - 80, 0);
    compactThreshold = Math.max(compactStart, expandStart + 60);
    expandThreshold = Math.min(expandStart, compactThreshold - 40);
  };

  const updateHeaderState = () => {
    if (!header) return;
    const scrolled = window.scrollY;
    if (!isCompact && scrolled > compactThreshold) {
      header.classList.add('is-compact');
      isCompact = true;
    } else if (isCompact && scrolled < expandThreshold) {
      header.classList.remove('is-compact');
      isCompact = false;
    }
  };

  window.addEventListener(
    'scroll',
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        updateHeaderState();
        scrollTicking = false;
      });
    },
    { passive: true }
  );

  const handleResize = () => {
    computeThresholds();
    updateHeaderState();
  };

  window.addEventListener('resize', () => {
    if (resizeTicking) return;
    resizeTicking = true;
    window.requestAnimationFrame(() => {
      handleResize();
      resizeTicking = false;
    });
  });

  handleResize();

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
