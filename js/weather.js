/* ═══════ Weather Module ═══════ */
const WeatherModule = (() => {
  const API_BASE = 'https://api.open-meteo.com/v1/forecast';
  const CACHE_TTL = 30 * 60 * 1000; // 30 min

  const WMO_ICONS = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌦️', 55: '🌧️',
    56: '🌧️', 57: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '🌧️',
    66: '🌧️', 67: '🌧️',
    71: '🌨️', 73: '🌨️', 75: '❄️',
    77: '❄️',
    80: '🌦️', 81: '🌧️', 82: '⛈️',
    85: '🌨️', 86: '❄️',
    95: '⛈️', 96: '⛈️', 99: '⛈️',
  };

  const WMO_DESC = {
    0: '晴朗', 1: '大致晴朗', 2: '局部多雲', 3: '多雲',
    45: '霧', 48: '霧凇',
    51: '小毛毛雨', 53: '毛毛雨', 55: '密集毛毛雨',
    61: '小雨', 63: '中雨', 65: '大雨',
    71: '小雪', 73: '中雪', 75: '大雪', 77: '雪粒',
    80: '陣雨', 81: '中陣雨', 82: '強陣雨',
    85: '小陣雪', 86: '大陣雪',
    95: '雷暴', 96: '雷暴伴冰雹', 99: '強雷暴伴冰雹',
  };

  function getCatSvg(code) {
    if (code <= 1) return 'neko-sun';
    if (code <= 3 || code === 45 || code === 48) return 'neko-walk';
    if (code >= 71 && code <= 77) return 'neko-snow';
    if (code >= 51) return 'neko-umbrella';
    return 'neko-walk';
  }

  function getClothingSuggestion(temp) {
    if (temp <= 0) return '🧥 極寒！厚羽絨衣 + 圍巾手套帽子全副武裝';
    if (temp <= 5) return '🧥 很冷，建議厚外套 + 毛衣 + 圍巾';
    if (temp <= 10) return '🧶 偏冷，外套 + 薄毛衣 + 長褲';
    if (temp <= 15) return '🧥 舒適偏涼，薄外套 + 長袖即可';
    if (temp <= 20) return '👕 舒適，長袖或薄外套備用';
    return '☀️ 溫暖，短袖加薄外套防晚間涼';
  }

  function getTripPhase() {
    const today = new Date();
    const dep = new Date(TRIP_DATA.meta.departureDate);
    const ret = new Date(TRIP_DATA.meta.returnDate);
    if (today < dep) return 'before';
    if (today > ret) return 'after';
    return 'during';
  }

  function getTodaySchedule() {
    const todayStr = getTodayDateStr();
    return TRIP_DATA.days.find(d => d.date === todayStr) || null;
  }

  function cacheGet(key) {
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) { sessionStorage.removeItem(key); return null; }
      return data;
    } catch { return null; }
  }

  function cacheSet(key, data) {
    try { sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch { /* */ }
  }

  async function fetchWeather(lat, lng) {
    const cacheKey = `weather_${lat}_${lng}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const url = `${API_BASE}?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lng)}&current_weather=true&hourly=temperature_2m,precipitation_probability,weathercode&timezone=auto&forecast_days=1`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather API error');
      const data = await res.json();
      cacheSet(cacheKey, data);
      return data;
    } catch (e) {
      console.warn('Weather fetch failed:', e);
      return null;
    }
  }

  function renderWeatherBanner(container) {
    const phase = getTripPhase();

    if (phase === 'after') {
      container.innerHTML = `
        <div class="weather-post-trip">
          <div class="post-trip-label">🐱 旅程回憶模式</div>
          <p style="color:#999;font-size:0.9rem;">美好的14天旅程已經結束，期待下次冒險！</p>
        </div>`;
      return;
    }

    if (phase === 'before') {
      const cd = getCountdown(TRIP_DATA.meta.departureDate);
      const schedule = TRIP_DATA.days[1]; // show Munich weather preview
      container.innerHTML = `
        <div class="weather-pre-trip">
          <div class="pre-trip-label">🐱 距離出發還有</div>
          <div class="pre-trip-days">${cd.days} 天</div>
          <p style="color:#999;font-size:0.85rem;margin-top:8px;">正在查詢慕尼黑天氣預覽...</p>
        </div>`;
      fetchWeather(schedule.coordinates.lat, schedule.coordinates.lng).then(data => {
        if (!data || !data.current_weather) return;
        const cw = data.current_weather;
        const icon = WMO_ICONS[cw.weathercode] || '🌤️';
        const desc = WMO_DESC[cw.weathercode] || '未知';
        container.querySelector('p').textContent = `慕尼黑目前 ${icon} ${cw.temperature}°C ${desc}`;
      });
      return;
    }

    // during trip
    const schedule = getTodaySchedule();
    if (!schedule) {
      container.innerHTML = '<div class="weather-pre-trip"><div class="pre-trip-label">🐱 今天沒有行程安排</div></div>';
      return;
    }

    container.innerHTML = '<div class="weather-loading"><span class="weather-loading-icon">🐾</span><span>正在查詢天氣...</span></div>';

    fetchWeather(schedule.coordinates.lat, schedule.coordinates.lng).then(data => {
      if (!data || !data.current_weather) {
        container.innerHTML = '<div class="weather-pre-trip"><div class="pre-trip-label">🐱 天氣查詢失敗，但不影響好心情！</div></div>';
        return;
      }

      const cw = data.current_weather;
      const icon = WMO_ICONS[cw.weathercode] || '🌤️';
      const desc = WMO_DESC[cw.weathercode] || '';
      const suggestion = getClothingSuggestion(cw.temperature);
      const catPose = getCatSvg(cw.weathercode);
      const cityName = schedule.route[schedule.route.length - 1];

      // hourly data
      let hourlyHTML = '';
      if (data.hourly) {
        const nowHour = new Date().getHours();
        const startIdx = Math.max(0, nowHour);
        const endIdx = Math.min(startIdx + 6, data.hourly.time.length);
        for (let i = startIdx; i < endIdx; i++) {
          const hIcon = WMO_ICONS[data.hourly.weathercode[i]] || '🌤️';
          const hTime = data.hourly.time[i].split('T')[1].substring(0, 5);
          hourlyHTML += `<div class="hourly-item"><div class="hourly-time">${sanitizeHTML(hTime)}</div><div class="hourly-icon">${hIcon}</div><div class="hourly-temp">${data.hourly.temperature_2m[i]}°</div></div>`;
        }
      }

      container.innerHTML = `
        <div class="weather-content">
          <div class="weather-main">
            <div class="weather-icon-wrap">${icon}</div>
            <div class="weather-info">
              <div class="weather-city">DAY ${schedule.day} · ${sanitizeHTML(cityName)}</div>
              <div class="weather-temp">${cw.temperature}°C</div>
              <div class="weather-desc">${sanitizeHTML(desc)}</div>
              <div class="weather-details">
                <span><i class="fas fa-wind"></i> ${cw.windspeed} km/h</span>
              </div>
              <div class="weather-suggestion"><i class="fas fa-tshirt"></i> ${sanitizeHTML(suggestion)}</div>
            </div>
          </div>
          <div class="weather-cat"><div class="cat-emoji" style="font-size:3rem;">🐱</div></div>
        </div>
        ${hourlyHTML ? `<div class="weather-hourly">${hourlyHTML}</div>` : ''}`;

      // dispatch event for cat module
      document.dispatchEvent(new CustomEvent('weatherLoaded', { detail: { catPose, weatherCode: cw.weathercode } }));
    });
  }

  function renderDayWeatherWidget(dayEl, day) {
    fetchWeather(day.coordinates.lat, day.coordinates.lng).then(data => {
      if (!data || !data.current_weather) return;
      const cw = data.current_weather;
      const icon = WMO_ICONS[cw.weathercode] || '🌤️';
      const widget = document.createElement('div');
      widget.className = 'day-weather-widget';
      widget.innerHTML = `<span class="dw-icon">${icon}</span><span class="dw-temp">${cw.temperature}°C</span>`;
      dayEl.appendChild(widget);
    });
  }

  return { renderWeatherBanner, renderDayWeatherWidget, getTripPhase, getTodaySchedule, getCatSvg, WMO_ICONS };
})();
