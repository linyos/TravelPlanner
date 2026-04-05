/* ═══════ Modal Module ═══════ */
const ModalModule = (() => {
  let overlay, content, body, closeBtn;
  let previousFocus = null;
  let closeCallback = null;

  function init() {
    overlay = document.getElementById('modalOverlay');
    content = document.getElementById('modalContent');
    body = document.getElementById('modalBody');
    closeBtn = document.getElementById('modalClose');
    if (!overlay) return;

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });
  }

  function openModal(htmlContent, isLightbox, onClose) {
    if (!overlay) return;
    closeCallback = onClose || null;
    previousFocus = document.activeElement;
    try {
      body.innerHTML = htmlContent;
    } catch (e) {
      console.error('Modal content error:', e);
      body.innerHTML = '<div style="padding:2rem;text-align:center;">內容載入失敗</div>';
    }
    overlay.classList.add('active');
    if (isLightbox) overlay.classList.add('lightbox');
    else overlay.classList.remove('lightbox');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // focus trap
    const focusable = content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('active', 'lightbox');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    body.innerHTML = '';
    if (previousFocus) previousFocus.focus();
    if (closeCallback) { closeCallback(); closeCallback = null; }
  }

  return { init, openModal, closeModal };
})();
