/* ══════════════════════════════════════
   GIET — Main JavaScript
   ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Hero Slider (index.html) ─────── */
  var slides = document.querySelectorAll('.hero-slide');
  var dots   = document.querySelectorAll('.hero-dot');
  if (slides.length) {
    var current = 0;
    var sliderTimer;

    function goTo(index) {
      slides[current].style.opacity = '0';
      slides[current].style.pointerEvents = 'none';
      dots[current].style.height = '2px';
      dots[current].style.width  = '20px';
      dots[current].style.backgroundColor = 'rgba(255,255,255,0.2)';

      current = (index + slides.length) % slides.length;

      slides[current].style.opacity = '1';
      slides[current].style.pointerEvents = '';
      dots[current].style.height = '3px';
      dots[current].style.width  = '32px';
      dots[current].style.backgroundColor = '#18909C';
    }

    function startAuto() {
      sliderTimer = setInterval(function () { goTo(current + 1); }, 5000);
    }

    function resetAuto() {
      clearInterval(sliderTimer);
      startAuto();
    }

    var prevBtn = document.getElementById('hero-prev');
    var nextBtn = document.getElementById('hero-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); resetAuto(); });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () { goTo(+dot.dataset.index); resetAuto(); });
    });

    startAuto();
  }

  /* ── Tab filter switching ─────────── */
  document.querySelectorAll('[data-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.closest('[data-tab-group]');
      if (!group) return;
      group.querySelectorAll('[data-tab]').forEach(function (b) {
        b.classList.remove('border-[#8B1D2F]', 'text-[#003054]', 'font-semibold');
        b.classList.add('border-transparent', 'text-[#64748B]', 'font-medium');
      });
      btn.classList.remove('border-transparent', 'text-[#64748B]', 'font-medium');
      btn.classList.add('border-[#8B1D2F]', 'text-[#003054]', 'font-semibold');
    });
  });

  /* ── Copy link button ─────────────── */
  var copyBtn = document.getElementById('copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        var orig = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(function () { copyBtn.textContent = orig; }, 2000);
      });
    });
  }

  /* ── Smooth scroll ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
