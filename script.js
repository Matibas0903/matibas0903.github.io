window.onload = function () {
  verMas();
  emailCopy();
  document.getElementById("cvBtn").addEventListener("click", (e) => {
  e.preventDefault();
  new bootstrap.Modal(document.getElementById("cvModal")).show();
});
};

// ── Modal de proyectos ──────────────────────────────────────────────
function verMas() {
  const projectModal = document.getElementById("projectModal");

  projectModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;

    const title       = button.getAttribute("data-title");
    const description = button.getAttribute("data-description");
    const images      = JSON.parse(button.getAttribute("data-images"));
    const repo        = button.getAttribute("data-repo");
    const download    = button.getAttribute("data-download");
    const visit       = button.getAttribute("data-visit");

    // Repo
    const modalRepo = document.getElementById("modalRepo");
    if (repo && repo.trim() !== "") {
      modalRepo.href = repo;
      modalRepo.classList.remove("d-none");
    } else {
      modalRepo.classList.add("d-none");
    }

    // Descargar
    const modalDownload = document.getElementById("modalDownload");
    if (download && download.trim() !== "") {
      modalDownload.href = download;
      modalDownload.download = download;
      modalDownload.classList.remove("d-none");
    } else {
      modalDownload.classList.add("d-none");
    }

    // Visitar
    const modalVisit = document.getElementById("modalVisit");
    if (visit && visit.trim() !== "") {
      modalVisit.href = visit;
      modalVisit.classList.remove("d-none");
    } else {
      modalVisit.classList.add("d-none");
    }

    // Título y descripción
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;

    // Carousel
    const carouselInner = document.getElementById("modalCarouselInner");
    carouselInner.innerHTML = "";

    images.forEach((src, index) => {
      const item = document.createElement("div");
      item.className = "carousel-item" + (index === 0 ? " active" : "");
      item.innerHTML = `<img src="${src}" class="d-block w-100" alt="">`;
      carouselInner.appendChild(item);
    });
  });
}

// ── Copiar email al portapapeles ─────────────────────────────────────
function emailCopy() {
  const emailBtn = document.querySelector(".email-copy");
  if (!emailBtn) return;

  emailBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("basterramatias2020@gmail.com");
    emailBtn.classList.add("show");
    setTimeout(() => emailBtn.classList.remove("show"), 3000);
  });
}
