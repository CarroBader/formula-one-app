<template>
  <b-container class="default-background-center">
    <div class="row next-race-quali-row">
      <div class="col">
        <QualificationSession 
          :qualificationResult="qualificationResult"
          v-if="qualiDataLoaded"/>
      </div>
    </div>
  </b-container>
</template>     

<script>
import QualificationSession from '../../components/UpcomingRace/Qualification/QualificationSession.vue'
import apiCallsMixin from '../../mixins/apiCallsMixin'

export default {
  name: 'Qualification',
  components: {
    QualificationSession
  },
  data() {
    return {
      getNextRace: 'nextRace',
      qualiDataLoaded: false,
      season: null,
      thisRound: null,
      qualificationResult: null
    }
  },
  async created() {
    let responseNextRace = await this.getRaces(this.getNextRace)

    this.season = responseNextRace.nextRace.season
    this.thisRound = responseNextRace.nextRace.round

    this.getNextQualification(this.season, this.thisRound)
  },
  methods: {
    async getNextQualification(season, round) {
      let responseQualification = await this.getNextRaceQuali(season, round)

      this.qualificationResult = responseQualification.nextRaceQualification
      this.qualiDataLoaded = responseQualification.dataLoaded
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
