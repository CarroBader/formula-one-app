<template>
  <div>
    <div class="result-last-race-headline-div">
      <!-- <h1 class="result-last-race-headline">{{ lastRace.raceName }}</h1> -->
    </div>
    <!-- <b-card class="card-margin">
      <div class="scroll-table">
        <table>
          <tr class="result-last-race-tr">
            <th>{{ returnAltBySize(small, positionLong, positionShort) }}</th>
            <th>Grid</th>
            <th>Name</th>
            <th :style="returnAltBySize(small, revert, none)">Nationality</th>
            <th>Car</th>
            <th>{{ returnAltBySize(small, pointsLong, pointsShort) }}</th>
            <th></th>
          </tr>
          <tbody
            v-for="race, index in lastRace"
            :key="index"
            class="result-last-race-tbody"
          >
            <td class="result-last-race-td extra-dark-grey">{{ race.position }}</td>
            <td class="result-last-race-td extra-dark-grey">{{ race.gridPosition }}</td>
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
            <td class="result-last-race-td"> {{race.name }}</td>
            <td
              class="result-last-race-td"
              :style="returnAltBySize(small, revert, none)"
            >
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
            <td>
              {{ race.team }}
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
    </b-card> -->
  </div>
</template>

<script>
import getCountryFlagMixin from '../../../mixins/getCountryFlagMixin'
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'
import getImageMixin from '../../../mixins/getImageMixin'
import getWindowSizeMixin from '../../../mixins/getWindowSizeMixin'
import generalVars from '../../../mixins/generalVars'

export default {
  name: `ResultLastRace`,
  data() {
    return {
    }
  },
  created() {
    // console.log(`lastRace`, lastRace)
  },
  methods: {
    getSymbolImage(grid, position) {
    /*
      Check if position change happened.
      Return an img with the correct symbol.
    */
      const positionSymbol = grid !== position ? `arrow` : `line`

      return this.getImageMixin(this.iconsFolder, positionSymbol)
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
  mixins: [
    getCountryFlagMixin,
    getConstructorColorMixin,
    getImageMixin,
    getWindowSizeMixin,
    generalVars],
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
