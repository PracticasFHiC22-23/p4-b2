<template>
  <div class="ofertas-container">
    <div class="producto">
      <div class="producto-img">
        <img src="../assets/whey-ofert.jpg">
      </div>
      <div class="producto-info">
        <h3><a @click="irProducte('Whey Gold Standard')">Whey Gold Standard</a></h3>
        <p>Precio: 15.99€</p>
        <button class="btn btn-primary"  @click="agregarAlCarrito('Whey Gold Standard')">Añadir al carrito</button>
        <div v-if="compraRealizada" class="alert alert-success" role="alert">
          Pedido agregado al carrito
        </div>
      </div>
    </div>
    <div class="producto">
      <div class="producto-img">
        <img src="../assets/creatina.jpg">
      </div>
      <div class="producto-info">
        <h3><a @click="irProducte('Creatina MonoHydrate BioTech')">Creatina MonoHydrate BioTech</a></h3>
        <p>Precio: 39.99€</p>
        <button class="btn btn-primary"  @click="agregarAlCarrito('Creatina MonoHydrate BioTech')">Añadir al carrito</button>
        <div v-if="compraRealizada" class="alert alert-success" role="alert">
          Pedido agregado al carrito
        </div>
      </div>
    </div>
    <div class="producto">
      <div class="producto-img">
        <img src="../assets/creatina2.jpg">
      </div>
      <div class="producto-info">
        <h3><a @click="irProducte('Creatine MonoHydrate Drasanvi')">Creatine MonoHydrate Drasanvi</a></h3>
        <p>Precio: 49.99€</p>
        <button class="btn btn-primary"  @click="agregarAlCarrito('Creatine MonoHydrate Drasanvi')">Añadir al carrito</button>
        <div v-if="compraRealizada" class="alert alert-success" role="alert">
          Pedido agregado al carrito
        </div>
      </div>
    </div>
    <div class="producto">
      <div class="producto-img">
        <img src="../assets/trembolona.jpg">
      </div>
      <div class="producto-info">
        <h3><a @click="irProducte('Trembolona')">Trembolona</a></h3>
        <p>Precio: 15.99€</p>
        <button class="btn btn-primary" @click="agregarAlCarrito('Trembolona')">Añadir al carrito</button>
        <div v-if="compraRealizada" class="alert alert-success" role="alert">
          Pedido agregado al carrito
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import producte from "./producte";
import router from "../router";

export default {
  name: "ofertas",
  data() {
    return {
      compraRealizada: false
    };
  },
  methods: {
    irProducte(name) {
      router.push('/producte/' + name);
    },
    agregarAlCarrito(producto) {
      this.compraRealizada = true;
      setTimeout(() => {
        this.compraRealizada =false;
      }, 5000);

    }
  }
}
</script>

<style scoped>
@import '../../styles/index.css';
</style>
