<template>
  <b-container class="default-background-center">
    <div class="row constructor-standings-row">
      <div class="col">
        <ConstructorTable
          v-if="constructorStandingsDataLoaded"
          :teamStandings="constructorStandings"
        />
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

import ConstructorTable from '../../components/Standings/ConstructorStandings/ConstructorTable.vue'

import apiCallsMixin from '../../mixins/apiCallsMixin'

export default {
  name: 'ConstructorStandings',
  components: {
    ConstructorTable,
  },
  computed: {
    ...mapGetters(['allConstructors']),
  },
  data() {
    return {
      constructorStandings: null,
      constructorStandingsDataLoaded: false,
      allConstructorStore: null,
    }
  },
  async created() {
    if (this.constructorStandings && this.constructorStandings.length > 0)
      return
    console.log('ConstructorStandings - No data in constructorStandings yet')
    const constructorStandingsData = await this.getconstructorStandings()

    this.constructorStandings = constructorStandingsData.allConstructors
    this.allConstructorStore = this.allConstructors

    this.getTeamsNationality()

    this.constructorStandingsDataLoaded =
      constructorStandingsData.teamDataLoaded
  },
  methods: {
    getTeamsNationality() {
      for (let i = 0; i < this.constructorStandings.length; i++) {
        for (let j = 0; j < this.allConstructorStore.length; j++) {
          if (
            this.constructorStandings[i].team_id ===
            this.allConstructorStore[j].team_id
          ) {
            this.constructorStandings[i].nationality = this.allConstructorStore[
              j
            ].nationality
          }
        }
      }
    },
  },
  mixins: [apiCallsMixin],
}
</script>

<style scoped></style>
