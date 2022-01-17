<template>
	<div>
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
							:alt="'${topDriver.nationality}'"
							class="leader-driver-flag-img"
						/>
					</div>
					<div class="leader-driver-info">
						<h3 class="leader-driver-points">{{ topDriver.points }} pts</h3>
						<h5 class="leader-driver-name-team leader-driver-name">
							{{ topDriver.driver_name }}
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
						<td class="driver-table-td extra-dark-grey">
							{{ driver.position }}
						</td>
						<td class="driver-table-td">{{ driver.driver_name }}</td>
						<td class="driver-table-td">
							<img
								:src="getFlag(driver.nationality)"
								:alt="'${driver.nationality}'"
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
import getCountryFlagMixin from "../../../mixins/getCountryFlagMixin"
import getConstructorColorMixin from "../../../mixins/getConstructorColorMixin"
import getImageMixin from "../../../mixins/getImageMixin"
import getWindowSizeMixin from "../../../mixins/getWindowSizeMixin"
import generalVars from "../../../mixins/generalVars"

export default {
	name: "DriverTable",
	props: {
		driverStandings: Array,
	},
	mixins: [
		getCountryFlagMixin,
		getConstructorColorMixin,
		getImageMixin,
		getWindowSizeMixin,
		generalVars,
	],
}
</script>

<style scoped>
table {
	width: 100%;
}

tbody {
	border-bottom: 1px solid #fff;
}

tbody:last-child {
	border-bottom: none;
}

.driver-table-headline-div {
	margin: 0.5em 0 2em;
}

.leader-driver-div {
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}

.leader-driver-div > .first {
	order: 2;
}
.leader-driver-div > .second {
	order: 1;
}
.leader-driver-div > .third {
	order: 3;
}

.second {
	margin: 2em 0.5em 0 0.5em !important;
}

.third {
	margin: 3em 0.5em 0 0.5em !important;
}

.leader-div {
	flex: 1;
	margin: 0 0.5em;
}

.parent {
	position: relative;
	top: 0;
	left: 0;
}

.leader-driver-flag-img {
	position: absolute;
	top: 0;
	left: 0;
}
</style>
