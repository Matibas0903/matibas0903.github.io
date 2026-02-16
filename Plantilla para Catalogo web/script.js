window.onload = function () {
  const productos = [
    {
      nombre: "Producto 1",
      descripcion: "Descripción breve del producto.",
      imagen: "producto1.jpg",
    },
    {
      nombre: "Producto 2",
      descripcion: "Descripción breve del producto.",
      imagen: "producto2.jpg",
    },
    {
      nombre: "Producto 3",
      descripcion: "Descripción breve del producto.",
      imagen: "producto3.jpg",
    },
    {
      nombre: "Producto 4",
      descripcion: "Descripción breve del producto.",
      imagen: "producto4.jpg",
    },
  ];

  limitarCatalogo(productos);

  const btnMas = document.getElementById("btn-ver-todos");
  const btnMenos = document.getElementById("btn-ver-menos");

  btnMas.addEventListener("click", () => {
    crearCatalogo(productos);

    btnMas.classList.remove("aparecer");
    btnMenos.classList.add("aparecer");
  });

  btnMenos.addEventListener("click", () => {
    limitarCatalogo(productos);
  });

  AOS.init({
    duration: 600,
    easing: "ease-out-cubic",
    once: true,
  });
};

function crearCatalogo(lista) {
  const contenedor = document.getElementById("contenedor-productos");

  contenedor.innerHTML = "";

  lista.forEach((prod, index) => {
    const card = `
      <div class="col-md-4" 
           data-aos="fade-up" 
           data-aos-delay="${index * 100}">
        <div class="card h-100 shadow-sm">
          <img src="${prod.imagen}" class="card-img-top">
          <div class="card-body text-center">
            <h5>${prod.nombre}</h5>
            <p class="text-muted">${prod.descripcion}</p>
            <a href="https://api.whatsapp.com/send?phone=NUMERO&text=Hola,%20quiero%20consultar%20por%20${encodeURIComponent(prod.nombre)}"
               class="btn btn-success w-100">
               Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
    contenedor.innerHTML += card;
  });

  // refresca AOS cuando el contenido es dinámico
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }

  const btn = document.getElementById("btnArriba");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function limitarCatalogo(lista) {
  const LIMITE_INICIAL = 3;
  const btnMas = document.getElementById("btn-ver-todos");
  const btnMenos = document.getElementById("btn-ver-menos");

  if (lista.length > LIMITE_INICIAL) {
    crearCatalogo(lista.slice(0, LIMITE_INICIAL));

    btnMas.classList.add("aparecer");
    btnMenos.classList.remove("aparecer");
  } else {
    crearCatalogo(lista);

    btnMas.classList.remove("aparecer");
    btnMenos.classList.remove("aparecer");
  }
}
