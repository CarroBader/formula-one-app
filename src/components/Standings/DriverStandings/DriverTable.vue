<template>
	<div>
		<!-- Driver Modal -->
		<DriverModal
			v-if="showDriverModal"
			:driverObject="driverObject"
			:id="driverId"
			@clicked="setShowToFalseModal"
		/>
		<div class="driver-table-headline-div">
			<h1 class="driver-table-headline">{{ season }} World Championship</h1>
		</div>
		<b-card class="card-margin">
			<!-- Drivers placed 1-3 -->
			<div class="leader-driver-div">
				<div
					v-for="(topDriver, index) in driverStandings.slice(0, 3)"
					:key="index"
					:class="divsTopThree[index]"
					class="leader-div"
				>
					<div class="parent">
						<img
							:src="getImageMixin(driversFolder, topDriver.driver_id)"
							class="leader-driver-img"
						/>
						<img
							:src="getFlag(topDriver.nationality)"
							:alt="`${topDriver.nationality}`"
							class="leader-driver-flag-img"
						/>
					</div>
					<div class="leader-driver-info">
						<h3 class="leader-driver-points">{{ topDriver.points }} pts</h3>
						<h5 class="leader-driver-name-team leader-driver-name pointer">
							<a v-on:click="getDriverObject(topDriver.driver_id)">
								{{ topDriver.driver_name }}
							</a>
						</h5>
						<h6
							class="leader-driver-name-team"
							:class="getConstructorColor(topDriver.team_id)"
						>
							{{ topDriver.team_name }}
						</h6>
					</div>
				</div>
			</div>
			<!-- Drivers placed 4- ... -->
			<div class="scroll-table">
				<table>
					<tr class="driver-table-tr">
						<th>{{ returnAltBySize(small, positionLong, positionShort) }}</th>
						<th>Name</th>
						<th>Nationality</th>
						<th>Car</th>
						<th>{{ returnAltBySize(small, pointsLong, pointsShort) }}</th>
					</tr>
					<tbody
						v-for="(driver, index) in driverStandings.slice(3)"
						:key="index"
						class="driver-table-tbody"
					>
						<td class="driver-table-td driver-table-position">
							{{ driver.position }}
						</td>
						<td class="driver-table-td pointer">
							<a v-on:click="getDriverObject(driver.driver_id)">
								{{ driver.driver_name }}
							</a>
						</td>
						<td class="driver-table-td">
							<img
								:src="getFlag(driver.nationality)"
								:alt="`${driver.nationality}`"
								class="driver-table-flag-img"
							/>
						</td>
						<td
							class="driver-table-td"
							:class="getConstructorColor(driver.team_id)"
						>
							{{ driver.team_name }}
						</td>
						<td class="driver-table-td">{{ driver.points }}</td>
					</tbody>
				</table>
			</div>
		</b-card>
	</div>
</template>

<script>
import DriverModal from "../../General/DriverModal.vue"

import getCountryFlagMixin from "../../../mixins/getCountryFlagMixin"
import getConstructorColorMixin from "../../../mixins/getConstructorColorMixin"
import getImageMixin from "../../../mixins/getImageMixin"
import getWindowSizeMixin from "../../../mixins/getWindowSizeMixin"
import generalVarsMixin from "../../../mixins/generalVarsMixin"
import modalMixin from "../../../mixins/modalMixin"
import apiCallsMixin from "../../../mixins/apiCallsMixin"

import { changeDriverIdStanding } from "../../../variables/replaceVars"

export default {
	name: "DriverTable",
	components: {
		DriverModal,
	},
	props: {
		driverStandings: Array,
	},
	data() {
		return {
			showDriverModal: false,
			driverObject: {},
			driverId: "",
		}
	},
	created() {},
	methods: {
		async getDriverObject(driverId) {
			const driver = await this.getOneDriver(driverId)
			this.driverObject = driver.data
			this.driverId = driver.data.driver_id

			if (driver.dataLoaded) {
				this.showDriverModal = true
			}
		},
	},
	mixins: [
		getCountryFlagMixin,
		getConstructorColorMixin,
		getImageMixin,
		getWindowSizeMixin,
		generalVarsMixin,
		modalMixin,
		apiCallsMixin,
	],
}
</script>

<style lang="scss" scoped>
table {
	width: 100%;
}

tbody {
	border-bottom: 1px solid #fff;
}

tbody:last-child {
	border-bottom: none;
}
</style>
