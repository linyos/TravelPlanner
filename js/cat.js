/* ═══════ Cat Companion Module ═══════ */
const CatModule = (() => {
  let companion, avatar, bubble;
  let clickCount = 0;
  let clickTimer = null;
  let idleTimer = null;
  let currentPose = 'wave';

  // 有圖片的狀態：優先用 .jpg，找不到就 fallback 到 .svg
  const IMAGE_POSES = {
    wave:     { jpg: 'images/cat/neko-wave.jpg',     svg: 'images/cat/neko-wave.svg',     emoji: '😺' },
    walk:     { jpg: 'images/cat/neko-walk.jpg',     svg: 'images/cat/neko-walk.svg',     emoji: '🐱' },
    sun:      { jpg: 'images/cat/neko-sun.jpg',      svg: 'images/cat/neko-sun.svg',      emoji: '😸' },
    umbrella: { jpg: 'images/cat/neko-umbrella.jpg', svg: 'images/cat/neko-umbrella.svg', emoji: '🙀' },
  };

  // 純 emoji 的狀態
  const EMOJI_POSES = {
    sleep: '😴',
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

    renderAvatar('wave');
    companion.dataset.pose = 'wave';

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

  function renderAvatar(pose) {
    if (!avatar) return;
    const imgData = IMAGE_POSES[pose];
    const ALT_TEXT = {
      wave:     '旅伴小橘揮手歡迎',
      walk:     '旅伴小橘散步中',
      sun:      '旅伴小橘曬太陽',
      umbrella: '旅伴小橘撐傘',
    };
    if (imgData) {
      const img = new Image();
      img.className = 'cat-img';
      img.alt = ALT_TEXT[pose] || '旅伴小橘';
      img.onload = () => { avatar.innerHTML = ''; avatar.appendChild(img); };
      img.onerror = () => {
        const svgImg = new Image();
        svgImg.className = 'cat-img';
        svgImg.alt = ALT_TEXT[pose] || '旅伴小橘';
        svgImg.onload = () => { avatar.innerHTML = ''; avatar.appendChild(svgImg); };
        svgImg.onerror = () => { avatar.innerHTML = `<span class="cat-emoji">${imgData.emoji}</span>`; };
        svgImg.src = imgData.svg;
      };
      img.src = imgData.jpg;
    } else {
      const emoji = EMOJI_POSES[pose] || IMAGE_POSES.wave.emoji;
      avatar.innerHTML = `<span class="cat-emoji">${emoji}</span>`;
    }
  }

  function setPose(pose) {
    if (!avatar) return;
    currentPose = pose;
    renderAvatar(pose);
    // use data-pose attribute for CSS animation state (cleaner than multi-class toggle)
    companion.dataset.pose = pose === 'wave' ? 'wave' : pose === 'sleep' ? 'sleep' : 'idle';
    companion.classList.remove('belly-up'); // clean up temporary easter egg state
  }

  function onCatClick() {
    clickCount++;
    clearTimeout(clickTimer);

    // easter egg: 5 clicks -> belly flip
    if (clickCount >= 5) {
      clickCount = 0;
      companion.classList.add('belly-up');
      renderAvatar('belly');
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
    // wake from sleep immediately if active
    if (companion.dataset.pose === 'sleep') {
      companion.dataset.pose = 'idle';
    }

    idleTimer = setTimeout(() => {
      // go to sleep after 30s idle
      setPose('sleep');

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
