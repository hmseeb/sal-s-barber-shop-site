/* ============================================================
   SAL'S BARBER SHOP — Script
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky header ──────────────────────────────────────── */
  const header = document.getElementById('site-header');

  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── Mobile nav ─────────────────────────────────────────── */
  const toggle   = document.getElementById('nav-toggle');
  const navMenu  = document.getElementById('nav-menu');
  const navLinks = navMenu.querySelectorAll('.nav-link, .nav-cta');

  // Create backdrop element
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  function openNav() {
    toggle.classList.add('open');
    navMenu.classList.add('open');
    backdrop.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    toggle.classList.remove('open');
    navMenu.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleNav() {
    if (navMenu.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  }

  toggle.addEventListener('click', toggleNav);
  backdrop.addEventListener('click', closeNav);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeNav();
      toggle.focus();
    }
  });

  /* ── Smooth scroll for anchor links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      const headerH = header.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ── Active nav link on scroll ───────────────────────────── */
  const sections = document.querySelectorAll('section[id], main > section');
  const allNavLinks = document.querySelectorAll('.nav-menu .nav-link');

  function setActiveLink() {
    const scrollY = window.scrollY + header.offsetHeight + 80;

    sections.forEach(function (section) {
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');
      if (!id) return;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        allNavLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ── Scroll-reveal (IntersectionObserver) ────────────────── */
  const revealEls = document.querySelectorAll('.service-card, .barber-card, .contact-card, .hours-cta-inner, .hours-note');

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  const staggerEls = document.querySelectorAll('.services-grid, .barbers-grid, .contact-info');
  staggerEls.forEach(function (el) {
    el.classList.add('reveal-stagger');
  });

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── Footer year ─────────────────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── Active nav link style ───────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = '.nav-link.active { color: var(--color-gold) !important; }';
  document.head.appendChild(style);

})();
