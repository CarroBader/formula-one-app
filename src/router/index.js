import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Standings from '../views/Standings.vue'
import Map from '../views/Map.vue'
import UpcomingRace from '../views/UpcomingRace.vue'
import NextRace from '../views/UpcomingRace/NextRace.vue'
import LastRace from '../views/UpcomingRace/LastRace.vue'
import Qualification from '../views/UpcomingRace/Qualification.vue'
import Practice from '../views/UpcomingRace/Practice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/race/pre',
    name: 'British Grand Prix',
    icon: 'home',
    component: UpcomingRace,
    children: [
      {
        path: '/race/last',
        name: 'Last',
        component: LastRace
      },
      {
        path: '/race/pre',
        name: 'Pre',
        component: NextRace
      },
      {
        path: '/race/practice',
        name: 'Practice',
        component: Practice
      },
      {
        path: '/race/qualification',
        name: 'Qualification',
        component: Qualification
      },
         
    ]
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
