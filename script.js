let menuToggle;
let menuOverlay;
let menuClose;
let observerTargets;
let yearEl;
let previousFocus;
let focusTrapCleanup;
let chatLauncher;
let chatPanel;
let chatClose;
let chatIframe;

function cacheDom() {
  menuToggle = document.querySelector('.menu-toggle');
  menuOverlay = document.getElementById('menu-overlay');
  menuClose = document.querySelector('.menu-close');
  observerTargets = document.querySelectorAll('.is-observe');
  yearEl = document.getElementById('year');
  chatLauncher = document.querySelector('.chat-launcher');
  chatPanel = document.getElementById('chat-panel');
  chatClose = document.querySelector('.chat-panel__close');
  chatIframe = document.querySelector('.chat-panel__iframe');
}

function setOverlayState(open) {
  if (!menuOverlay) return;
  menuOverlay.setAttribute('aria-hidden', open ? 'false' : 'true');
  menuToggle?.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) {
    previousFocus = document.activeElement;
    focusTrapCleanup = trapFocus(menuOverlay);
    menuOverlay.querySelector('a, button')?.focus();
    document.body.style.overflow = 'hidden';
  } else {
    focusTrapCleanup?.();
    document.body.style.overflow = '';
    previousFocus?.focus();
  }
}

function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return () => {};
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  function handleKey(event) {
    if (event.key !== 'Tab') return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  container.addEventListener('keydown', handleKey);
  return () => container.removeEventListener('keydown', handleKey);
}

function handleMenu() {
  menuToggle?.addEventListener('click', () => {
    const isOpen = menuOverlay?.getAttribute('aria-hidden') === 'false';
    setOverlayState(!isOpen);
  });
  menuClose?.addEventListener('click', () => setOverlayState(false));
  menuOverlay?.addEventListener('click', (event) => {
    if (event.target === menuOverlay) {
      setOverlayState(false);
      return;
    }
    if (event.target instanceof Element && event.target.closest('.menu-overlay__panel a')) {
      setOverlayState(false);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOverlay?.getAttribute('aria-hidden') === 'false') {
      setOverlayState(false);
    }
  });
}

function initObserver() {
  if (!observerTargets?.length) return;
  if (!('IntersectionObserver' in window)) {
    observerTargets.forEach((el) => el.classList.add('is-visible'));
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
  observerTargets.forEach((el) => observer.observe(el));
}

function initYear() {
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initScrollTriggers() {
  const triggers = document.querySelectorAll('[data-scroll]');
  if (!triggers.length) return;
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      const selector = trigger.getAttribute('data-scroll');
      if (!selector) return;
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      setOverlayState(false);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setChatState(open) {
  if (!chatPanel) return;
  chatPanel.classList.toggle('is-open', open);
  chatPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
  chatLauncher?.setAttribute('aria-expanded', open ? 'true' : 'false');
  chatLauncher?.classList.toggle('is-hidden', open);
  if (open) {
    chatPanel.focus();
  } else {
    chatLauncher?.focus();
  }
  if (open && chatIframe && !chatIframe.src) {
    const src = chatIframe.getAttribute('data-src');
    if (src) {
      chatIframe.src = src;
    }
  }
}

function handleChatWidget() {
  if (!chatLauncher || !chatPanel) return;
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

function init() {
  cacheDom();
  handleMenu();
  initScrollTriggers();
  initObserver();
  initYear();
  handleChatWidget();
}

document.addEventListener('DOMContentLoaded', init);
