<template>
  <div>
    <div><inici :main-page="false"/></div>
    <div id="sexo"v-if="fase === 0">
      <h1>Selecciona El Genero</h1>
      <div id="sexo-cont">
        <div class="image-container">
          <img :src="hombre" @click="faseFunct('hombre')" alt="Hombre">
          <div class="text-overlay" @click="faseFunct('hombre')">
            <p>Hombre</p>
          </div>
        </div>
        <div class="image-container">
          <img :src="mujer" @click="faseFunct('mujer')" alt="Mujer">
          <div class="text-overlay" @click="faseFunct('mujer')">
            <p>Mujer</p>
          </div>
        </div>
      </div>
    </div>
    <div id="objetivo" v-if="fase === 1">
    <h1>¿Cual es tu objetivo?</h1>
    <div id="obj-cont">
      <div class="image-container">
        <img :src="pesas" @click="faseFunct('pesas')" alt="Hombre">
        <div class="text-overlay" @click="faseFunct('pesas')">
          <p>Muscular</p>
        </div>
      </div>
      <div class="image-container">
        <img :src="tonificar" @click="faseFunct('tonificar')" alt="Mujer">
        <div class="text-overlay" @click="faseFunct('tonificar')">
          <p>Tonificar</p>
        </div>
      </div>
      <div class="image-container">
        <img :src="mujer" @click="faseFunct('peso')" alt="Mujer">
        <div class="text-overlay" @click="faseFunct('peso')">
          <p>Perdida de Peso</p>
        </div>
      </div>
    </div>
  </div>
    <div id="dieta" v-if="fase === 2">
      <h1>¿Que dieta Quieres seguir?</h1>
      <div id="dieta-cont">
        <div class="image-container">
          <img :src="pasta" @click="faseFunct('normal')" alt="Hombre">
          <div class="text-overlay" @click="faseFunct('normal')">
            <p>Sin Requerimientos</p>
          </div>
        </div>
        <div class="image-container">
        <img :src="vegano" @click="faseFunct('vegano')" alt="Hombre">
        <div class="text-overlay" @click="faseFunct('vegano')">
          <p>Vegana</p>
        </div>
      </div>
        <div class="image-container">
          <img :src="gluten" @click="faseFunct('gluten')" alt="Mujer">
          <div class="text-overlay" @click="faseFunct('gluten')">
            <p>Sin Gluten</p>
          </div>
        </div>
        <div class="image-container">
          <img :src="vegetariano" @click="faseFunct('vege')" alt="Mujer">
          <div class="text-overlay" @click="faseFunct('vege')">
            <p>Vegetariana</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inici from '../components/inici.vue';
import hombre from '../assets/hombre.webp';
import mujer from '../assets/mujer.jpeg';
import pesas from '../assets/pesas.jpg';
import tonificar from '../assets/tonificar.webp';
import pasta from '../assets/pasta.webp'
import vegano from '../assets/vegano.webp'
import gluten from '../assets/gluten.jpg'
import vegetariano from '../assets/vegetariano.jpg'

export default {
  name: "objetivos",
  components: {
    inici
  },
  data() {
    return {
      hombre: hombre,
      mujer: mujer,
      pesas: pesas,
      tonificar: tonificar,
      pasta: pasta,
      vegano: vegano,
      gluten: gluten,
      vegetariano: vegetariano,
      fase: 0,
      objetivos: {hombre: false, mujer: false, musculo: false, tonificar: false, dieta: false, sreq: false, veget: false, veg: false, gluten: false},

    }
  },
  methods: {
    faseFunct(option){
      this.fase += 1
      switch (option) {
        case 'hombre':
          this.objetivos.hombre = true
          break;
        case 'mujer':
          this.objetivos.mujer = true
          break;
        case 'pesas':
          this.objetivos.musculo = true
          break;
        case 'tonificar':
          this.objetivos.tonificar = true
          break;
        case 'peso':
          this.objetivos.dieta = true
          break;
        case 'normal':
          this.objetivos.sreq = true
          break;
        case 'vegano':
          this.objetivos.veg = true
          break;
        case 'gluten':
          this.objetivos.gluten = true
          break;
        case 'vege':
          this.objetivos.veget = true
          break;
      }
      if(this.fase === 3) {
        this.fase = 0
        alert("Se han guardado tus preferencias en el perfil")
      }
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

* {
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
}
#sexo, #objetivo, #dieta {
  padding-top: 4em;
  text-align: center;

}
#sexo h1, #objetivo h1, #dieta h1 {
  font-weight: bold;
  font-size: 250%;

}
#sexo-cont, #obj-cont, #dieta-cont{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.image-container {
  flex: 1;
  position: relative;
  display: inline-block;
  text-align: center;
  display: flex;
  height: 35em;
  width: 35em;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 1em;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text-overlay {
  height: 90px;
  width: 275px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FF6B6B;
  display: flex;
  justify-content: center;
  align-items: center;

}
.text-overlay p {
  margin: 0;
  font-weight: bold;
  text-align: center;
  color: white;
  font-size: 175%;
}
</style>
