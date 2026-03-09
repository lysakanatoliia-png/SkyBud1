function openForm(url) {
  window.location.href = url;
}

function downloadBlankPDF(url) {
  const join = url.includes('?') ? '&' : '?';
  window.open(url + join + 'blank=true', '_blank', 'noopener');
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast--error' : ''}`.trim();
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}
