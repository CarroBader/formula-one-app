<template>
  <b-container class="default-background-center">
    <div class="row practice-row">
      <b-tabs content-class="mt-3">
        <b-tab title="Practice 1" active>
          <PracticeSession
            v-if="practiceOneDataLoaded"
            :practiceResult="practiceOneData"
            :practiceDataExists="practiceDataExists"
          />
        </b-tab>
        <b-tab title="Practice 2">
          <PracticeSession
            v-if="practiceTwoDataLoaded"
            :practiceResult="practiceTwoData"
            :practiceDataExists="practiceDataExists"
          />
        </b-tab>
        <b-tab title="Practice 3">
          <PracticeSession
            v-if="practiceThreeDataLoaded"
            :practiceResult="practiceThreeData"
            :practiceDataExists="practiceDataExists"
          />
        </b-tab>
      </b-tabs>
      <div class="noDataMessage" v-if="!practiceDataExists">
        <p>No practice have been completed yet.</p>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import PracticeSession from '../../components/UpcomingRace/Practice/PracticeSession.vue'

import helpersMixin from '../../mixins/helpersMixin'
import apiCallsMixin from '../../mixins/apiCallsMixin'

import { driverNum, teamColorCode } from '../../variables/replaceVars'

export default {
  name: 'Practice',
  components: {
    PracticeSession,
  },
  props: ['id'],
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
    ...mapGetters(['allConfirmedRaces', 'currentRound']),
  },
  async created() {
    this.allRaces = this.allConfirmedRaces
    this.round = this.currentRound

    this.nextRace = this.getNextRace(this.allRaces, this.round)

    let practiceOne = await this.getPractice(
      this.nextRace.grand_prix_id,
      'practice-one'
    )
    let practiceTwo = await this.getPractice(
      this.nextRace.grand_prix_id,
      'practice-two'
    )
    let practiceThree = await this.getPractice(
      this.nextRace.grand_prix_id,
      'practice-three'
    )

    if (practiceOne.dataLoaded) {
      const responsePOne = this.addDriverNumberAndColorCode(practiceOne.data)
      this.practiceOneData = responsePOne.data
      this.practiceOneDataLoaded = responsePOne.data
      this.practiceDataExists = true
    }

    if (practiceTwo.dataLoaded) {
      const responsePTwo = this.addDriverNumberAndColorCode(practiceTwo.data)
      this.practiceTwoData = responsePTwo.data
      this.practiceTwoDataLoaded = responsePTwo.data
    }

    if (practiceThree.dataLoaded) {
      const responsePThree = this.addDriverNumberAndColorCode(
        practiceThree.data
      )
      this.practiceThreeData = responsePThree.data
      this.practiceThreeDataLoaded = responsePThree.data
    }
  },
  methods: {
    addDriverNumberAndColorCode(practice) {
      practice.forEach((driver) => {
        driver.color_code = this.createId(driver.team)
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

<style scoped></style>
