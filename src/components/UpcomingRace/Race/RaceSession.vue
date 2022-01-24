<template>
	<div>
		<!-- Driver Modal -->
		<DriverModal
			v-if="showDriverModal"
			:driverObject="driverObject"
			:id="driverId"
			@clicked="setShowToFalseModal"
		/>
		<!-- Constructor Modal -->
		<ConstructorModal
			v-if="showConstructorModal"
			:constructorObject="constructorObject"
			:id="constructorId"
			@clicked="setShowToFalseModal"
		/>
		<div class="result-last-race-headline-div">
			<h1 class="result-last-race-headline">{{ nextRaceName }}</h1>
		</div>
		<div v-if="!statusCompleted">
			<p class="noDataMessage">This race is not completed yet.</p>
		</div>
		<b-card class="card-margin" v-if="statusCompleted">
			<div class="scroll-table">
				<table>
					<tr class="result-last-race-tr">
						<th>{{ returnAltBySize(small, positionLong, positionShort) }}</th>
						<th></th>
						<th>Name</th>
						<th :style="returnAltBySize(small, revert, none)">Nationality</th>
						<th>Car</th>
						<th>{{ returnAltBySize(small, pointsLong, pointsShort) }}</th>
						<th></th>
					</tr>
					<tbody
						v-for="(race, index) in raceResult"
						:key="index"
						class="result-last-race-tbody"
					>
						<td class="result-last-race-td result-last-race-position">
							{{ race.position }}
						</td>
						<td class="result-last-race-td">
							<img
								:src="getSymbolImage(race.grid_position, race.position)"
								:alt="'Symbol'"
								:class="getSymbolClass(race.grid_position, race.position)"
							/>
							<span class="position-difference">
								{{
									race.grid_position - race.position != 0
										? Math.abs(race.grid_position - race.position)
										: ""
								}}
							</span>
						</td>
						<td class="result-last-race-td">
							<a v-on:click="getDriverObject(race.id)">{{ race.name }}</a>
						</td>
						<td
							class="result-last-race-td"
							:style="returnAltBySize(small, revert, none)"
						>
							<img
								:src="getFlag(race.nationality)"
								:alt="`${race.nationality}`"
								class="result-last-race-flag-img"
							/>
						</td>
						<td
							class="result-last-race-td"
							:class="getConstructorColor(race.color_code)"
						>
							<a v-on:click="getConstructorObject(race.team_id)">{{
								race.team_name
							}}</a>
						</td>
						<td class="result-last-race-td">{{ race.points }}</td>
						<td v-if="race.fastest_lap">
							<img
								src="../../../assets/img/icons/fastest_lap.png"
								class="fastest-lap-img"
							/>
						</td>
					</tbody>
				</table>
			</div>
		</b-card>
	</div>
</template>

<script>
import DriverModal from "../../General/DriverModal.vue"
import ConstructorModal from "../../General/ConstructorModal.vue"

import getCountryFlagMixin from "../../../mixins/getCountryFlagMixin"
import getConstructorColorMixin from "../../../mixins/getConstructorColorMixin"
import getImageMixin from "../../../mixins/getImageMixin"
import getWindowSizeMixin from "../../../mixins/getWindowSizeMixin"
import generalVarsMixin from "../../../mixins/generalVarsMixin"
import apiCallsMixin from "../../../mixins/apiCallsMixin"
import modalMixin from "../../../mixins/modalMixin"

import {
	changeDriverId,
	changeConstructorId,
} from "../../../variables/replaceVars"

export default {
	name: "RaceSession",
	props: {
		raceResult: Array,
		nextRaceName: String,
		statusCompleted: Boolean,
	},
	components: {
		DriverModal,
		ConstructorModal,
	},
	data() {
		return {
			showDriverModal: false,
			showConstructorModal: false,
			driverObject: {},
			constructorObject: {},
			driverId: "",
			constructorId: "",
		}
	},
	created() {},
	methods: {
		getSymbolImage(grid, position) {
			/*
      Check if position change happened.
      Return an img with the correct symbol.
    */
			const positionSymbol = grid !== position ? "arrow" : "line"

			return this.getImageMixin(this.iconsFolder, positionSymbol)
		},
		getSymbolClass(grid, position) {
			/*
      Return the class that matches the position change.
    */
			const start = Number(grid)
			const end = Number(position)

			// eslint-disable-next-line no-nested-ternary
			return start === end
				? "same-position"
				: start < end
				? "lost-position"
				: "gained-position"
		},
		fastestLap(fastestLap) {
			/*
      Return true if the driver got the fastest lap.
    */
			return !!(fastestLap !== undefined && fastestLap.rank === "1")
		},
		async getDriverObject(driverId) {
			const driver = await this.getOneDriver(changeDriverId[driverId])
			this.driverObject = driver.data
			this.driverId = driver.data.driver_id

			if (driver.dataLoaded) {
				this.showDriverModal = true
			}
		},
		async getConstructorObject(teamId) {
			const team = await this.getOneConstructor(changeConstructorId[teamId])

			this.constructorObject = team.data
			this.constructorId = team.data.team_id

			if (team.dataLoaded) {
				this.showConstructorModal = true
			}
		},
	},
	mixins: [
		getCountryFlagMixin,
		getConstructorColorMixin,
		getImageMixin,
		getWindowSizeMixin,
		generalVarsMixin,
		apiCallsMixin,
		modalMixin,
	],
}
</script>

<style lang="scss" scoped>
tbody {
	border-bottom: 1px solid #fff;
}

tbody:last-child {
	border-bottom: none;
}
</style>
