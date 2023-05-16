<template>
  <div class="profile-edit">
    <h1>Editar Perfil</h1>
    <form>
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
        <label for="biografia">Biografía:</label>
        <textarea id="biografia" name="biografia"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "perfil"
}
</script>

<style scoped>

</style>
