<template>
  <div class="default-background-center" v-if="allDataLoaded">
    <TopNav />
     <SwiperNav :key="renderKey"/>
    <router-view />
    <Footer />
    <BotNav />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import store from './store/ store'
import SwiperNav from "./components/General/SwiperNav.vue"

import TopNav from './components/General/TopNav.vue'
import Footer from './components/General/Footer.vue'
import BotNav from './components/General/BotNav.vue'

export default {
  name: `App`,
  components: {
    TopNav,
    Footer,
    BotNav,
    SwiperNav,
  },
  data() {
    return {
      allRaces: null,
      nextRaceName: null,
      renderKey: 0,
    }
  },
  computed: {
    ...mapGetters([`allConfirmedRaces`, `allDrivers`, `allTeams`, `nextRace`, `nextSession`]),
    ...mapState([`raceDataLoaded`, `currentRound`, `allDataLoaded`, `raceNav`]),
  },
  watch: {
    raceDataLoaded(val) {
      if (val) {
        this.allRaces = this.allConfirmedRaces

        if (this.nextRace && this.nextRace.length > 0) return
        store.dispatch(`getNextRace`, this.allRaces)

        if (this.currentRound && this.currentRound !== 0) return
        store.dispatch(`getNextRaceRound`, this.nextRace)

        if (this.nextSession && this.nextSession.length > 0) return
        store.dispatch(`getNextSession`, this.nextRace)
      }
    },
    $route(to, from) {
      if (from.name === `Race Map`) {
        this.forceRerender()
      }
    },
  },
  created() {
    console.log(`App - created`)
    console.log(`Time`, new Date())
    console.log(`App - allConfirmedRaces`, this.allConfirmedRaces)
    console.log(`App - allDrivers`, this.allDrivers)
    console.log(`App - allTeams`, this.allTeams)
    console.log(`App - raceDataLoaded`, this.raceDataLoaded)

    console.log(`App - nextRace`, this.nextRace)
    console.log(`App - currentRound`, this.currentRound)
    console.log(`App - nextSession`, this.nextSession)
    console.log(`App - allDataLoaded`, this.allDataLoaded)
    console.log(`App ------------------------------------------ raceNav`, this.raceNav)

    if (this.allConfirmedRaces && this.allConfirmedRaces.length > 0) return
    console.log(`App - No data getAllRaces yet`)
    this.getAllRaces()

    if (this.allDrivers && this.allDrivers.length > 0) return
    console.log(`App - No data getAllDrivers yet`)
    this.getAllDrivers()

    if (this.allTeams && this.allTeams.length > 0) return
    console.log(`App - No data getAllTeams yet`)
    this.getAllTeams()
  },
  methods: {
    ...mapActions([`getAllRaces`, `getAllDrivers`, `getAllTeams`]),
    forceRerender() {
      this.renderKey += 1
    },
  },
}
</script>

<style scoped>

</style>
