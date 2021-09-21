<template>
  <b-container class="default-background-center">
    <div class="row last-race-row">
      <div class="col">
        <ResultLastRace />
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex"
import store from '../../store/ store'

import ResultLastRace from '../../components/UpcomingRace/LastRace/ResultLastRace.vue'

import dataMixin from '../../mixins/dataMixin'

export default {
  name: `LastRace`,
  components: {
    ResultLastRace,
  },
  data() {
    return {
      stateName: `LAST_RACE`,
      allRaces: null,
      lastRaceObj: null,
      lastRaceSessionId: {},
    }
  },
  computed: {
    ...mapGetters([`lastRaceSession`]),
  },
  created() {
    this.allRaces = this.$store.state.allConfirmedRaces
    console.log(`LastRace - created`)
    console.log(`Time`, new Date())
    console.log(`LastRace - Last Race Session`, this.lastRaceSession)

    if (this.lastRaceSession && Object.keys(this.lastRaceSession).length > 0) return
    console.log(`LastRace - No data yet`)
    this.getLastRaceSessionById()
  },
  methods: {
    getLastRaceSessionById() {
      /*
        Calls api to get Last Race result.
      */
      this.lastRaceObj = this.getLastRace()

      this.lastRaceObj.sessions.forEach((session) => {
        if (session.session_name === `Race`) {
          this.lastRaceSessionId = { stateName: this.stateName, sessionId: session.id }
        }
      })
      store.dispatch(`getSessionById`, this.lastRaceSessionId)
    },
    getLastRaceData() {
      // - [ ] Position - results.drivers.position
      // - [ ] Name - results.drivers.name
      // - [ ] Nationality - results.drivers.id
      // - [ ] Car - results.drivers.team_name

      // Get starting grid data from database
      // Call this function in the if statement, do not return
      // If they are not in the grid then they start in Pit (20)

      const race = this.raceSession.drivers
      const grid = this.gridSession.drivers
      let driver = {}

      for (let i = 0; race.length > i; i++) {
        driver.position = race[i].position
        driver.name = race[i].name
        driver.team = race[i].team_name

        for (let j = 0; grid.length > j; j++) {
          if (race[i].name === grid[j].name) {
            console.log(`Race name:`, race[i].name)
            console.log(`Grid name:`, grid[j].name)
            console.log(`Race obj`, race[i])
            console.log(`Grid obj`, grid[j])
            driver.gridPosition = grid[j].position
            break
          }
        }
        this.lastRace.push(driver)
        driver = {}
      }

      console.log(`Last Race - drivers`, this.lastRace)
    },
  },
  mixins: [dataMixin],
}
</script>

<style scoped>
  .last-race-row {
    display: inline-block;
  }
</style>
