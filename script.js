/* ==========================================================================
   SCRIPT.JS — Darshan B M portfolio
   No libraries. Each function below does one job and is started at the bottom.
   ========================================================================== */

/* Does the visitor prefer reduced motion? Used to skip animations. */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------------------------------
   initTheme()
   Switches between dark and light theme and remembers the choice.
   Falls back silently if the browser blocks storage (e.g. some file:// setups).
   -------------------------------------------------------------------------- */
function initTheme() {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) { /* storage unavailable */ }
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  function updateLabel() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#09090b' : '#fafafa');
  }

  button.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    updateLabel();
  });

  updateLabel();
}

/* --------------------------------------------------------------------------
   initMobileMenu()
   Opens and closes the dropdown navigation on tablets and phones.
   Closes when a link is clicked, when Escape is pressed, or on resize to desktop.
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  function setOpen(open) {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 1024) setOpen(false); });
}

/* --------------------------------------------------------------------------
   initScrollSpy()
   Highlights the nav link of the section currently on screen.
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav__links a[href^="#"]:not(.btn)'));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) =>
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id)
      );
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((s) => observer.observe(s));
}

/* --------------------------------------------------------------------------
   initReveal()
   Fades elements with class "reveal" into view as you scroll.
   The "js" class on <html> means content is only hidden when this script runs,
   so the page never stays blank if JavaScript fails.
   -------------------------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   initContactForm()
   There is no server, so "Send message" builds a mailto: link that opens the
   visitor's email app. The destination address is the form's data-email attribute.
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const to = form.dataset.email;
    const name = form.elements.name.value.trim();
    const subjectText = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();

    const subject = encodeURIComponent(subjectText + ' (from ' + name + ')');
    const body = encodeURIComponent(message + '\n\n— ' + name);
    window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
  });
}

/* --------------------------------------------------------------------------
   setYear()
   Keeps the footer copyright year current.
   -------------------------------------------------------------------------- */
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* Start everything once the page has loaded */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollSpy();
  initReveal();
  initContactForm();
  setYear();
});
