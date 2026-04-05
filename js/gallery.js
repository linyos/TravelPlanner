/* ═══════ Gallery Module ═══════ */
const GalleryModule = (() => {
  let currentIndex = 0;
  let filteredItems = [];
  let activeKeyHandler = null; // Fix #7: track handler to prevent accumulation

  function makePlaceholderHTML(item, extraStyle) {
    const style = extraStyle ? ` style="${extraStyle}"` : '';
    return `<div class="card-image-placeholder ${sanitizeHTML(item.bgClass)}"${style}>${item.emoji}</div>`;
  }

  function handleImgError(img) {
    const wrap = img.parentElement;
    const index = img.dataset.itemIndex;
    const source = img.dataset.source; // 'card' or 'lightbox'
    const item = filteredItems[index];
    if (!item) return;

    if (source === 'lightbox') {
      const placeholder = document.createElement('div');
      placeholder.className = `card-image-placeholder ${item.bgClass}`;
      placeholder.style.cssText = 'width:70vw;max-width:600px;aspect-ratio:16/10;margin:0 auto;border-radius:12px;font-size:5rem;';
      placeholder.textContent = item.emoji;
      img.replaceWith(placeholder);
    } else {
      wrap.innerHTML = makePlaceholderHTML(item);
    }
  }

  function renderGallery(items) {
    const scroll = document.getElementById('galleryScroll');
    if (!scroll) return;

    filteredItems = items;
    if (!items.length) {
      scroll.innerHTML = '<div class="gallery-empty">🐱 目前還沒有照片，旅程結束後再來看看吧！</div>';
      return;
    }

    scroll.innerHTML = items.map((item, i) => {
      const imageContent = item.image
        ? `<img src="${sanitizeHTML(item.image)}" alt="${sanitizeHTML(item.title)}" loading="lazy" data-item-index="${i}" data-source="card">`
        : makePlaceholderHTML(item);
      return `
      <div class="gallery-card" data-index="${i}" data-tag="${sanitizeHTML(item.tag)}">
        <div class="card-image-wrap">
          ${imageContent}
        </div>
        <div class="gallery-card-body">
          <div class="gallery-card-title">${sanitizeHTML(item.title)}</div>
          <div class="gallery-card-sub">${sanitizeHTML(item.subtitle)}</div>
          <span class="gallery-card-tag">${sanitizeHTML(item.tag)}</span>
        </div>
      </div>`;
    }).join('');

    // image error fallback via event delegation
    scroll.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', () => handleImgError(img), { once: true });
    });

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

    const lightboxStyle = 'width:70vw;max-width:600px;aspect-ratio:16/10;margin:0 auto;border-radius:12px;';
    let imageHTML;
    if (item.image) {
      imageHTML = `<img src="${sanitizeHTML(item.image)}" alt="${sanitizeHTML(item.title)}" style="${lightboxStyle}object-fit:cover;" data-item-index="${index}" data-source="lightbox">`;
    } else {
      imageHTML = makePlaceholderHTML(item, `${lightboxStyle}font-size:5rem;`);
    }

    const html = `
      <div style="text-align:center;">
        ${imageHTML}
        <div class="lightbox-caption">${sanitizeHTML(item.title)} — ${sanitizeHTML(item.subtitle)}</div>
      </div>
      <button class="lightbox-nav lightbox-prev" aria-label="上一張"><i class="fas fa-chevron-left"></i></button>
      <button class="lightbox-nav lightbox-next" aria-label="下一張"><i class="fas fa-chevron-right"></i></button>`;

    ModalModule.openModal(html, true);

    // lightbox image error fallback
    const lbImg = document.querySelector('.modal-body img[data-source="lightbox"]');
    if (lbImg) {
      lbImg.addEventListener('error', () => handleImgError(lbImg), { once: true });
    }

    // nav events
    const prev = document.querySelector('.lightbox-prev');
    const next = document.querySelector('.lightbox-next');
    if (prev) prev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
    if (next) next.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

    // keyboard — remove previous handler before adding new one (prevents accumulation)
    if (activeKeyHandler) {
      document.removeEventListener('keydown', activeKeyHandler);
    }
    const keyHandler = (e) => {
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    activeKeyHandler = keyHandler;
    document.addEventListener('keydown', keyHandler);

    // cleanup on close
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
      const obs = new MutationObserver(() => {
        if (!modalOverlay.classList.contains('active')) {
          document.removeEventListener('keydown', activeKeyHandler);
          activeKeyHandler = null;
          obs.disconnect();
        }
      });
      obs.observe(modalOverlay, { attributes: true, attributeFilter: ['class'] });
    }
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + filteredItems.length) % filteredItems.length;
    openLightbox(currentIndex);
  }

  return { renderGallery };
})();
