<template>
	<div>
		<b-card>
			<h5 class="next-race-grand-prix-info-name">
				{{ nextGrandPrix.grand_prix_name }}
			</h5>
			<h5 class="next-race-grand-prix-info-location">Info</h5>
			<table>
				<tr>
					<th class="next-race-grand-prix-info-th">First held:</th>
					<td class="next-race-grand-prix-info-td">
						{{ nextGrandPrix.first_held }}
					</td>
				</tr>
				<tr>
					<th class="next-race-grand-prix-info-th">Number of times held:</th>
					<td class="next-race-grand-prix-info-td">
						{{ nextGrandPrix.times_held }}
					</td>
				</tr>
				<tr>
					<th class="next-race-grand-prix-info-th">Length:</th>
					<td class="next-race-grand-prix-info-td">
						{{ nextGrandPrix.length }} km
					</td>
				</tr>
				<tr>
					<th class="next-race-grand-prix-info-th">Laps:</th>
					<td class="next-race-grand-prix-info-td">{{ nextGrandPrix.laps }}</td>
				</tr>
				<tr>
					<th class="next-race-grand-prix-info-th">Most wins teams:</th>
					<td class="align-end">
						<span
							class="next-race-grand-prix-info-th"
							v-for="(tWins, index) in nextGrandPrix.most_wins_team"
							:key="tWins.team_id"
						>
							<span :class="getConstructorColor(tWins.team_id)">{{
								tWins.team_name
							}}</span
							>&ensp;
							<span class="next-race-grand-prix-info-span"
								>( {{ tWins.wins }} )</span
							>
							<span
								v-if="index === 0 && nextGrandPrix.most_wins_team.length > 1"
							>
								&ensp;|</span
							>
						</span>
					</td>
				</tr>
				<tr>
					<th class="next-race-grand-prix-info-th">Most wins drivers:</th>
					<td class="align-end">
						<span
							class="next-race-grand-prix-info-th"
							v-for="(dWins, index) in nextGrandPrix.most_wins_driver"
							:key="index"
						>
							{{ dWins.driver_name }}

							&ensp;
							<span class="next-race-grand-prix-info-span"
								>( {{ dWins.wins }} )</span
							>
							<span
								v-if="index === 0 && nextGrandPrix.most_wins_driver.length > 1"
							>
								&ensp;|</span
							>
						</span>
					</td>
				</tr>
			</table>
		</b-card>
	</div>
</template>

<script>
import getConstructorColorMixin from "../../../mixins/getConstructorColorMixin"

export default {
	name: "NextRaceGrandPrixInfo",
	props: {
		nextGrandPrix: Object,
	},
	data() {
		return {}
	},

	mixins: [getConstructorColorMixin],
}
</script>

<style lang="scss" scoped>
table {
	width: 100%;
}

th {
	/* dark-grey */
	color: #a9a9a9 !important;
}

td {
	color: white !important;
}

tr:last-child {
	border: none;
}

tr:nth-child(even) {
	background: #121212;
}
</style>
