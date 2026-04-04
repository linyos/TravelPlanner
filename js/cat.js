/* ═══════ Cat Companion Module ═══════ */
const CatModule = (() => {
  let companion, avatar, bubble;
  let clickCount = 0;
  let clickTimer = null;
  let idleTimer = null;
  let currentPose = 'wave';

  const POSES = {
    wave: '😺',
    walk: '🐱',
    sleep: '😴',
    sun: '😸',
    umbrella: '🙀',
    snow: '❄️🐱',
    camera: '📸',
    train: '🚂🐱',
    boat: '⛵🐱',
    belly: '🐾',
  };

  function init() {
    companion = document.getElementById('catCompanion');
    avatar = document.getElementById('catAvatar');
    bubble = document.getElementById('catBubble');
    if (!companion) return;

    avatar.innerHTML = `<span class="cat-emoji">${POSES.wave}</span>`;
    companion.classList.add('waving');

    companion.addEventListener('click', onCatClick);
    companion.addEventListener('mouseenter', () => resetIdle());

    // section observer for pose changes
    setupSectionObserver();
    resetIdle();

    // listen for weather events
    document.addEventListener('weatherLoaded', (e) => {
      if (e.detail && e.detail.catPose) {
        // map to our poses
        const poseMap = {
          'neko-sun': 'sun',
          'neko-walk': 'walk',
          'neko-umbrella': 'umbrella',
          'neko-snow': 'snow',
        };
        const pose = poseMap[e.detail.catPose] || 'walk';
        setPose(pose);
      }
    });
  }

  function setPose(pose) {
    if (!avatar) return;
    currentPose = pose;
    const emoji = POSES[pose] || POSES.wave;
    avatar.innerHTML = `<span class="cat-emoji">${emoji}</span>`;

    companion.classList.remove('waving', 'idle', 'sleeping', 'belly-up');
    if (pose === 'wave') companion.classList.add('waving');
    else if (pose === 'sleep') companion.classList.add('sleeping');
    else companion.classList.add('idle');
  }

  function onCatClick() {
    clickCount++;
    clearTimeout(clickTimer);

    // easter egg: 5 clicks -> belly flip
    if (clickCount >= 5) {
      clickCount = 0;
      companion.classList.add('belly-up');
      avatar.innerHTML = `<span class="cat-emoji">${POSES.belly}</span>`;
      showBubble('喵嗚～被發現了！(翻肚)');
      setTimeout(() => {
        companion.classList.remove('belly-up');
        setPose(currentPose);
      }, 2000);
      return;
    }

    clickTimer = setTimeout(() => { clickCount = 0; }, 1500);

    // show random fact
    const fact = CAT_FACTS[Math.floor(Math.random() * CAT_FACTS.length)];
    showBubble(fact);
    resetIdle();
  }

  function showBubble(text) {
    if (!bubble) return;
    bubble.textContent = text;
    bubble.classList.add('show');
    setTimeout(() => bubble.classList.remove('show'), 4000);
  }

  function resetIdle() {
    clearTimeout(idleTimer);
    companion.classList.remove('sleeping');

    idleTimer = setTimeout(() => {
      // go to sleep after 30s idle
      setPose('sleep');
      companion.classList.add('sleeping');

      // add zzz
      let zzz = companion.querySelector('.cat-zzz');
      if (!zzz) {
        zzz = document.createElement('span');
        zzz.className = 'cat-zzz';
        zzz.textContent = 'zzZ';
        companion.appendChild(zzz);
      }
    }, 30000);
  }

  function setupSectionObserver() {
    const sections = ['hero', 'weather', 'overview', 'map', 'timeline', 'gallery', 'info'];
    const sectionPoses = {
      hero: 'wave',
      weather: 'walk',
      overview: 'walk',
      map: 'walk',
      timeline: 'camera',
      gallery: 'camera',
      info: 'sleep',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const pose = sectionPoses[sectionId] || 'walk';
          setPose(pose);
          resetIdle();
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  return { init, setPose, showBubble };
})();
