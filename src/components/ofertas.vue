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
      compraRealizada: false,
      productos: [
        {nombre: 'Whey Gold Standard', url: 'whey-ofert.jpg', cantidad: 1, precio: 15.99, mostrarEliminar: false},
        {nombre: 'Creatina MonoHydrate BioTech', url: 'creatina.jpg', cantidad: 1, precio: 39.99, mostrarEliminar: false},
        {nombre: 'Creatine MonoHydrate Drasanvi', url: 'creatina2.jpg', cantidad: 1, precio: 49.99, mostrarEliminar: false},
        {nombre: 'Trembolona', url: 'trembolona.jpg', cantidad: 1, precio: 15.99, mostrarEliminar: false}
      ]
    };
  },
  methods: {
    irProducte(name) {
      router.push('/producte/' + name);
    },
    agregarAlCarrito(producto) {
      this.compraRealizada = true;
      setTimeout(() => {
        this.compraRealizada = false;
      }, 3000);
      const product = this.productos.find(p => p.nombre === producto);
      this.$store.commit('agregarProducto', product)
    }
  }
}
</script>

<style scoped>
#banner {
  height: 25vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
}

#banner img {
  position: absolute;
  left: 45%;
  top: 0;
  max-width: 100%;
  max-height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

#banner img.active {
  opacity: 1;
}

#prev, #next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2em;
  font-weight: bold;
  color: white;
  background-color: black;
  padding: 0.5em;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

#prev:hover, #next:hover {
  background-color: black;
}

#prev {
  left: 0;
}

#next {
  right: 0;
}

.ofertas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

}

.producto {
  position: relative;
  margin-right: 20px;
  width: 50%;
  height: 50%;
}


.producto:last-child{
  margin-right: 0;
}

.producto-img{
  width: 100%;
  height: 80%;
  overflow: hidden;
}

.producto-img img {
  width: 60%;
  height: 60%;
  object-fit: cover;
}

.producto-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: black;
  color: white;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}

.productoBanner {
  width: 100%;
  height: 100%;
}

.productoBanner:hover .producto-info{
  opacity: 1
}

.producto:hover .producto-info{
  opacity: 1
}

.producto-info h3 {
  margin: 0;
  font-size: 18px;
}

.producto-info a {
  color: white;
  text-decoration: none;
}

.producto-info a:hover {
  text-decoration: underline;
}

</style>
