/* ================================================================
   NISSHIN — Retro Pop Art Website  |  Main Application JS
   ================================================================ */

(function () {
  'use strict';

  /* ── State ── */
  const state = {
    menuOpen: false,
    blogData: [],
    projectData: [],
    activeFilter: 'all',
    countersAnimated: false
  };

  /* ── DOM cache ── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  /* ================================================================
     1. LOADER
     ================================================================ */
  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
        document.body.classList.add('ready');
        setTimeout(() => loader.remove(), 600);
      }, 800);
    });
  }

  /* ================================================================
     2. SMOOTH SCROLL NAVIGATION
     ================================================================ */
  function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMobileMenu();
        const headerH = $('.site-header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ================================================================
     3. ACTIVE NAV TRACKING
     ================================================================ */
  function initActiveNav() {
    const sections = $$('section[id], footer[id]');
    const navLinks = $$('.nav-desktop .pill[data-section]');
    const headerH = () => $('.site-header').offsetHeight + 80;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(l => {
            l.classList.toggle('active', l.dataset.section === id);
          });
        }
      });
    }, { rootMargin: `-${headerH()}px 0px -50% 0px`, threshold: 0.1 });

    sections.forEach(sec => observer.observe(sec));
  }

  /* ================================================================
     4. MOBILE MENU
     ================================================================ */
  function initMobileMenu() {
    const btn = $('#hamburger');
    if (!btn) return;
    btn.addEventListener('click', toggleMobileMenu);
  }

  function toggleMobileMenu() {
    state.menuOpen = !state.menuOpen;
    $('#hamburger').classList.toggle('open', state.menuOpen);
    $('#mobile-menu').classList.toggle('open', state.menuOpen);
    document.body.classList.toggle('menu-open', state.menuOpen);
  }

  function closeMobileMenu() {
    if (!state.menuOpen) return;
    state.menuOpen = false;
    $('#hamburger').classList.remove('open');
    $('#mobile-menu').classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  /* ================================================================
     5. HEADER SCROLL EFFECT
     ================================================================ */
  function initHeaderScroll() {
    let lastY = 0;
    const header = $('#site-header');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 60);
      header.classList.toggle('hidden', y > lastY && y > 300);
      lastY = y;
    }, { passive: true });
  }

  /* ================================================================
     6. SCROLL REVEAL ANIMATIONS
     ================================================================ */
  function initReveal() {
    const items = $$('.reveal, .reveal-left');
    if (!items.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => observer.observe(el));
  }

  /* ================================================================
     7. COUNTER ANIMATION (About section stats)
     ================================================================ */
  function initCounters() {
    const nums = $$('.stat-num[data-target]');
    if (!nums.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !state.countersAnimated) {
          state.countersAnimated = true;
          nums.forEach(el => animateCounter(el));
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    nums.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ================================================================
     8. PROJECTS GALLERY (from JSON)
     ================================================================ */
  async function initProjects() {
    const grid = $('#projects-grid');
    if (!grid) return;
    try {
      const res = await fetch('data/projects.json');
      state.projectData = await res.json();
      renderProjects('all');
      initFilterButtons();
    } catch (err) {
      console.warn('Could not load projects:', err);
      grid.innerHTML = '<p style="color:#fff;text-align:center;grid-column:1/-1">Projects coming soon.</p>';
    }
  }

  function renderProjects(filter) {
    const grid = $('#projects-grid');
    const data = filter === 'all'
      ? state.projectData
      : state.projectData.filter(p => p.category === filter);

    grid.innerHTML = data.map(p => `
      <div class="mini-browser reveal visible" data-id="${p.id}">
        <div class="mini-topbar">
          <span class="dot-sm red"></span>
          <span class="dot-sm yellow"></span>
          <span class="dot-sm green"></span>
          <span class="mini-title-text">${p.title}</span>
        </div>
        <div class="mini-content">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <div class="mini-info">
          <span class="mini-cat">${p.category}</span>
          <p>${p.description}</p>
        </div>
      </div>
    `).join('');
  }

  function initFilterButtons() {
    $$('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilter = btn.dataset.filter;
        renderProjects(state.activeFilter);
      });
    });
  }

  /* ================================================================
     9. BLOG (from JSON)
     ================================================================ */
  async function initBlog() {
    const grid = $('#blog-grid');
    if (!grid) return;
    try {
      const res = await fetch('data/blog.json');
      state.blogData = await res.json();
      renderBlog();
    } catch (err) {
      console.warn('Could not load blog:', err);
      grid.innerHTML = '<p style="color:#fff;text-align:center;grid-column:1/-1">Blog posts coming soon.</p>';
    }
  }

  function renderBlog() {
    const grid = $('#blog-grid');
    grid.innerHTML = state.blogData.map(post => `
      <article class="blog-card reveal visible" data-id="${post.id}">
        <div class="blog-card-img">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
          <span class="blog-cat">${post.category}</span>
        </div>
        <div class="blog-card-body">
          <time>${formatDate(post.date)}</time>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <button class="read-more-btn" data-id="${post.id}">Read More →</button>
        </div>
      </article>
    `).join('');

    $$('.read-more-btn').forEach(btn => {
      btn.addEventListener('click', () => openBlogModal(parseInt(btn.dataset.id, 10)));
    });
  }

  function formatDate(d) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  /* ================================================================
     10. BLOG MODAL
     ================================================================ */
  function openBlogModal(id) {
    const post = state.blogData.find(p => p.id === id);
    if (!post) return;
    $('#modal-img').innerHTML = `<img src="${post.image}" alt="${post.title}">`;
    $('#modal-category').textContent = post.category;
    $('#modal-title').textContent = post.title;
    $('#modal-date').textContent = formatDate(post.date);
    $('#modal-text').innerHTML = post.content.split('\n\n').map(p => `<p>${p}</p>`).join('');
    $('#modal-tags').innerHTML = post.tags.map(t => `<span class="modal-tag">#${t}</span>`).join('');
    $('#blog-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeBlogModal() {
    $('#blog-modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function initBlogModal() {
    const close = $('#modal-close');
    const overlay = $('#blog-modal');
    if (close) close.addEventListener('click', closeBlogModal);
    if (overlay) overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeBlogModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeBlogModal();
    });
  }

  /* ================================================================
     11. CONTACT FORM
     ================================================================ */
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const message = $('#message').value.trim();
      let valid = true;

      if (!name) { showError('name', 'Name is required'); valid = false; }
      if (!email) { showError('email', 'Email is required'); valid = false; }
      else if (!isValidEmail(email)) { showError('email', 'Enter a valid email'); valid = false; }
      if (!message) { showError('message', 'Message is required'); valid = false; }
      if (!valid) return;

      const btn = $('#submit-btn');
      btn.querySelector('.btn-text').style.display = 'none';
      btn.querySelector('.btn-loading').style.display = 'inline';
      btn.disabled = true;

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject: $('#subject').value, message })
        });
        const data = await res.json();
        if (data.success) {
          btn.querySelector('.btn-loading').style.display = 'none';
          btn.querySelector('.btn-success').style.display = 'inline';
          btn.classList.add('success');
          form.reset();
          setTimeout(() => {
            btn.querySelector('.btn-success').style.display = 'none';
            btn.querySelector('.btn-text').style.display = 'inline';
            btn.disabled = false;
            btn.classList.remove('success');
          }, 3000);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        btn.querySelector('.btn-loading').style.display = 'none';
        btn.querySelector('.btn-text').style.display = 'inline';
        btn.disabled = false;
        showError('message', err.message || 'Something went wrong. Please try again.');
      }
    });
  }

  function showError(field, msg) {
    const el = $(`#${field}-error`);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
    $(`#${field}`).classList.add('invalid');
  }

  function clearErrors() {
    $$('.form-error').forEach(el => { el.textContent = ''; el.style.display = 'none'; });
    $$('.invalid').forEach(el => el.classList.remove('invalid'));
  }

  function isValidEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  /* ================================================================
     12. NEWSLETTER FORM
     ================================================================ */
  function initNewsletter() {
    const form = $('#newsletter-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = $('#nl-email').value.trim();
      const status = $('#nl-status');
      const btn = $('#nl-btn');

      if (!email || !isValidEmail(email)) {
        status.textContent = 'Please enter a valid email.';
        status.className = 'nl-status error';
        return;
      }

      btn.disabled = true;
      btn.textContent = '...';

      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (data.success) {
          status.textContent = 'You\'re subscribed! Welcome aboard.';
          status.className = 'nl-status success';
          form.reset();
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        status.textContent = err.message || 'Something went wrong.';
        status.className = 'nl-status error';
      }
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    });
  }

  /* ================================================================
     13. BACK TO TOP
     ================================================================ */
  function initBackToTop() {
    const btn = $('#back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ================================================================
     14. PARALLAX ON SCROLL
     ================================================================ */
  function initParallax() {
    const sparkles = $$('.sparkle');
    if (!sparkles.length) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      sparkles.forEach((s, i) => {
        s.style.transform = `translateY(${y * (0.03 + i * 0.015)}px)`;
      });
    }, { passive: true });
  }

  /* ================================================================
     15. KEYBOARD NAVIGATION
     ================================================================ */
  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.menuOpen) closeMobileMenu();
    });
  }

  /* ================================================================
     INIT
     ================================================================ */
  function init() {
    initLoader();
    initNavigation();
    initActiveNav();
    initMobileMenu();
    initHeaderScroll();
    initReveal();
    initCounters();
    initProjects();
    initBlog();
    initBlogModal();
    initContactForm();
    initNewsletter();
    initBackToTop();
    initParallax();
    initKeyboard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
