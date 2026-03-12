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
    const visit = button.getAttribute("data-visit");


    
// Visit
const modalVisit = document.getElementById("modalVisit");
if(visit && visit.trim() !== ""){
    visit = visit.replace(/\\/g, "/"); // <- reemplaza \ por /
    modalVisit.href = visit;
    modalVisit.classList.remove("d-none");
} else {
    modalVisit.classList.add("d-none");
}

// Download
const modalDownload = document.getElementById("modalDownload");
if(download && download.trim() !== ""){
    download = download.replace(/\\/g, "/"); // <- reemplaza \ por /
    modalDownload.href = download;
    modalDownload.download = download;
    modalDownload.classList.remove("d-none");
} else {
    modalDownload.classList.add("d-none");
}
// Repo
const modalRepo = document.getElementById("modalRepo");
if(repo && repo.trim() !== ""){
    repo = repo.replace(/\\/g, "/"); // reemplaza \ por /
    modalRepo.href = repo;
    modalRepo.classList.remove("d-none");
} else {
    modalRepo.classList.add("d-none");
}

  // Elementos
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
 


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
