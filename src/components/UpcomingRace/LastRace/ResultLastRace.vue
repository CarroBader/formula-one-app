<template>
  <div>
    <div class="result-last-race-headline-div">
      <h1 class="result-last-race-headline">{{ lastRaceName }}</h1>
    </div>
    <div v-if="!statusCompleted">
      <p class="noDataMessage">This race is not completed yet.</p>
    </div>
    <b-card class="card-margin" v-if="statusCompleted">
      <div class="scroll-table">
        <table>
          <tr class="result-last-race-tr">
            <th>{{ returnAltBySize(small, positionLong, positionShort) }}</th>
            <th></th>
            <th>Name</th>
            <th :style="returnAltBySize(small, revert, none)">Nationality</th>
            <th>Car</th>
            <th>{{ returnAltBySize(small, pointsLong, pointsShort) }}</th>
            <th></th>
          </tr>
          <tbody
            v-for="(race, index) in raceResult"
            :key="index"
            class="result-last-race-tbody"
          >
            <td class="result-last-race-td result-last-race-position">
              {{ race.position }}
            </td>
            <td class="result-last-race-td">
              <img
                :src="getSymbolImage(race.grid_position, race.position)"
                :alt="'Symbol'"
                :class="getSymbolClass(race.grid_position, race.position)"
              />
              <span class="position-difference">
                {{
                  race.grid_position - race.position != 0
                    ? Math.abs(race.grid_position - race.position)
                    : ''
                }}
              </span>
            </td>
            <td class="result-last-race-td">
              {{ race.first_name }} {{ race.last_name }}
            </td>
            <td
              class="result-last-race-td"
              :style="returnAltBySize(small, revert, none)"
            >
              <img
                :src="getFlag(race.nationality)"
                :alt="`${race.nationality}`"
                class="result-last-race-flag-img"
              />
            </td>
            <td
              class="result-last-race-td"
              :class="getConstructorColor(race.color_code)"
            >
              {{ race.team }}
            </td>
            <td class="result-last-race-td">{{ race.points }}</td>
            <td v-if="race.fastest_lap">
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
import getCountryFlagMixin from '../../../mixins/getCountryFlagMixin'
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'
import getImageMixin from '../../../mixins/getImageMixin'
import getWindowSizeMixin from '../../../mixins/getWindowSizeMixin'
import generalVarsMixin from '../../../mixins/generalVarsMixin'

export default {
  name: 'ResultLastRace',
  props: {
    raceResult: Array,
    lastRaceName: String,
    statusCompleted: Boolean,
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    getSymbolImage(grid, position) {
      /*
      Check if position change happened.
      Return an img with the correct symbol.
    */
      const positionSymbol = grid !== position ? 'arrow' : 'line'

      return this.getImageMixin(this.iconsFolder, positionSymbol)
    },
    getSymbolClass(grid, position) {
      /*
      Return the class that matches the position change.
    */
      const start = Number(grid)
      const end = Number(position)

      // eslint-disable-next-line no-nested-ternary
      return start === end
        ? 'same-position'
        : start < end
        ? 'lost-position'
        : 'gained-position'
    },
    fastestLap(fastestLap) {
      /*
      Return true if the driver got the fastest lap.
    */
      return !!(fastestLap !== undefined && fastestLap.rank === '1')
    },
  },
  mixins: [
    getCountryFlagMixin,
    getConstructorColorMixin,
    getImageMixin,
    getWindowSizeMixin,
    generalVarsMixin,
  ],
}
</script>

<style lang="scss" scoped>
tbody {
  border-bottom: 1px solid #fff;
}

tbody:last-child {
  border-bottom: none;
}
</style>
