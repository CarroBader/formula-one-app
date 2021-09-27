<template>
  <b-container class="default-background-center">
    <h3>Qualifying</h3>
    <h1> {{ id }}</h1>
    <div class="row qualifying-row">
      <div class="col">
        <QualifyingSession
          :qualifyingResult="qualifyingResult"
          :nextRaceName="nextRaceName"
          v-if="qualifyingDataLoaded"
        />
      </div>
    </div>
  </b-container>
</template>

<script>
import QualifyingSession from '../../components/UpcomingRace/Qualifying/QualifyingSession.vue'

import apiCallsMixin from '../../mixins/apiCallsMixin'

export default {
  name: `Qualifying`,
  components: {
    QualifyingSession,
  },
  props: [`id`],
  data() {
    return {
      getNextRace: `nextRace`,
      nextRaceName: null,
      qualifyingDataLoaded: false,
      season: null,
      thisRound: null,
      qualifyingResult: null,
    }
  },
  async created() {
    console.log(`Qualy - updating`)
    // Get next race
    // const responseNextRace = await this.getRaces(this.getNextRace)

    // // Set value on data properties
    // this.nextRaceName = responseNextRace.nextRace.raceName
    // this.season = responseNextRace.nextRace.season
    // this.thisRound = responseNextRace.nextRace.round

    // this.getNextRaceQualifying(this.season, this.thisRound)
  },
  methods: {
    async getNextRaceQualifying(season, round) {
    /*
      Set value on qualifyingResult and qualifyingDataLoaded.
    */
      // Get next race qualifying result
      const responseQualifying = await this.getNextRaceQualifyingResult(season, round)

      // Set value on data properties
      // Oklart än om det räcker med bara resultatet, ta bort QualifyingResults om mer infor behövs
      this.qualifyingResult = responseQualifying.nextRaceQualifying.QualifyingResults

      // Set dataloaded variable(s) to true
      this.qualifyingDataLoaded = responseQualifying.dataLoaded
    },
  },
  mixins: [apiCallsMixin],
}
</script>

<style scoped>
  .qualifying-row {
    display: inline-block;
  }
</style>
