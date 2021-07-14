<template>
  <b-container class="default-background-center">
  <div class="row">
    <div class="col">
      <NextRace 
        :nextRace="nextRace"
        v-if="getComingRacesDone"/>
        <br>
    </div>
    <div class="col">
      <NextRaceQuali
        :nextRaceQuali="nextRaceQuali"
        :nextRaceNameQuali="nextRaceNameQuali"
        v-if="getNextRaceQualiDone"/>
      <LastRace
      :race="race"
      :results="results"
      v-if="getComingRacesDone && !nextQualiDone"/>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <LastRace
      :race="race"
      :results="results"
      v-if="getComingRacesDone && nextQualiDone"/>
      <!-- <ComingRaces
      :futureRaces="futureRaces"
      v-if="getComingRacesDone"/> -->
    </div>
    <div class="col"> 
      <Leaders 
      :leaderDriver="leaderDriver"
      :leaderConstructor="leaderConstructor"
      v-if="getTopDriverDone"/>
    </div>
  </div>
  </b-container>
</template>     

<script>
// import ComingRaces from '../components/ComingRaces.vue'
import axios from 'axios'
import { baseUrl } from '../vars'
import NextRace from '../components/NextRace.vue'
import LastRace from '../components/LastRace.vue'
import Leaders from '../components/Leaders.vue'
import NextRaceQuali from '../components/NextRaceQuali.vue'

var comingRaces = []
var todaysDate

export default {
  name: 'Home',
  components: {
    // ComingRaces,
    NextRace,
    LastRace,
    Leaders,
    NextRaceQuali
  },
  data() {
    return {
      getComingRacesDone: false,
      getTopDriverDone: false,
      getTopConstructorDone: false,
      getNextRaceQualiDone: false,
      nextQualiDone: false,
      nextRace: null,
      futureRaces: null,
      race: null,
      results: null,
      leaderDriver: null,
      leaderConstructor: null,
      nextRaceQuali: null,
      nextRaceNameQuali: null
    }
  },
  mounted() {
    this.getComingRaces()
    this.getTopDriver()
    this.getConstructorDriver()
  },
  methods: {
    async getComingRaces() {
      try {
        const response = await axios.get(`${baseUrl}current.json`)

        this.allRaces = response.data.MRData.RaceTable.Races

        todaysDate = this.getTodaysDate()
        this.allRaces.map(race => {
          let raceDate = Date.parse(race.date);

          if (raceDate >= todaysDate) {
            comingRaces.push(race)
          }
        });
        this.futureRaces = comingRaces.slice(1)
        this.nextRace = comingRaces[0]
        let currentRound = comingRaces[0].round
        let lastRound = currentRound - 1
        let season = this.nextRace.season

        this.getRaceResult(season, lastRound)
        this.getNextRaceQuali(season, currentRound)

      } catch(e) {
        console.error(e)
      }
    },
    getTodaysDate() {
      let dateToday = new Date(new Date().getTime()
      - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);

      return Date.parse(dateToday);
    },
    async getRaceResult(season, lastRound) {
      try {
        const response = await axios.get(`${baseUrl}${season}/${lastRound}/results.json`)
        this.race = response.data.MRData.RaceTable.Races[0]
        //console.log(this.race)
        this.results = this.race.Results
        this.getComingRacesDone = true

      } catch(e) {
        console.error(e)
      }
    },
    async getTopDriver() {
      try {
        const response = await axios.get(`${baseUrl}current/driverStandings.json`)
        this.leaderDriver = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
        this.getTopDriverDone = true

      } catch(e) {
        console.error(e)
      }
    },
    async getConstructorDriver() {
      try {
        const response = await axios.get(`${baseUrl}current/constructorStandings.json`)
        this.leaderConstructor = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]
        this.getTopConstructorDone = true
      } catch(e) {
        console.error(e)
      }
    },
    async getNextRaceQuali(season, currentRound) {
       try {
        //const response = await axios.get(`${baseUrl}${season}/${currentRound}/qualifying.json`)
        console.log(currentRound)
        const response = await axios.get(`${baseUrl}${season}/9/qualifying.json`)
        let qualiForRace = response.data.MRData.RaceTable.Races
        if (qualiForRace.length != 0) {
          this.nextRaceQuali = response.data.MRData.RaceTable.Races[0].QualifyingResults
          this.nextRaceNameQuali = response.data.MRData.RaceTable.Races[0].raceName

          this.nextQualiDone = true
          this.getNextRaceQualiDone = true
        }
      } catch(e) {
        console.error(e)
      }     
    }
  }
}
</script>

<style scoped>

</style>
