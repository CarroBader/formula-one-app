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
import Race from '../views/UpcomingRace/Race.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/grand-prix/',
    name: 'Hungarian Grand Prix',
    icon: 'home',
    component: UpcomingRace,
    children: [
      {
        path: '/grand-prix/last',
        name: 'Last',
        component: LastRace
      },
      {
        path: '/grand-prix/pre',
        name: 'Pre',
        component: NextRace
      },
      {
        path: '/grand-prix/practice',
        name: 'Practice',
        component: Practice
      },
      {
        path: '/grand-prix/qualification',
        name: 'Qualification',
        component: Qualification
      },
      {
        path: '/grand-prix/race',
        name: 'Race',
        component: Race
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
