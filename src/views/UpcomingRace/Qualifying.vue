<template>
  <b-container class="default-background-center">
    <div class="row qualifying-row">
      <div class="col">
        <QualifyingSession
          v-if="qualifyingDataLoaded"
          :qualifyingResults="qualifyingResults"
          :nextRaceName="nextRaceName"
          :qualifyingDataExists="qualifyingDataExists"
        />
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import QualifyingSession from '../../components/UpcomingRace/Qualifying/QualifyingSession.vue'

import helpersMixin from '../../mixins/helpersMixin'
import apiCallsMixin from '../../mixins/apiCallsMixin'

export default {
  name: 'Qualifying',
  components: {
    QualifyingSession,
  },
  props: ['id'],
  data() {
    return {
      allRaces: null,
      round: null,
      nextRace: null,
      nextRaceName: null,
      qualifyingData: null,
      sessionIds: [],
      qualifyingResponse: null,
      qualifyingResults: [],
      qualifyingDataLoaded: false,
      qualifyingDataExists: false,
    }
  },
  computed: {
    ...mapGetters(['allConfirmedRaces', 'currentRound']),
  },
  async created() {
    this.allRaces = this.allConfirmedRaces
    this.round = this.currentRound

    this.nextRace = this.getNextRace(this.allRaces, this.round)
    this.nextRaceName = this.nextRace.name

    console.log('    this.nextRace', this.nextRace)

    let qualifying = await this.getQualifying(this.nextRace.grand_prix_id)
    this.qualifyingData = qualifying.data
    console.log('qualifyingData', this.qualifyingData)

    // this.getNextSessionIds()

    // if (this.sessionIds && this.sessionIds.length > 0) {
    //   this.qualifyingResponse = await this.getSessionById(this.sessionIds)
    // }
    const qualifyingResultObj = this.createQualifyingResult()
    this.qualifyingResults = qualifyingResultObj.data
    this.qualifyingDataLoaded = qualifyingResultObj.dataLoaded

    if (this.qualifyingResults.length > 0) this.qualifyingDataExists = true
  },
  methods: {
    createQualifyingResult() {
      const combinedQuali = []

      this.qualifyingData.forEach((driver) => {
        console.log('driver', driver)
        const driverData = {}
        driverData.id = this.createId(
          `${driver.first_name} ${driver.last_name}`
        )
        driverData.driver_name = `${driver.first_name} ${driver.last_name}`
        driverData.team_name = driver.team
        driverData.team_id = this.createId(driver.team)
        driverData.position = driver.position
        driverData.q1Time = driver.q1
        driverData.q2Time = driver.q2
        driverData.q3Time = driver.q3
        console.log('driverData', driverData)

        combinedQuali.push(driverData)
      })

      combinedQuali.sort((a, b) => {
        return a.position - b.position
      })
      console.log('combinedQuali', combinedQuali)
      return {
        data: combinedQuali,
        dataLoaded: true,
      }
    },
  },
  mixins: [helpersMixin, apiCallsMixin],
}
</script>

<style scoped></style>
