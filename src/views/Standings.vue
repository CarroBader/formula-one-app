<template>
  <b-container class="view-container">
    <StandingsNav />
    <router-view />
  </b-container>
</template>     

<script>
import StandingsNav from '../components/Standings/StandingsNav'

export default {
  name: 'Standings',
  components: {
    StandingsNav
  }
}
</script>

<style scoped>

</style>
