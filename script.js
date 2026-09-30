document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const items = Array.from(document.querySelectorAll(".image-item"));
  const themeGroup = document.getElementById("theme-filters");
  const sortGroup = document.getElementById("sort-controls");
  const emptyState = document.getElementById("empty-state");

  const state = { theme: "All", sort: "newest" };

  function uniqueValues(attr) {
    const values = items.map((el) => el.dataset[attr]);
    return ["All", ...Array.from(new Set(values))];
  }

  function buildThemeButtons(group, values) {
    values.forEach((value) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (value === "All" ? " active" : "");
      btn.type = "button";
      btn.textContent = value;
      btn.dataset.value = value;
      btn.addEventListener("click", () => {
        state.theme = value;
        group.querySelectorAll(".filter-btn").forEach((b) =>
          b.classList.toggle("active", b.dataset.value === value)
        );
        applyFilters();
      });
      group.appendChild(btn);
    });
  }

  buildThemeButtons(themeGroup, uniqueValues("theme"));

  sortGroup.querySelectorAll(".filter-btn[data-sort]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.sort = btn.dataset.sort;
      sortGroup.querySelectorAll(".filter-btn").forEach((b) =>
        b.classList.toggle("active", b === btn)
      );
      applySort();
    });
  });

  function applySort() {
    const sorted = [...items].sort((a, b) => {
      const cmp = a.dataset.date.localeCompare(b.dataset.date);
      return state.sort === "newest" ? -cmp : cmp;
    });
    sorted.forEach((el) => gallery.appendChild(el));
  }

  function applyFilters() {
    let visibleCount = 0;
    items.forEach((el) => {
      const show = state.theme === "All" || el.dataset.theme === state.theme;
      el.classList.toggle("hidden", !show);
      if (show) visibleCount++;
    });
    emptyState.hidden = visibleCount !== 0;
  }

  // Lightbox
  const preview = document.getElementById("preview");
  const previewImg = document.getElementById("preview-img");
  const imageInfo = document.getElementById("image-info");
  const cameraInfo = document.getElementById("camera-info");
  const lensInfo = document.getElementById("lens-info");
  const closeBtn = document.getElementById("preview-close");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  let currentIndex = -1;

  function visibleItems() {
    // read from live DOM order so lightbox prev/next matches the current sort
    return Array.from(gallery.querySelectorAll(".image-item:not(.hidden)"));
  }

  function openPreview(index) {
    const list = visibleItems();
    if (!list.length) return;
    currentIndex = (index + list.length) % list.length;
    const el = list[currentIndex];
    const img = el.querySelector("img");

    previewImg.src = img.dataset.full || img.src;
    previewImg.alt = img.alt;
    imageInfo.textContent = el.dataset.caption || img.alt;
    cameraInfo.textContent = "";
    lensInfo.textContent = "";

    preview.classList.add("open");

    if (window.EXIF) {
      EXIF.getData(img, function () {
        const make = EXIF.getTag(this, "Make") || "";
        const model = EXIF.getTag(this, "Model") || "";
        const lens = EXIF.getTag(this, "LensModel") || "";
        cameraInfo.textContent = (make || model) ? `Camera: ${make} ${model}`.trim() : "";
        lensInfo.textContent = lens ? `Lens: ${lens}` : "";
      });
    }
  }

  function closePreview() {
    preview.classList.remove("open");
    currentIndex = -1;
  }

  items.forEach((el, i) => {
    el.addEventListener("click", () => {
      const list = visibleItems();
      openPreview(list.indexOf(el));
    });
  });

  closeBtn.addEventListener("click", closePreview);
  preview.addEventListener("click", (e) => {
    if (e.target === preview) closePreview();
  });

  leftArrow.addEventListener("click", () => openPreview(currentIndex - 1));
  rightArrow.addEventListener("click", () => openPreview(currentIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (!preview.classList.contains("open")) return;
    if (e.key === "Escape") closePreview();
    if (e.key === "ArrowLeft") openPreview(currentIndex - 1);
    if (e.key === "ArrowRight") openPreview(currentIndex + 1);
  });

  applySort();
  applyFilters();
});
