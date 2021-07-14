<template>
  <b-container class="default-background-center">
  <div class="row">
    <div class="col hej">
      <DriverStandings
      :driverStandings="driverStandings"
      v-if="getDriverStandingsDone"
       />
    </div>
  </div>
  <div class="row">
    <div class="col hej">
      <ConstructorStandings
      :constructorStandings="constructorStandings"
      v-if="getConstructorStandingsDone"
       />
    </div>
  </div>
  </b-container>
</template>

<script>
import axios from 'axios'
import { baseUrl } from '../vars'
import DriverStandings from '../components/DriverStandings.vue'
import ConstructorStandings from '../components/ConstructorStandings.vue'

export default { 
  name: 'Standings',
  components: {
    DriverStandings,
    ConstructorStandings
  },
  data() {
    return {
      getDriverStandingsDone: false,
      getConstructorStandingsDone: false,
      driverStandings: null,
      constructorStandings: null
    }
  },
  mounted() {
    this.getDriverStandings()
    this.getConstructorStandings()
  },
  methods: {
    async getDriverStandings() {
      try {
        const response = await axios.get(`${baseUrl}current/driverStandings.json`)
        this.driverStandings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        this.getDriverStandingsDone = true

      } catch(e) {
        console.error(e)
      }
    },
    async getConstructorStandings() {
      try {
        const response = await axios.get(`${baseUrl}current/constructorStandings.json`)
        this.constructorStandings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        this.getConstructorStandingsDone = true
      } catch(e) {
        console.error(e)
      }
    },
  }
}
</script>

<style scoped>
.hej {
  margin: 0 15em;
}

</style>
