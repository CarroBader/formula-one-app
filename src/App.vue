<template>
  <div class="default-background-center" v-if="allDataLoaded">
    <TopNav />
    <SwiperNav :key="renderKey" />
    <router-view />
    <Footer />
    <BotNav />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import store from './store/ store'
import SwiperNav from './layout/SwiperNav.vue'

import TopNav from './layout/TopNav.vue'
import Footer from './layout/Footer.vue'
import BotNav from './layout/BotNav.vue'

export default {
  name: 'App',
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
    ...mapGetters(['allConfirmedRaces', 'allDrivers', 'allConstructors']),
    ...mapState([
      'allDataLoaded',
      'upcomingRace',
      'currentRound',
      'nextSession',
      'raceNav',
    ]),
  },
  watch: {
    $route(to, from) {
      if (from.name === 'Race Map') {
        this.forceRerender()
      }
    },
  },
  created() {
    if (this.allConfirmedRaces && this.allConfirmedRaces.length > 0) return
    this.getAllRaces()

    if (this.allDrivers && this.allDrivers.length > 0) return
    this.getAllDrivers()

    if (this.allConstructors && this.allConstructors.length > 0) return
    this.getAllConstructors()
  },
  methods: {
    ...mapActions(['getAllRaces', 'getAllDrivers', 'getAllConstructors']),
    forceRerender() {
      this.renderKey += 1
    },
  },
}
</script>

<style scoped></style>
