<template>
  <b-container class="default-background-center">
    <div class="row constructor-standings-row">
      <div class="col">
        <ConstructorTable
        v-if="teamStandingsDataLoaded"
        :teamStandings="teamStandings" />
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

import ConstructorTable from '../../components/Standings/ConstructorStandings/ConstructorTable.vue'

import apiCallsNewMixin from '../../mixins/apiCallsNewMixin'

const driverStandings = [
  {
    position: 1,
    points: `362.5`,
    team_id: `mercedes`,
    team_name: `Mercedes`,
    season: 2021,
  },
  {
    position: 2,
    points: `344.5`,
    team_id: `red_bull`,
    team_name: `Red Bull`,
    season: 2021,
  },
  {
    position: 3,
    points: `215`,
    team_id: `mclaren`,
    team_name: `McLaren`,
    season: 2021,
  },
  {
    position: 4,
    points: `201.5`,
    team_id: `ferrari`,
    team_name: `Ferrari`,
    season: 2021,
  },
  {
    position: 5,
    points: `95`,
    team_id: `alpine`,
    team_name: `Alpine`,
    season: 2021,
  },
  {
    position: 6,
    points: `84`,
    team_id: `alphatauri`,
    team_name: `AlphaTauri`,
    season: 2021,
  },
  {
    position: 7,
    points: `59`,
    team_id: `aston_martin`,
    team_name: `Aston Martin`,
    season: 2021,
  },
  {
    position: 8,
    points: `22`,
    team_id: `williams`,
    team_name: `Williams`,
    season: 2021,
  },
  {
    position: 9,
    points: `3`,
    team_id: `alfa_romeo`,
    team_name: `Alfa Romeo`,
    season: 2021,
  },
  {
    position: 10,
    points: `0`,
    team_id: `haas`,
    team_name: `Haas`,
    season: 2021,
  },
]

export default {
  name: `ConstructorStandings`,
  components: {
    ConstructorTable,
  },
  computed: {
    ...mapGetters([`allTeams`]),
  },
  data() {
    return {
      teamStandings: null,
      teamStandingsDataLoaded: false,
      allTeamsStore: null,
    }
  },
  async created() {
    this.allTeamsStore = this.allTeams
    this.teamStandings = driverStandings
    this.teamStandingsDataLoaded = true
    console.log(`ConstructorTable - allTeamsStore`, this.allTeamsStore)

    this.getTeamsNationality()

    // if (this.teamStandings && this.teamStandings.length > 0) return
    // console.log(`ConstructorStandings - No data in teamStandings yet`)
    // const teamStandingsData = await this.getDriverStandings()

    // this.teamStandings = teamStandingsData.allTeams
    // this.teamStandingsDataLoaded = teamStandingsData.dataLoaded
  },
  methods: {
    getTeamsNationality() {
      for (let i = 0; i < this.teamStandings.length; i++) {
        for (let j = 0; j < this.allTeamsStore.length; j++) {
          if (this.teamStandings[i].team_id === this.allTeamsStore[j].team_id) {
            this.teamStandings[i].nationality = this.allTeamsStore[j].nationality
          }
        }
      }
      console.log(`this.teamStandings`, this.teamStandings)
    },
  },
  mixins: [apiCallsNewMixin],
}
</script>

<style scoped>
  .constructor-standings-row {
    display: inline-block;
  }
</style>
