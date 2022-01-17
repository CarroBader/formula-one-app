<template>
	<div class="bot-nav">
		<!-- <router-link
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          class="bot-nav-link"
        >
          <div class="text-icon">
            <font-awesome-icon :icon="['fas', route.icon]" />
          </div>
        </router-link> -->
		<router-link
			class="nav-link nav-link-top"
			:to="{ name: raceNav, params: { id: currentRound } }"
		>
			<div class="text-icon">
				<font-awesome-icon :icon="['fas', 'flag-checkered']" />
			</div>
		</router-link>
		<router-link class="nav-link nav-link-top" :to="{ name: standingsNav }">
			<div class="text-icon">
				<font-awesome-icon :icon="['fas', 'table']" />
			</div>
		</router-link>
		<router-link class="nav-link nav-link-top" :to="{ name: 'Race Map' }">
			<div class="text-icon">
				<font-awesome-icon :icon="['fas', 'globe-europe']" />
			</div>
		</router-link>
	</div>
</template>

<script>
import { mapGetters, mapState } from "vuex"

export default {
	name: "BotNav",
	data() {
		return {}
	},
	watch: {
		currentRound(newValue) {
			this.$router.replace({ name: this.raceNav, params: { id: newValue } })
		},
	},
	computed: {
		...mapGetters(["nextSession"]),
		...mapState(["currentRound", "raceNav", "standingsNav"]),
	},
	created() {
		this.$store.commit("SET_NAV_NAME", this.nextSession)
		if (this.$router.history.current.path === "/") {
			this.$router.replace("/grand-prix/${this.currentRound}/next-race")
		}
	},
}
</script>

<style scoped>
.bot-nav {
	text-align: center;
	background-color: #121212;
	border-top: 1px solid #e10600;
	bottom: 0;
	position: fixed;
	width: 100%;
	height: auto;
	display: flex;
	display: -webkit-flex;
	justify-content: space-evenly;
	margin-top: 3em;
}

.bot-nav-link {
	font-size: 1.2em;
	color: #666;
	text-decoration: none;
}

.text-icon {
	display: grid;
	text-align: -webkit-center;
	padding: 0.5em;
}

.router-link-active {
	color: #fff;
}
</style>
