<template>
  <b-container class="default-background-center">
    <div class="row driver-standings-row">
      <div class="col">
        <DriverTable />
      </div>
    </div>
  </b-container>
</template>

<script>
import DriverTable from '../../components/Standings/DriverStandings/DriverTable.vue'

export default {
  name: 'DriverStandings',
  components: {
    DriverTable
  }
}
</script>

<style scoped>
  .driver-standings-row {
    display: inline-block;
  }
</style>
