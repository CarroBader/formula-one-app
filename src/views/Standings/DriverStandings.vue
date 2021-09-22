<template>
  <b-container class="default-background-center">
    <div class="row driver-standings-row">
      <div class="col">
        <DriverTable
          v-if="driverStandingsDataLoaded"
          :driverStandings="driverStandings"/>
      </div>
    </div>
  </b-container>
</template>

<script>
import DriverTable from '../../components/Standings/DriverStandings/DriverTable.vue'

import apiCallsNewMixin from '../../mixins/apiCallsNewMixin'

export default {
  name: `DriverStandings`,
  components: {
    DriverTable,
  },
  data() {
    return {
      driverStandings: null,
      driverStandingsDataLoaded: false,
    }
  },
  async created() {
    if (this.driverStandings && this.driverStandings.length > 0) return
    console.log(`DriverStandings - No data in driverStandings yet`)
    const driverStandingsData = await this.getDriverStandings()

    this.driverStandings = driverStandingsData.allDrivers
    this.driverStandingsDataLoaded = driverStandingsData.driverDataLoaded
  },
  mixins: [apiCallsNewMixin],
}
</script>

<style scoped>
  .driver-standings-row {
    display: inline-block;
  }
</style>
