const root = document.documentElement;
const preview = document.getElementById('preview');
const toggleButton = document.getElementById('accent-toggle');

const accents = ['#2563eb', '#ec4899', '#22c55e', '#f59e0b'];
let currentIndex = 0;

function updateAccent(color) {
  root.style.setProperty('--accent', color);
  if (preview) {
    preview.textContent = `Accent switched to ${color}. Feel free to change the palette in script.js.`;
  }
}

function cycleAccent() {
  currentIndex = (currentIndex + 1) % accents.length;
  updateAccent(accents[currentIndex]);
}

updateAccent(accents[currentIndex]);

toggleButton?.addEventListener('click', cycleAccent);
