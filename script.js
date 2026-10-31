const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Interactive menu category filters
const filters = document.querySelectorAll('.filter');
const menuCards = document.querySelectorAll('.menu-card');
filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(button => button.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;
    menuCards.forEach(card => {
      card.classList.toggle('is-hidden', category !== 'all' && card.dataset.category !== category);
    });
  });
});

// Demo order interaction: shows a toast. No payment or backend is connected.
const toast = document.querySelector('.cart-toast');
const toastMessage = document.querySelector('.toast-message');
let toastTimer;
document.querySelectorAll('.add-button').forEach(button => {
  button.addEventListener('click', () => {
    toastMessage.textContent = `${button.dataset.name} added to your sample order · $${Number(button.dataset.price).toFixed(2)}`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
  });
});
document.querySelector('.toast-close').addEventListener('click', () => toast.classList.remove('show'));

// Back-to-top control and current year
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelector('#year').textContent = new Date().getFullYear();
