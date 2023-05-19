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
          <tr v-for="(producto, index) in productos" :key="producto" @mouseover="producto.mostrarEliminar=true" @mouseleave="producto.mostrarEliminar=false">
            <td>
              <div class="d-flex align-items-center">
                <img :src="getImatgeUrl(producto.url)" style="width: 50px; height: 50px; object-fit: contain; margin-right: 10px;">
                <span>{{ producto.nombre }}</span>
              </div>
            </td>
            <td>
              <input type="number" min="0" v-model.number="producto.cantidad" :data-precio="producto.precio" @input="calcularTotal">
            </td>
            <td>{{ producto.precio }} €</td>
            <td class="eliminar-column">
              <button class="btn-eliminar" v-show="producto.mostrarEliminar" @click="eliminarFila(producto, index)">Eliminar</button>
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
        <div v-if="alertVisible" class="alert alert-success" role="alert">
          ¡Compra realizada con éxito!
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 20px">
          <button class="btn-finalizar-compra" id="btn-finalizar-compra" @click="confirmarFinalizarCompra">Finalizar Compra</button>
          <div style="margin-right: 10px"></div>
          <button class="btn-finalizar-compra" @click="mensual" v-if="this.$store.state.user.inicisesion">Compra Mensual</button>
        </div>
      </div>
    </div>
    <b-modal v-model="modalVisible" title="Confirmar Eliminación" @ok="eliminarFilaConfirmada">
      ¿Está seguro de que desea eliminar esta fila?
    </b-modal>
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
      total: 0,
      modalVisible: false,
      alertVisible: false,
      productos: []
    };
  },
  mounted() {
    this.productos = this.$store.state.productos;
  },
  computed: {
    formattedTotal() {
      const total = this.productos.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
      return total < 0 ? '0.00 €' : `${total.toFixed(2)} €`;
    }
  },
  methods: {
    mensual(){
      this.$bvModal.msgBoxConfirm('¿Estás seguro añadir esta compra a Pedido Mensual?', {
        title: 'Confirmar',
        okVariant: 'primary',
        okTitle: 'Aceptar',
        cancelTitle: 'Cancelar',
        centered: true
      })
      this.$store.commit('setMensual', this.productos);
    },
    getImatgeUrl(url) {
      return require(`../assets/${url}`);
    },
    eliminarFila(producto, index) {
      this.modalVisible = true;
      this.productoEliminar = producto;
    },
    eliminarFilaConfirmada() {
      const index = this.$store.state.productos.indexOf(this.productoEliminar);
      this.$store.state.productos.splice(index, 1);
      this.calcularTotal();
      this.modalVisible = false;
    },
    calcularTotal() {
      this.total = 0;
      this.productos.forEach(producto => {
        const cantidad = parseInt(producto.cantidad);
        const precio = parseFloat(producto.precio);
        this.total += cantidad * precio;
      });
    },
    confirmarFinalizarCompra() {
      this.$bvModal.msgBoxConfirm('¿Estás seguro de finalizar la compra?', {
        title: 'Confirmar',
        okVariant: 'primary',
        okTitle: 'Aceptar',
        cancelTitle: 'Cancelar',
        centered: true
      })
        .then(value => {
          if (value) {
            this.finalizarCompra();
          }
        })
        .catch(error => {
          // Error al mostrar el cuadro de diálogo
          console.error(error);
        });
    },
    finalizarCompra() {
      this.alertVisible = true;
      this.$store.commit('setNewPedido', this.productos)
      this.$store.state.productos = [];
      this.calcularTotal();
      setTimeout(() => {
        this.alertVisible =false;
      }, 5000);
    },
    mostrarBotonEliminar(producto, mostrar) {
      producto.mostrarEliminar = mostrar;
    }
  },
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  .contenedor-tablas {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

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
    border-bottom: 1px solid white;
  }

  .tabla-carrito th {
    background-color: white;
    font-weight: bold;
  }

  .tabla-carrito tr:hover {
    background-color: white;
  }

  .table-total {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    margin: 0 auto 50px;
  }

  .table-total th,
  .tabla-carrito td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid white;
  }

  .table-total th {
    background-color: white;
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

  #confirm-box p {
    margin: 0 0 20px;
  }

  #confirm-box button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  #confirm-box button:hover {
    background-color: red;
  }

  .btn-finalizar-compra {
    background-color: dodgerblue;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-finalizar-compra:hover {
    background-color: dodgerblue;
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
