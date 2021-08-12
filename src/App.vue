<template>
  <div class="default-background-center">
    <TopNav :nextRaceName="nextRaceName"
    v-if="dataLoaded"/>
    <router-view />
    <Footer />
    <BotNav />
  </div>
</template>

<script>
import TopNav from './components/General/TopNav'
import Footer from './components/General/Footer'
import BotNav from './components/General/BotNav'

import apiCallsMixin from './mixins/apiCallsMixin'

export default {
  name: 'App',
  components: {
    TopNav,
    Footer,
    BotNav
  },
  data() {
    return {
      nextRace: 'nextRace',
      nextRaceName: null,
      dataLoaded: false
    }
  },
  async mounted() {
    let responseRace = await this.getRaces(this.nextRace)
    this.nextRaceName = responseRace.nextRace.raceName
    this.dataLoaded = responseRace.dataLoaded
  },
  mixins: [apiCallsMixin]
}
</script>


<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
