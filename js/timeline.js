/* ═══════ Timeline Module ═══════ */
const TimelineModule = (() => {
  let container;

  function getTransportEmoji(type) {
    return getTransportIcon(type);
  }

  function getDayThumbnail(dayNum) {
    if (typeof GALLERY_DATA === 'undefined') return null;
    const match = GALLERY_DATA.find(g => g.day === dayNum && g.image);
    return match || null;
  }

  function hasCityDetail(dayNum) {
    return typeof CITY_DETAILS !== 'undefined' && !!CITY_DETAILS[dayNum];
  }

  function buildCityDetailHTML(dayNum) {
    const detail = CITY_DETAILS[dayNum];
    if (!detail) return '';
    let html = `<div class="city-detail-modal">`;
    html += `<div class="city-detail-header">`;
    html += `<span class="city-detail-emoji">${sanitizeHTML(detail.heroEmoji)}</span>`;
    html += `<h2 class="city-detail-title">${sanitizeHTML(detail.city)} <small>${sanitizeHTML(detail.cityEN)}</small></h2>`;
    html += `</div>`;
    html += `<p class="city-detail-intro">${sanitizeHTML(detail.intro)}</p>`;

    detail.sections.forEach(section => {
      html += `<div class="city-detail-section">`;
      html += `<h3 class="city-detail-section-title"><span>${sanitizeHTML(section.icon)}</span> ${sanitizeHTML(section.title)}</h3>`;
      html += `<div class="city-detail-items">`;
      section.items.forEach(item => {
        html += `<div class="city-detail-item">`;
        html += `<h4 class="city-detail-item-name">${sanitizeHTML(item.name)}</h4>`;
        html += `<p class="city-detail-item-desc">${sanitizeHTML(item.desc)}</p>`;
        html += `</div>`;
      });
      html += `</div></div>`;
    });

    html += `</div>`;
    return html;
  }

  function openCityDetail(dayNum) {
    const html = buildCityDetailHTML(dayNum);
    if (html) ModalModule.openModal(html, false);
  }

  function renderTimeline(days) {
    container = document.getElementById('timeline-container');
    if (!container) return;

    const todayStr = getTodayDateStr();
    let html = '';

    days.forEach((day, idx) => {
      const isCurrent = day.date === todayStr;
      const currentClass = isCurrent ? 'current-day' : '';
      const expandedClass = isCurrent ? 'expanded' : '';
      const stars = day.hotel.stars ? renderStars(day.hotel.stars) : '';
      const hotelName = day.hotel.name ? sanitizeHTML(day.hotel.name) : '—';

      let highlightTags = '';
      if (day.highlights.length) {
        highlightTags = '<div class="timeline-highlights">' +
          day.highlights.map(h => `<span class="timeline-highlight-tag">${sanitizeHTML(h)}</span>`).join('') +
          '</div>';
      }

      // cat decoration every 3 days
      let catDeco = '';
      if (idx % 3 === 1 && idx < days.length - 1) {
        const catNames = ['neko-wave', 'neko-camera', 'neko-sun', 'neko-walk', 'neko-umbrella'];
        const name = catNames[Math.floor(idx / 3) % catNames.length];
        catDeco = `<div class="timeline-cat">${catImgTag(name, 'timeline-cat-img', '旅伴小橘')}</div>`;
      }

      html += `
        <div class="timeline-item ${currentClass} animate-on-scroll" data-day="${day.day}">
          <span class="timeline-badge">DAY ${String(day.day).padStart(2, '0')}</span>
          ${catDeco}
          <div class="timeline-card ${expandedClass}" data-day-index="${idx}">
            <div class="timeline-card-header">
              <span class="timeline-title">${sanitizeHTML(day.title)}</span>
              ${(() => {
                const thumb = getDayThumbnail(day.day);
                const hasDetail = hasCityDetail(day.day);
                if (thumb) {
                  const detailClass = hasDetail ? ' has-city-detail' : '';
                  const detailAttr = hasDetail ? ` data-city-detail="${day.day}"` : '';
                  const detailHint = hasDetail ? '<span class="thumb-detail-hint"><i class="fas fa-search-plus"></i></span>' : '';
                  return `<span class="timeline-thumb${detailClass}" title="${sanitizeHTML(thumb.title)}"${detailAttr}><img src="${sanitizeHTML(thumb.image)}" alt="${sanitizeHTML(thumb.title)}" data-fallback="${getTransportEmoji(day.transport)}" data-fallback-title="${sanitizeHTML(getTransportLabel(day.transport))}">${detailHint}</span>`;
                }
                return `<span class="timeline-transport" title="${sanitizeHTML(getTransportLabel(day.transport))}">${getTransportEmoji(day.transport)}</span>`;
              })()}
            </div>
            <div class="timeline-date">${sanitizeHTML(day.date)} (${sanitizeHTML(day.weekday)})</div>
            <div class="timeline-toggle">
              <span>${isCurrent ? '收合詳情' : '展開詳情'}</span>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="timeline-detail">
              <div class="timeline-summary">${sanitizeHTML(day.summary)}</div>
              ${highlightTags}
              <div class="timeline-hotel">
                <i class="fas fa-bed"></i>
                <span>${hotelName}</span>
                ${stars ? `<span class="timeline-stars">${stars}</span>` : ''}
              </div>
              <button class="timeline-weather-btn" data-day="${day.day}" data-lat="${day.coordinates.lat}" data-lng="${day.coordinates.lng}" data-date="${day.date}" data-day-idx="${idx}">
                <i class="fas fa-cloud-sun"></i> 查詢當地天氣
              </button>
              <div class="timeline-day-weather" id="day-weather-${day.day}"></div>
            </div>
          </div>
        </div>`;
    });

    container.innerHTML = html;

    // thumbnail fallback: replace with transport emoji on error
    container.querySelectorAll('.timeline-thumb img').forEach(img => {
      img.addEventListener('error', () => {
        const emoji = img.dataset.fallback;
        const title = img.dataset.fallbackTitle;
        const span = document.createElement('span');
        span.className = 'timeline-transport';
        span.title = title;
        span.textContent = emoji;
        img.closest('.timeline-thumb').replaceWith(span);
      }, { once: true });
    });

    bindEvents();

    // scroll to current day
    if (todayStr) {
      const currentEl = container.querySelector('.current-day');
      if (currentEl) {
        setTimeout(() => currentEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 800);
      }
    }
  }

  function toggleDayDetail(card) {
    const wasExpanded = card.classList.contains('expanded');
    card.classList.toggle('expanded');
    const toggleText = card.querySelector('.timeline-toggle span');
    if (toggleText) {
      toggleText.textContent = wasExpanded ? '展開詳情' : '收合詳情';
    }
  }

  function bindEvents() {
    if (!container) return;
    container.addEventListener('click', (e) => {
      // handle city detail thumbnail click
      const thumbDetail = e.target.closest('.timeline-thumb[data-city-detail]');
      if (thumbDetail) {
        e.stopPropagation();
        const dayNum = parseInt(thumbDetail.dataset.cityDetail, 10);
        openCityDetail(dayNum);
        return;
      }
      // handle weather button
      const weatherBtn = e.target.closest('.timeline-weather-btn');
      if (weatherBtn) {
        e.stopPropagation();
        const { day, lat, lng, date, dayIdx } = weatherBtn.dataset;
        // Fix #6: look up city name from TRIP_DATA to avoid attribute-injection risk
        const dayData = TRIP_DATA.days[parseInt(dayIdx, 10)];
        const city = dayData ? dayData.route[dayData.route.length - 1] : '';
        weatherBtn.disabled = true;
        weatherBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 查詢中...';
        WeatherModule.renderDayForecast(`day-weather-${day}`, parseFloat(lat), parseFloat(lng), date, city);
        setTimeout(() => { weatherBtn.style.display = 'none'; }, 600);
        return;
      }
      const card = e.target.closest('.timeline-card');
      if (card) toggleDayDetail(card);
    });
  }

  function scrollToDay(dayNum) {
    const item = document.querySelector(`.timeline-item[data-day="${dayNum}"]`);
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const card = item.querySelector('.timeline-card');
      if (card && !card.classList.contains('expanded')) {
        toggleDayDetail(card);
      }
    }
  }

  return { renderTimeline, scrollToDay };
})();
