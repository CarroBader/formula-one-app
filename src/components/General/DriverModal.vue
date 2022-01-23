<template>
	<b-modal
		:id="id"
		title="Driver Information"
		ok-only
		ok-title="Back"
		ok-variant="dark"
		@ok="setShowToFalse()"
		visible="visible"
		class="modal-title"
	>
		<p class="my-4">{{ id }}</p>
	</b-modal>
</template>

<script>
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
	},
	methods: {
		setShowToFalse() {
			this.$emit("clicked", false)
		},
	},
}
</script>

<style scoped>
.modal-title {
	color: black !important;
}
</style>
