<template>
	<b-container class="default-background-center">
		<div class="row sprint-qualifying-row">
			<div class="col">
				<SprintQualifyingSession />
			</div>
		</div>
	</b-container>
</template>

<script>
// import { mapGetters, mapState } from 'vuex'

import SprintQualifyingSession from "../../components/UpcomingRace/SprintQualifying/SprintQualifyingSession.vue"

// import helpersMixin from '../../mixins/helpersMixin'
// import apiCallsMixin from '../../mixins/apiCallsMixin'

export default {
	name: "SprintQualifying",
	components: {
		SprintQualifyingSession,
	},
	props: ["id"],
	data() {
		return {}
	},
	computed: {},
	created() {},
	methods: {},
	// mixins: [helpersMixin, apiCallsMixin],
}
</script>

<style scoped>
.sprint-qualifying-row {
	display: inline-block;
}
</style>
