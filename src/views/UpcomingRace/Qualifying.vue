<template>
  <b-container class="default-background-center">
    <div class="row qualifying-row">
      <div class="col">
        <QualifyingSession
          v-if="qualifyingDataLoaded"
          :qualifyingResults="qualifyingResults"
          :nextRaceName="nextRaceName"
        />
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import QualifyingSession from '../../components/UpcomingRace/Qualifying/QualifyingSession.vue'

import helpersMixin from '../../mixins/helpersMixin'
import apiCallsNewMixin from '../../mixins/apiCallsNewMixin'

export default {
  name: `Qualifying`,
  components: {
    QualifyingSession,
  },
  props: [`id`],
  data() {
    return {
      allRaces: null,
      round: null,
      nextRace: null,
      nextRaceName: null,
      sessionIds: [],
      qualifyingResponse: null,
      qualifyingResults: [],
      qualifyingDataLoaded: false,
    }
  },
  computed: {
    ...mapGetters([`allConfirmedRaces`]),
    ...mapState([`currentRound`]),
  },
  async created() {
    this.allRaces = this.allConfirmedRaces
    this.round = this.currentRound

    this.nextRace = this.getRace(this.allRaces, this.round)
    this.nextRaceName = this.nextRace.name

    this.getNextSessionIds()

    if (this.sessionIds && this.sessionIds.length > 0) {
      this.qualifyingResponse = await this.getSessionById(this.sessionIds)
    }
    const qualifyingResultObj = this.createQualifyingResult()
    this.qualifyingResults = qualifyingResultObj.data
    this.qualifyingDataLoaded = qualifyingResultObj.dataLoaded
  },
  methods: {
    getNextSessionIds() {
    /*
     Get the session ids for all qualifying sessions.
    */
      this.nextRace.sessions.forEach((session) => {
        if (session.session_name.includes(`Qualifying`)) {
          this.sessionIds.push(session.id)
        }
      })
    },
    createQualifyingResult() {
      const qualiOne = this.qualifyingResponse.Qualifying1
      const qualiTwo = this.qualifyingResponse.Qualifying2
      const qualiThree = this.qualifyingResponse.Qualifying3
      const combinedQuali = []

      for (let i = 0; i < qualiOne.length; i++) {
        const driver = {}
        driver.id = qualiOne[i].id
        driver.driver_name = qualiOne[i].name
        driver.team_name = qualiOne[i].team_name
        driver.team_id = qualiOne[i].team_name.toLowerCase().replace(` `, `_`)
        driver.q1Time = qualiOne[i].time
        for (let j = 0; j < qualiTwo.length; j++) {
          if (qualiOne[i].id === qualiTwo[j].id && qualiOne[i].time !== qualiTwo[j].time) {
            driver.q2Time = qualiTwo[j].time
          }
        }
        combinedQuali.push(driver)
      }

      for (let k = 0; k < combinedQuali.length; k++) {
        if (combinedQuali[k].team_name === `Alfa Romeo Racing`) {
          combinedQuali[k].team_name = `Alfa Romeo`
          combinedQuali[k].team_id = `Alfa Romeo`.toLowerCase().replace(` `, `_`)
        }
        for (let l = 0; l < qualiThree.length; l++) {
          if (combinedQuali[k].id === qualiThree[l].id) {
            combinedQuali[k].position = qualiThree[l].position
            if (combinedQuali[k].q2Time !== qualiThree[l].time && combinedQuali[k].q2Time) {
              combinedQuali[k].q3Time = qualiThree[l].time
            }
          }
        }
      }

      combinedQuali.sort((a, b) => {
        return a.position - b.position
      })

      return {
        data: combinedQuali,
        dataLoaded: true,
      }
    },
  },
  mixins: [helpersMixin, apiCallsNewMixin],
}
</script>

<style scoped>
  .qualifying-row {
    display: inline-block;
  }
</style>
