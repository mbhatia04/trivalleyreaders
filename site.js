/**
 * Shared mobile UI: site nav toggle + collapsible past events.
 */
(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (header && toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  var mobileQuery = window.matchMedia('(max-width: 640px)');

  document.querySelectorAll('.past-event').forEach(function (card) {
    var title = card.querySelector('.event-title');
    if (!title) return;

    function syncAria() {
      if (mobileQuery.matches) {
        title.setAttribute('role', 'button');
        title.setAttribute('tabindex', '0');
        title.setAttribute('aria-expanded', card.classList.contains('is-expanded') ? 'true' : 'false');
      } else {
        title.removeAttribute('role');
        title.removeAttribute('tabindex');
        title.removeAttribute('aria-expanded');
        card.classList.remove('is-expanded');
      }
    }

    function toggleCard() {
      if (!mobileQuery.matches) return;
      var open = card.classList.toggle('is-expanded');
      title.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    title.addEventListener('click', toggleCard);
    title.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard();
      }
    });

    syncAria();
    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', syncAria);
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(syncAria);
    }
  });
})();
