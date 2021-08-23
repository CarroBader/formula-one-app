<template>
  <b-container class="default-background-center">
    <h1 class="next-race-headline"
      v-if="nextRaceDataLoaded"
    >
      {{ this.nextRace.raceName }}
    </h1>
    <div class="row next-race-row">
      <div class="col">
        <NextRaceTrackInfo
          :nextRace="nextRace"
          v-if="nextRaceDataLoaded"
        />
      </div>
      <div class="col">
        <!-- <TrackLastWinners 
          :latestWinners="latestWinners"
          :nextRaceTrackName="nextRaceTrackName"
          v-if="latestWinnersDataLoaded"/> -->
      </div>
    </div>
  </b-container>
</template>     

<script>
import NextRaceTrackInfo from '../../components/UpcomingRace/NextRace/NextRaceTrackInfo.vue'
import TrackLastWinners from '../../components/UpcomingRace/NextRace/TrackLastWinners.vue'

import apiCallsMixin from '../../mixins/apiCallsMixin.js'

export default {
  name: 'NextRace',
  components: {
    NextRaceTrackInfo,
    TrackLastWinners
  },
  data() {
    return {
      getNextRace: 'nextRace',
      nextRace: null,
      nextRaceDataLoaded: false,
      // latestWinnersDataLoaded: false,
      // nextRaceTrackName: null,
      // nextRaceTrackId: null,
      // season: null,
      // latestWinners: []
    }
  },
  async created() {
    // Get next race
    let responseNextRace = await this.getRaces(this.getNextRace)

    // Set value on data properties
    this.nextRace = responseNextRace.nextRace

    // Set dataloaded variable(s) to true
    this.nextRaceDataLoaded = responseNextRace.dataLoaded

    //this.nextRaceTrackName = this.nextRace.Circuit.circuitName
    // this.nextRaceTrackId = this.nextRace.Circuit.circuitId
    // this.season = Number(this.nextRace.season)
    //console.log("NEXT:", this.nextRace)

    //this.getResult(this.season, this.nextRaceTrackId)
  },
  methods: {
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
  .next-race-row {
    margin-bottom: 3em;
  }
</style>
