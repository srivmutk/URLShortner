import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import err from '../views/404.vue'
import Url from '../views/Url.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:id',
    name: 'Url',
    component: Url
  },
  {
    path: '/pages/not-found',
    name: "404",
    component: err
  },
  {
    path: '*',
    name: "404",
    component: err
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
