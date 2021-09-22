<template>
  <div>
    <b-navbar toggleable="md navbar-sub">
        <b-navbar-nav class="navbar-nav-sub">
            <router-link
              v-for="route in routesToUse"
              :key="route.path"
              :to="route.path"
              @click.native="changeName(route.name)"
              class="nav-link nav-link-sub"
            >
              {{route.name}}
            </router-link>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const legitLinks = [`Last Race`, `Next Race`, `Practice`, `Qualifying`, `Sprint Qualifying`, `Race`]

export default {
  name: `UpcomingRaceNav`,
  props: { isSprintRace: { default: false, type: Boolean } },
  data() {
    return {
      routesToUse: [],
    }
  },
  computed: {
    ...mapState([`raceNav`]),
  },
  beforeMount() {
    this.routesToUse = this.$router.options.routes[0].children
    if (!this.isSprintRace) { this.routesToUse = this.routesToUse.filter((race) => !race.onlyForSprintRaces) }
  },
  methods: {
    changeName(name) {
      if (legitLinks.includes(name)) {
        this.$store.commit(`SET_NAV_NAME`, name)
      }
    },
  },
}
</script>

<style scoped>

</style>
