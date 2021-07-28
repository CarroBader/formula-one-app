<template>
  <b-container class="default-background-center">
    <StandingsHeader />
    <router-view />
  </b-container>
</template>     

<script>
import StandingsHeader from '../components/Standings/StandingsHeader.vue'

export default {
  name: 'Standings',
  components: {
    StandingsHeader
  }
}
</script>

<style scoped>

</style>
