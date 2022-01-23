<template>
	<b-container class="default-background-center">
		<div class="row constructor-standings-row">
			<div class="col">
				<ConstructorTable
					v-if="teamStandingsDataLoaded"
					:teamStandings="teamStandings"
				/>
			</div>
		</div>
	</b-container>
</template>

<script>
import { mapGetters } from "vuex"

import ConstructorTable from "../../components/Standings/ConstructorStandings/ConstructorTable.vue"

import apiCallsMixin from "../../mixins/apiCallsMixin"

export default {
	name: "ConstructorStandings",
	components: {
		ConstructorTable,
	},
	computed: {
		...mapGetters(["allTeams"]),
	},
	data() {
		return {
			teamStandings: null,
			teamStandingsDataLoaded: false,
			allTeamsStore: null,
		}
	},
	async created() {
		if (this.teamStandings && this.teamStandings.length > 0) return
		console.log("ConstructorStandings - No data in teamStandings yet")
		const teamStandingsData = await this.getTeamStandings()

		this.teamStandings = teamStandingsData.allTeams
		this.allTeamsStore = this.allTeams

		this.getTeamsNationality()

		this.teamStandingsDataLoaded = teamStandingsData.teamDataLoaded
	},
	methods: {
		getTeamsNationality() {
			for (let i = 0; i < this.teamStandings.length; i++) {
				for (let j = 0; j < this.allTeamsStore.length; j++) {
					if (this.teamStandings[i].team_id === this.allTeamsStore[j].team_id) {
						this.teamStandings[i].nationality = this.allTeamsStore[
							j
						].nationality
					}
				}
			}
		},
	},
	mixins: [apiCallsMixin],
}
</script>

<style scoped></style>
