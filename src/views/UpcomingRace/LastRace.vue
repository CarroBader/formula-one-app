<template>
  <b-container class="default-background-center">
    <div class="row last-race-row">
      <div class="col">
        <ResultLastRace />
      </div>
    </div>
  </b-container>
</template>     

<script>
import ResultLastRace from '../../components/UpcomingRace/LastRace/ResultLastRace.vue'

export default {
  name: 'LastRace',
  components: {
    ResultLastRace
  }
}
</script>

<style scoped>
  .last-race-row {
    display: inline-block;
    margin-bottom: 3em;
  }
</style>
