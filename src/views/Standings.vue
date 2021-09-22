<template>
  <b-container class="view-container">
    <StandingsNav />
    <keep-alive>
    <router-view />
    </keep-alive>
  </b-container>
</template>

<script>
import StandingsNav from '../components/Standings/StandingsNav.vue'

export default {
  name: `Standings`,
  components: {
    StandingsNav,
  },
}
</script>

<style scoped>
</style>
