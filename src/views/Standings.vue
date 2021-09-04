<template>
  <b-container class="view-container">
    <SwiperNav />
    <StandingsNav />
    <router-view />
  </b-container>
</template>

<script>
import StandingsNav from '../components/Standings/StandingsNav.vue'
import SwiperNav from '../components/General/SwiperNav.vue'

export default {
  name: `Standings`,
  components: {
    SwiperNav,
    StandingsNav,
  },
}
</script>

<style scoped>

</style>
