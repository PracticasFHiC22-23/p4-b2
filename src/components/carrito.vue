<template>
  <div>
    <div><inici :main-page="false"/></div>
    <div class="contenedor-tablas">
      <div class="d-flex flex-column align-items-center" style="padding-top: 40px; margin-right: 20px; flex: 1">
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
          <tr v-for="(producto) in productos" :key="producto" @mouseover="producto.mostrarEliminar=true" @mouseleave="producto.mostrarEliminar=false">
            <td>
              <div class="d-flex align-items-center">
                <img :src="producto.imagen" style="width: 50px; height: 50px; object-fit: contain; margin-right: 10px;">
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
            <td id="total-amount">{{ formattedTotal }}</td>
          </tr>
          </tbody>
        </table>
        <div style="display: flex; justify-content: flex-end; margin-top: 20px">
          <button class="btn-finalizar-compra" id="btn-finalizar-compra" @click="finalizarCompra">Finalizar Compra</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inici from '../components/inici.vue';
import creatinaMono from '../assets/creatina.jpg'
import creatinaCreapure from '../assets/creatine-offer.jpg'

export default {
  name: "carrito",
  data() {
    return {
      productos: [
        {
          nombre: 'Creatina Monohydrate Biotech',
          cantidad: 2,
          precio: 20.0,
          imagen: creatinaMono,
          mostrarEliminar: false
        },
        {
          nombre: 'Creatina Creapure',
          cantidad: 1,
          precio: 35.0,
          imagen: creatinaCreapure,
          mostrarEliminar: false
        },
      ],
      total: 0
    };
  },
  computed: {
    formattedTotal() {
      const total = this.productos.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
      return total < 0 ? '0.00 €' : `${total.toFixed(2)} €`;
    }
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
    },
    mostrarBotonEliminar(producto, mostrar) {
      producto.mostrarEliminar = mostrar;
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
