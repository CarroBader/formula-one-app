<template>
  <b-container class="default-background-center">
        <h1> {{ id }}</h1>
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
  props: [`id`],
}
</script>

<style scoped>

</style>
