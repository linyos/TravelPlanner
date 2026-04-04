/* ═══════ Map Module ═══════ */
const MapModule = (() => {
  let map = null;
  let markers = [];
  let routeLines = [];
  let markerGroup = null;

  const TRANSPORT_COLORS = {
    flight: '#D4726A',
    train: '#D4A843',
    bus: '#7BAE7F',
    boat: '#6B9BC3',
    walk: '#A0785A',
  };

  function createDayIcon(day, isCurrent) {
    return L.divIcon({
      className: 'day-marker' + (isCurrent ? ' current' : ''),
      html: `<div class="day-marker${isCurrent ? ' current' : ''}">${day}</div>`,
      iconSize: isCurrent ? [34, 34] : [28, 28],
      iconAnchor: isCurrent ? [17, 17] : [14, 14],
    });
  }

  function initMap() {
    const mapEl = document.getElementById('tripMap');
    if (!mapEl || map) return;

    map = L.map('tripMap', {
      scrollWheelZoom: true,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer" target="_blank">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    addMarkers(TRIP_DATA.days);
    drawRoutes(TRIP_DATA.days);
    fitBounds();
    bindFilters();
  }

  function addMarkers(days) {
    const todayStr = getTodayDateStr();
    markers = [];

    // deduplicate by coordinates (skip duplicates like DAY 5&6 策馬特)
    const seen = new Set();
    days.forEach(day => {
      const key = `${day.coordinates.lat},${day.coordinates.lng}`;
      const isCurrent = day.date === todayStr;

      if (seen.has(key) && !isCurrent) return;
      seen.add(key);

      const icon = createDayIcon(day.day, isCurrent);
      const marker = L.marker([day.coordinates.lat, day.coordinates.lng], { icon })
        .addTo(map);

      const popupContent = `
        <div class="map-popup">
          <span class="map-popup-day">DAY ${String(day.day).padStart(2, '0')}</span>
          <div class="map-popup-title">${sanitizeHTML(day.title)}</div>
          <div class="map-popup-summary">${sanitizeHTML(day.summary).substring(0, 60)}...</div>
          <span class="map-popup-action" data-goto-day="${day.day}">查看行程詳情 →</span>
        </div>`;
      marker.bindPopup(popupContent, { maxWidth: 250 });

      marker._dayData = day;
      markers.push(marker);
    });

    // popup click -> scroll to timeline
    map.on('popupopen', (e) => {
      const popup = e.popup;
      const el = popup.getElement();
      if (!el) return;
      const action = el.querySelector('.map-popup-action');
      if (action) {
        action.addEventListener('click', () => {
          const dayNum = parseInt(action.dataset.gotoDay, 10);
          TimelineModule.scrollToDay(dayNum);
        });
      }
    });
  }

  function drawRoutes(days) {
    routeLines = [];
    for (let i = 0; i < days.length - 1; i++) {
      const from = days[i];
      const to = days[i + 1];
      const color = TRANSPORT_COLORS[to.transport] || TRANSPORT_COLORS.bus;
      const dashArray = to.transport === 'flight' ? '8, 8' : null;

      const line = L.polyline(
        [[from.coordinates.lat, from.coordinates.lng], [to.coordinates.lat, to.coordinates.lng]],
        { color, weight: 3, opacity: 0.7, dashArray }
      ).addTo(map);

      line._transport = to.transport;
      line._countries = [from.country, to.country];
      routeLines.push(line);
    }
  }

  function fitBounds() {
    if (!markers.length) return;
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
  }

  function bindFilters() {
    const filtersEl = document.getElementById('mapFilters');
    if (!filtersEl) return;

    filtersEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.map-filter');
      if (!btn) return;

      filtersEl.querySelectorAll('.map-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      filterMap(filter);
    });
  }

  function filterMap(country) {
    markers.forEach(m => {
      const day = m._dayData;
      const show = country === 'all' || day.country.includes(country);
      if (show) { if (!map.hasLayer(m)) map.addLayer(m); }
      else { map.removeLayer(m); }
    });

    routeLines.forEach(line => {
      const show = country === 'all' || line._countries.some(c => c.includes(country));
      if (show) { if (!map.hasLayer(line)) map.addLayer(line); }
      else { map.removeLayer(line); }
    });

    if (country === 'all') {
      fitBounds();
    } else {
      const visible = markers.filter(m => map.hasLayer(m));
      if (visible.length) {
        map.fitBounds(L.featureGroup(visible).getBounds().pad(0.15));
      }
    }
  }

  return { initMap };
})();
