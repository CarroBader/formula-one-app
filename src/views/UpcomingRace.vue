<template>
  <b-container class="view-container">
    <UpcomingRaceNav />
    <router-view /> 
  </b-container>
</template>     

<script>
import UpcomingRaceNav from '../components/UpcomingRace/UpcomingRaceNav.vue'

export default {
  name: 'UpcomingRace',
  components: {
    UpcomingRaceNav
  }
}
</script>

<style scoped>

</style>
