import Vue from 'vue';
import Router from 'vue-router';
import calculadora from "../components/calculadora";
import inici from '../components/inici';
import carrito from "../components/carrito";
import perfil from "../components/perfil";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'inici',
      component: inici
    },
    {
      path: '/calculadora',
      name: 'calculadora',
      component: calculadora
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: carrito
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: perfil
    }
  ]
})


