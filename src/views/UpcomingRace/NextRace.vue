<template>
  <b-container
    class="default-background-center"
  >
    <h3>Upcoming Race</h3>
    <h1> {{ id }}</h1>
    <h1 class="next-race-headline">
      {{ nextRaceName }}
    </h1>
    <b-row class="next-race-row">
      <b-col>
        <!-- <NextCircuitTrackInfo
          :nextRace="this.allRaces"
        /> -->
      </b-col>
      <b-col>
        <!-- <NextRaceTimeTable
          :timeTableData="timeTableData"
        />
        <NextRaceCountryFlag
          :country="nextRaceCountry"
        /> -->
        <b-row class="next-race-last-top">
          <!-- <CircuitLastList
            :title="winnersTitle"
            :drivers="winners"
          /> -->
          <!-- <CircuitLastList
            :title="polesTitle"
            :drivers="poles"
          /> -->
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import NextCircuitTrackInfo from '../../components/UpcomingRace/NextRace/NextRaceCircuitInfo.vue'
import NextRaceTimeTable from '../../components/UpcomingRace/NextRace/NextRaceTimeTable.vue'
// import CircuitLastList from '../../components/UpcomingRace/NextRace/CircuitLastList.vue'
import NextRaceCountryFlag from '../../components/UpcomingRace/NextRace/NextRaceCountryFlag.vue'

import getWindowSizeMixin from '../../mixins/getWindowSizeMixin'
import generalVars from '../../mixins/generalVars'
import convertDateFormatMixin from '../../mixins/convertDateFormatMixin'
import dataMixin from '../../mixins/dataMixin'

const sessionsToRemove = [`Grid`, `FastestLap`, `Qualifying 2`, `Qualifying 3`]

export default {
  name: `NextRace`,
  components: {
    // NextCircuitTrackInfo,
    // NextRaceTimeTable,
    // CircuitLastList,
    // NextRaceCountryFlag,
  },
  data() {
    return {
      allRaces: null,
      nextRaceObj: null,
      nextRaceName: null,
      nextRaceCountry: null,
      timeTableData: null,
    }
  },
  props: [`id`],
  created() {
    console.log(`NextRace - created`)
    // this.allRaces = this.$store.state.allConfirmedRaces
    // this.getNextRaceObj()
    // this.getTimeTableData()
  },
  methods: {
    getNextRaceObj() {
      /*
        Gets next race object and assign value to nextRaceObj.
      */
      this.nextRaceObj = this.getNextRace()

      // Assign variables value
      this.nextRaceName = this.nextRaceObj.name
      this.nextRaceCountry = this.nextRaceObj.country
    },
    getTimeTableData() {
      /*
        Returns an object with time table data.
      */
      const raceSessions = []
      const dateString = this.getDateString(this.nextRaceObj.start_date, this.nextRaceObj.end_date)

      this.nextRaceObj.sessions.forEach((session) => {
        if (!sessionsToRemove.includes(session.session_name)) {
          raceSessions.push(this.getFormattedDayAndTime(session))
        }
      })
      this.timeTableData = {
        date: dateString,
        sessions: raceSessions,
      }
    },
  },
  mixins: [getWindowSizeMixin, generalVars, convertDateFormatMixin, dataMixin],
}
</script>

<style scoped>
</style>
