<template>
  <b-container class="default-background-center">
    <div class="row last-race-row">
      <div class="col">
        <PracticeSession />
      </div>
    </div>
  </b-container>
</template>     

<script>
import PracticeSession from '../../components/UpcomingRace/Practice/PracticeSession.vue'

export default {
  name: 'Practice',
  components: {
    PracticeSession
  }
}
</script>

<style scoped>

</style>
