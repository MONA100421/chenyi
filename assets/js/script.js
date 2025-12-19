'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// ===== Testimonials / Modal（加防呆） =====
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer   = document.querySelector("[data-modal-container]");
const modalCloseBtn    = document.querySelector("[data-modal-close-btn]");
const overlay          = document.querySelector("[data-overlay]");
const modalImg         = document.querySelector("[data-modal-img]");
const modalTitle       = document.querySelector("[data-modal-title]");
const modalText        = document.querySelector("[data-modal-text]");

const hasModalEls = modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText;

const toggleModal = () => {
  if (!hasModalEls) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// 只有真的有 testimonials 卡片 & modal 元素時才綁事件
if (testimonialsItem.length && hasModalEls) {
  testimonialsItem.forEach((item) => {
    item.addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title  = this.querySelector("[data-testimonials-title]");
      const text   = this.querySelector("[data-testimonials-text]");
      if (avatar) { modalImg.src = avatar.src; modalImg.alt = avatar.alt || ""; }
      if (title)  { modalTitle.innerHTML = title.innerHTML; }
      if (text)   { modalText.innerHTML  = text.innerHTML; }
      toggleModal();
    });
  });

  modalCloseBtn.addEventListener("click", toggleModal);
  overlay.addEventListener("click", toggleModal);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// ===== 瀏覽次數計數器（前端本地）=====
const viewCountEl = document.getElementById("view-count");

if (viewCountEl) {
  let views = localStorage.getItem("page_views");

  if (!views) {
    views = 0;
  }

  views = parseInt(views) + 1;
  localStorage.setItem("page_views", views);

  viewCountEl.textContent = views;
}
