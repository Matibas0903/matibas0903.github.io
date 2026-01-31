window.onload = function () {
  verMas();
};

function verMas() {
  const projectModal = document.getElementById("projectModal");

  projectModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;

    // Datos
    const title = button.getAttribute("data-title");
    const description = button.getAttribute("data-description");
    const images = JSON.parse(button.getAttribute("data-images"));
    const repo = button.getAttribute("data-repo");
    const download = button.getAttribute("data-download");

    // Elementos
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalRepo").href = repo;
    document.getElementById("modalDownload").href = download;
    document.getElementById("modalDownload").download = download;

    // Carousel
    const carouselInner = document.getElementById("modalCarouselInner");
    carouselInner.innerHTML = "";

    images.forEach((src, index) => {
      const item = document.createElement("div");
      item.className = "carousel-item" + (index === 0 ? " active" : "");
      item.innerHTML = `
        <img src="${src}" class="d-block w-100" alt="">
      `;
      carouselInner.appendChild(item);
    });
  });
}
