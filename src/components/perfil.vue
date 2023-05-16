<template>
  <div>
    <div><inici :main-page="false" /></div>
    <div class="container">
      <div class="profile-edit">
        <h1>Editar Perfil</h1>
        <form id="formulario-edicion" @submit="confirmarEnvio">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="fecha">Fecha de Nacimiento:</label>
            <input type="date" id="fecha" name="fecha" required>
          </div>
          <div class="form-group">
            <label for="ubicacion">Ubicación:</label>
            <input type="text" id="ubicacion" name="ubicacion">
          </div>
          <div class="form-group">
            <label>Biografía:</label>
            <textarea id="biografia" name="biografia"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Guardar Cambios</button>
          <button type="submit" class="btn btn-warning">Hacerte premium</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "perfil",
  methods:{
    irIndex(){
      router.push('/');
    },

    confirmarEnvio(event){
      event.preventDefault();
      if(confirm('¿Estas seguro de querer guardar tu perfil?')){
        this.irIndex();
      }
    }
  }
}
</script>

<style scoped>
  @import '../../styles/perfil.css';
</style>
