// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import banner from "./components/banner";
import ofertas from "./components/ofertas";
import inici from "./components/inici"
import carrito from "./components/carrito";
import producte from "./components/producte";
import review from "./components/review";
import perfil from "./components/perfil";

Vue.config.productionTip = false

Vue.component('banner', banner)
Vue.component('ofertas', ofertas)
Vue.component('inici', inici)
Vue.component('carrito', carrito)
Vue.component('producte', producte)
Vue.component('review', review)
Vue.component('perfil', perfil)


/* eslint-disable no-new */
new Vue({
  el: '#App',
  router,
  components: {
    App
  },
  template: '<App/>'
})