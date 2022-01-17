<template>
  <b-container class="default-background-center">
  <div class="row">
    <div class="col">
      <RaceMapView />
    </div>
  </div>
  </b-container>
</template>

<script>
import RaceMapView from '../components/RaceMapView.vue'

export default {
  name: `RaceMap`,
  components: {
    RaceMapView,
  },
}
</script>

<style scoped>

</style>
