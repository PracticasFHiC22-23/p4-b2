<template>
  <div class ="ofertas-container">
    <div class="producto">
      <div class="producto-img">
        <img src="../assets/whey-ofert.jpg">
      </div>
      <div class="producto-info">
        <h3><a @click="irProducte('Whey Gold Standard')">Whey Gold Standard</a></h3>
        <p>Precio: 15.99€</p>
      </div>
    </div>
    <div class="producto">
      <div class="producto-img">
        <img src="../assets/creatina.jpg">
      </div>
      <div class="producto-info">
        <h3><a @click="irProducte('Creatina MonoHydrate BioTech')">Creatina MonoHydrate BioTech</a></h3>
        <p>Precio: 39.99€</p>
      </div>
    </div>
    <div class="producto">
      <div class="producto-img">
        <img src="../assets/creatina2.jpg">
      </div>
      <div class="producto-info">
        <h3><a @click="irProducte('Creatine MonoHydrate Drasanvi')">Creatine MonoHydrate Drasanvi</a></h3>
        <p>Precio: 49.99€</p>
      </div>
    </div>
    <div class="producto">
      <div class="producto-img">
        <img src="../assets/trembolona.jpg">
      </div>
      <div class="producto-info">
        <h3><a @click="irProducte('Trembolona')">Trembolona</a></h3>
        <p>Precio: 15.99€</p>
      </div>
    </div>
  </div>
</template>

<script>
import producte from "./producte";
import router from "../router";

export default {
  name: "ofertas",
  methods: {
    irProducte(name){
      router.push('/producte/'+ name);
    },

  }
}
</script>

<style scoped>
  @import '../../styles/index.css';
</style>
