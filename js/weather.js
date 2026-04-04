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

  async function fetchDayForecast(lat, lng, dateStr) {
    const cacheKey = `dayforecast_${lat}_${lng}_${dateStr}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const url = `${API_BASE}?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lng)}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,windspeed_10m_max&start_date=${encodeURIComponent(dateStr)}&end_date=${encodeURIComponent(dateStr)}&timezone=auto`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather API error');
      const data = await res.json();
      cacheSet(cacheKey, data);
      return data;
    } catch (e) {
      console.warn('Day forecast fetch failed:', e);
      return null;
    }
  }

  function renderDayForecast(containerId, lat, lng, dateStr, cityName) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '<div class="day-weather-loading"><span class="weather-loading-icon">🐾</span> 正在查詢天氣...</div>';

    fetchDayForecast(lat, lng, dateStr).then(data => {
      if (!data || !data.daily || !data.daily.time || !data.daily.time.length) {
        container.innerHTML = '<div class="day-weather-error">🐱 暫時無法取得天氣資料</div>';
        return;
      }

      const d = data.daily;
      const code = d.weathercode[0];
      const icon = WMO_ICONS[code] || '🌤️';
      const desc = WMO_DESC[code] || '未知';
      const tMax = d.temperature_2m_max[0];
      const tMin = d.temperature_2m_min[0];
      const rain = d.precipitation_probability_max[0];
      const wind = d.windspeed_10m_max[0];
      const suggestion = getClothingSuggestion((tMax + tMin) / 2);

      let rainBar = '';
      if (rain !== null && rain !== undefined) {
        const rainColor = rain > 60 ? '#5b9bd5' : rain > 30 ? '#a8c8e8' : '#c8e6c9';
        rainBar = `
          <div class="dfw-rain">
            <span class="dfw-rain-label"><i class="fas fa-umbrella"></i> 降雨機率</span>
            <div class="dfw-rain-bar-bg">
              <div class="dfw-rain-bar-fill" style="width:${rain}%;background:${rainColor}"></div>
            </div>
            <span class="dfw-rain-val">${rain}%</span>
          </div>`;
      }

      container.innerHTML = `
        <div class="day-forecast-card">
          <div class="dfw-header">
            <span class="dfw-icon">${icon}</span>
            <span class="dfw-desc">${sanitizeHTML(desc)}</span>
          </div>
          <div class="dfw-temps">
            <div class="dfw-temp-item">
              <span class="dfw-temp-label">最高溫</span>
              <span class="dfw-temp-val dfw-temp-max">${tMax}°C</span>
            </div>
            <div class="dfw-temp-divider"></div>
            <div class="dfw-temp-item">
              <span class="dfw-temp-label">最低溫</span>
              <span class="dfw-temp-val dfw-temp-min">${tMin}°C</span>
            </div>
          </div>
          ${rainBar}
          <div class="dfw-details">
            <span><i class="fas fa-wind"></i> 最大風速 ${wind} km/h</span>
          </div>
          <div class="dfw-suggestion"><i class="fas fa-tshirt"></i> ${sanitizeHTML(suggestion)}</div>
        </div>`;
    });
  }

  return { renderWeatherBanner, renderDayWeatherWidget, renderDayForecast, getTripPhase, getTodaySchedule, getCatSvg, WMO_ICONS };
})();
