<template>
  <b-container class="default-background-center">
    <div class="row next-race-quali-row">
      <div class="col">
        <QualificationSession
          :qualificationResult="qualificationResult"
          :nextRaceName="nextRaceName"
          v-if="qualificationDataLoaded"
        />
      </div>
    </div>
  </b-container>
</template>

<script>
import QualificationSession from '../../components/UpcomingRace/Qualification/QualificationSession.vue'

import apiCallsMixin from '../../mixins/apiCallsMixin.js'

export default {
  name: 'Qualification',
  components: {
    QualificationSession
  },
  data() {
    return {
      getNextRace: 'nextRace',
      nextRaceName: null,
      qualificationDataLoaded: false,
      season: null,
      thisRound: null,
      qualificationResult: null
    }
  },
  async created() {
    // Get next race
    let responseNextRace = await this.getRaces(this.getNextRace)

    // Set value on data properties
    this.nextRaceName = responseNextRace.nextRace.raceName
    this.season = responseNextRace.nextRace.season
    this.thisRound = responseNextRace.nextRace.round

    this.getNextRaceQualification(this.season, this.thisRound)
  },
  methods: {
    async getNextRaceQualification(season, round) {
    /* 
      Set value on qualificationResult and qualificationDataLoaded.
    */
      // Get next race qualification result
      let responseQualification = await this.getNextRaceQualificationResult(season, round)

      // Set value on data properties
      // Oklart än om det räcker med bara resultatet, ta bort QualifyingResults om mer infor behövs
      this.qualificationResult = responseQualification.nextRaceQualification.QualifyingResults

      // Set dataloaded variable(s) to true
      this.qualificationDataLoaded = responseQualification.dataLoaded
    }
  },
  mixins: [apiCallsMixin]
}
</script>

<style scoped>
  .next-race-quali-row {
    display: inline-block;
  }
</style>
