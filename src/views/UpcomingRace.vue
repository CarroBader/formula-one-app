<template>
  <b-container class="view-container">
    <SwiperNav />
    <UpcomingRaceNav />
    <router-view />
  </b-container>
</template>

<script>
import UpcomingRaceNav from '../components/UpcomingRace/UpcomingRaceNav.vue'
import SwiperNav from '../components/General/SwiperNav.vue'

export default {
  name: `UpcomingRace`,
  components: {
    SwiperNav,
    UpcomingRaceNav,
  },
}
</script>

<style scoped>

</style>
