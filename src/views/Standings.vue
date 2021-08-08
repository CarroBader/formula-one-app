<template>
  <b-container class="default-background-center">
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
