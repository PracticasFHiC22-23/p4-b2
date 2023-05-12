// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import calculadora from "./components/calculadora"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#App',
  router,
  components: {
    App
  },
  template: '<App/>'
})

/* eslint-disable no-new */
new Vue({
  el: '#Calculadora',
  router,
  components: {
    calculadora
  },
  template: '<Calculadora/>'
})
