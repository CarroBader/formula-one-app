<template>
  <b-container class="default-background-center">
    <div class="row practice-row">
      <!-- <div class="col">
        <PracticeSession />
      </div> -->
      <div class="col">
        <AllRaces />
      </div>
    </div>
  </b-container>
</template>     

<script>
import PracticeSession from '../../components/UpcomingRace/Practice/PracticeSession.vue'
import AllRaces from '../../components/AllRaces.vue'

export default {
  name: 'Practice',
  components: {
    PracticeSession,
    AllRaces
  }
}
</script>

<style scoped>

</style>
