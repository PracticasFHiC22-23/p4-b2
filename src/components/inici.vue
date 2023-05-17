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
              <a @click="redireccionar(producto.url)">{{ producto.nombre }}</a>
            </li>
          </ul>
          <p v-else>No se encontraron productos.</p>
        </div>
      </div>
      <div class="profile-bar">
        <div class="profile-container">
          <img :src="perfil">
          <div v-if="inicisesion" class="dropdown-menu-perfil">
            <a v-for="perfil in perfilnav" @click="redireccionar(perfil.url)">{{ perfil.nombre }}</a>
          </div>
          <div v-if="!inicisesion" class="dropdown-menu-perfil">
            <a v-for="perfil in perfilnou" @click="mostrarModalInicioSesion">{{ perfil.nombre }}</a>
          </div>
          <b-modal id="modal-sesio" title="Inicio Sesion" ok-title="Iniciar Sesion" cancel-title="Registrar" @ok="inicioSesion" @cancel="registrarUsuario">
            <form>
              <div class="form-group">
                <label for="username">Usuario</label>
                <input type="text" class="form-control" id="username" v-model="nombre">
              </div>
              <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" class="form-control" id="password" v-model="password">
              </div>
            </form>
          </b-modal>
        </div>
        <a>
          <img :src="carrito" alt="Carrito" @click="irCarrito">
        </a>
      </div>
    </div>
    <div class="navbar-second">
      <div class="navbar-left">
        <ul>
          <li class="dropdown" v-for="item in navegacion">
            <button :href="item.urlNav">{{ item.texto }}</button>
            <div class="dropdown-menu">
              <a v-for="producto in item.productos" @click="redireccionar(producto.url)">{{ producto.nombre }}</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="navbar-right">
        <ul>
          <li v-for="(obj, index) in objetivos" :key="index">
            <button @click="isPremium(obj)" class="navbar-btn">{{ obj.texto }}</button>
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
      user: 'test',
      logo: logo,
      inicisesion: false,
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
        {nombre: 'Mis Pedidos', url: '/perfil'},
        {nombre: 'Cerrar Sesion', url: '/cerrarsesion'}
      ],
      perfilnou : [
        {nombre: 'Inici Sesio', url: '/perfil'}
      ],
      objetivos: [
        { texto: 'Objetivos', url: '/objetivos', premium: false},
        { texto: 'Calculadora', url: '/calculadora', premium: true }
      ],
      busqueda: "",
      productos: [
        {nombre: "Creatina Creapure", url: '/calculadora'},
        {nombre: "Creatina Monohydrate", url: '/calculadora'},
        {nombre: "Trembolona", url: '/calculadora'}
      ],
      resultados : [],
      mostrarDropdown: false,
      dropdownOpen: false,
      nombre: '',
      password: '',
      email: '',
      fecha: '',
      ubicacion: '',
      biografia: '',
      premium: true,
    }
  },
  mounted () {
    const user = JSON.parse(localStorage.getItem('user'));
    this.inicisesion = user.inicisesion || false;
    this.nombre = user.nombre || '';
    this.email = user.email || '';
    this.fecha = user.fecha || '';
    this.ubicacion = user.ubicacion || '';
    this.biografia = user.biografia || '';
    this.premium = user.premium || false;
  },
  methods: {
    isPremium(obj) {
      if (!this.premium) {
        // Mostrar un mensaje para animar al usuario a hacerse premium
        alert('Hazte premium para acceder a esta funcionalidad');
      }else{
        return this.redireccionar(obj.url);
      }
    },
    irCalculadora(){
      router.push('/calculadora');
    },
    irCarrito(){
      router.push('/carrito');
    },
    redireccionar(url){
      router.push(url);
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
    },
    mostrarModalInicioSesion(){
      this.$bvModal.show('modal-sesio');
    },
    noMostrarModalInicioSesion(){
      this.$bvModal.hide('modal-sesio');
    },
    inicioSesion() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.inicisesion = true;
        this.inicisesion = true;
        this.$store.commit('setUser', user);
      } else {
        const newUser = {
          nombre: this.nombre,
          password: this.password,
          email: '',
          fecha: '',
          ubicacion: '',
          biografia: '',
          inicisesion: true,
          premium: false,

        };
        this.inicisesion = true;
        localStorage.setItem('user', JSON.stringify(newUser));
        this.$store.commit('setUser', newUser);
      }
      this.$router.push('/perfil');
    },
    registrarUsuario() {
      const newUser = {
        username: this.username,
        password: this.password,
        biography: '',
        email: '',
        fecha: '',
        ubicacion: '',
        biografia: '',
        inicisesion: true,
        premium: false,
      };
      this.inicisesion = true;
      localStorage.setItem('user', JSON.stringify(newUser));
      this.$store.commit('setUser', newUser);
      this.$router.push('/perfil');
    }
  }
}
</script>

<style scoped>
  @import '../../styles/style.css';
  @import '../../styles/index.css';
</style>
