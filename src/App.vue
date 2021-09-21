<template>
  <div class="default-background-center" v-if="dataLoaded">
    <TopNav />
    <router-view />
    <Footer />
    <BotNav />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

import TopNav from './components/General/TopNav.vue'
import Footer from './components/General/Footer.vue'
import BotNav from './components/General/BotNav.vue'

export default {
  name: `App`,
  components: {
    TopNav,
    Footer,
    BotNav,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([`allConfirmedRaces`, `allDrivers`, `allTeams`]),
    ...mapState([`dataLoaded`]),
  },
  created() {
    console.log(`App - created`)
    console.log(`Time`, new Date())
    console.log(`App - allConfirmedRaces`, this.allConfirmedRaces)
    console.log(`App - allDrivers`, this.allDrivers)
    console.log(`App - allTeams`, this.allTeams)
    console.log(`App - dataLoaded`, this.dataLoaded)
    // this.getAllDrivers()
    // this.getAllRaces()
    // this.getAllTeams()

    if (this.allConfirmedRaces && this.allConfirmedRaces.length > 0) return
    console.log(`App - No data getAllRaces yet`)
    this.getAllRaces()

    if (this.allDrivers && this.allDrivers.length > 0) return
    console.log(`App - No data getAllDrivers yet`)
    this.getAllDrivers()

    if (this.allTeams && this.allTeams.length > 0) return
    console.log(`App - No data getAllTeams yet`)
    this.getAllTeams()
  },
  methods: {
    ...mapActions([`getAllRaces`, `getAllDrivers`, `getAllTeams`]),
  },
}
</script>

<style scoped>

</style>
