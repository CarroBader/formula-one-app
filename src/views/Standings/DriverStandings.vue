<template>
  <b-container class="default-background-center">
    <div class="row driver-standings-row">
      <div class="col">
        <DriverTable
          v-if="driverStandingsDataLoaded"
          :driverStandings="driverStandings"
        />
      </div>
    </div>
  </b-container>
</template>

<script>
import DriverTable from '../../components/Standings/DriverStandings/DriverTable.vue'

import apiCallsMixin from '../../mixins/apiCallsMixin'

export default {
  name: 'DriverStandings',
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
    console.log('DriverStandings - No data in driverStandings yet')
    const driverStandingsData = await this.getDriverStandings()

    this.driverStandings = driverStandingsData.alldrivers

    this.driverStandingsDataLoaded = driverStandingsData.driverDataLoaded
  },
  mixins: [apiCallsMixin],
}
</script>

<style scoped></style>
