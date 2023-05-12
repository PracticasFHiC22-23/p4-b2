import Vue from 'vue'
import Router from 'vue-router'
import Banner from '@/components/Banner'
import Ofertas from '@/components/Ofertas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Banner',
      component: Banner
    },
    {
      path: '/',
      name: 'Ofertas',
      component: Ofertas
    },
  ]
})
