/* ============================================================
   Leaf & Legend — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  // --- Intersection Observer for scroll reveals ---
  function initRevealObserver() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Check for reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      reveals.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Expandable Cards (Contemplative / Technical) ---
  function initExpandableCards() {
    var cards = document.querySelectorAll('.card[role="button"]');
    cards.forEach(function (card) {
      var body = card.querySelector('.card-body');
      if (!body) return;

      // Initialize max-height to 0
      body.style.maxHeight = '0px';

      function toggleCard() {
        var isExpanded = card.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          body.style.maxHeight = '0px';
          card.setAttribute('aria-expanded', 'false');
        } else {
          body.style.maxHeight = body.scrollHeight + 'px';
          card.setAttribute('aria-expanded', 'true');
        }
      }

      card.addEventListener('click', toggleCard);

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard();
        }
      });

      // Collapse button inside the card
      var collapseBtn = card.querySelector('.card-collapse');
      if (collapseBtn) {
        collapseBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          body.style.maxHeight = '0px';
          card.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // --- Equipment Suite Expandable ---
  function initEquipmentSuites() {
    var suites = document.querySelectorAll('.equipment-suite[role="button"]');
    suites.forEach(function (suite) {
      var body = suite.querySelector('.equipment-suite-body');
      if (!body) return;

      body.style.maxHeight = '0px';

      function toggleSuite() {
        var isExpanded = suite.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          body.style.maxHeight = '0px';
          suite.setAttribute('aria-expanded', 'false');
        } else {
          body.style.maxHeight = body.scrollHeight + 'px';
          suite.setAttribute('aria-expanded', 'true');
        }
      }

      var header = suite.querySelector('.equipment-suite-header');
      if (header) {
        header.addEventListener('click', toggleSuite);
        header.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSuite();
          }
        });
      }
    });
  }

  // --- Navigation Active State (scroll spy) ---
  function initScrollSpy() {
    var sections = document.querySelectorAll('.chapter[id]');
    var navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-links a');

    if (!sections.length || !navLinks.length) return;

    function updateActiveLink() {
      var scrollY = window.scrollY + window.innerHeight * 0.3;
      var currentId = '';

      sections.forEach(function (section) {
        if (section.offsetTop <= scrollY) {
          currentId = section.getAttribute('id');
        }
      });

      navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href) return;
        var targetId = href.replace('#', '');
        if (targetId === currentId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    });

    updateActiveLink();
  }

  // --- Smooth Scroll for Nav Links ---
  function initSmoothScroll() {
    var navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-links a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- Product Filter Pills ---
  function initFilterPills() {
    var pills = document.querySelectorAll('.filter-pill');
    var productCards = document.querySelectorAll('.product-card');

    if (!pills.length || !productCards.length) return;

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        // Update active pill
        pills.forEach(function (p) {
          p.classList.remove('active');
        });
        pill.classList.add('active');

        var filter = pill.getAttribute('data-filter');

        productCards.forEach(function (card) {
          if (filter === 'all') {
            card.style.display = '';
          } else {
            var categories = card.getAttribute('data-category') || '';
            if (categories.indexOf(filter) !== -1) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // --- Initialize Everything on DOMContentLoaded ---
  document.addEventListener('DOMContentLoaded', function () {
    initRevealObserver();
    initExpandableCards();
    initEquipmentSuites();
    initScrollSpy();
    initSmoothScroll();
    initFilterPills();
  });
})();
