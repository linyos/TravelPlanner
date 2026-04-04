/* ═══════ Gallery Module ═══════ */
const GalleryModule = (() => {
  let currentIndex = 0;
  let filteredItems = [];

  function renderGallery(items) {
    const scroll = document.getElementById('galleryScroll');
    if (!scroll) return;

    filteredItems = items;
    if (!items.length) {
      scroll.innerHTML = '<div class="gallery-empty">🐱 目前還沒有照片，旅程結束後再來看看吧！</div>';
      return;
    }

    scroll.innerHTML = items.map((item, i) => `
      <div class="gallery-card" data-index="${i}" data-tag="${sanitizeHTML(item.tag)}">
        <div class="card-image-wrap">
          <div class="card-image-placeholder ${sanitizeHTML(item.bgClass)}">${item.emoji}</div>
        </div>
        <div class="gallery-card-body">
          <div class="gallery-card-title">${sanitizeHTML(item.title)}</div>
          <div class="gallery-card-sub">${sanitizeHTML(item.subtitle)}</div>
          <span class="gallery-card-tag">${sanitizeHTML(item.tag)}</span>
        </div>
      </div>`).join('');

    scroll.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-card');
      if (card) {
        const idx = parseInt(card.dataset.index, 10);
        openLightbox(idx);
      }
    });

    bindTagFilters(items);
  }

  function bindTagFilters(allItems) {
    const tagsEl = document.getElementById('galleryTags');
    if (!tagsEl) return;

    tagsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery-tag');
      if (!btn) return;

      tagsEl.querySelectorAll('.gallery-tag').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tag = btn.dataset.tag;
      const filtered = tag === 'all' ? allItems : allItems.filter(item => item.tag === tag);
      renderGallery(filtered);
    });
  }

  function openLightbox(index) {
    currentIndex = index;
    const item = filteredItems[index];
    if (!item) return;

    const html = `
      <div style="text-align:center;">
        <div class="card-image-placeholder ${sanitizeHTML(item.bgClass)}" style="width:70vw;max-width:600px;aspect-ratio:16/10;margin:0 auto;font-size:5rem;border-radius:12px;">${item.emoji}</div>
        <div class="lightbox-caption">${sanitizeHTML(item.title)} — ${sanitizeHTML(item.subtitle)}</div>
      </div>
      <button class="lightbox-nav lightbox-prev" aria-label="上一張"><i class="fas fa-chevron-left"></i></button>
      <button class="lightbox-nav lightbox-next" aria-label="下一張"><i class="fas fa-chevron-right"></i></button>`;

    ModalModule.openModal(html, true);

    // nav events
    const prev = document.querySelector('.lightbox-prev');
    const next = document.querySelector('.lightbox-next');
    if (prev) prev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
    if (next) next.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

    // keyboard
    const keyHandler = (e) => {
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    document.addEventListener('keydown', keyHandler);

    // cleanup on close
    const obs = new MutationObserver(() => {
      const overlay = document.getElementById('modalOverlay');
      if (overlay && !overlay.classList.contains('active')) {
        document.removeEventListener('keydown', keyHandler);
        obs.disconnect();
      }
    });
    obs.observe(document.getElementById('modalOverlay'), { attributes: true, attributeFilter: ['class'] });
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + filteredItems.length) % filteredItems.length;
    openLightbox(currentIndex);
  }

  return { renderGallery };
})();
