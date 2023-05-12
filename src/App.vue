<template>
  <div id="app">
    <div class="navbar-first">
      <div class="logo">
        <a href="./index.html">
          <img src="./assets/logo.png" alt="Logo">
        </a>
      </div>
      <div class="search-bar" id="searchProduct">
        <div class="search-bar">
          <input type="text" id="search-product" placeholder="Buscar...">
          <button id="search-button-product">Buscar</button>
        </div>
        <div id="dropdown-search">
          <ul id="product-list"></ul>
        </div>
      </div>
      <div class="profile-bar">
        <a href="./perfil.html">
          <img src="./assets/perfil.jpg" alt="Perfil">
        </a>
        <a href="./carrito.html">
          <img src="./assets/carrito.jpg" alt="Carrito">
        </a>
      </div>
    </div>
    <div id="index">
      <div class="navbar-second">
        <div class="navbar-left">
          <ul>
            <li class="dropdown" v-for="item in navegacion">
              <a :href="item.urlNav">{{item.texto}}</a>
              <div class="dropdown-menu">
                <a v-for="producto in item.productos" :href="producto.url">{{producto.nombre}}</a>
              </div>
            </li>
          </ul>
        </div>
        <div class="navbar-right">
          <a v-for="obj in objetivos" :href="obj.url">{{obj.texto}}</a>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // Modificar todos los ejemplos de productos etc...no meter nutricion.html y demas en una carpeta porque no te funcionara la parte de pillar los demas archivos
      // Hacer paginas de Nutricion, Ropa, Accesorios, Blog y rellenar con un par de objetos, lo que se puede hacer es:
      // Unos datos en un js, que tengan un tipo: Nutricion/Ropa/Accesorios/Blog, y ahi solo pillar de esos tipos y q se impriman dichos objetos
      navegacion: [
        { texto: 'Nutricion', urlNav: './nutricion.html', productos: [{nombre: 'Ejemplo1', url: './creatine-monohydrate-biotech-offer.html'}, {nombre: 'Ejemplo2', url: './creatine-monohydrate-biotech-offer.html'}] },
        { texto: 'Ropa', urlNav: '#', productos: [] },
        { texto: 'Accesorios', urlNav: '#', productos: [] },
        { texto: 'Blog', urlNav: '#', productos: []}
      ],
      objetivos: [
        { texto: 'Objetivos', url: './objetivos.html' },
        { texto: 'Calculadora', url: './calculadora.html' }
      ]
    }
  },
  methods: {

  }
}
</script>

<style>
  @import '../styles/style.css';
</style>
