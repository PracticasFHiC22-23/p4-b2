<template>
  <div>
    <div class="navbar-first">
      <div class="logo">
        <a href="./index.html">
          <img :src="logo" alt="Logo">
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
        <a>
          <img :src="perfil" alt="Perfil">
        </a>
        <a>
          <img :src="carrito" @click="irCarrito" alt="Carrito">
        </a>
      </div>
    </div>
    <div id="index">
      <div class="navbar-second">
        <div class="navbar-left">
          <ul>
            <li class="dropdown" v-for="item in navegacion">
              <a :href="item.urlNav">{{ item.texto }}</a>
              <div class="dropdown-menu">
                <a v-for="producto in item.productos" :href="producto.url">{{ producto.nombre }}</a>
              </div>
            </li>
          </ul>
        </div>
        <div class="navbar-right">
          <button v-for="obj in objetivos" @click="ircalculadora()">{{obj.texto}}</button>
        </div>
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
      objetivos: [
        { texto: 'Objetivos', url: './objetivos' },
        { texto: 'Calculadora', url: '/calculadora' }
      ]
    }
  },
  methods: {
    ircalculadora(){
      router.push('/calculadora');
    },
    irCarrito(){
      router.push('/carrito');
    }
  }
}
</script>

<style scoped>
  .navbar-first {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
    padding: 10px;
    height:150px;
  }

  .navbar-first .logo{
    display: flex;
    align-items: center;
  }

  .search-bar {
    margin: 0 auto;
    display: flex;
    align-items: center;
    width: 300px;
    height: 40px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  .search-bar form{
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .search-bar input[type="text"] {
    flex: 1;
    height: 100%;
    padding: 0 10px;
    border: none;
    background-color: transparent;
    font-size: 16px;
  }

  .search-bar button {
    height: 100%;
    padding: 0 10px;
    background-color: #FF6B6B;
    color: #fff;
    font-weight: 500;
    border: none;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .search-bar button:hover {
    background-color: #FF4D4D;
  }

  .profile-bar {
    display: flex;
    align-items: center;
  }

  .profile-bar a {
    display: block;
    height: 50px;
    margin-left: 20px;
  }

  .profile-bar img {
    height: 100%;
    border: 2px solid #ccc;
    border-radius: 50%;
  }

  .navbar-second {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
    padding: 10px;
  }

  .navbar-logo img {
    height: 50px;
  }

  .navbar-left {
    display: flex;
    align-items: center;
  }

  .navbar-left ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }

  .navbar-left li {
    margin-right: 10px;
  }

  .navbar-left li:last-child {
    margin-right: 0;
  }

  .navbar-left a {
    color: #333;
    font-size: 20px;
    font-weight: 500;
    margin-left: 20px;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  .navbar-left a:hover {
    color: #FF6B6B;
  }

  .navbar-right a {
    background-color: #FF6B6B;
    color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    font-weight: 500;
    margin-left: 20px;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;
  }

  .navbar-right a:hover {
    color: #FF6B6B;
  }


  .navbar-right a:last-child {
    margin-right: 0;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding-right: 20px;
    z-index: 1;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .logo {
    font-size: 30px;
    color: #FF6B6B;
    margin-right: auto;
  }

  @media only screen and (max-width: 850px) {

    .navbar-first {
      flex-direction: column;
      padding: 20px;
    }

    .search-bar {
      width: 100%;
      margin: 10px 0;
    }

    .profile-bar {
      display: none;
    }

    .navbar-second {
      flex-direction: column;
      padding: 20px;
    }

    .navbar-left {
      margin-bottom: 10px;
    }

    .navbar-left ul {
      flex-direction: column;
    }

    .navbar-left li {
      margin-right: 0;
      margin-bottom: 10px;
    }

    .navbar-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .navbar-right a {
      margin-left: 0;
    }

    .dropdown-menu {
      position: static;
      display: none;
      width: 100%;
    }

    .dropdown:hover .dropdown-menu {
      display: block;
    }

  }
</style>
