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
  @import '../../styles/carrito.css';
  @import '../../styles/style.css';

</style>
