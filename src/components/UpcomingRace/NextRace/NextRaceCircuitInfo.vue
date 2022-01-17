<template>
	<div>
		<b-card>
			<h5 class="next-race-circuit-info-name">{{ nextTrack.track_name }}</h5>
			<h5 class="next-race-circuit-info-location extra-dark-grey">
				{{ nextTrack.location.locality }}, {{ nextTrack.location.country }}
			</h5>
			<img
				:src="getImageMixin(imgFolder, nextTrack.track_id)"
				:alt="'${nextTrack.track_id}'"
				class="next-race-circuit-info-circuit-img"
			/>
			<table>
				<tr>
					<th class="next-race-circuit-info-th">Grands Prix held:</th>
					<td class="next-race-circuit-info-td">
						{{ nextTrack.grands_prix_held }}
					</td>
				</tr>
				<tr>
					<th class="next-race-circuit-info-th">Circuit type</th>
					<td class="next-race-circuit-info-td">{{ nextTrack.type }}</td>
				</tr>
				<tr>
					<th class="next-race-circuit-info-th">Length:</th>
					<td class="next-race-circuit-info-td">{{ nextTrack.length }} km</td>
				</tr>
				<tr>
					<th class="next-race-circuit-info-th">Turns:</th>
					<td class="next-race-circuit-info-td">{{ nextTrack.turns }}</td>
				</tr>
			</table>
		</b-card>
	</div>
</template>

<script>
import getImageMixin from "../../../mixins/getImageMixin"

const imgFolder = "circuits"

export default {
	name: "NextRaceCircuitInfo",
	props: {
		nextTrack: Object,
	},
	data() {
		return {
			imgFolder,
		}
	},
	mixins: [getImageMixin],
}
</script>

<style scoped>
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
</style>
