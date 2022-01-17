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
		</div>
	</b-container>
</template>

<script>
import { mapGetters, mapState } from "vuex"

import PracticeSession from "../../components/UpcomingRace/Practice/PracticeSession.vue"

import helpersMixin from "../../mixins/helpersMixin"
import apiCallsMixin from "../../mixins/apiCallsMixin"

import { driverNum, teamColorCode } from "../../variables/replaceVars"

export default {
	name: "Practice",
	components: {
		PracticeSession,
	},
	props: ["id"],
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
		...mapGetters(["allConfirmedRaces"]),
		...mapState(["currentRound"]),
	},
	async created() {
		this.allRaces = this.allConfirmedRaces
		this.round = this.currentRound

		this.nextRace = this.getNextRace(this.allRaces, this.round)

		this.getNextSessionIds()

		if (this.sessionIds && this.sessionIds.length > 0) {
			this.practiceResponse = await this.getSessionById(this.sessionIds)
		}
		// Detta går att lägga i en loop för att få färre kod rader.
		if (this.practiceResponse.Practice1) {
			const responsePOne = this.addDriverNumberAndColorCode(
				this.practiceResponse.Practice1
			)
			this.practiceOneData = responsePOne.data
			this.practiceOneDataLoaded = responsePOne.data
			this.practiceDataExists = true
		}

		if (this.practiceResponse.Practice2) {
			const responsePTwo = this.addDriverNumberAndColorCode(
				this.practiceResponse.Practice2
			)
			this.practiceTwoData = responsePTwo.data
			this.practiceTwoDataLoaded = responsePTwo.data
		}

		if (this.practiceResponse.Practice3) {
			const responsePThree = this.addDriverNumberAndColorCode(
				this.practiceResponse.Practice3
			)
			this.practiceThreeData = responsePThree.data
			this.practiceThreeDataLoaded = responsePThree.data
		}
	},
	methods: {
		getNextSessionIds() {
			/*
     Get the session ids for all practice sessions.
    */
			console.log("getNextSessionIds")
			this.nextRace.sessions.forEach((session) => {
				if (session.session_name.includes("Practice")) {
					this.sessionIds.push(session.id)
				}
			})
		},
		addDriverNumberAndColorCode(practice) {
			console.log("addDriverNumberAndColorCode - practice", practice)
			practice.forEach((driver) => {
				const driverId = driver.name.replace(" ", "_").toLowerCase()
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
