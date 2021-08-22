<template>
  <b-container class="default-background-center">
    <div class="row practice-row">
      <!-- <div class="col">
        <PracticeSession />
      </div> -->
      <div class="col">
        <UpcomingRaces />
      </div>
    </div>
  </b-container>
</template>     

<script>
import PracticeSession from '../../components/UpcomingRace/Practice/PracticeSession.vue'
import UpcomingRaces from '../../components/UpcomingRaces.vue'

export default {
  name: 'Practice',
  components: {
    PracticeSession,
    UpcomingRaces
  }
}
</script>

<style scoped>

</style>
