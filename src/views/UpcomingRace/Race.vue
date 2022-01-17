<template>
	<b-container class="default-background-center">
		<div class="row race-row">
			<div class="col">
				<RaceSession
					v-if="dataDone"
					:nextRaceName="nextRaceName"
					:raceResult="raceSessionData"
					:statusCompleted="statusCompleted"
				/>
			</div>
		</div>
	</b-container>
</template>

<script>
import { mapGetters, mapState } from "vuex"

import RaceSession from "../../components/UpcomingRace/Race/RaceSession.vue"

import helpersMixin from "../../mixins/helpersMixin"
import apiCallsMixin from "../../mixins/apiCallsMixin"

import { points } from "../../variables/replaceVars"

let responseStartingGrid = []
let leaderLapCompleted = 0

export default {
	name: `Race`,
	components: {
		RaceSession,
	},
	props: [`id`],
	data() {
		return {
			allRaces: null,
			round: null,
			drivers: null,
			nextRace: null,
			nextRaceName: null,
			nextRaceLaps: 0,
			sessionIds: [],
			raceSessionData: null,
			fastestLapSessionData: null,
			startingGrid: null,
			dataDone: false,
			statusCompleted: false,
		}
	},
	computed: {
		...mapGetters([`allConfirmedRaces`, `allDrivers`]),
		...mapState([`currentRound`]),
	},
	async created() {
		this.allRaces = this.allConfirmedRaces
		this.round = this.currentRound
		this.drivers = this.allDrivers

		this.nextRace = this.getNextRace(this.allRaces, this.round)
		this.nextRaceName = this.nextRace.name

		if (this.nextRace.status === `Complete`) {
			if (this.nextRace !== null)
				responseStartingGrid = await this.getGridStartingForRace(
					this.nextRace.grand_prix_id
				)
			this.startingGrid = responseStartingGrid.data

			this.getNextSessionIds()

			if (this.sessionIds && this.sessionIds.length > 0) {
				this.raceResponse = await this.getSessionById(this.sessionIds)
			}

			this.raceSessionData = this.raceResponse.Race
			this.nextRaceLaps = this.raceResponse.Race[0].current_lap
			this.fastestLapSessionData = this.raceResponse.FastestLap

			if (this.raceSessionData && this.raceSessionData.length > 0)
				this.createRaceResult()
		} else {
			this.dataDone = true
		}
	},
	methods: {
		getNextSessionIds() {
			/*
     Get the session ids for all qualifying sessions.
    */
			this.nextRace.sessions.forEach((session) => {
				if (session.session_name.includes(`Race`)) {
					this.sessionIds.push(session.id)
				}

				if (session.session_name.includes(`FastestLap`)) {
					this.sessionIds.push(session.id)
				}
			})
		},
		createRaceResult() {
			this.addGridPosition()
			this.addDriverInfo()
			this.addfastestLap()
			this.addPoints()

			this.statusCompleted = true
			this.dataDone = true
		},
		addGridPosition() {
			for (let i = 0; i < this.raceSessionData.length; i++) {
				for (let j = 0; j < this.startingGrid.length; j++) {
					if (
						this.raceSessionData[i].name === this.startingGrid[j].driver_name
					) {
						this.raceSessionData[i].grid_position = this.startingGrid[
							j
						].grid_position
					} else if (!this.raceSessionData[i].grid_position) {
						this.raceSessionData[i].grid_position = 20
					}
				}
			}
		},
		addDriverInfo() {
			for (let i = 0; i < this.raceSessionData.length; i++) {
				for (let j = 0; j < this.drivers.length; j++) {
					const driverId = this.raceSessionData[i].name
						.replace(` `, `_`)
						.toLowerCase()
					if (driverId === this.drivers[j].driver_id) {
						this.raceSessionData[i].nationality = this.drivers[
							j
						].origin.nationality
						this.raceSessionData[i].color_code = this.drivers[j].team.team_id
						this.raceSessionData[i].team_name = this.drivers[j].team.team_name
					}
				}
			}
		},
		addfastestLap() {
			for (let i = 0; i < this.raceSessionData.length; i++) {
				for (let j = 0; j < this.fastestLapSessionData.length; j++) {
					if (
						this.raceSessionData[i].id === this.fastestLapSessionData[j].id &&
						this.fastestLapSessionData[j].position === 1
					) {
						this.raceSessionData[i].fastest_lap = true
					}
				}
			}
		},
		addPoints() {
			this.raceSessionData.forEach((driver) => {
				if (driver.position === 1) leaderLapCompleted = driver.current_lap

				if (leaderLapCompleted > this.nextRaceLaps * 0.75) {
					if (driver.position in points) driver.points = points[driver.position]
				} else if (driver.position in points)
					driver.points = points[driver.position] / 2

				if (driver.fastest_lap) driver.points += 1
			})
		},
	},
	mixins: [helpersMixin, apiCallsMixin],
}
</script>

<style scoped>
.race-row {
	display: inline-block;
}
</style>
