/* ============================================================
   BazUp Media — main.js
   Nav toggle, logo uploader, form handler, scroll effects
   ============================================================ */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────── */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ── Active nav link ─────────────────────────────────── */
  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    $$('.nav-links a, .mobile-menu a').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html') ||
          (path === 'index.html' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* ── Nav scroll shadow ───────────────────────────────── */
  function initNavScroll() {
    const nav = $('.nav');
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu toggle ──────────────────────────────── */
  function initMobileMenu() {
    const toggle = $('.nav-toggle');
    const menu   = $('.mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close when a link is tapped
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Logo uploader ───────────────────────────────────── */
  function applyLogo(dataUrl) {
    $$('.logo-mark').forEach(function (mark) {
      // Remove existing custom img if any
      const existing = mark.querySelector('img.logo-custom');
      if (existing) existing.remove();

      // Hide default SVG
      const svgWrap = mark.querySelector('.logo-svg-wrap');
      if (svgWrap) svgWrap.style.display = 'none';

      // Insert image
      const img = document.createElement('img');
      img.src = dataUrl;
      img.alt = 'BazUp Media Logo';
      img.className = 'logo-custom';
      // insert before the file input
      const input = mark.querySelector('.logo-upload-trigger');
      mark.insertBefore(img, input);
    });
  }

  function removeLogo() {
    $$('.logo-mark').forEach(function (mark) {
      const existing = mark.querySelector('img.logo-custom');
      if (existing) existing.remove();
      const svgWrap = mark.querySelector('.logo-svg-wrap');
      if (svgWrap) svgWrap.style.display = '';
    });
  }

  function initLogoUploader() {
    // Restore persisted logo
    const saved = localStorage.getItem('bazup_logo');
    if (saved) applyLogo(saved);

    $$('.logo-upload-trigger').forEach(function (input) {
      input.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
          const dataUrl = ev.target.result;
          localStorage.setItem('bazup_logo', dataUrl);
          applyLogo(dataUrl);
        };
        reader.readAsDataURL(file);
      });
    });
  }

  /* ── Contact form ────────────────────────────────────── */
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic client-side validation
      let valid = true;
      $$('[required]', form).forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
          field.addEventListener('input', function () {
            field.style.borderColor = '';
          }, { once: true });
        }
      });

      if (!valid) return;

      // Disable submit button while "sending"
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending…';

      // Simulate async send (replace with real backend/formspree)
      setTimeout(function () {
        btn.disabled = false;
        btn.textContent = original;
        form.reset();
        const success = $('#form-success');
        if (success) {
          success.classList.add('show');
          setTimeout(function () { success.classList.remove('show'); }, 5000);
        }
      }, 1200);
    });
  }

  /* ── Intersection fade-in ────────────────────────────── */
  function initFadeIn() {
    if (!('IntersectionObserver' in window)) return;

    const style = document.createElement('style');
    style.textContent = [
      '.fade-in{opacity:0;transform:translateY(18px);transition:opacity 0.55s ease,transform 0.55s ease}',
      '.fade-in.visible{opacity:1;transform:none}',
      '.fade-in-up{opacity:0;transform:translateY(28px);transition:opacity 0.6s ease,transform 0.6s ease}',
      '.fade-in-up.visible{opacity:1;transform:none}'
    ].join('');
    document.head.appendChild(style);

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(function () { el.classList.add('visible'); }, +delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    $$('.fade-in, .fade-in-up').forEach(function (el) { obs.observe(el); });
  }

  /* ── Boot ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    setActiveNav();
    initNavScroll();
    initMobileMenu();
    initLogoUploader();
    initContactForm();
    initFadeIn();
  });
})();
