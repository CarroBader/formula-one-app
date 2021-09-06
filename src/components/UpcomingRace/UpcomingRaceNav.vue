<template>
  <div>
    <b-navbar toggleable="md navbar-sub">
        <b-navbar-nav class="navbar-nav-sub">
            <router-link
              v-for="route in routesToUse"
              :key="route.path"
              :to="route.path"
              class="nav-link nav-link-sub"
            >
              {{route.name}}
            </router-link>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: `UpcomingRaceNav`,
  props: { isSprintRace: { default: false, type: Boolean } },
  data() {
    return {
      routesToUse: [],
    }
  },
  beforeMount() {
    this.routesToUse = this.$router.options.routes[0].children
    if (!this.isSprintRace) { this.routesToUse = this.routesToUse.filter((race) => !race.onlyForSprintRaces) }
  },
}
</script>

<style scoped>

</style>
