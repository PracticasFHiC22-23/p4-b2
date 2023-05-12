const alimentos = [
    { nombre: "Manzana", cantidad: 100, calorias: 95, hidratos: 25, grasas: 0, proteina: 1 },
    { nombre: "Pera", cantidad: 100, calorias: 85, hidratos: 22, grasas: 0, proteina: 1 },
    { nombre: "Leche", cantidad: 100, calorias: 150, hidratos: 12, grasas: 8, proteina: 8 },
    { nombre: "Yogur", cantidad: 100, calorias: 110, hidratos: 10, grasas: 2, proteina: 12 },
    { nombre: "Pollo", cantidad: 100, calorias: 165, hidratos: 0, grasas: 6, proteina: 31 },
    { nombre: "Arroz", cantidad: 100, calorias: 205, hidratos: 45, grasas: 0, proteina: 4 }
];

// Obtener elementos del DOM
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const foodList = document.getElementById("food-list");
const tableBody = document.getElementById("table-body");

// Función para buscar alimentos
const buscarAlimentos = (query) => {
    return alimentos.filter((alimento) => {
        const nombre = alimento.nombre.toLowerCase();
        return nombre.includes(query.toLowerCase());
    });
};

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (query === "") {
        foodList.innerHTML = "";
        return;
    }

    const results = buscarAlimentos(query);

    if (results.length === 0) {
        foodList.innerHTML = '<li>No se encontraron resultados</li>';
        tableBody.innerHTML = "";
        return;
    }

    // Generar la lista de alimentos
    foodList.innerHTML = results
        .map(
            (alimento) =>
                `<li>${alimento.nombre} <input type="number" value="100" min="0" step="25"> <button class="agregar-button">Añadir</button></li>`
        ).join("");

    // Agregar listener al botón de añadir de cada alimento
    const agregarButtons = foodList.querySelectorAll(".agregar-button");
    agregarButtons.forEach((button, i) => {
        button.addEventListener("click", () => {
            const cantidadInput = foodList.querySelectorAll("input")[i];
            const cantidad = parseInt(cantidadInput.value);
            agregarAlimento(results[i], cantidad);
        });
    });
});


// Función para agregar un alimento a la tabla
const agregarAlimento = (alimento, cantidad) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${alimento.nombre}</td>
      <td>${cantidad}</td>
      <td>${alimento.calorias * cantidad / 100}</td>
      <td>${alimento.hidratos * cantidad / 100}</td>
      <td>${alimento.grasas * cantidad / 100}</td>
      <td>${alimento.proteina * cantidad / 100}</td>
      <td><button class="eliminar-button">Eliminar</button></td>
  `;
    tableBody.appendChild(row);

    // Agregar listener al botón de eliminar para quitar el alimento de la tabla
    const eliminarButton = row.querySelector(".eliminar-button");
    eliminarButton.addEventListener("click", () => {
        tableBody.removeChild(row);
    });
};
