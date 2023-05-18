// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import banner from "./components/banner";
import ofertas from "./components/ofertas";
import inici from "./components/inici"
import carrito from "./components/carrito";
import producte from "./components/producte";
import review from "./components/review";
import perfil from "./components/perfil";
import blog from "./components/blog";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue, {BModal, IconsPlugin} from "bootstrap-vue";
import objetivos from "./components/objetivos";

Vue.config.productionTip = false

Vue.component('banner', banner)
Vue.component('ofertas', ofertas)
Vue.component('inici', inici)
Vue.component('carrito', carrito)
Vue.component('producte', producte)
Vue.component('review', review)
Vue.component('perfil', perfil)
Vue.component('blog', blog)
Vue.component('b-modal', BModal)
Vue.component('objetivos', objetivos)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)

Vue.prototype.$store = new Vuex.Store({
  state: {
    user: {
      username: '',
      inicisesion: false,
      password: '',
      email: '',
      date: '',
      location: '',
      biography: '',
      premium: false
    },
    productos: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPremium(state, premium) {
      state.user.premium = premium;
    },
    agregarProducto(state, producto) {
      const foundIndex = state.productos.findIndex(p => p.nombre === producto.nombre);
      if (foundIndex !== -1) {
        state.productos[foundIndex].cantidad += 1;
      } else {
        state.productos.push(producto);
      }
    },
    eliminarProductos(state){
      state.productos = []
    }
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#App',
  router,
  components: {
    App
  },
  template: '<App/>'
})
