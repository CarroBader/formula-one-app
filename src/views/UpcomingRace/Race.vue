<template>
  <b-container class="default-background-center">
    <div class="row race-row">
      <div class="col">
        <MainRace />
      </div>
    </div>
  </b-container>
</template>

<script>
import MainRace from '../../components/UpcomingRace/Race/MainRace.vue'

export default {
  name: `Race`,
  components: {
    MainRace,
  },
}
</script>

<style scoped>

</style>
