const STORAGE_KEY = 'skybud_form2';

document.addEventListener('DOMContentLoaded', function () {
  initB2BToggle();
  initFormClear();
  initPDFDownload();
  initAutoSave();
  restoreFormData();
  setDefaultDate();
  setPrintDate();
  checkBlankMode();
});

let updateB2BVisibility = function () {};

function initB2BToggle() {
  const radios = document.querySelectorAll('input[name="client-type"]');
  const section = document.getElementById('b2b-section');
  updateB2BVisibility = () => {
    const current = document.querySelector('input[name="client-type"]:checked')?.value;
    section?.classList.toggle('active', current === 'b2b');
  };
  radios.forEach((radio) => radio.addEventListener('change', updateB2BVisibility));
  updateB2BVisibility();
}

function initFormClear() {
  window.clearForm = clearForm;
}

function initPDFDownload() {
  window.downloadPDF = downloadPDF;
}

function downloadPDF() {
  document.body.classList.add('printing');
  const clientName = document.getElementById('client-name').value.trim() || 'NoName';
  const callDate = document.getElementById('call-date').value || new Date().toISOString().slice(0, 10);
  const originalTitle = document.title;
  const isB2B = document.querySelector('input[name="client-type"]:checked')?.value === 'b2b';
  const b2bSection = document.getElementById('b2b-section');

  if (!isB2B && b2bSection) b2bSection.classList.add('b2b-hidden-for-print');

  document.title = `SKYBUD_Engineering_Call_Interview_Form_${clientName}_${callDate}`;
  window.print();
  document.title = originalTitle;
  document.body.classList.remove('printing');
  if (b2bSection) b2bSection.classList.remove('b2b-hidden-for-print');
}

function clearForm() {
  const form = document.getElementById('engineering-form');
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  document.getElementById('b2b-section')?.classList.remove('active');
  setDefaultDate();
  showToast('Форма очищена');
}

function initAutoSave() {
  const form = document.getElementById('engineering-form');
  const save = () => {
    const data = collectFormData(form);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };
  form.addEventListener('input', save);
  form.addEventListener('change', save);
}

function collectFormData(form) {
  const data = {};
  form.querySelectorAll('input, textarea, select').forEach((field) => {
    const key = field.id || field.name;
    if (!key) return;
    if (field.type === 'radio') {
      if (field.checked) data[key] = field.value;
    } else if (field.type === 'checkbox') {
      data[key] = field.checked;
    } else {
      data[key] = field.value;
    }
  });
  return data;
}

function restoreFormData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    Object.entries(data).forEach(([key, value]) => {
      const byId = document.getElementById(key);
      if (byId) {
        if (byId.type === 'checkbox') byId.checked = Boolean(value);
        else byId.value = value;
        return;
      }
      const radio = document.querySelector(`input[type="radio"][name="${CSS.escape(key)}"][value="${CSS.escape(value)}"]`);
      if (radio) radio.checked = true;
    });

    updateB2BVisibility();
    showToast('Восстановлены данные предыдущего сеанса', 'success', [
      { label: 'Очистить', onClick: clearForm },
    ]);
  } catch (error) {
    showToast('Ошибка восстановления данных', 'error');
  }
}

function setDefaultDate() {
  const dateField = document.getElementById('call-date');
  if (dateField && !dateField.value) {
    dateField.value = new Date().toISOString().slice(0, 10);
  }
}

function setPrintDate() {
  const printDate = document.getElementById('print-date');
  if (printDate) printDate.textContent = new Date().toLocaleDateString('ru-RU');
}

function checkBlankMode() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('blank') === 'true') {
    setTimeout(function () {
      window.print();
    }, 800);
  }
}

function showToast(message, type = 'success', actions = []) {
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast--error' : ''}`.trim();
  const text = document.createElement('span');
  text.textContent = message;
  toast.appendChild(text);

  actions.forEach((action) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = action.label;
    btn.addEventListener('click', () => {
      action.onClick?.();
      toast.remove();
    });
    toast.appendChild(btn);
  });

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}
