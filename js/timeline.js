/* ═══════ Timeline Module ═══════ */
const TimelineModule = (() => {
  let container;

  function getTransportEmoji(type) {
    return getTransportIcon(type);
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
        const poses = ['🐱', '📸', '😸', '😺', '🙀'];
        catDeco = `<div class="timeline-cat"><span style="font-size:2rem">${poses[Math.floor(idx / 3) % poses.length]}</span></div>`;
      }

      html += `
        <div class="timeline-item ${currentClass} animate-on-scroll" data-day="${day.day}">
          <span class="timeline-badge">DAY ${String(day.day).padStart(2, '0')}</span>
          ${catDeco}
          <div class="timeline-card ${expandedClass}" data-day-index="${idx}">
            <div class="timeline-card-header">
              <span class="timeline-title">${sanitizeHTML(day.title)}</span>
              <span class="timeline-transport" title="${sanitizeHTML(getTransportLabel(day.transport))}">${getTransportEmoji(day.transport)}</span>
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
              <div class="timeline-day-weather" id="day-weather-${day.day}"></div>
            </div>
          </div>
        </div>`;
    });

    container.innerHTML = html;
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
