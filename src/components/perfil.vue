<template>
  <div>
    <div><inici :main-page="false" /></div>
    <div class="container">
      <div class="botones-izquierda">
        <button @click="historial = true, mensual = false" class="navbar-btn boton-izquierda">Historial de Pedidos</button>
        <button @click="mensual = true, historial = false" class="navbar-btn boton-izquierda">Compra Mensual</button>
        <button @click="historial = false, mensual = false" class="navbar-btn boton-izquierda">Datos de Perfil</button>
      </div>
      <div class="contenedor-tablas">
        <div v-if="historial">
          <h1>Historial de Pedidos</h1>
          <p v-if="listMensual.length === 0">No has realizado ningún pedido</p>
          <div v-for="pedidos in listHist">
            <table class="tabla-carrito">
              <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio/Unidad</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(producto, index) in pedidos" :key="producto">
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="getImatgeUrl(producto.url)" class="tabla-imagen">
                    <span>{{ producto.nombre }}</span>
                  </div>
                </td>
                <td>
                  <input type="number" min="0" v-model.number="producto.cantidad" :data-precio="producto.precio" @input="calcularTotal">
                </td>
                <td>{{ producto.precio }} €</td>
                <td class="eliminar-column">
                  <button class="btn-eliminar" v-show="producto.mostrarEliminar" @click="eliminarFila(index)">Eliminar</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="mensual">
          <div>
            <h1>Compra Mensual Configurada</h1>
            <table class="tabla-carrito">
              <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio/Unidad</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(producto, index) in listMensual" :key="producto" @mouseover="producto.mostrarEliminar=true" @mouseleave="producto.mostrarEliminar=false">
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="getImatgeUrl(producto.url)" class="tabla-imagen">
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
        </div>
        <div class="profile-edit" v-if="(!historial) && (!mensual)">
          <h1>Editar Perfil</h1>
          <form id="formulario-edicion">
            <div class="form-group">
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" required v-model="user.username">
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required v-model="user.email">
            </div>
            <div class="form-group">
              <label for="fecha">Fecha de Nacimiento:</label>
              <input type="date" id="fecha" name="fecha" required v-model="user.date">
            </div>
            <div class="form-group">
              <label for="ubicacion">Ubicación:</label>
              <input type="text" id="ubicacion" name="ubicacion" v-model="user.location">
            </div>
            <div class="form-group">
              <label>Datos de envio:</label>
              <textarea id="biografia" name="biografia" v-model="user.biography"></textarea>
            </div>
            <div>
              <div id="modal">
                <div>
                  <b-button v-b-modal.modal-guardar type="button" class="btn btn-primary">Guardar Cambios</b-button>
                  <b-modal id="modal-guardar" title="Guardar Perfil" ok-title="Confirmar" cancel-title="Cancelar" @ok="confirmarEnvio">
                    <p>¿Estás seguro de que deseas guardar tu perfil?</p>
                  </b-modal>
                </div>
                <div v-if="user.premium">
                  <b-button v-b-modal.modal-cancelar type="button" class="btn btn-danger">Cancelar Suscripción</b-button>
                  <b-modal id="modal-cancelar" title="Cancelar Suscripción" ok-title="Confirmar" cancel-title="Cancelar" @ok="cancelarSuscripcion">
                    <p>¿Estás seguro de que deseas cancelar tu suscripción premium?</p>
                  </b-modal>
                </div>
              </div>
              <template v-if="user.premium">
                <div class="premium-label" v-if="user.premium">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="user.premium" disabled>
                    <span class="checkbox-text">Usuario Premium</span>
                  </label>
                </div>
              </template>
              <template v-else>
                <b-button v-if="!user.premium" v-b-modal.modal-1 type="button" class="btn btn-warning" @click="showModal = true">Hacerte premium</b-button>
                <b-modal id="modal-1" v-if="showModal" title="Aceptar condiciones" ok-title="Aceptar" cancel-title="Cancelar" @ok="aceptarCondiciones" @cancel="showModal = false">
                  <p>Acepta las condiciones para hacerse premium:</p>
                  <ul>
                    <li>Haber realizado anteriormente un mínimo de 3 pedidos</li>
                    <li>Seguidor de la web en Instagram</li>
                  </ul>
                  <h6>Le recordamos que a partir de ahora se le realizará un pago mensual de 9.99€</h6>
                  <template #modal-header="{ close }">
                    <div class="custom-close" @click="close">×</div>
                    <div class="custom-close-space"></div>
                  </template>
                </b-modal>
              </template>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "perfil",
  data() {
    return {
      user: {
        username: '',
        inicisesion: false,
        password: '',
        email: '',
        date: '',
        location: '',
        biography: '',
        premium: false
      },
      showModal: false,
      historial: false,
      mensual: false,
      listMensual: [],
      listHist: []
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.user.username = user.username,
      this.user.inicisesion = user.inicisesion,
      this.user.password = user.password,
      this.user.email = user.email,
      this.user.date = user.date,
      this.user.location = user.location,
      this.user.biography = user.biography,
      this.user.premium = user.premium

    }
    this.listMensual = this.$store.state.mensualist;
    this.listHist = this.$store.state.pedidosAnteriores;
  },
  methods:{
    getImatgeUrl(url) {
      return require(`../assets/${url}`);
    },
    eliminarFila(index) {
      this.$store.state.mensualist.splice(index, 1);
      this.calcularTotal();
    },
    calcularTotal() {
      this.total = 0;
      this.productos.forEach(producto => {
        const cantidad = parseInt(producto.cantidad);
        const precio = parseFloat(producto.precio);
        this.total += cantidad * precio;
      });
    },
    irIndex(){
      localStorage.setItem('user', JSON.stringify(this.user));
      router.push('/');
    },
    confirmarEnvio(){
      this.showChange = false;
      this.irIndex();

    },
    aceptarCondiciones() {
      const user = JSON.parse(localStorage.getItem('user'));
      user.premium = true;
      localStorage.setItem('user', JSON.stringify(user));
      this.user.premium = true;
      this.showModal = false;
      router.push('/');
    },
    resetPremium() {
      this.user.premium = false;
    },
    cancelarSuscripcion() {
      const user = JSON.parse(localStorage.getItem('user'));
      user.premium = false;
      localStorage.setItem('user', JSON.stringify(user));
      this.user.premium = false;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
*{
  font-family: 'Open Sans', sans-serif;
}
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
}

.profile-edit {
  width: 400px;
  padding: 20px;
  background-color: lightgray;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

.profile-edit h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid white;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 100px;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-primary {
  color: white;
  background-color: dodgerblue;
}


.btn-primary:hover {
  background-color: #0056b3;
}

.premium-label{
  display:inline-block;
}
.checkbox-label {
  display: flex;
  align-items: center;
}

.checkbox-label input[type="checkbox"] {
  order: 1;
  margin-right: 5px;
}

.checkbox-label .checkbox-text {
  order: 2;
}

.custom-close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: red;
}

.custom-close-space {
  margin-bottom: 10px;
}

.botones-izquierda {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 9999;
}

.boton-izquierda {
  width: 200px;
}

.navbar-btn {
  background-color: #FF6B6B;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.navbar-btn:hover {
  background-color: #FF4F4F;
}

.contenedor-tablas {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tabla-carrito {
  width: 80%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.tabla-carrito th,
.tabla-carrito td {
  padding: 12px;
  text-align: left;
}

.tabla-carrito th {
  background-color: #F8F8F8;
  font-weight: bold;
}

.tabla-carrito tbody tr:nth-child(even) {
  background-color: #F2F2F2;
}

.tabla-imagen {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-right: 10px;
}

.btn-eliminar {
  background-color: #FF6B6B;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-eliminar:hover {
  background-color: #FF8F8F;
}
#modal{
  display: flex;
}
</style>
