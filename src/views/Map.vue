<template>
  <b-container class="default-background-center">
  <div class="row">
    <div class="col">
      <RaceMap />
    </div>
  </div>
  </b-container>
</template>     

<script>
import RaceMap from '../components/RaceMap.vue'

export default {
  name: 'Map',
  components: {
    RaceMap
  }
}
</script>

<style scoped>

</style>
