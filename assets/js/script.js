'use strict';

// tool
const elementToggleFunc = (elem) => elem && elem.classList.toggle('active');

/* ========== Sidebar ========== */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));
}

/* ========== Testimonials / Modal ========== */
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn  = document.querySelector('[data-modal-close-btn]');
const overlay        = document.querySelector('[data-overlay]');
const modalImg   = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText  = document.querySelector('[data-modal-text]');

const hasModalEls =
  modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText;

const testimonialsModalFunc = () => {
  if (!hasModalEls) return;
  modalContainer.classList.toggle('active');
  overlay.classList.toggle('active');
};

if (testimonialsItem.length && hasModalEls) {
  testimonialsItem.forEach((item) => {
    item.addEventListener('click', function () {
      const avatar = this.querySelector('[data-testimonials-avatar]');
      const title  = this.querySelector('[data-testimonials-title]');
      const text   = this.querySelector('[data-testimonials-text]');
      if (avatar) { modalImg.src = avatar.src; modalImg.alt = avatar.alt || ''; }
      if (title)  { modalTitle.innerHTML = title.innerHTML; }
      if (text)   { modalText.innerHTML  = text.innerHTML; }
      testimonialsModalFunc();
    });
  });
  modalCloseBtn.addEventListener('click', testimonialsModalFunc);
  overlay.addEventListener('click', testimonialsModalFunc);
}

/* ========== Custom Select / Filter ========== */
const select      = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn   = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

if (select) {
  select.addEventListener('click', function () { elementToggleFunc(this); });
}

const filterFunc = (selectedValue) => {
  if (!filterItems.length) return;
  filterItems.forEach((el) => {
    const match = selectedValue === 'all' || selectedValue === el.dataset.category;
    el.classList.toggle('active', match);
  });
};

if (selectItems.length) {
  selectItems.forEach((item) => {
    item.addEventListener('click', function () {
      const val = this.innerText.trim().toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(val);
    });
  });
}

if (filterBtn.length) {
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
      const val = this.innerText.trim().toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(val);
      if (lastClickedBtn) lastClickedBtn.classList.remove('active');
      this.classList.add('active');
      lastClickedBtn = this;
    });
  });
}

/* ========== Page Navigation ========== */
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

if (navigationLinks.length && pages.length) {
  navigationLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const target = (link.dataset.target || link.textContent).trim().toLowerCase();

      pages.forEach((page) => {
        page.classList.toggle('active', page.dataset.page === target);
      });

      // navbar
      navigationLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');

      window.scrollTo(0, 0);
    });
  });
}
