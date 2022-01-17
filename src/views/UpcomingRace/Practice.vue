<template>
  <b-container class="default-background-center">
    <div class="row practice-row">
        <!-- Angående när vi ska komma till den aktuella session, kan vi skicka in ett props som är någon av
        practice 1,2,3 dessa kan vi sen använda för att sätta active på rätt b-tab. -->
      <b-tabs content-class="mt-3">
        <b-tab title="Practice 1" active>
          <PracticeSession
          v-if="practiceOneDataLoaded"
          :practiceResult="practiceOneData"
          :practiceDataExists="practiceDataExists" />
        </b-tab>
        <b-tab title="Practice 2">
          <PracticeSession
          v-if="practiceTwoDataLoaded"
          :practiceResult="practiceTwoData"
          :practiceDataExists="practiceDataExists" />
        </b-tab>
        <b-tab title="Practice 3">
          <PracticeSession
          v-if="practiceThreeDataLoaded"
          :practiceResult="practiceThreeData"
          :practiceDataExists="practiceDataExists" />
        </b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import PracticeSession from '../../components/UpcomingRace/Practice/PracticeSession.vue'

import helpersMixin from '../../mixins/helpersMixin'
import apiCallsMixin from '../../mixins/apiCallsMixin'

const driverNum = {
  max_verstappen: `33`,
  lando_norris: `4`,
  esteban_ocon: `31`,
  daniel_ricciardo: `3`,
  kimi_raikkonen: `7`,
  lewis_hamilton: `44`,
  sergio_perez: `11`,
  valtteri_bottas: `77`,
  nicholas_latifi: `6`,
  george_russell: `63`,
  antonio_giovinazzi: `99`,
  fernando_alonso: `14`,
  lance_stroll: `18`,
  sebastian_vettel: `5`,
  charles_leclerc: `16`,
  carlos_sainz: `55`,
  pierre_gasly: `10`,
  yuki_tsunoda: `22`,
  mick_schumacher: `47`,
  nikita_mazepin: `9`,
}

const teamColorCode = {
  max_verstappen: `red_bull`,
  lando_norris: `mclaren`,
  esteban_ocon: `alpine`,
  daniel_ricciardo: `mclaren`,
  kimi_raikkonen: `alfa_romeo`,
  lewis_hamilton: `mercedes`,
  sergio_perez: `red_bull`,
  valtteri_bottas: `mercedes`,
  nicholas_latifi: `williams`,
  george_russell: `williams`,
  antonio_giovinazzi: `alfa_romeo`,
  fernando_alonso: `alpine`,
  lance_stroll: `aston_martin`,
  sebastian_vettel: `aston_martin`,
  charles_leclerc: `ferrari`,
  carlos_sainz: `ferrari`,
  pierre_gasly: `alphatauri`,
  yuki_tsunoda: `alphatauri`,
  mick_schumacher: `haas`,
  nikita_mazepin: `haas`,
}

export default {
  name: `Practice`,
  components: {
    PracticeSession,
  },
  props: [`id`],
  data() {
    return {
      allRaces: null,
      round: null,
      drivers: null,
      nextRace: null,
      sessionIds: [],
      practiceResponse: null,
      practiceOneData: null,
      practiceOneDataLoaded: false,
      practiceTwoData: null,
      practiceTwoDataLoaded: false,
      practiceThreeData: null,
      practiceThreeDataLoaded: false,
      practiceDataExists: false,
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

    this.getNextSessionIds()

    if (this.sessionIds && this.sessionIds.length > 0) {
      this.practiceResponse = await this.getSessionById(this.sessionIds)
    }
    // Detta går att lägga i en loop för att få färre kod rader.
    if (this.practiceResponse.Practice1) {
      const responsePOne = this.addDriverNumberAndColorCode(this.practiceResponse.Practice1)
      this.practiceOneData = responsePOne.data
      this.practiceOneDataLoaded = responsePOne.data
      this.practiceDataExists = true
    }

    if (this.practiceResponse.Practice2) {
      const responsePTwo = this.addDriverNumberAndColorCode(this.practiceResponse.Practice2)
      this.practiceTwoData = responsePTwo.data
      this.practiceTwoDataLoaded = responsePTwo.data
    }

    if (this.practiceResponse.Practice3) {
      const responsePThree = this.addDriverNumberAndColorCode(this.practiceResponse.Practice3)
      this.practiceThreeData = responsePThree.data
      this.practiceThreeDataLoaded = responsePThree.data
    }

  },
  methods: {
    getNextSessionIds() {
    /*
     Get the session ids for all practice sessions.
    */
      console.log(`getNextSessionIds`)
      this.nextRace.sessions.forEach((session) => {
        if (session.session_name.includes(`Practice`)) {
          this.sessionIds.push(session.id)
        }
      })
    },
    addDriverNumberAndColorCode(practice) {
      console.log(`addDriverNumberAndColorCode - practice`, practice)
      practice.forEach((driver) => {
        const driverId = driver.name.replace(` `, `_`).toLowerCase()
        if (driverId in driverNum) {
          driver.permanent_number = driverNum[driverId]
        }
        if (driverId in teamColorCode) {
          driver.color_code = teamColorCode[driverId]
        }
      })
      return {
        data: practice,
        dataLoaded: true,
      }
    },
  },
  mixins: [helpersMixin, apiCallsMixin],
}
</script>

<style scoped>
  .practice-row {
    display: inline-block;
  }
</style>
