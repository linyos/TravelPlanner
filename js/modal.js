/* ═══════ Modal Module ═══════ */
const ModalModule = (() => {
  let overlay, content, body, closeBtn;
  let previousFocus = null;

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

  function openModal(htmlContent, isLightbox) {
    if (!overlay) return;
    previousFocus = document.activeElement;
    body.innerHTML = htmlContent;
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
  }

  return { init, openModal, closeModal };
})();
