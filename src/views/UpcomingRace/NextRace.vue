<template>
  <b-container 
    class="default-background-center"
    v-if="nextRaceDataLoaded"
  >
    <h1 class="next-race-headline">
      {{ this.nextRace.raceName }}
    </h1>
    <b-row class="next-race-row">
      <b-col>
        <NextCircuitTrackInfo
          :nextRace="nextRace" 
        />
        <CircuitLastList
            class="display-when-tablet"
            :title="polesTitle"
            :drivers="poles" 
        />
      </b-col>
      <b-col>
        <NexRaceTimeTable />
        <b-row class="next-race-last-top">
          <CircuitLastList
            :title="winnersTitle"
            :drivers="winners" 
          />
          <CircuitLastList
            class="no-display-when-tablet"
            :title="polesTitle"
            :drivers="poles" 
          />
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NextCircuitTrackInfo from '../../components/UpcomingRace/NextRace/NextRaceCircuitInfo.vue'
import NexRaceTimeTable from '../../components/UpcomingRace/NextRace/NexRaceTimeTable.vue'
import CircuitLastList from '../../components/UpcomingRace/NextRace/CircuitLastList.vue'

import apiCallsMixin from '../../mixins/apiCallsMixin.js'

const winnersTitle = "Last Winners"
const polesTitle = "Last Poles"
const winners = [
  {
    year: 2021,
    name: "Max Verstappen",
    constructor: "Red Bull",
    colorCode: "red_bull"
  },
  {
    year: 2020,
    name: "Lewis Hamilton",
    constructor: "Mercedes",
    colorCode: "mercedes"
  },
    {
    year: 2019,
    name: "Charles LeClerec",
    constructor: "Ferrari",
    colorCode: "ferrari"
  },
    {
    year: 2018,
    name: "Sebastian Vettel",
    constructor: "Ferrari",
    colorCode: "ferrari"
  },
    {
    year: 2017,
    name: "Lewis Hamilton",
    constructor: "Mercedes",
    colorCode: "mercedes"
  }
]
const poles = [
  {
    year: 2021,
    name: "Max Verstappen",
    constructor: "Red Bull",
    colorCode: "red_bull"
  },
  {
    year: 2020,
    name: "Lewis Hamilton",
    constructor: "Mercedes",
    colorCode: "mercedes"
  },
    {
    year: 2019,
    name: "Charles LeClerec",
    constructor: "Ferrari",
    colorCode: "ferrari"
  },
    {
    year: 2018,
    name: "Lewis Hamilton",
    constructor: "Mercedes",
    colorCode: "mercedes"
  },
    {
    year: 2017,
    name: "Lewis Hamilton",
    constructor: "Mercedes",
    colorCode: "mercedes"
  }
]

export default {
  name: 'NextRace',
  components: {
    NextCircuitTrackInfo,
    NexRaceTimeTable,
    CircuitLastList
  },
  data() {
    return {
      getNextRace: 'nextRace',
      nextRace: null,
      nextRaceDataLoaded: false,
      winnersTitle: winnersTitle,
      winners: winners,
      polesTitle: polesTitle,
      poles: poles
    }
  },
  async created() {
    // Get next race
    let responseNextRace = await this.getRaces(this.getNextRace)

    // Set value on data properties
    this.nextRace = responseNextRace.nextRace

    // Set dataloaded variable(s) to true
    this.nextRaceDataLoaded = responseNextRace.dataLoaded
  },
  mixins: [apiCallsMixin]
}
</script>

<style scoped>
</style>
