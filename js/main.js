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

  /* ── Nav scroll animations ───────────────────────────── */
  function initNavScroll() {
    var nav = $('.nav');
    if (!nav) return;

    var lastY      = window.scrollY;
    var ticking    = false;
    var COMPACT_AT = 80;   /* px — shrink threshold */
    var HIDE_AT    = 120;  /* px — must scroll this far before hide kicks in */

    function updateNav() {
      var y     = window.scrollY;
      var delta = y - lastY;

      /* Shadow */
      nav.classList.toggle('scrolled', y > 20);

      /* Compact (shrink height) */
      nav.classList.toggle('compact', y > COMPACT_AT);

      /* Hide / show — only after scrolled past threshold */
      if (y > HIDE_AT) {
        if (delta > 4) {
          /* Scrolling down — hide only if mobile menu is not open */
          var menu = $('.mobile-menu');
          if (!menu || !menu.classList.contains('open')) {
            nav.classList.add('hidden');
          }
        } else if (delta < -4) {
          /* Scrolling up — show */
          nav.classList.remove('hidden');
        }
      } else {
        /* Near top — always show */
        nav.classList.remove('hidden');
      }

      lastY   = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });

    updateNav();
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



  /* ── Platform chip multi-select ─────────────────────── */
  function initPlatformChips() {
    var container = document.getElementById('platform-chips');
    var hidden    = document.getElementById('contact-platform');
    if (!container || !hidden) return;

    container.addEventListener('click', function (e) {
      var chip = e.target.closest('.pchip');
      if (!chip) return;

      chip.classList.toggle('selected');
      chip.setAttribute('aria-pressed', chip.classList.contains('selected') ? 'true' : 'false');

      /* Collect all selected values into hidden input */
      var selected = Array.from(container.querySelectorAll('.pchip.selected'))
        .map(function (c) { return c.dataset.value; });

      hidden.value = selected.length ? selected.join(', ') : '';
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

      // Disable submit button while sending
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending…';

      /* ── Build WhatsApp message from form fields ── */
      var name      = (form.querySelector('[name="name"]')      || form.querySelector('#contact-name'))      ? (form.querySelector('[name="name"]')      || form.querySelector('#contact-name')).value.trim()      : '';
      var business  = (form.querySelector('[name="business"]')  || form.querySelector('#contact-business'))  ? (form.querySelector('[name="business"]')  || form.querySelector('#contact-business')).value.trim()  : '';
      var email     = (form.querySelector('[name="email"]')     || form.querySelector('#contact-email'))     ? (form.querySelector('[name="email"]')     || form.querySelector('#contact-email')).value.trim()     : '';
      var phone     = (form.querySelector('[name="phone"]')     || form.querySelector('#contact-phone'))     ? (form.querySelector('[name="phone"]')     || form.querySelector('#contact-phone')).value.trim()     : '';
      var platforms = (form.querySelector('[name="platforms"]') || form.querySelector('#contact-platform'))
        ? (form.querySelector('[name="platforms"]') || form.querySelector('#contact-platform')).value.trim()
        : '';
      var message   = (form.querySelector('[name="message"]')   || form.querySelector('#contact-message'))   ? (form.querySelector('[name="message"]')   || form.querySelector('#contact-message')).value.trim()   : '';

      var text =
        'Hi BazUp Media! I just filled out your contact form.\n\n' +
        '\uD83D\uDC64 Name: '     + name     + '\n' +
        '\uD83C\uDFE2 Business: ' + business + '\n' +
        (email     ? '\uD83D\uDCE7 Email: '              + email     + '\n' : '') +
        (phone     ? '\uD83D\uDCF1 My WhatsApp/Phone: '  + phone     + '\n' : '') +
        (platforms ? '\uD83D\uDCF2 Platforms: '          + platforms + '\n' : '') +
        '\n\uD83D\uDCAC Message:\n' + message;

      var waUrl = 'https://wa.me/923270880908?text=' + encodeURIComponent(text);

      btn.disabled = false;
      btn.textContent = original;
      form.reset();

      /* Show success message */
      var success = document.getElementById('form-success');
      if (success) {
        success.classList.add('show');
        setTimeout(function () { success.classList.remove('show'); }, 5000);
      }

      /* Open WhatsApp */
      window.open(waUrl, '_blank');
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
    initPlatformChips();
    initContactForm();
    initFadeIn();
  });
})();
