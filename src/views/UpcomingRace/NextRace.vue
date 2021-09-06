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
      </b-col>
      <b-col>
        <NexRaceTimeTable />
        <NextRaceCountryFlag
          :country="nextRaceCountryFlag"
        />
        <b-row class="next-race-last-top">
          <CircuitLastList
            :title="winnersTitle"
            :drivers="winners"
          />
          <CircuitLastList
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
import NextRaceCountryFlag from '../../components/UpcomingRace/NextRace/NextRaceCountryFlag.vue'

import apiCallsMixin from '../../mixins/apiCallsMixin'
import getWindowSizeMixin from '../../mixins/getWindowSizeMixin'
import generalVars from '../../mixins/generalVars'

const winnersTitle = `Last Winners`
const polesTitle = `Last Poles`
const winners = [
  {
    year: 2021,
    name: `Max Verstappen`,
    constructor: `Red Bull`,
    colorCode: `red_bull`,
    winners: true,
  },
  {
    year: 2020,
    name: `Lewis Hamilton`,
    constructor: `Mercedes`,
    colorCode: `mercedes`,
    winners: true,
  },
  {
    year: 2019,
    name: `Charles LeClerec`,
    constructor: `Ferrari`,
    colorCode: `ferrari`,
    winners: true,
  },
  {
    year: 2018,
    name: `Sebastian Vettel`,
    constructor: `Ferrari`,
    colorCode: `ferrari`,
    winners: true,
  },
  {
    year: 2017,
    name: `Lewis Hamilton`,
    constructor: `Mercedes`,
    colorCode: `mercedes`,
    winners: true,
  },
]
const poles = [
  {
    year: 2021,
    name: `Max Verstappen`,
    time: `1:55.006`,
  },
  {
    year: 2020,
    name: `Lewis Hamilton`,
    time: `1:57.592`,
  },
  {
    year: 2019,
    name: `Charles LeClerec`,
    time: `1:58.076`,
  },
  {
    year: 2018,
    name: `Lewis Hamilton`,
    time: `1:57.983`,
  },
  {
    year: 2017,
    name: `Lewis Hamilton`,
    time: `1:59.143`,
  },
]

export default {
  name: `NextRace`,
  components: {
    NextCircuitTrackInfo,
    NexRaceTimeTable,
    CircuitLastList,
    NextRaceCountryFlag,
  },
  data() {
    return {
      getNextRace: `nextRace`,
      nextRace: null,
      nextRaceDataLoaded: false,
      nextRaceCountryFlag: null,
      winnersTitle,
      winners,
      polesTitle,
      poles,
    }
  },
  async created() {
    // Get next race
    const responseNextRace = await this.getRaces(this.getNextRace)

    // Set value on data properties
    this.nextRace = responseNextRace.nextRace
    this.nextRaceCountryFlag = responseNextRace.nextRace.Circuit.Location.country

    // Set dataloaded variable(s) to true
    this.nextRaceDataLoaded = responseNextRace.dataLoaded
  },
  mixins: [apiCallsMixin, getWindowSizeMixin, generalVars],
}
</script>

<style scoped>
</style>
