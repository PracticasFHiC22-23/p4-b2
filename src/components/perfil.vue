<template>
  <div>
    <div><inici :main-page="false" /></div>
    <div class="container">
      <div class="profile-edit">
        <h1>Editar Perfil</h1>
        <form id="formulario-edicion">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required v-model="user.username">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required v-model="email">
          </div>
          <div class="form-group">
            <label for="fecha">Fecha de Nacimiento:</label>
            <input type="date" id="fecha" name="fecha" required v-model="fecha">
          </div>
          <div class="form-group">
            <label for="ubicacion">Ubicación:</label>
            <input type="text" id="ubicacion" name="ubicacion" v-model="ubicacion">
          </div>
          <div class="form-group">
            <label>Datos de envio:</label>
            <textarea id="biografia" name="biografia" v-model="biografia"></textarea>
          </div>
          <div>
            <button class="btn btn-primary" @click="mostrarModalGuardarPerfil">Guardar Cambios</button>
            <b-modal id="modal-guardar" title="Guardar Perfil" ok-title="Confirmar" cancel-title="Cancelar" @ok="confirmarEnvio">
              <p>¿Estás seguro de que deseas guardar tu perfil?</p>
            </b-modal>
            <template v-if="this.user.premium">
              <div class="premium-label" v-if="this.user.premium">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="this.user.premium" disabled>
                  <span class="checkbox-text">Usuario Premium</span>
                </label>
              </div>
              <button class="btn btn-danger" @click="mostrarModalCancelarSuscripcion">Cancelar Suscripción</button>
              <b-modal id="modal-cancelar" title="Cancelar Suscripción" ok-title="Confirmar" cancel-title="Cancelar" @ok="cancelarSuscripcion">
                <p>¿Estás seguro de que deseas cancelar tu suscripción premium?</p>
              </b-modal>
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
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.user = user;
      this.premium = user.premium;
    }
  },
  methods:{
    irIndex(){
      const user = {
        username: this.user.username,
        inicisesion: this.user.inicisesion,
        password: this.user.password,
        email: this.user.email,
        date: this.user.date,
        location: this.user.location,
        biography: this.user.biography,
        premium: this.user.premium,

      };
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    },
    confirmarEnvio(){
      this.irIndex();
      this.$bvModal.hide('modal-guardar');
    },

    mostrarModalGuardarPerfil(){
      this.$bvModal.show('modal-guardar');
    },
    aceptarCondiciones() {
      const user = JSON.parse(localStorage.getItem('user'));
      user.premium = true;
      localStorage.setItem('user', JSON.stringify(user));
      this.user.premium = true;
      this.showModal = false;
    },
    resetPremium() {
      this.user.premium = false;
    },

    mostrarModalCancelarSuscripcion() {
      this.$bvModal.show('modal-cancelar');
    },

    cancelarSuscripcion() {
      const user = JSON.parse(localStorage.getItem('user'));
      user.premium = false;
      localStorage.setItem('user', JSON.stringify(user));
      this.user.premium = false;
      this.$bvModal.hide('modal-cancelar');
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
  background-color: #c2c0c0;
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

</style>
