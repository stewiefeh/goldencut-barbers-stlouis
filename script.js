// Golden Cut Barbers — quiet interactions, one load moment, reduced-motion aware.
(function () {
  var root = document.documentElement;

  // header chrome once the page leaves the top
  var top = document.querySelector('.top');
  var onScroll = function () {
    top.classList.toggle('solid', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // the pole only starts spinning after the hero has painted
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { root.classList.add('loaded'); });
  });

  // small rise-in on section heads and photos, once
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.18 });
    document.querySelectorAll('.sec-head, .photo-row figure, .ticket, .services-note, blockquote, .visit > div').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
})();
