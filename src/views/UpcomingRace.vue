<template>
  <b-container class="default-background-center">
    <UpcomingRaceHeader />
    <router-view />
  </b-container>
</template>     

<script>
import UpcomingRaceHeader from '../components/UpcomingRace/UpcomingRaceHeader.vue'

export default {
  name: 'UpcomingRace',
  components: {
    UpcomingRaceHeader
  }
}
</script>

<style scoped>

</style>
