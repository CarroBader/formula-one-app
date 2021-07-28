<template>
  <b-container class="default-background-center smaller-div">
    <div class="row last-race-row">
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

.smaller-div {
  width: 70%;
}

</style>
