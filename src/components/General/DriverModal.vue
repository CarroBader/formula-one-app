<template>
	<b-modal
		:id="id"
		size="lg"
		title="Driver Information"
		ok-only
		ok-title="Back"
		ok-variant="dark"
		@ok="setShowToFalse()"
		visible="visible"
		class="modal-title"
		content-class="driver-modal-content"
		no-close-on-backdrop
	>
		<b-container>
			<b-row class="modal-row-one">
				<b-col class="modal-driver-img-col">
					<img
						:src="getImageMixin('drivers', driverObject.picture_id)"
						:alt="`${driverObject.driver_name}`"
						class="modal-driver-img"
				/></b-col>
				<b-col
					><b-card class="card-margin">
						<div class="scroll-table">
							<table class="modal-table">
								<tr>
									<th class="modal-th">Name:</th>
									<td class="modal-td">{{ driverObject.driver_name }}</td>
								</tr>
								<tr>
									<th class="modal-th">Age:</th>
									<td class="modal-td">{{ getAge(driverObject.birthday) }}</td>
								</tr>
								<tr>
									<th class="modal-th">Origin:</th>
									<td class="modal-td">
										{{ driverObject.origin.locality }},
										{{ driverObject.origin.country }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Nationality:</th>
									<td class="modal-td">
										{{ driverObject.origin.nationality_name }}
										<img
											:src="getFlag(driverObject.origin.nationality)"
											:alt="`${driverObject.nationality}`"
											class="modal-country-flag-img"
										/>
									</td>
								</tr>
								<tr>
									<th class="modal-th">Number:</th>
									<td class="modal-td">
										{{ driverObject.permanent_number }}
									</td>
								</tr>
							</table>
						</div>
					</b-card></b-col
				>
			</b-row>
			<b-row class="modal-row-two">
				<b-col
					><b-card class="card-margin">
						<div class="scroll-table">
							<table class="modal-table">
								<tr>
									<th class="modal-th">
										Starts
										<span class="modal-span-text">(Entries)</span>:
									</th>
									<td class="modal-td">
										{{ driverObject.starts }}
										<span class="modal-span-text"
											>({{ driverObject.entries }})</span
										>
									</td>
								</tr>
								<!-- <tr>
									<th class="modal-th">Entries:</th>
									<td class="modal-td">
										{{ driverObject.entries }}
									</td>
								</tr> -->
								<tr>
									<th class="modal-th">Podiums:</th>
									<td class="modal-td">
										{{ driverObject.podiums }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Wins:</th>
									<td class="modal-td">
										{{ driverObject.wins }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Pole Positions:</th>
									<td class="modal-td">
										{{ driverObject.poles }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Front Row Starts:</th>
									<td class="modal-td">
										{{ driverObject.front_row_starts }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Fastest Lap:</th>
									<td class="modal-td">
										{{ driverObject.fastest_laps }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Championship Wins:</th>
									<td class="modal-td">
										{{ driverObject.championship_wins }}
									</td>
								</tr>
							</table>
						</div>
					</b-card></b-col
				>
				<b-col
					><b-card class="card-margin">
						<div class="scroll-table">
							<table class="modal-table">
								<tr>
									<th class="modal-th">Team:</th>
									<td
										class="modal-td"
										:class="getConstructorColor(driverObject.driver_id)"
									>
										{{ driverObject.team.team_name }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Previous Team:</th>

									<td
										class="modal-td"
										:class="
											convertConstructorName(
												driverObject.team.previous_teams.slice(-1)[0]
											)
										"
									>
										{{ driverObject.team.previous_teams.slice(-1)[0] }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">First Entry:</th>
									<td class="modal-td">
										{{ driverObject.first_entry }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Position Last Season:</th>
									<td
										class="modal-td"
										:class="
											getPositionColor(
												driverObject.position_last_seasons[season]
											)
										"
									>
										{{ driverObject.position_last_seasons[season] }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Doubles:</th>
									<td class="modal-td">
										{{ driverObject.doubles }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Hat-Tricks:</th>
									<td class="modal-td">
										{{ driverObject.hat_tricks }}
									</td>
								</tr>
								<tr>
									<th class="modal-th">Grand Chelems:</th>
									<td class="modal-td">
										{{ driverObject.grand_chelems }}
									</td>
								</tr>
							</table>
						</div>
					</b-card></b-col
				>
			</b-row>
		</b-container>
	</b-modal>
</template>

<script>
import generalVarsMixin from "../../mixins/generalVarsMixin"
import getCountryFlagMixin from "../../mixins/getCountryFlagMixin"
import getConstructorColorMixin from "../../mixins/getConstructorColorMixin"
import getImageMixin from "../../mixins/getImageMixin"
import modalMixin from "../../mixins/modalMixin"

import { getNationality } from "../../variables/replaceVars"

export default {
	name: "DriverModal",
	props: {
		driverObject: Object,
		id: String,
	},
	components: {},
	data() {
		return {}
	},
	created() {
		console.log("DRIVER", this.driverObject)
		console.log("id", this.id)
		this.changeNationality()
	},
	methods: {
		setShowToFalse() {
			this.$emit("clicked", false)
		},
		changeNationality() {
			this.driverObject.origin.nationality_name =
				getNationality[this.driverObject.origin.nationality]
		},
	},
	mixins: [
		generalVarsMixin,
		getCountryFlagMixin,
		getConstructorColorMixin,
		getImageMixin,
		modalMixin,
	],
}
</script>

<style scoped>
tr:last-child {
	border-bottom: none;
}
</style>
