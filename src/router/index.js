import Vue from 'vue'
import VueRouter from 'vue-router'
import Beranda from '../views/Beranda.vue'
import Informasi from '../views/Informasi.vue'
import Masuk from '../views/Masuk.vue'
import Daftar from '../views/Daftar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Beranda',
    component: Beranda
  },
  {
    path: '/informasi',
    name: 'Informasi',
    component: Informasi
  },
  {
    path: '/masuk',
    name: 'Masuk',
    component: Masuk
  },
  {
    path: '/daftar',
    name: 'Daftar',
    component: Daftar
  },  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
