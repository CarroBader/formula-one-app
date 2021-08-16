<template>
  <b-container class="default-background-center">
    <div class="row next-race-quali-row">
      <div class="col">
        <QualificationSession 
          :qualificationResult="qualificationResult"
          v-if="dataLoaded"/>
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
      upcomingRace: 'nextRace',
      season: null,
      thisRound: null,
      dataLoaded: false,
      qualificationResult: null
    }
  },
  mounted() {
    this.getNextRace()
  },
  methods: {
    async getNextRace() {
      let responseRace = await this.getRaces(this.upcomingRace)

      this.season = responseRace.nextRace.season
      this.thisRound = responseRace.nextRace.round

      this.getNextQualification(this.season, this.thisRound)
    },
    async getNextQualification(season, round) {
      let responseQualification = await this.getNextRaceQuali(season, round)

      this.qualificationResult = responseQualification.nextRaceQualification
      this.dataLoaded = responseQualification.dataLoaded
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
