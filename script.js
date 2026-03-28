// ─── Hamburger Menu ───
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('mobile-open'));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('mobile-open');
  hamburger.setAttribute('aria-expanded', 'false');
}));
// Close nav on scroll
window.addEventListener('scroll', () => {
  if (navLinks.classList.contains('mobile-open')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
}, { passive: true });

// ─── Sticky Form Toggle (desktop only — hidden via CSS on mobile) ───
const stickyForm = document.getElementById('stickyForm');
const formToggle = document.getElementById('formToggle');
if (formToggle && stickyForm) {
  formToggle.addEventListener('click', () => {
    if (getComputedStyle(stickyForm).display !== 'none') {
      stickyForm.classList.toggle('show');
    }
  });
}

const enrollBtn = document.getElementById('enrollBtn');
if (enrollBtn) {
  enrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (stickyForm && getComputedStyle(stickyForm).display !== 'none') {
      stickyForm.classList.toggle('show');
    } else {
      // On mobile, scroll to consultation form
      const form = document.getElementById('consultationForm');
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// ─── Accordion ───
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.accordion-item');
    const body = item.querySelector('.accordion-body');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.accordion-body').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// ─── Intersection Observer – Reveal ───
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── Animated Counters ───
function animateCount(el, target, suffix = '') {
  let start = 0;
  const step = target / 80;
  const update = () => {
    start = Math.min(start + step, target);
    el.textContent = (Number.isInteger(target) ? Math.round(start) : start.toFixed(1)) + suffix;
    if (start < target) requestAnimationFrame(update);
  };
  update();
}
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const num = e.target;
      const val  = parseFloat(num.dataset.target);
      const sfx  = num.dataset.suffix || '';
      animateCount(num, val, sfx);
      statObserver.unobserve(num);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

// ─── Navbar Scroll Effect ───
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.background =
    window.scrollY > 60 ? 'rgba(13,21,84,0.99)' : 'rgba(26,35,126,0.97)';
});

// ─── Form Submission ───
document.getElementById('enrollForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = '✓ Request Sent!';
  btn.style.background = 'linear-gradient(135deg,#2E7D32,#388E3C)';
  setTimeout(() => {
    btn.textContent = 'Submit Inquiry';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ─── AOS (Animate On Scroll) Initialization ───
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 50
  });
}

// ─── Vanilla Tilt Initialization ───
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll(".location-card"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.25,
    scale: 1.02
  });
}
