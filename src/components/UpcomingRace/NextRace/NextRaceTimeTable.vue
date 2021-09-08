<template>
  <div v-if="timeTableDataLoaded">
    <b-card class="next-race-time-table-card-margin">
      <h5 class="next-race-time-table-title">Time Table</h5>
      <h5 class="next-race-time-table-date red">{{ dateString }}</h5>
      <b-row>
        <b-col class="
          next-race-time-table-col
          next-race-time-table-col-left"
        >
          <!-- Table One -->
          <table>
            <tbody
              v-for="session, index in raceSessions.slice(0,3)"
              :key="index">
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-event">{{ session.sessionName }}</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-day">{{ session.dayName }}</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-time">{{ session.startTime }} {{ session.endTime }}</span>
              </td>
            </tbody>
          </table>
        </b-col>

        <b-col class="next-race-time-table-col">
          <!-- Table Two -->
          <table>
            <tbody
              v-for="session, index in raceSessions.slice(3)"
              :key="index"
              class="next-race-time-table-border">
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-event">{{ session.sessionName }}</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-day">{{ session.dayName }}</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-time">{{ session.startTime }} {{ session.endTime }}</span>
              </td>
            </tbody>
          </table>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import apiCallsNewMixin from '../../../mixins/apiCallsNewMixin'
import convertDateFormatMixin from '../../../mixins/convertDateFormatMixin'

const race = {
  session: [
    { session_name: `Practice 1`, date: `2021-09-10T12:30:00+00:00` },
    { session_name: `Qualifying 1`, date: `2021-09-10T16:00:00+00:00` },
    { session_name: `Practice 2`, date: `2021-09-11T10:00:00+00:00` },
    { session_name: `Sprint Qualifying`, date: `2021-09-11T14:30:00+00:00` },
    { session_name: `Race`, date: `2021-09-12T13:00:00+00:00` }],
  start: `2021-09-10`,
  end: `2021-09-12`,
}

const formattedSessions = []

export default {
  name: `NextRaceTimeTable`,
  data() {
    return {
      raceSessions: null,
      timeTableDataLoaded: false,
      dateString: null,
    }
  },
  async created() {
    // This component needs a raceId when used.

    // Get session for race raceId
    // const responseSession = await this.getTimeTableForRace(384) // API

    // this.dateString = this.getDateString(responseSession.start, responseSession.end) // API
    this.dateString = this.getDateString(race.start, race.end) // HardCoded

    // responseSession.sessions.forEach((session) => { // API
    race.session.forEach((session) => { // HardCoded
      formattedSessions.push(this.getFormattedDayAndTime(session))
    })

    // Set value on data properties
    this.raceSessions = formattedSessions

    // Set dataloaded variable(s) to true
    // this.timeTableDataLoaded = responseSession.dataLoaded // API
    this.timeTableDataLoaded = true // HardCoded
  },
  methods: {
  },
  mixins: [apiCallsNewMixin, convertDateFormatMixin],
}
</script>

<style scoped>
  table {
    text-align: start;
  }

  tbody {
    border-bottom: none;
  }

  .next-race-time-table-col {
    display: flex;
    display:-webkit-flex;
    justify-content: center;
    align-items: baseline;
  }
</style>
