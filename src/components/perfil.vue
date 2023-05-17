<template>
  <div>
    <div><inici :main-page="false" /></div>
    <div class="container">
      <div class="profile-edit">
        <h1>Editar Perfil</h1>
        <form id="formulario-edicion">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required v-model="nombre">
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
            <label>Biografía:</label>
            <textarea id="biografia" name="biografia" v-model="biografia"></textarea>
          </div>
          <div>
            <button class="btn btn-primary" @click="mostrarModalGuardarPerfil">Guardar Cambios</button>
            <b-modal id="modal-guardar" title="Guardar Perfil" ok-title="Confirmar" cancel-title="Cancelar" @ok="confirmarEnvio">
              <p>¿Estás seguro de que deseas guardar tu perfil?</p>
            </b-modal>
            <template v-if="premium">
              <div class="premium-label" v-if="premium">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="premium" disabled>
                  <span class="checkbox-text">Usuario Premium</span>
                </label>
              </div>
              <button class="btn btn-danger" @click="mostrarModalCancelarSuscripcion">Cancelar Suscripción</button>
              <b-modal id="modal-cancelar" title="Cancelar Suscripción" ok-title="Confirmar" cancel-title="Cancelar" @ok="cancelarSuscripcion">
                <p>¿Estás seguro de que deseas cancelar tu suscripción premium?</p>
              </b-modal>
            </template>
            <template v-else>
              <b-button v-if="!premium" v-b-modal.modal-1 type="button" class="btn btn-warning" @click="showModal = true">Hacerte premium</b-button>

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
      nombre: '',
      email: '',
      fecha: '',
      ubicacion: '',
      biografia: '',
      premium: false,
      showModal: false,
      inicisesion: false
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.inicisesion = user.inicisesion || false;
    this.nombre = user.nombre || '';
    this.email = user.email || '';
    this.fecha = user.fecha || '';
    this.ubicacion = user.ubicacion || '';
    this.biografia = user.biografia || '';
    this.premium = user.premium || false;
  },
  methods:{
    irIndex(){

      const user = {
        nombre: this.nombre,
        email: this.email,
        fecha: this.fecha,
        ubicacion: this.ubicacion,
        biografia: this.biografia,
        premium: this.premium,
        inicisesion: this.inicisesion,
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
      this.premium = true;
      this.showModal = false;
    },
    resetPremium() {
      this.premium = false;
    },

    mostrarModalCancelarSuscripcion() {
      this.$bvModal.show('modal-cancelar');
    },

    cancelarSuscripcion() {
      const user = JSON.parse(localStorage.getItem('user'));
      user.premium = false;
      localStorage.setItem('user', JSON.stringify(user));
      this.premium = false;
      this.$bvModal.hide('modal-cancelar');
    }

  }
}
</script>

<style scoped>
  @import '../../styles/perfil.css';
</style>
