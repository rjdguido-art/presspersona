(function () {
  const yearEl = document.getElementById('modern-year');
  const scrollButtons = document.querySelectorAll('[data-scroll]');
  const observerTargets = document.querySelectorAll('.is-observe');
  const chatLauncher = document.querySelector('.chat-launcher');
  const chatPanel = document.getElementById('chat-panel');
  const chatIframe = document.querySelector('.chat-panel__iframe');
  let heroRotatorTimer;

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

  function initWidget({ launcher, panel, iframe, hideClass }) {
    if (!panel || !launcher) return;
    const closeBtn = panel.querySelector('.chat-panel__close');

    const setState = (open) => {
      panel.classList.toggle('is-open', open);
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
      launcher.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (hideClass) {
        launcher.classList.toggle(hideClass, open);
      }
      if (open) {
        panel.focus();
        if (iframe && !iframe.src) {
          const src = iframe.getAttribute('data-src');
          if (src) iframe.src = src;
        }
      } else {
        launcher.focus();
      }
    };

    launcher.addEventListener('click', () => {
      const isOpen = panel.classList.contains('is-open');
      setState(!isOpen);
    });
    closeBtn?.addEventListener('click', () => setState(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && panel.classList.contains('is-open')) {
        setState(false);
      }
    });
  }

  function initHeroRotator() {
    const rotator = document.querySelector('[data-hero-rotator]');
    if (!rotator) return;
    const phrases = [
      {
        text: 'Give your brand the polish of a flagship launch.',
        fontClass: 'hero-font-montserrat',
      },
      {
        text: 'Command attention with Titular-black statements.',
        fontClass: 'hero-font-titular',
      },
      {
        text: 'Warm every touchpoint with Highest Praise flourishes and color.',
        fontClass: 'hero-font-highest',
      },
      {
        text: 'Pair data and drama with Legitima’s editorial poise.',
        fontClass: 'hero-font-legitima',
      },
    ];
    const fontClasses = [...new Set(phrases.map((phrase) => phrase.fontClass))];
    let index = 0;

    const applyPhrase = (idx) => {
      const phrase = phrases[idx];
      if (!phrase) return;
      rotator.textContent = phrase.text;
      fontClasses.forEach((cls) => rotator.classList.remove(cls));
      rotator.classList.add(phrase.fontClass);
    };

    applyPhrase(index);

    if (heroRotatorTimer) {
      clearInterval(heroRotatorTimer);
    }

    heroRotatorTimer = window.setInterval(() => {
      rotator.classList.add('is-transitioning');
      window.setTimeout(() => {
        index = (index + 1) % phrases.length;
        applyPhrase(index);
        rotator.classList.remove('is-transitioning');
      }, 225);
    }, 3500);
  }

  initObserver();
  initWidget({
    launcher: chatLauncher,
    panel: chatPanel,
    iframe: chatIframe,
    hideClass: 'is-hidden',
  });
  initHeroRotator();
})();
