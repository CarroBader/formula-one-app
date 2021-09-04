<template>
  <div class="default-background-center">
    <TopNav
      :nextRaceName="nextRaceName"
      v-if="nextRaceDataLoaded"
    />
    <SwiperNav />
    <router-view />
    <Footer />
    <BotNav />
  </div>
</template>

<script>
import TopNav from './components/General/TopNav.vue'
import Footer from './components/General/Footer.vue'
import BotNav from './components/General/BotNav.vue'
import SwiperNav from './components/General/SwiperNav.vue'

import apiCallsMixin from './mixins/apiCallsMixin'

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
      getNextRace: `nextRace`,
      nextRaceName: null,
      nextRaceDataLoaded: false,
    }
  },
  async created() {
    // Get next race
    const responseNextRace = await this.getRaces(this.getNextRace)

    // Set value on data properties
    this.nextRaceName = responseNextRace.nextRace.raceName

    // Set dataloaded variable(s) to true
    this.nextRaceDataLoaded = responseNextRace.dataLoaded
  },
  mixins: [apiCallsMixin],
}
</script>

<style scoped>

</style>
