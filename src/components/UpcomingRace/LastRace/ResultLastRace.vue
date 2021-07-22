<template>
  <div
    v-if="dataLoaded"
    class="result-last-race-div">
    <h1 class="red-text align-title"> Last GP:</h1>
    <h1 class="align-title" style="margin-left:2em"> {{ lastRace.raceName }}</h1>
    <table>
    <tr>
        <th>Position</th>
        <th></th>
        <th>Name</th>
        <th>Nationality</th>
        <th>Car</th>
        <th>Points</th>
        <th></th>
    </tr>
      <tbody         
        v-for="race, i in lastRace.Results"
        :key="race[i]">
      <tr>
        <td>{{ race.position }}</td>
        <td>
          <img :src="getArrowImage(race.grid, race.position)"
          :alt='`${race.Driver.nationality}`'
          :class="getArrowClass(race.grid, race.position)"
          />
          <span class="positionDifference">{{ race.grid - race.position != 0 ? Math.abs(race.grid - race.position) : "" }}</span>
        </td>
        <td>{{ race.Driver.givenName }} {{ race.Driver.familyName }}</td>
        <td>
          <img :src="getFlagImage(race.Driver.nationality)"
          :alt='`${race.Driver.nationality}`'
          class="country-flag-img"/>
        </td>
        <td>{{ race.Constructor.name }}</td>
        <td>{{ race.points }}</td>
        <td v-if="fastestLap(race.FastestLap)">
          <img src="../../../assets/img/icons/fastest_lap.png"
          class="fastestLap" 
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import apiCallsMixin from '../../../mixins/apiCallsMixin'
import getFlagMixin from '../../../mixins/getFlagMixin'

export default {
  name: 'LastRace',
  data() {
    return {
      lastRace: null,
      dataLoaded: false,
      latestRace: 'latestRace'
    }
  },
  async mounted() {
    let responseRace = await this.getRaces(this.latestRace)
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
      return start == end ? 'samePosition' : (start < end ? "lostPosition" : "gainedPosition");
    },
    fastestLap(fastestLap) {
      return fastestLap != undefined && fastestLap.rank == "1" ? true : false
    }
  },
  mixins: [apiCallsMixin, getFlagMixin]
}
</script>

<style scoped>

.result-last-race-div {
  margin: 1.5em 0;
}

th {
  font-size: 0.9em;
  color: #fff;
}

td {
  color: #fff;
}

.align-title {
  text-align: initial;
}

.positionDifference {
  font-size: 0.9em;
  margin-left: 0.5em;
}

.country-flag-img {
  height: 1em;
  width: 1.6em;
}

.fastestLap {
  height: 1em;
  width: 1.5em;
}

.samePosition {
  height: 1em;
  width: 1em;
  -webkit-filter: invert(100%) 
  sepia() 
  saturate(100%) 
  hue-rotate(0deg)
}

.lostPosition {
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

.gainedPosition {
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