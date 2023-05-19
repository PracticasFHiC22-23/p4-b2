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
      alertVisible: false
    };
  },
  computed: {
    productos(){
      return this.$store.state.productos;
    },
    formattedTotal() {
      const total = this.productos.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
      return total < 0 ? '0.00 €' : `${total.toFixed(2)} €`;
    }
  },
  methods: {
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
  *{
    font-family: 'Open Sans', sans-serif;
  }
  .navbar-first {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    height: 150px;
  }

  .navbar-first .logo {
    display: flex;
    align-items: center;
  }


  .search-bar {
    margin: 0 auto;
    display: flex;
    align-items: center;
    width: 360px;
    height: 44px;
    position: relative;
  }

  .search-bar input[type="text"] {
    flex: 1;
    height: 100%;
    padding: 0 10px;
    border: none;
    background-color: transparent;
    font-size: 16px;
  }

  .search-bar button {
    height: 100%;
    padding: 12px 20px;
    background-color: #FF6B6B;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  #dropdown-search {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 5px 5px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    max-height: 250px; /* Altura máxima del dropdown */
    overflow-y: auto;
  }

  #dropdown-search ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  #dropdown-search li {
    padding: 8px;
  }

  #dropdown-search li:hover {
    background-color: #f9f9f9;
  }

  #dropdown-search a {
    color: #333;
    text-decoration: none;
  }

  .profile-bar {
    display: flex;
    align-items: center;
  }

  .profile-bar img {
    height: 50px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 20px;
  }

  .profile-container {
    position: relative;
  }

  .dropdown-menu-perfil {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    z-index: 1;
    background-color: #f9f9f9;
    padding: 8px 0;
    border-radius: 5px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }

  .dropdown-menu-perfil a {
    display: block;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .dropdown-menu-perfil a:hover {
    background-color: #FF6B6B;
    color: #fff;
  }

  .profile-container:hover .dropdown-menu-perfil {
    display: block;
  }

  .navbar-second {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
    padding: 10px;
  }

  .navbar-left {
    display: flex;
    align-items: center;
  }

  .navbar-left ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }

  .navbar-left li {
    position: relative;
  }

  .navbar-left button {
    background-color: transparent;
    color: #333;
    border: none;
    padding: 10px;
    font-size: 16px;
    font-weight: 500;
    margin-right: 20px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }

  .navbar-left button:hover {
    color: #FF6B6B;
  }

  .navbar-left .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    z-index: 1;
    background-color: #f9f9f9;
    padding: 8px 0;
    border-radius: 5px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }

  .navbar-left .dropdown-menu a {
    display: block;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .navbar-left .dropdown-menu a:hover {
    background-color: #FF6B6B;
    color: #fff;
  }

  .navbar-left .dropdown:hover .dropdown-menu {
    display: block;
  }

  .navbar-right ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
  }

  .navbar-right li {
    margin-left: 20px;
  }

  .navbar-right li:first-child {
    margin-left: 0;
  }

  .navbar-right .navbar-btn {
    background-color: #FF6B6B;
    color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    font-weight: 500;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;
  }

  .navbar-right .navbar-btn:hover {
    background-color: #fff;
    color: #FF6B6B;
    border: 1px solid #FF6B6B;
  }

  .logo {
    font-size: 30px;
    color: #FF6B6B;
    margin-right: auto;
  }

  @media only screen and (max-width: 850px) {

    .navbar-first {
      flex-direction: column;
      padding: 20px;
    }

    .search-bar {
      width: 100%;
      margin: 10px 0;
    }

    .profile-bar {
      display: none;
    }

    .navbar-second {
      flex-direction: column;
      padding: 20px;
    }

    .navbar-left {
      margin-bottom: 10px;
    }

    .navbar-left ul {
      flex-direction: column;
    }

    .navbar-left li {
      margin-right: 0;
      margin-bottom: 10px;
    }

    .navbar-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .navbar-right a {
      margin-left: 0;
    }

    .dropdown-menu {
      position: static;
      display: none;
      width: 100%;
    }

    .dropdown:hover .dropdown-menu {
      display: block;
    }

  }
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

  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 9999;
  }

  #confirm-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
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
