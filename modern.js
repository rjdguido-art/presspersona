(function () {
  const yearEl = document.getElementById('modern-year');
  const scrollButtons = document.querySelectorAll('[data-scroll]');
  const observerTargets = document.querySelectorAll('.is-observe');
  const chatLauncher = document.querySelector('.chat-launcher');
  const chatPanel = document.getElementById('chat-panel');
  const chatClose = document.querySelector('.chat-panel__close');
  const chatIframe = document.querySelector('.chat-panel__iframe');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (scrollButtons.length) {
    scrollButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const target = document.querySelector(btn.getAttribute('data-scroll') || '');
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initObserver() {
    if (!observerTargets.length) return;
    if (!('IntersectionObserver' in window)) {
      observerTargets.forEach((section) => section.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observerTargets.forEach((section) => observer.observe(section));
  }

  function setChatState(open) {
    if (!chatPanel) return;
    chatPanel.classList.toggle('is-open', open);
    chatPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
    chatLauncher?.setAttribute('aria-expanded', open ? 'true' : 'false');
    chatLauncher?.classList.toggle('is-hidden', open);
    if (open) {
      chatPanel.focus();
      if (chatIframe && !chatIframe.src) {
        const src = chatIframe.getAttribute('data-src');
        if (src) chatIframe.src = src;
      }
    } else {
      chatLauncher?.focus();
    }
  }

  function initChat() {
    if (!chatPanel || !chatLauncher) return;
    chatLauncher.addEventListener('click', () => {
      const isOpen = chatPanel.classList.contains('is-open');
      setChatState(!isOpen);
    });
    chatClose?.addEventListener('click', () => setChatState(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && chatPanel.classList.contains('is-open')) {
        setChatState(false);
      }
    });
  }

  initObserver();
  initChat();
})();
