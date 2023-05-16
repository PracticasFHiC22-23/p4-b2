<template>
  <div>
    <div class="navbar-first">
      <div class="logo">
        <a href="/">
          <img :src="logo" alt="Logo">
        </a>
      </div>
      <div class="search-bar" id="searchProduct">
        <input type="text" id="search-product" placeholder="Buscar..." v-model="busqueda" @input="buscarProductos">
        <button id="search-button-product" @click="buscarProductos">Buscar</button>
        <div id="dropdown-search" v-show="mostrarDropdown">
          <ul id="product-list" v-if="resultados.length">
            <li v-for="producto in resultados" :key="producto.id">
              <a @click="redireccionar(producto.url)"/a>
            </li>
          </ul>
          <p v-else>No se encontraron productos.</p>
        </div>
      </div>
      <div class="profile-bar">
        <div class="profile-container">
          <img :src="perfil">
          <div class="dropdown-menu-perfil">
            <a v-for="perfil in perfilnav" :key="perfil.url" :href="perfil.url" @click="redireccionar(perfil.url)">{{perfil.nombre}}</a>
          </div>
        </div>
        <a>
          <img :src="carrito" alt="Carrito">
        </a>
      </div>
    </div>
    <div class="navbar-second">
      <div class="navbar-left">
        <ul>
          <li class="dropdown" v-for="item in navegacion">
            <button :href="item.urlNav">{{ item.texto }}</button>
            <div class="dropdown-menu">
              <a v-for="producto in item.productos" :href="producto.url" @click="redireccionar(producto.url)">{{ producto.nombre }}</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="navbar-right">
        <ul>
          <li v-for="(obj, index) in objetivos" :key="index">
            <button @click="redireccionar(obj.url)" class="navbar-btn">{{ obj.texto }}</button>
          </li>
        </ul>
      </div>
    </div>
    <banner v-if="mainPage"/>
    <ofertas v-if="mainPage"/>
  </div>
</template>
<script>
import carrito from '../assets/carrito.jpg'
import perfil from '../assets/perfil.jpg'
import logo from '../assets/logo.png'
import router from '../router';
import banner from '../components/banner.vue';
import ofertas from "../components/ofertas.vue";

export default {
  name: "inici",
  props: {
    mainPage: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data () {
    return {
      carrito: carrito,
      perfil: perfil,
      logo: logo,
      // Modificar todos los ejemplos de productos etc...no meter nutricion.html y demas en una carpeta porque no te funcionara la parte de pillar los demas archivos
      // Hacer paginas de Nutricion, Ropa, Accesorios, Blog y rellenar con un par de objetos, lo que se puede hacer es:
      // Unos datos en un js, que tengan un tipo: Nutricion/Ropa/Accesorios/Blog, y ahi solo pillar de esos tipos y q se impriman dichos objetos
      navegacion: [
        { texto: 'Nutricion', urlNav: './nutricion.html', productos: [{nombre: 'Ejemplo1', url: './creatine-monohydrate-biotech-offer.html'}, {nombre: 'Ejemplo2', url: './creatine-monohydrate-biotech-offer.html'}] },
        { texto: 'Ropa', urlNav: '#', productos: [] },
        { texto: 'Accesorios', urlNav: '#', productos: [] },
        { texto: 'Blog', urlNav: '#', productos: []}
      ],
      perfilnav : [
        {nombre: 'Editar Perfil', url: '/perfil'},
        {nombre: 'Mis Pedidos', url: '#'},
        {nombre: 'Cerrar Sesion', url: '#'}
      ],
      objetivos: [
        { texto: 'Objetivos', url: '/objetivos' },
        { texto: 'Calculadora', url: '/calculadora' }
      ],
      busqueda: "",
      productos: [
        {nombre: "Creatina Creapure", url: '/calculadora'},
        {nombre: "Creatina Monohydrate", url: '/calculadora'},
        {nombre: "Trembolona", url: '/calculadora'}
      ],
      resultados : [],
      mostrarDropdown: false,
      dropdownOpen: false
    }
  },
  methods: {
    irCalculadora(){
      router.push('/calculadora');
    },
    irCarrito(){
      router.push('/carrito');
    },
    redireccionar(url){
      this.$router.push(url);
    },
    buscarProductos() {
      this.resultados = []
      const busqueda = this.busqueda.toLowerCase().trim();
      if (busqueda) {
        this.productos.forEach(producto => {
          if (producto.nombre.toLowerCase().includes(busqueda)) {
            this.resultados.push(producto);
          }
        });
        this.mostrarDropdown = true;
      } else {
        this.mostrarDropdown = false;
      }
    },
    toggleDropdown(){
      this.dropdownOpen = !this.dropdownOpen;
    }
  }
}
</script>

<style scoped>
  @import '../../styles/style.css';
  @import '../../styles/index.css';
</style>
