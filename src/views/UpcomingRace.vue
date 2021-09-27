<template>
  <b-container class="view-container" :key="renderKey">
    <UpcomingRaceNav />
    <router-view />
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

import UpcomingRaceNav from '../components/UpcomingRace/UpcomingRaceNav.vue'

export default {
  name: `UpcomingRace`,
  components: {
    UpcomingRaceNav,
  },
  data() {
    return {
      renderKey: 0,
    }
  },
  computed: {
    ...mapState([`currentRound`]),
  },
  watch: {
    currentRound(newV, oldV) {
      if (newV !== oldV) {
        this.forceRerender()
      }
    },
  },
  methods: {
    forceRerender() {
      this.renderKey += 1
    },
  },
}
</script>

<style scoped>
</style>
