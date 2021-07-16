<template>
  <b-container class="default-background-center">
    <div>
      <h1 class="align-title circuit-name"> {{ this.nextRaceTrackName }}</h1>
    </div>
    <div class="row">
      <div class="col">
        <NextRaceTrackInfo 
          :nextRace="nextRace"
          v-if="nextRaceDataLoaded"/>
      </div>
      <div class="col">
        <TrackLastWinners 
          :latestWinners="latestWinners"
          :nextRaceTrackName="nextRaceTrackName"
          v-if="latestWinnersDataLoaded"/>
      </div>
    </div>
  </b-container>
</template>     

<script>
import NextRaceTrackInfo from '../../components/UpcomingRace/NextRace/NextRaceTrackInfo.vue'
import TrackLastWinners from '../../components/UpcomingRace/NextRace/TrackLastWinners.vue'
import apiCallsMixin from '../../mixins/apiCallsMixin'

export default {
  name: 'NextRace',
  components: {
    NextRaceTrackInfo,
    TrackLastWinners
  },
  data() {
    return {
      nextRace: null,
      nextRaceDataLoaded: false,
      latestWinnersDataLoaded: false,
      upcomingRace: 'nextRace',
      nextRaceTrackName: null,
      nextRaceTrackId: null,
      season: null,
      latestWinners: []
    }
  },
  mounted() {
    this.getNextRace()
  },
  methods: {
    async getNextRace() {
      let responseRace = await this.getRaces(this.upcomingRace)

      this.nextRace = responseRace.nextRace
      this.nextRaceTrackName = this.nextRace.Circuit.circuitName
      this.nextRaceTrackId = this.nextRace.Circuit.circuitId
      this.season = Number(this.nextRace.season)
      this.nextRaceDataLoaded = responseRace.dataLoaded
      console.log(this.nextRace)

      this.getResult(this.season, this.nextRaceTrackId)
    },
    async getResult(season, track) {
      let fiveYearsBack = season - 5
      //let latestWinners = []

      while (season != fiveYearsBack) {
        season--
        let responseResult = await this.getResultPerTrack(season, track)
        //console.log("responseResult", responseResult)

        for (let i = 0; i < responseResult.length; i++) {
          this.latestWinners.push(responseResult[i])
        }
      }
      this.latestWinnersDataLoaded = true
    }
  },
  mixins: [apiCallsMixin]
}
</script>

<style scoped>
.circuit-name {
  margin: auto 2em;
  background-color: grey;
  border-radius: 15px;
  text-align: center;
  -webkit-text-stroke-width: 0.9px;
  -webkit-text-stroke-color: black;
}
</style>
