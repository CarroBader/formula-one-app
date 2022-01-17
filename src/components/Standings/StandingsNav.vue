<template>
	<b-navbar toggleable="md navbar-sub">
		<b-navbar-nav class="navbar-nav-sub">
			<router-link
				v-for="route in routes"
				:key="route.path"
				:to="route.path"
				@click.native="changeName(route.name)"
				class="nav-link nav-link-sub"
			>
				{{ route.name }}
			</router-link>
		</b-navbar-nav>
	</b-navbar>
</template>

<script>
import { mapState } from "vuex"

const legitLinks = ["Driver Standings", "Constructor Standings"]

export default {
	name: "StandingsNav",
	data() {
		return {
			routes: this.$router.options.routes[1].children,
		}
	},
	computed: {
		...mapState(["standingsNav"]),
	},
	methods: {
		changeName(name) {
			if (legitLinks.includes(name)) {
				this.$store.commit("SET_STANDINGS_NAME", name)
			}
		},
	},
}
</script>

<style scoped></style>
