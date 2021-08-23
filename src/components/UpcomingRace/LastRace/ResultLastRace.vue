<template>
  <div
    v-if="dataLoaded">
    <div class="result-last-race-headline-div">
      <h1 class="result-last-race-headline">{{ lastRace.raceName }}</h1>
    </div>
    <b-card class="card-margin">
      <div class="scroll-table ">
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
            v-for="race, i in lastRace.Results"
            :key="race[i]"
            class="result-last-race-tbody">
          <tr>
            <td class="result-last-race-td darkgrey-text">{{ race.position }}</td>
            <td class="result-last-race-td">
              <img :src="getArrowImage(race.grid, race.position)"
              :alt='`${race.Driver.nationality}`'
              :class="getArrowClass(race.grid, race.position)"
              />
              <span class="position-difference">{{ race.grid - race.position != 0 ? Math.abs(race.grid - race.position) : "" }}</span>
            </td>
            <td class="result-last-race-td">{{ race.Driver.givenName }} {{race.Driver.familyName }}</td>
            <td class="no-display-when-mobile result-last-race-td">
              <img :src="getFlagImage(race.Driver.nationality)"
              :alt='`${race.Driver.nationality}`'
              class="result-last-race-flag-img"/>
            </td>
            <td :class="getColor(race.Constructor.constructorId)" 
                class="result-last-race-td">
                {{ race.Constructor.name }}</td>
            <td class="result-last-race-td">{{ race.points }}</td>
            <td v-if="fastestLap(race.FastestLap)">
              <img src="../../../assets/img/icons/fastest_lap.png"
              class="fastest-lap-img" 
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import apiCallsMixin from '../../../mixins/apiCallsMixin'
import getFlagMixin from '../../../mixins/getFlagMixin'
import getColorMixin from '../../../mixins/getColorMixin'

export default {
  name: 'LastRace',
  data() {
    return {
      lastRace: null,
      dataLoaded: false,
      getLatestRace: 'latestRace'
    }
  },
  async mounted() {
    let responseRace = await this.getRaces(this.getLatestRace)
    let responseResults = await this.getRaceResult(responseRace.season, responseRace.round)

    this.lastRace = responseResults.lastRaceResult
    this.dataLoaded = responseResults.dataLoaded

  },
  methods: {
    getFlagImage(nationality) {
      let countryFlag = this.getFlag(nationality)
      return require(`../../../assets/img/flags/${countryFlag}.png`)
    },
    getArrowImage(grid, position) {
      let gridImg

      gridImg = grid != position ? 'arrow' : 'line';

      return require(`../../../assets/img/icons/${gridImg}.png`)
    },
    getArrowClass(grid, position) {
      let start = Number(grid)
      let end = Number(position)
      return start == end ? 'same-position' : (start < end ? "lost-position" : "gained-position");
    },
    fastestLap(fastestLap) {
      return fastestLap != undefined && fastestLap.rank == "1" ? true : false
    }
  },
  mixins: [apiCallsMixin, getFlagMixin, getColorMixin]
}
</script>

<style scoped>
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
    -webkit-filter: invert(100%) 
    sepia() 
    saturate(100%) 
    hue-rotate(0deg)
  }

  .lost-position {
    height: 1em;
    width: 1em;
    -webkit-filter: invert(40%)
    grayscale(100%) 
    brightness(70%) 
    sepia(100%) 
    hue-rotate(-50deg) 
    saturate(400%) 
    contrast(2);
  }

  .gained-position {
    height: 1em;
    width: 1em;
    transform: scaleY(-1);
    -webkit-filter: invert(40%) 
    grayscale(100%) 
    brightness(70%) 
    sepia(100%) 
    hue-rotate(50deg) 
    saturate(400%) 
    contrast(2);
  }
</style>
