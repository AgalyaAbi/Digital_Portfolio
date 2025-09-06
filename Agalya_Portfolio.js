// ====== Basic helpers ======
document.getElementById('year').textContent = new Date().getFullYear();

// Elements
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const themeBtn = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

// ====== Active nav link on scroll ======
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 120;
    const height = section.offsetHeight;
    if (top >= offset && top < offset + height) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Resume download fallback (keeps native behavior when possible)
const resumeLink = document.getElementById('download-resume');
if (resumeLink) {
  resumeLink.addEventListener('click', function(e) {
    // If the browser honors the download attribute, default behavior will work.
    // This fallback triggers a programmatic click to ensure download on some setups.
    const href = this.getAttribute('href');
    if (!href) return;
    // For same-origin files the download attribute should work — but do fallback:
    e.preventDefault();
    const a = document.createElement('a');
    a.href = href;
    a.setAttribute('download', this.getAttribute('download') || 'Agalya_Resume.pdf');
    // For safety, add to DOM then click
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}


// Smooth scroll for nav links (also for keyboard)
document.querySelectorAll('a.nav-link').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // close mobile menu if open
    if (window.innerWidth < 720 && navbar.style.display === 'block') {
      navbar.style.display = 'none';
    }
  });
});

// ====== Theme toggle ======
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  if (document.body.classList.contains('light-theme')) themeBtn.textContent = '☀️';
  else themeBtn.textContent = '🌙';
});

// Use system preference to set default (optional)
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
if (prefersLight) {
  document.body.classList.add('light-theme');
  themeBtn.textContent = '☀️';
} else {
  themeBtn.textContent = '🌙';
}

// ====== Mobile menu toggle ======
menuToggle.addEventListener('click', () => {
  if (navbar.style.display === 'block') navbar.style.display = 'none';
  else navbar.style.display = 'block';
});

// Close mobile nav on outside click
window.addEventListener('resize', () => {
  if (window.innerWidth > 720) navbar.style.display = '';
});

// ====== Modal functions ======
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';
  // Lock scroll
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Close modal on background click
window.addEventListener('click', (e) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});

// ESC key closes modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
    document.body.style.overflow = '';
  }
});


