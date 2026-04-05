/* ═══════ App Entry Point ═══════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar ── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navLinks'); // Fix #1: was 'navMenu', HTML id is 'navLinks'

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open'); // Fix #2: CSS expects 'open', not 'active'
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
  }

  // Active link highlight + smooth scroll
  const navLinks = document.querySelectorAll('.nav-links a'); // Fix #3: <a> tags have no .nav-link class
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      if (navMenu) navMenu.classList.remove('open'); // Fix #4: null guard + correct class
      if (hamburger) hamburger.classList.remove('active');
    });
  });

  // Navbar scroll effect
  const onScroll = throttle(() => {
    if (!navbar) return; // Fix #5: null guard before classList use
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // active section highlight
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }, 100);
  window.addEventListener('scroll', onScroll);

  /* ── Countdown Timer ── */
  const countdownEls = {
    days: document.getElementById('countDays'),
    hours: document.getElementById('countHours'),
    minutes: document.getElementById('countMinutes'),
    seconds: document.getElementById('countSeconds'),
  };

  let countdownInterval = null;

  function updateCountdown() {
    const cd = getCountdown(TRIP_DATA.meta.departureDate);
    if (cd.expired) {
      if (countdownInterval !== null) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      if (countdownEls.days) countdownEls.days.textContent = '0';
      if (countdownEls.hours) countdownEls.hours.textContent = '0';
      if (countdownEls.minutes) countdownEls.minutes.textContent = '0';
      if (countdownEls.seconds) countdownEls.seconds.textContent = '0';
      const heroTitle = document.querySelector('.hero-subtitle');
      if (heroTitle) heroTitle.textContent = '旅程中或已結束，好好享受！';
      return;
    }
    if (countdownEls.days) countdownEls.days.textContent = cd.days;
    if (countdownEls.hours) countdownEls.hours.textContent = cd.hours;
    if (countdownEls.minutes) countdownEls.minutes.textContent = cd.minutes;
    if (countdownEls.seconds) countdownEls.seconds.textContent = cd.seconds;
  }
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);

  /* ── Weather ── */
  const weatherBanner = document.getElementById('weatherBanner');
  if (weatherBanner) WeatherModule.renderWeatherBanner(weatherBanner);

  /* ── Overview Counter Animation ── */
  AnimationModule.initCounters();

  /* ── Map ── */
  MapModule.initMap();

  /* ── Timeline ── */
  TimelineModule.renderTimeline(TRIP_DATA.days);

  /* ── Gallery ── */
  GalleryModule.renderGallery(GALLERY_DATA);

  /* ── Modal ── */
  ModalModule.init();

  /* ── Info Accordions ── */
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasOpen = item.classList.contains('open');
      // close all, reset aria
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        const h = i.querySelector('.accordion-header');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Hotel Table Rendering ── */
  const hotelTable = document.getElementById('hotelTableBody');
  if (hotelTable) {
    hotelTable.innerHTML = TRIP_DATA.days
      .filter(d => d.hotel.name && d.hotel.name !== '—' && d.hotel.name !== '機上')
      .map(d => {
        const stars = d.hotel.stars ? renderStars(d.hotel.stars) : '';
        return `<tr>
          <td>DAY ${d.day}</td>
          <td>${sanitizeHTML(d.hotel.name)}</td>
          <td>${stars}</td>
          <td>${sanitizeHTML(d.hotel.location || d.route[d.route.length - 1])}</td>
        </tr>`;
      }).join('');
  }

  /* ── Packing Checklist ── */
  const checklistEl = document.getElementById('packingChecklist');
  if (checklistEl) {
    const saved = getFromLocal('packingChecked') || {};
    let html = '';
    PACKING_LIST.forEach((cat, catIdx) => {
      html += `<div class="checklist-category"><h4>${sanitizeHTML(cat.category)}</h4><div class="checklist-grid">`;
      cat.items.forEach((item, itemIdx) => {
        const key = `${catIdx}_${itemIdx}`; // index-based key avoids underscore collision
        const checked = saved[key] ? 'checked' : '';
        html += `<label class="checklist-item">
          <input type="checkbox" data-key="${sanitizeHTML(key)}" ${checked}>
          <span>${sanitizeHTML(item)}</span>
        </label>`;
      });
      html += '</div></div>';
    });
    checklistEl.innerHTML = html;

    checklistEl.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const current = getFromLocal('packingChecked') || {};
        current[e.target.dataset.key] = e.target.checked;
        saveToLocal('packingChecked', current);
      }
    });
  }

  /* ── Back to Top ── */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', throttle(() => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 600);
    }, 200));
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Cat Companion ── */
  CatModule.init();

  /* ── Scroll Animations (last) ── */
  AnimationModule.initObserver();

  console.log('🐱 旅伴小橘已就位！旅程網站載入完成 ✈️');
});
