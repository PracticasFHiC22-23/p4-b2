const datos = {

    headers: ['Producto', 'Cantidad', 'Precio'],
    productos: [
        {
            Producto: 'Camisa blanca',
            Cantidad: 2,
            Precio: 20.0
        },
        {
            Producto: 'Pantalón negro',
            Cantidad: 1,
            Precio: 35.0
        },
    ]

}

//Construimos la tabla, asignando el header y despues el resto de filas
const tableHeader = document.getElementById("table-header");
const tableBody = document.getElementById("table-body");

const rowHeader = document.createElement("tr");
datos.headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    rowHeader.appendChild(th);
});
tableHeader.appendChild(rowHeader);

datos.productos.forEach(producto => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${producto.Producto}</td>
      <td>${producto.Cantidad}</td>
      <td>${producto.Precio}</td>
  `;
    tableBody.appendChild(row);
});
