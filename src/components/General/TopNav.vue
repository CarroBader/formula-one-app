<template>
	<div>
		<div class="lol"></div>
		<b-navbar toggleable="md navbar-top figure.blur5">
			<img src="../../assets/logo.png" class="nav-logo-top" alt="F1 logo" />
			<b-navbar-brand class="nav-title-top">Formula One</b-navbar-brand>

			<b-navbar-toggle
				class="place-toggle-button"
				target="nav-collapse"
			></b-navbar-toggle>

			<b-collapse id="nav-collapse" class="nav-collapse-top" is-nav>
				<b-navbar-nav class="navbar-nav-top">
					<!-- <router-link
                v-for="route in routes"
                :key="route.path"
                :to="route.path"
                class="nav-link nav-link-top"
              >
                {{ route.name }}
              </router-link> -->
					<!-- Detta är inte legit, måste alltid hitta next race. -->
					<router-link
						class="nav-link nav-link-top"
						:to="{ name: raceNav, params: { id: currentRound } }"
					>
						{{ upcomingRace.name }}</router-link
					>
					<router-link
						class="nav-link nav-link-top"
						:to="{ name: standingsNav }"
						>Standings</router-link
					>
					<router-link class="nav-link nav-link-top" :to="{ name: 'Race Map' }">
						Map</router-link
					>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import { mapGetters, mapState } from "vuex"

export default {
	name: "TopNav",
	data() {
		return {}
	},
	watch: {
		currentRound(newValue) {
			if (this.$route.path !== `/grand-prix/${this.currentRound}/next-race`) {
				this.$router.replace({ name: this.raceNav, params: { id: newValue } })
			}
		},
	},
	computed: {
		...mapGetters(["upcomingRace", "nextSession"]),
		...mapState(["currentRound", "raceNav", "standingsNav"]),
	},
	created() {
		this.$store.commit("SET_NAV_NAME", this.nextSession)
		if (
			this.$router.history.current.path === "/" &&
			this.$route.path !== `/grand-prix/${this.currentRound}/next-race`
		) {
			this.$router.replace(`/grand-prix/${this.currentRound}/next-race`)
		}
	},
}
</script>

<style scoped>
.navbar-top {
	/* background-color: #e10600; */
	box-shadow: inset 0 0 5px #000000;
	background-color: rgb(255 13 13 / 79%);
	border-bottom: 1px solid #fff;
	z-index: 10000;
}

.nav-collapse-top {
	justify-content: flex-end;
}

.nav-title-top {
	font-family: "Orbitron", "sans-serif";
	color: #fff !important;
	text-shadow: 2px 2px #000;
}

.nav-logo-top {
	margin: 0 0.5em;
}

.items-far-right {
	justify-content: flex-end;
}

.place-toggle-button {
	position: absolute;
	right: 5px;
	top: 2.5px;
}
</style>
