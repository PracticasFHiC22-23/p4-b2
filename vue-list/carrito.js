const datos = {
    headers: ["Producto", "Cantidad", "Precio", ""],
    productos: [
        {
            nombre: 'Creatina Monohydrate Biotech',
            cantidad: 2,
            precio: 20.0,
            imagen: './imagenes/ofertas-images/creatina.jpg'
        },
        {
            nombre: 'Creatina Creapure',
            cantidad: 1,
            precio: 35.0,
            imagen: './imagenes/slider-images/creatine-offer.jpg'
        },
    ]
}

function eliminarFila(event) {
    const fila = event.target.closest("tr");
    const confirmacion = confirm('¿Está seguro de que desea eliminar esta fila?');
    if (confirmacion) {
        fila.remove();
        calcularTotal();
    }
}

function calcularTotal() {
    let totalPrice = 0;
    document.querySelectorAll('#table-body tr').forEach(row => {
        const cantidad = parseInt(row.querySelector('input[type="number"]').value);
        const precio = parseFloat(row.querySelector('input[type="number"]').dataset.precio);
        totalPrice += cantidad * precio;
    });

    totalAmount.textContent = totalPrice.toFixed(2) + ' €';
}

const tableBody = document.getElementById("table-body");
const totalAmount = document.getElementById("total-amount");

let totalPrice = 0;

datos.productos.forEach(producto => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <div class="d-flex align-items-center">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: contain; margin-right: 10px;">
                <span>${producto.nombre}</span>
            </div>
        </td>
        <td>
            <input type="number" min="0" value="${producto.cantidad}" data-precio="${producto.precio}">
        </td>
        <td>${producto.precio} €</td>
        <td class="eliminar-column">
            <button class="btn-eliminar" style="display: none;">Eliminar</button>
        </td>
    `;
    tableBody.appendChild(row);

    const inputCantidad = row.querySelector('input[type="number"]');
    const btnEliminar = row.querySelector('.btn-eliminar');

    btnEliminar.addEventListener("click", eliminarFila);

    inputCantidad.addEventListener('input', () => {
        calcularTotal();
    });

    row.addEventListener('mouseover', () => {
        btnEliminar.style.display = 'block';
    });

    // Ocultar el botón de eliminar al quitar el mouse de la fila
    row.addEventListener('mouseout', () => {
        btnEliminar.style.display = 'none';
    });

    totalPrice += producto.cantidad * producto.precio;
});

totalAmount.textContent = totalPrice.toFixed(2) + ' €';

const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");

btnFinalizarCompra.addEventListener("click", () => {
    if (confirm("¿Estás seguro de finalizar la compra?")) {
        alert("Tu paquete está siendo enviado");

        // Vaciar la tabla
        tableBody.innerHTML = "";

        // Calcular el total
        calcularTotal();
    }
});

