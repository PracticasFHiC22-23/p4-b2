<template>
  <div>
    <div><inici :main-page="false"/></div>
    <div class="d-flex flex-row justify-content-between" style="width: 100%">
      <div class="d-flex flex-column align-items-center" style="padding-top: 40px; margin-right: 20px; width: 70%">
        <table class="tabla-carrito">
          <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio/Unidad</th>
            <th>Eliminar</th>
          </tr>
          </thead>
          <tbody id="table-body">
          <tr v-for="(producto, index) in productos" :key="producto">
            <td>
              <div class="d-flex align-items-center">
                <img :src="producto.imagen" :alt="producto.nombre" style="width: 50px; height: 50px; object-fit: contain; margin-right: 10px;">
                <span>{{ producto.nombre }}</span>
              </div>
            </td>
            <td>
              <input type="number" min="0" v-model.number="producto.cantidad" :data-precio="producto.precio" @input="calcularTotal">
            </td>
            <td>{{ producto.precio }} €</td>
            <td class="eliminar-column">
              <button class="btn-eliminar" v-show="producto.mostrarEliminar" @click="eliminarFila(producto)">Eliminar</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex flex-column align-items-center" style="padding-top: 40px; margin-right: 20px; width: 30%">
        <table class="table-total">
          <tbody>
          <tr>
            <th>Total</th>
            <td id="total-amount"></td>
          </tr>
          </tbody>
        </table>
        <button class="btn-finalizar-compra" id="btn-finalizar-compra">Finalizar Compra</button>
      </div>
    </div>
  </div>
</template>

<script>
import inici from '../components/inici.vue';

export default {
  name: "carrito",
  data() {
    return {
      productos: [
        {
          nombre: 'Creatina Monohydrate Biotech',
          cantidad: 2,
          precio: 20.0,
          imagen: '../assets/creatina.jpg'
        },
        {
          nombre: 'Creatina Creapure',
          cantidad: 1,
          precio: 35.0,
          imagen: '../assets/creatine-offer.jpg'
        },
      ],
      total: 0
    };
  },
  methods: {
    eliminarFila(producto) {
      const confirmacion = confirm('¿Está seguro de que desea eliminar esta fila?');
      if (confirmacion) {
        const index = this.productos.indexOf(producto);
        this.productos.splice(index, 1);
        this.calcularTotal();
      }
    },
    calcularTotal() {
      this.total = 0;
      this.productos.forEach(producto => {
        const cantidad = parseInt(producto.cantidad);
        const precio = parseFloat(producto.precio);
        this.total += cantidad * precio;
      });
    },
    finalizarCompra() {
      if (confirm("¿Estás seguro de finalizar la compra?")) {
        alert("Tu paquete está siendo enviado");
        this.productos = [];
        this.calcularTotal();
      }
    }
  },
  mounted() {
    datos.productos.forEach(producto => {
      this.productos.push({
        nombre: producto.nombre,
        imagen: producto.imagen,
        cantidad: producto.cantidad,
        precio: producto.precio,
        mostrarEliminar: false
      });
      this.total += producto.cantidad * producto.precio;
    });
    this.calcularTotal();
  }
}
</script>

<style scoped>
  .tabla-carrito {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 10px;
  }

  .tabla-carrito th,
  .tabla-carrito td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }

  .tabla-carrito th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .tabla-carrito tr:hover {
    background-color: #f5f5f5;
  }

  .table-total {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 10px;
    margin: 0 auto 50px;
  }

  .table-total th,
  .tabla-carrito td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }

  .table-total th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .table-total tr:hover {
    background-color: #f5f5f5;
  }

  .btn-eliminar {
    background-color: #f44336;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .btn-eliminar:hover {
    background-color: #c62828;
  }

  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }

  #confirm-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }

  #confirm-box p {
    margin: 0 0 20px;
  }

  #confirm-box button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #ff4444;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  #confirm-box button:hover {
    background-color: #cc0000;
  }

  .btn-finalizar-compra {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-finalizar-compra:hover {
    background-color: #0069d9;
  }

  @media (max-width: 850px) {
    .tabla-carrito,
    .table-total {
      max-width: 100%;
      margin-left: 0;
      margin-right: 0;
    }

    .tabla-carrito th,
    .tabla-carrito td,
    .table-total th,
    .table-total td {
      font-size: 14px;
      padding: 10px;
    }

    .tabla-carrito th:nth-child(2),
    .tabla-carrito td:nth-child(2) {
      display: none;
    }

    .tabla-carrito td:nth-child(3) {
      font-weight: bold;
    }

    .tabla-carrito td {
      display: flex;
      flex-direction: column;
    }

    .tabla-carrito td::before {
      content: attr(data-label);
      font-weight: bold;
      margin-bottom: 5px;
    }
  }

</style>
