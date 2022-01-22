<template>
	<b-container class="default-background-center">
		<!-- <h1>Upcoming</h1>
  <h1>{{ this.round}}</h1> -->
		<h1 class="next-race-headline">{{ nextRaceName }}</h1>
		<b-row class="next-race-row">
			<b-col>
				<NextRaceTimeTable
					v-if="timeTableDataLoaded"
					:timeTableData="timeTableData"
				/>

				<NextRaceCircuitInfo v-if="trackDataLoaded" :nextTrack="trackData" />
			</b-col>
			<b-col>
				<NextRaceGrandPrixInfo
					v-if="grandPrixDataLoaded"
					:nextGrandPrix="grandPrixData"
				/>

				<NextRaceCountryFlag :country="nextRaceCountry" />
				<b-row class="next-race-last-top">
					<CircuitLastList :title="winnersTitle" :drivers="lastWinners" />
					<CircuitLastList :title="polesTitle" :drivers="lastPoles" />
				</b-row>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import { mapGetters, mapState } from "vuex"

import apiCallsMixin from "../../mixins/apiCallsMixin"
import convertDateFormatMixin from "../../mixins/convertDateFormatMixin"

import NextRaceCircuitInfo from "../../components/UpcomingRace/NextRace/NextRaceCircuitInfo.vue"
import NextRaceGrandPrixInfo from "../../components/UpcomingRace/NextRace/NextRaceGrandPrixInfo.vue"
import NextRaceTimeTable from "../../components/UpcomingRace/NextRace/NextRaceTimeTable.vue"
import CircuitLastList from "../../components/UpcomingRace/NextRace/CircuitLastList.vue"
import NextRaceCountryFlag from "../../components/UpcomingRace/NextRace/NextRaceCountryFlag.vue"

// import getWindowSizeMixin from '../../mixins/getWindowSizeMixin'
// import generalVars from '../../mixins/generalVars'

const sessionsToRemove = ["Grid", "FastestLap", "Qualifying 2", "Qualifying 3"]

export default {
	name: "NextRace",
	components: {
		NextRaceCircuitInfo,
		NextRaceGrandPrixInfo,
		NextRaceTimeTable,
		CircuitLastList,
		NextRaceCountryFlag,
	},
	data() {
		return {
			winnersTitle: "Last Winners",
			polesTitle: "Last Poles",
			nextRace: null,
			nextRaceName: null,
			allRaces: null,
			round: 0,
			lastWinners: null,
			lastPoles: null,
			nextRaceCountry: null,
			timeTableData: null,
			timeTableDataLoaded: false,
			grandPrixData: null,
			grandPrixDataLoaded: false,
			trackData: null,
			trackDataLoaded: false,
		}
	},
	computed: {
		...mapGetters(["allConfirmedRaces"]),
		...mapState(["currentRound"]),
	},
	async created() {
		// Assign data from veux
		this.allRaces = this.allConfirmedRaces
		this.round = this.currentRound

		// Assign data by using veux datan
		this.nextRace = this.getNextRace()
		this.nextRaceName = this.nextRace.name
		const trackId = this.nextRace.track_id
		const grandPrixId = this.nextRace.grand_prix_id
		this.nextRaceCountry = this.nextRace.country

		// Get data from database

		// Next Track
		const nextTrack = await this.getOneTrack(trackId)
		this.trackData = nextTrack.data
		this.trackDataLoaded = nextTrack.dataLoaded

		// Next Grand Prix
		const nextGrandPrix = await this.getOneGrandPrix(grandPrixId)
		this.grandPrixData = nextGrandPrix.data
		this.grandPrixDataLoaded = nextGrandPrix.dataLoaded
		this.lastWinners = this.grandPrixData.winners.slice(-5)
		this.lastPoles = this.grandPrixData.poles.slice(-5)

		// Time Table
		const nextTimeTable = this.getTimeTableData()
		this.timeTableData = nextTimeTable.data
		this.timeTableDataLoaded = nextTimeTable.dataLoaded
	},
	methods: {
		getNextRace() {
			return this.allRaces.find((race) => race.race_round >= this.round)
		},
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
					if (session.session_name === "Qualifying 1") {
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
	mixins: [apiCallsMixin, convertDateFormatMixin], // getWindowSizeMixin, generalVars,
}
</script>

<style scoped></style>
