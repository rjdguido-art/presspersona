const root = document.documentElement;
const accentToggle = document.getElementById('accent-toggle');
const scrollTrigger = document.querySelector('[data-scroll]');
const testimonialCards = [...document.querySelectorAll('[data-testimonial]')];
const sliderDotsContainer = document.querySelector('.slider-dots');
const sliderButtons = document.querySelectorAll('.slider-btn');
const heroVisual = document.querySelector('.hero-visual');
const yearEl = document.getElementById('year');

const accents = ['#7f8cff', '#b16dff', '#ff8ea1', '#67eaca'];
let accentIndex = 0;
let testimonialIndex = 0;
let sliderInterval;

function updateAccent(color) {
  root.style.setProperty('--accent', color);
  root.style.setProperty('--accent-strong', color);
  if (accentToggle) {
    accentToggle.style.background = `linear-gradient(145deg, ${color}, ${color}80)`;
  }
}

function cycleAccent() {
  accentIndex = (accentIndex + 1) % accents.length;
  updateAccent(accents[accentIndex]);
}

function initScrollTrigger() {
  if (!scrollTrigger) return;
  scrollTrigger.addEventListener('click', () => {
    const target = scrollTrigger.getAttribute('data-scroll');
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function buildDots() {
  if (!sliderDotsContainer) return [];
  return testimonialCards.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.addEventListener('click', () => showTestimonial(index));
    sliderDotsContainer.appendChild(dot);
    return dot;
  });
}

const sliderDots = buildDots();

function showTestimonial(index) {
  if (!testimonialCards.length) return;
  testimonialIndex = (index + testimonialCards.length) % testimonialCards.length;
  testimonialCards.forEach((card, idx) => {
    card.classList.toggle('active', idx === testimonialIndex);
  });
  sliderDots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === testimonialIndex);
  });
}

function startSlider() {
  sliderInterval = setInterval(() => {
    showTestimonial(testimonialIndex + 1);
  }, 6000);
}

function resetSlider() {
  clearInterval(sliderInterval);
  startSlider();
}

function initSlider() {
  if (!testimonialCards.length) return;
  showTestimonial(0);
  startSlider();
  sliderButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const direction = btn.getAttribute('data-direction');
      const delta = direction === 'next' ? 1 : -1;
      showTestimonial(testimonialIndex + delta);
      resetSlider();
    });
  });
}

function initParallax() {
  if (!heroVisual) return;
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.05;
    heroVisual.style.transform = `translateY(${offset}px)`;
  });
}

function initForm() {
  const form = document.querySelector('.cta-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    button.textContent = 'Sent · we'll reply soon';
    button.disabled = true;
  });
}

function initYear() {
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function init() {
  updateAccent(accents[accentIndex]);
  accentToggle?.addEventListener('click', cycleAccent);
  initScrollTrigger();
  initSlider();
  initParallax();
  initForm();
  initYear();
}

document.addEventListener('DOMContentLoaded', init);
