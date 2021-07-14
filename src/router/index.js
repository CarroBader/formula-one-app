import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Standings from '../views/Standings.vue'
import Map from '../views/Map.vue'

Vue.use(VueRouter)

{/* <font-awesome-icon :icon="['fas', 'home']" />
<font-awesome-icon :icon="['fas', 'table']" />
<font-awesome-icon :icon="['fas', 'screwdriver']" />
<font-awesome-icon :icon="['fas', 'globe-europe']" /> */}

const routes = [
  {
    path: '/home',
    name: 'Home',
    icon: 'home',
    component: Home
  },
  {
    path: '/standings',
    name: 'Standings',
    icon: 'table',
    component: Standings
  },
  {
    path: '/map',
    name: 'Map',
    icon: 'globe-europe',
    component: Map
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
