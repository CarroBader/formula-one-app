import Vue from 'vue'
import VueRouter from 'vue-router'
import Standings from '../views/Standings.vue'
import RaceMap from '../views/RaceMap.vue'
import UpcomingRace from '../views/UpcomingRace.vue'
import NextRace from '../views/UpcomingRace/NextRace.vue'
import LastRace from '../views/UpcomingRace/LastRace.vue'
import Qualifying from '../views/UpcomingRace/Qualifying.vue'
import SprintQualifying from '../views/UpcomingRace/SprintQualifying.vue'
import Practice from '../views/UpcomingRace/Practice.vue'
import Race from '../views/UpcomingRace/Race.vue'
import DriverStandings from '../views/Standings/DriverStandings.vue'
import ConstructorStandings from '../views/Standings/ConstructorStandings.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: `/`,
  //   redirect: `/grand-prix/`,
  //   component: UpcomingRace,
  // },
  {
    path: `/grand-prix/:id`,
    component: UpcomingRace,
    props: true,
    icon: `flag-checkered`,
    children: [
      {
        path: `last-race`,
        name: `Last Race`,
        props: true,
        component: LastRace,
      },
      {
        path: `next-race`,
        name: `Next Race`,
        props: true,
        component: NextRace,
      },
      {
        path: `practice`,
        name: `Practice`,
        props: true,
        component: Practice,
      },
      {
        path: `qualifying`,
        name: `Qualifying`,
        props: true,
        component: Qualifying,
      },
      {
        path: `sprint-qualifying`,
        name: `Sprint Qualifying`,
        props: true,
        component: SprintQualifying,
        onlyForSprintRaces: true,
      },
      {
        path: `race`,
        name: `Race`,
        props: true,
        component: Race,
      },
    ],
  },
  {
    path: `/standings`,
    name: `Standings`,
    icon: `table`,
    component: Standings,
    children: [
      {
        path: `driver-standings`,
        name: `Driver Standings`,
        component: DriverStandings,
      },
      {
        path: `constructor-standings`,
        name: `Constructor Standings`,
        component: ConstructorStandings,
      },
    ],
  },
  {
    path: `/race-map`,
    name: `Race Map`,
    icon: `globe-europe`,
    component: RaceMap,
  },
]

const router = new VueRouter({
  mode: `history`,
  base: process.env.BASE_URL,
  routes,
})

export default router
