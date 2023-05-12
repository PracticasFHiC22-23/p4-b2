const productos = [
    { nombre: "Proteina Aislada", precio: 35 },
    { nombre: "Proteina Hero", precio: 25 },
    { nombre: "Barritas energeticas",  precio: 3 },
    { nombre: "Gorra", precio: 25 },
    { nombre: "Creatina", precio: 1000 }
];

const searchProduct = document.getElementById("search-product");
const searchbtnProduct = document.getElementById("search-button-product");
const dropdown = document.getElementById("dropdown-search");
const productList = document.getElementById("product-list");

const buscarProductos = (query) => {
    return productos.filter((producto) => {
        const nombre = producto.nombre.toLowerCase();
        return nombre.includes(query.toLowerCase());
    });
};

searchProduct.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchbtnProduct.click();
    }
});

searchbtnProduct.addEventListener("click", () => {
    const query = searchProduct.value.trim();

    if (query === "") {
        dropdown.classList.remove("active");
        productList.innerHTML = "";
        return;
    }

    const results = buscarProductos(query);

    if (results.length === 0) {
        dropdown.classList.add("active");
        dropdown.innerHTML = '<li>No se encontraron resultados</li>';
    } else {
        productList.innerHTML = results
            .map(
                (producto) =>
                    `<li id="product">
              <a href="product-details.html?product=${encodeURIComponent(
                        producto.nombre
                    )}">
                ${producto.nombre} ${producto.precio} €
              </a>
            </li>`
            )
            .join("");
        dropdown.classList.add("active");
        dropdown.style.display = "block";
    }
});
