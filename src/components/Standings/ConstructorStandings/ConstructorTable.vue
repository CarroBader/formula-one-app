<template>
	<div>
		<div class="constructor-table-headline-div">
			<h1 class="constructor-table-headline">
				{{ season }} Constructor Championship
			</h1>
		</div>
		<b-card class="card-margin">
			<!-- Constructors placed 1-3 -->
			<div class="leader-constructor-div">
				<div
					v-for="(topConstructor, index) in teamStandings.slice(0, 3)"
					:key="index"
					:class="divsTopThree[index]"
					class="leader-div"
				>
					<img
						:src="getImageMixin(constructersFolder, topConstructor.team_id)"
						class="leader-constructor-img"
					/>
					<div class="leaders-constructor-info">
						<h3 class="leader-constructor-points">
							{{ topConstructor.points }} pts
						</h3>
						<div>
							<img
								:src="getFlag(topConstructor.nationality)"
								:alt="`${topConstructor.nationality}`"
								class="leader-constructor-flag-img"
							/>
						</div>
						<h5
							class="leader-constructor-name-team"
							:class="getConstructorColor(topConstructor.team_id)"
						>
							{{ topConstructor.team_name }}
						</h5>
					</div>
				</div>
			</div>
			<!-- Constructors placed 4-10 -->
			<table>
				<tr class="constructor-table-tr">
					<th>{{ returnAltBySize(small, positionLong, positionShort) }}</th>
					<th>Name</th>
					<th>Nationality</th>
					<th>{{ returnAltBySize(small, pointsLong, pointsShort) }}</th>
				</tr>
				<tbody
					v-for="(constructor, index) in teamStandings.slice(3)"
					:key="index"
					class="constructor-table-tbody"
				>
					<td class="constructor-table-td extra-dark-grey">
						{{ constructor.position }}
					</td>
					<td
						class="constructor-table-td"
						:class="getConstructorColor(constructor.team_id)"
					>
						{{ constructor.team_name }}
					</td>
					<td>
						<img
							:src="getFlag(constructor.nationality)"
							:alt="`${constructor.nationality}`"
							class="constructor-table-td constructor-table-flag-img"
						/>
					</td>
					<td class="constructor-table-td">{{ constructor.points }}</td>
				</tbody>
			</table>
		</b-card>
	</div>
</template>

<script>
import getCountryFlagMixin from "../../../mixins/getCountryFlagMixin"
import getConstructorColorMixin from "../../../mixins/getConstructorColorMixin"
import getImageMixin from "../../../mixins/getImageMixin"
import getWindowSizeMixin from "../../../mixins/getWindowSizeMixin"
import generalVarsMixin from "../../../mixins/generalVarsMixin"

export default {
	name: "ConstructorTable",
	props: {
		teamStandings: Array,
	},
	async created() {
		console.log("ConstructorTable - teamStandings", this.teamStandings)
	},
	mixins: [
		getCountryFlagMixin,
		getConstructorColorMixin,
		getImageMixin,
		getWindowSizeMixin,
		generalVarsMixin,
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

.constructor-table-headline-div {
	margin: 0.5em 0 2em;
}

.leader-constructor-div {
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
}

.leader-constructor-div > .first {
	order: 2;
}
.leader-constructor-div > .second {
	order: 1;
}
.leader-constructor-div > .third {
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
</style>
