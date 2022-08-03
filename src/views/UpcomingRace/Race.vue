<template>
  <b-container class="default-background-center">
    <div class="row race-row">
      <div class="col">
        <RaceSession
          v-if="dataDone"
          :nextRaceName="nextRaceName"
          :raceResult="raceResult"
          :statusCompleted="statusCompleted"
        />
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import RaceSession from '../../components/UpcomingRace/Race/RaceSession.vue'

import helpersMixin from '../../mixins/helpersMixin'
import apiCallsMixin from '../../mixins/apiCallsMixin'

let responseRaceResult = []
let responseStartingGrid = []
let responseFastestLap = {}

export default {
  name: 'Race',
  components: {
    RaceSession,
  },
  props: ['id'],
  data() {
    return {
      allRaces: null,
      round: null,
      drivers: null,
      nextRace: null,
      nextRaceName: null,
      nextRaceLaps: 0,
      sessionIds: [],
      fastestLapSessionData: null,
      startingGrid: null,
      dataDone: false,
      statusCompleted: false,
    }
  },
  computed: {
    ...mapGetters(['allConfirmedRaces', 'allDrivers']),
    ...mapState(['currentRound']),
  },
  async created() {
    this.allRaces = this.allConfirmedRaces
    this.drivers = this.allDrivers

    this.lastRace = this.getNextRace(this.allRaces, this.currentRound)

    this.nextRaceName = this.lastRace.name

    if (this.lastRace.status === 'Complete') {
      if (this.lastRace !== null) {
        responseRaceResult = await this.getRaceResult(
          this.lastRace.grand_prix_id
        )
        responseStartingGrid = await this.getGridStartingForRace(
          this.lastRace.grand_prix_id
        )
        responseFastestLap = await this.getFastestLap(
          this.lastRace.grand_prix_id
        )
      }
      this.raceResult = responseRaceResult.data
      this.startingGrid = responseStartingGrid.data
      this.fastestLap = responseFastestLap.data

      this.createRaceResult()
    } else {
      this.dataDone = true
    }
  },
  methods: {
    createRaceResult() {
      this.addGridPosition()
      this.addDriverInfo()
      this.addfastestLap()
      // this.addPoints()

      this.statusCompleted = true
      this.dataDone = true
    },
    addGridPosition() {
      for (let i = 0; i < this.raceResult.length; i++) {
        for (let j = 0; j < this.startingGrid.length; j++) {
          if (this.raceResult[i].name_code == this.startingGrid[j].name_code) {
            this.raceResult[i].grid_position = this.startingGrid[j].position
          }
        }
      }
    },
    addDriverInfo() {
      for (let i = 0; i < this.raceResult.length; i++) {
        for (let j = 0; j < this.drivers.length; j++) {
          const driverId = `${this.raceResult[i].first_name} ${this.raceResult[i].last_name}`
            .replace(' ', '_')
            .toLowerCase()
          if (driverId == this.drivers[j].driver_id) {
            this.raceResult[i].nationality = this.drivers[j].origin.nationality
            this.raceResult[i].color_code = this.drivers[j].team.team_id
          }
        }
      }
    },
    addfastestLap() {
      for (let i = 0; i < this.raceResult.length; i++) {
        if (this.raceResult[i].name_code === this.fastestLap.name_code) {
          this.raceResult[i].fastest_lap = true
        }
      }
    },
    // addPoints() {
    //   this.raceSessionData.forEach((driver) => {
    //     if (driver.position === 1) leaderLapCompleted = driver.current_lap

    //     if (leaderLapCompleted > this.nextRaceLaps * 0.75) {
    //       if (driver.position in points) driver.points = points[driver.position]
    //     } else if (driver.position in points)
    //       driver.points = points[driver.position] / 2

    //     if (driver.fastest_lap) driver.points += 1
    //   })
    // },
  },
  mixins: [helpersMixin, apiCallsMixin],
}
</script>

<style scoped></style>
