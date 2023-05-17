import Vue from 'vue';
import Router from 'vue-router';
import calculadora from "../components/calculadora";
import inici from '../components/inici';
import carrito from "../components/carrito";
import producte from "../components/producte";
import perfil from "../components/perfil";
import blog from "../components/blog"
import objetivos from "../components/objetivos";

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
      path: '/producte/:parametro',
      name: 'producte',
      component: producte,
      props: true
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: perfil
    },
    {
      path: '/blog/:parametro',
      name: 'blog',
      component: blog
    },
    {
      path: '/objetivos',
      name: 'objetivos',
      component: objetivos
    }
  ]
})


