/* ═══════ Utility Functions ═══════ */

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit', weekday: 'short' });
}

function getCountdown(targetDateStr) {
  const now = new Date();
  const target = new Date(targetDateStr);
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

function saveToLocal(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* quota exceeded */ }
}

function getFromLocal(key) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
}

function getTransportIcon(type) {
  const icons = { flight: '✈️', train: '🚂', bus: '🚌', boat: '⛵', walk: '🚶' };
  return icons[type] || '🚌';
}

function getTransportLabel(type) {
  const labels = { flight: '飛機', train: '火車', bus: '巴士', boat: '遊船', walk: '步行' };
  return labels[type] || '巴士';
}

function renderStars(count) {
  if (!count) return '';
  return '★'.repeat(count) + '☆'.repeat(5 - count);
}

function getTodayDateStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
