// ===================================
// PATRIOTS NATION — scripts.js
// ===================================

document.addEventListener('DOMContentLoaded', function () {

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scrollBehavior = reduceMotion ? 'auto' : 'smooth';

  // -----------------------------------
  // 1. MOBILE NAVIGATION
  // -----------------------------------
  var menuToggle = document.querySelector('.mobile-menu-toggle');
  var navUl = document.querySelector('nav ul');

  if (menuToggle && navUl) {
    var setMenu = function (open) {
      menuToggle.classList.toggle('active', open);
      navUl.classList.toggle('active', open);
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    menuToggle.addEventListener('click', function () {
      setMenu(!navUl.classList.contains('active'));
    });

    // Close when a link is tapped — otherwise the menu stays open
    // over the new page on mobile.
    navUl.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    // Close on Escape, and return focus to the button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navUl.classList.contains('active')) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    // Close when tapping outside the nav.
    document.addEventListener('click', function (e) {
      if (!navUl.classList.contains('active')) return;
      if (e.target.closest('nav')) return;
      setMenu(false);
    });
  }

  // -----------------------------------
  // 2. BACK TO TOP
  // -----------------------------------
  var backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    var ticking = false;

    var updateBtn = function () {
      var show = window.scrollY > 300;
      backToTopBtn.classList.toggle('visible', show);
      // Keep it out of the tab order while it's invisible.
      backToTopBtn.setAttribute('tabindex', show ? '0' : '-1');
      backToTopBtn.setAttribute('aria-hidden', show ? 'false' : 'true');
      ticking = false;
    };

    // Throttled to one update per animation frame instead of one per
    // scroll event — the original fired hundreds of times a second.
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateBtn);
        ticking = true;
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: scrollBehavior });
    });

    updateBtn();
  }

  // -----------------------------------
  // 3. ACTIVE NAVIGATION
  // -----------------------------------
  // Normalises both sides to a trailing-slash path so Jekyll's pretty
  // URLs match. Handles /blog/, /blog, /blog/index.html and /.
  var normalise = function (path) {
    try {
      path = new URL(path, window.location.origin).pathname;
    } catch (err) {
      return null;
    }
    path = path.replace(/index\.html?$/, '');
    if (!path.endsWith('/')) path += '/';
    return path;
  };

  var currentPath = normalise(window.location.pathname);
  var navLinks = document.querySelectorAll('nav ul li a');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href || link.hostname !== window.location.hostname) return;

    var linkPath = normalise(href);
    if (!linkPath) return;

    // Exact match for the home link; prefix match elsewhere so a post
    // at /blog/2026/05/23/... still lights up "Posts".
    var isActive = linkPath === '/'
      ? currentPath === '/'
      : currentPath.indexOf(linkPath) === 0;

    if (isActive) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // -----------------------------------
  // 4. SMOOTH SCROLL FOR ANCHORS
  // -----------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');

      // A bare "#" would throw inside querySelector.
      if (!targetId || targetId === '#') return;

      var targetElement = document.getElementById(targetId.slice(1));
      if (!targetElement) return;

      e.preventDefault();
      targetElement.scrollIntoView({ behavior: scrollBehavior, block: 'start' });

      // Move keyboard focus too, or screen-reader users stay put.
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });

      history.pushState(null, '', targetId);
    });
  });

  // -----------------------------------
  // 5. LAZY LOADING — removed
  // -----------------------------------
  // Replaced by the browser's native lazy loading. Add these two
  // attributes to the <img> tags in post.html, blog.html and home.html:
  //
  //   <img src="..." alt="..." loading="lazy" decoding="async"
  //        width="1200" height="675">
  //
  // Exception: the hero image and the post hero should use
  // loading="eager" fetchpriority="high" — they are above the fold,
  // and lazy-loading them delays your largest contentful paint.
  //
  // Always set width and height. Without them the page reflows as
  // each image arrives, which is most of the jump you see on mobile.

});