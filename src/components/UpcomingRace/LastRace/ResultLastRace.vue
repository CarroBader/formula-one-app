<template>
  <div v-if="lastRaceDataLoaded">
    <div class="result-last-race-headline-div">
      <h1 class="result-last-race-headline">{{ lastRace.raceName }}</h1>
    </div>
    <b-card class="card-margin">
      <div class="scroll-table">
        <table>
          <tr class="result-last-race-tr">
            <th class="browser-view">Position</th>
            <th class="mobile-view">Pos.</th>
            <th></th>
            <th>Name</th>
            <th class="no-display-when-mobile">Nationality</th>
            <th>Car</th>
            <th class="browser-view">Points</th>
            <th class="mobile-view">Pts.</th>
            <th></th>
          </tr>
          <tbody
            v-for="race, index in lastRace.Results"
            :key="index"
            class="result-last-race-tbody"
          >
            <td class="result-last-race-td extra-dark-grey">{{ race.position }}</td>
            <td class="result-last-race-td">
              <img
                :src="getSymbolImage(race.grid, race.position)"
                :alt='`${race.Driver.nationality}`'
                :class="getSymbolClass(race.grid, race.position)"
              />
              <span class="position-difference">
                {{ race.grid - race.position != 0 ? Math.abs(race.grid - race.position) : "" }}
              </span>
            </td>
            <td class="result-last-race-td">{{ race.Driver.givenName }} {{race.Driver.familyName }}</td>
            <td class="no-display-when-mobile result-last-race-td">
              <img
                :src="getCountryName(race.Driver.nationality)"
                :alt='`${race.Driver.nationality}`'
                class="result-last-race-flag-img"
              />
            </td>
            <td
              class="result-last-race-td"
              :class="getConstructorColor(race.Constructor.constructorId)"
            >
              {{ race.Constructor.name }}
            </td>
            <td class="result-last-race-td">{{ race.points }}</td>
            <td v-if="fastestLap(race.FastestLap)">
              <img
                src="../../../assets/img/icons/fastest_lap.png"
                class="fastest-lap-img"
              />
            </td>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import apiCallsMixin from '../../../mixins/apiCallsMixin'
import getCountryFlagMixin from '../../../mixins/getCountryFlagMixin'
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'
import getImageMixin from '../../../mixins/getImageMixin'

const imgFolder = `icons`

export default {
  name: `ResultLastRace`,
  data() {
    return {
      getLastRace: `lastRace`,
      lastRace: null,
      lastRaceDataLoaded: false,
    }
  },
  async created() {
    // Get last race
    const responseLastRace = await this.getRaces(this.getLastRace)

    // Get last race result
    const responseLastRaceResult = await this.getRaceResult(responseLastRace.season, responseLastRace.round)

    // Set value on data properties
    this.lastRace = responseLastRaceResult.lastRaceResult

    // Set dataloaded variable(s) to true
    this.lastRaceDataLoaded = responseLastRaceResult.dataLoaded
  },
  methods: {
    getSymbolImage(grid, position) {
    /*
      Check if position change happened.
      Return an img with the correct symbol.
    */
      const positionSymbol = grid !== position ? `arrow` : `line`

      return this.getImageMixin(imgFolder, positionSymbol)
    },
    getSymbolClass(grid, position) {
    /*
      Return the class that matches the position change.
    */
      const start = Number(grid)
      const end = Number(position)

      // eslint-disable-next-line no-nested-ternary
      return start === end ? `same-position` : (start < end ? `lost-position` : `gained-position`)
    },
    fastestLap(fastestLap) {
    /*
      Return true if the driver got the fastest lap.
    */
      return !!(fastestLap !== undefined && fastestLap.rank === `1`)
    },
  },
  mixins: [apiCallsMixin, getCountryFlagMixin, getConstructorColorMixin, getImageMixin],
}
</script>

<style scoped>
  tbody {
    border-bottom: 1px solid #fff;
  }

  tbody:last-child {
    border-bottom: none;
  }

  .result-last-race-headline-div {
    margin: 0.5em 0 2em;
  }

  .fastest-lap-img {
    height: 1em;
    width: 1.5em;
  }

  .same-position {
    height: 1em;
    width: 1em;
    -webkit-filter:
    invert(100%)
    sepia()
    saturate(100%)
    hue-rotate(0deg);
    filter:
    invert(100%)
    sepia()
    saturate(100%)
    hue-rotate(0deg);
  }

  .lost-position {
    height: 1em;
    width: 1em;
    -webkit-filter:
    invert(40%)
    grayscale(100%)
    brightness(55%)
    sepia(100%)
    hue-rotate(-50deg)
    saturate(400%)
    contrast(2);
    filter:
    invert(40%)
    grayscale(100%)
    brightness(55%)
    sepia(100%)
    hue-rotate(-50deg)
    saturate(400%)
    contrast(2);
  }

  .gained-position {
    height: 1em;
    width: 1em;
    transform: scaleY(-1);
    -webkit-filter:
    invert(40%)
    grayscale(100%)
    brightness(70%)
    sepia(100%)
    hue-rotate(50deg)
    saturate(400%)
    contrast(2);
    filter:
    invert(40%)
    grayscale(100%)
    brightness(70%)
    sepia(100%)
    hue-rotate(50deg)
    saturate(400%)
    contrast(2);
  }
</style>
