<template>
	<div class="next-race-country-flag-div">
		<img
			:src="getFlag(country)"
			:alt="`${country}`"
			class="next-race-country-flag-img"
		/>
	</div>
</template>

<script>
import getCountryFlagMixin from "../../../mixins/getCountryFlagMixin"

export default {
	name: "NextRaceCountryFlag",
	props: {
		country: String,
	},
	mixins: [getCountryFlagMixin],
}
</script>

<style scoped></style>
