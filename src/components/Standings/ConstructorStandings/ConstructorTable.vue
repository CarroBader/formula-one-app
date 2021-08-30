<template>
  <div v-if="constructorStandingsDataLoaded">
    <div class="constructor-table-headline-div">
      <h1 class="constructor-table-headline">2021 Constructor Championship</h1>
    </div>
    <b-card class="card-margin">
      <!-- Constructors placed 1-3 -->
      <div class="leader-constructor-div">
        <div
          v-for="topConstructor, index in constructorStandings.slice(0,3)"
          :key="index"
          :class="divsTopThree[index]"
          class="leader-div"
        >
          <img
            :src='getImageMixin(imgFolder, topConstructor.Constructor.constructorId)'
            class='leader-constructor-img'
          />
          <div class="leaders-constructor-info">
            <h3 class="leader-constructor-points">{{ topConstructor.points }} pts</h3>
            <div>
              <img
                :src="getCountryName(topConstructor.Constructor.nationality)"
                :alt='`${topConstructor.Constructor.nationality}`'
                class="leader-constructor-flag-img"
              />
            </div>
            <h5
              class="leader-constructor-name-team"
              :class="getConstructorColor(topConstructor.Constructor.constructorId)"
            >
              {{ topConstructor.Constructor.name }}
            </h5>
          </div>
        </div>
      </div>
      <!-- Constructors placed 4-10 -->
      <table>
        <tr class="constructor-table-tr">
          <th>Position</th>
          <th>Name</th>
          <th>Nationality</th>
          <th>Points</th>
        </tr>
        <tbody
          v-for="constructor, index in constructorStandings.slice(3)"
          :key="index"
          class="constructor-table-tbody"
        >
          <tr>
            <td class="constructor-table-td extra-dark-grey">{{ constructor.position }}</td>
            <td
              class="constructor-table-td"
              :class="getConstructorColor(constructor.Constructor.constructorId)"
            >
              {{ constructor.Constructor.name }}
            </td>
            <td>
              <img
                :src="getCountryName(constructor.Constructor.nationality)"
                :alt='`${constructor.Constructor.nationality}`'
                class="constructor-table-td constructor-table-flag-img"
              />
            </td>
            <td class="constructor-table-td">{{ constructor.points }}</td>
          </tr>
        </tbody>
      </table>
    </b-card>
  </div>
</template>

<script>
import apiCallsMixin from '../../../mixins/apiCallsMixin.js'
import getCountryFlagMixin from '../../../mixins/getCountryFlagMixin.js'
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin.js'
import getImageMixin from '../../../mixins/getImageMixin.js'

const divsTopThree = [`first`, `second`, `third`]
const imgFolder = `constructers`

export default {
  name: `ConstructorTable`,
  data() {
    return {
      constructorStandings: null,
      constructorStandingsDataLoaded: false,
      divsTopThree,
      imgFolder,
    }
  },
  async created() {
    // Get current constructor standings
    const responseConstructorStandings = await this.getConstructorStandings()

    // Set value on data properties
    this.constructorStandings = responseConstructorStandings.standingsConstructor

    // Set dataloaded variable(s) to true
    this.constructorStandingsDataLoaded = responseConstructorStandings.dataLoaded
  },
  mixins: [apiCallsMixin, getCountryFlagMixin, getConstructorColorMixin, getImageMixin],
}
</script>

<style scoped>
  table {
    width: 100%;
  }

  tbody {
    border-bottom: 1px solid #fff;
  }

  .constructor-table-headline-div {
    margin: 0.5em 0 2em;
  }

  .leader-constructor-div {
    display: flex;
    justify-content: space-between;
  }

  .leader-constructor-div > .first {order: 2; }
  .leader-constructor-div > .second {order: 1; }
  .leader-constructor-div > .third {order: 3; }

  .second {
    margin: 2em 0.5em 0 0.5em !important;
  }

  .third {
    margin: 3em 0.5em 0 0.5em !important;
  }

  .leader-div {
    flex: 1;
    margin: 0 0.5em;
  }
</style>
