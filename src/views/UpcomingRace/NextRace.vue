<template>
  <b-container class="default-background-center">
    <div class="large-screen">
      <h1 class="next-race-headline">{{ nextRaceName }}</h1>
      <b-row class="next-race-row">
        <b-col>
          <NextRaceCircuitInfo v-if="trackDataLoaded" :nextTrack="trackData" />
        </b-col>

        <b-col>
          <NextRaceGrandPrixInfo
            v-if="grandPrixDataLoaded"
            :nextGrandPrix="grandPrixData"
          />
          <NextRaceCountryFlag :country="nextRaceCountry" />

          <NextRaceTimeTable
            v-if="timeTableDataLoaded"
            :timeTableData="timeTableData"
          />
        </b-col>
      </b-row>
      <b-row class="next-race-last-top">
        <b-col>
          <CircuitLastList :title="winnersTitle" :drivers="lastWinners" />
        </b-col>
        <b-col>
          <CircuitLastList :title="polesTitle" :drivers="lastPoles" />
        </b-col>
      </b-row>
    </div>
    <div class="small-screen">
      <h1 class="next-race-headline">{{ nextRaceName }}</h1>
      <b-row class="next-race-row">
        <b-col>
          <NextRaceCircuitInfo v-if="trackDataLoaded" :nextTrack="trackData" />

          <NextRaceGrandPrixInfo
            v-if="grandPrixDataLoaded"
            :nextGrandPrix="grandPrixData"
          />
          <NextRaceCountryFlag :country="nextRaceCountry" />

          <NextRaceTimeTable
            v-if="timeTableDataLoaded"
            :timeTableData="timeTableData"
          />
          <CircuitLastList :title="winnersTitle" :drivers="lastWinners" />
          <CircuitLastList :title="polesTitle" :drivers="lastPoles" />
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import apiCallsMixin from '../../mixins/apiCallsMixin'
import convertDateFormatMixin from '../../mixins/convertDateFormatMixin'

import NextRaceCircuitInfo from '../../components/UpcomingRace/NextRace/NextRaceCircuitInfo.vue'
import NextRaceGrandPrixInfo from '../../components/UpcomingRace/NextRace/NextRaceGrandPrixInfo.vue'
import NextRaceTimeTable from '../../components/UpcomingRace/NextRace/NextRaceTimeTable.vue'
import CircuitLastList from '../../components/UpcomingRace/NextRace/CircuitLastList.vue'
import NextRaceCountryFlag from '../../components/UpcomingRace/NextRace/NextRaceCountryFlag.vue'
import helpersMixin from '../../mixins/helpersMixin'

const sessionsToRemove = ['Grid', 'FastestLap', 'Qualifying 2', 'Qualifying 3']

export default {
  name: 'NextRace',
  components: {
    NextRaceCircuitInfo,
    NextRaceGrandPrixInfo,
    NextRaceTimeTable,
    CircuitLastList,
    NextRaceCountryFlag,
  },
  data() {
    return {
      winnersTitle: 'Last Winners',
      polesTitle: 'Last Poles',
      nextRace: null,
      nextRaceName: null,
      allRaces: null,
      lastWinners: null,
      lastPoles: null,
      nextRaceCountry: null,
      timeTableData: null,
      timeTableDataLoaded: false,
      grandPrixData: null,
      grandPrixDataLoaded: false,
      trackData: null,
      trackDataLoaded: false,
      trackId: null,
      nextTrack: null,
      nextGrandPrix: null,
      nextTimeTable: null,
    }
  },
  computed: {
    ...mapGetters(['allConfirmedRaces']),
    ...mapState(['currentRound']),
  },
  async created() {
    // Assign data from veux
    this.allRaces = this.allConfirmedRaces

    // Assign data by using veux datan
    this.nextRace = this.getNextRace(this.allRaces, this.currentRound)

    this.nextRaceName = this.nextRace.name
    this.trackId = this.nextRace.track_id
    this.grandPrixId = this.nextRace.grand_prix_id
    this.nextRaceCountry = this.nextRace.country

    // Get data from database

    // Next Track
    this.nextTrack = await this.getOneTrack(this.trackId)
    this.trackData = this.nextTrack.data
    this.trackDataLoaded = this.nextTrack.dataLoaded

    // Next Grand Prix
    this.nextGrandPrix = await this.getOneGrandPrix(this.grandPrixId)
    this.grandPrixData = this.nextGrandPrix.data
    this.grandPrixDataLoaded = this.nextGrandPrix.dataLoaded
    this.lastWinners = this.grandPrixData.winners.slice(-5).reverse()
    this.lastPoles = this.grandPrixData.poles.slice(-5).reverse()

    // Time Table
    this.nextTimeTable = this.getTimeTableData()
    this.timeTableData = this.nextTimeTable.data
    this.timeTableDataLoaded = this.nextTimeTable.dataLoaded
  },
  methods: {
    getTimeTableData() {
      /*
      Returns an object with time table data.
    */
      const raceSessions = []
      const dateString = this.getDateString(
        this.nextRace.start_date,
        this.nextRace.end_date
      )

      this.nextRace.sessions.forEach((session) => {
        if (!sessionsToRemove.includes(session.session_name)) {
          if (session.session_name === 'Qualifying 1') {
            session.session_name = session.session_name.slice(0, -2)
          }
          raceSessions.push(this.getFormattedDayAndTime(session))
        }
      })
      return {
        data: {
          date: dateString,
          sessions: raceSessions,
        },
        dataLoaded: true,
      }
    },
  },
  mixins: [apiCallsMixin, convertDateFormatMixin, helpersMixin],
}
</script>

<style scoped></style>
