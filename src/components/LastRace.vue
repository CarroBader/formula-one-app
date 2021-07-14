<template>
  <div>
    <h1 class="red-text align-title"> Last GP:</h1>
    <h1> {{ race.raceName }}</h1>
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
        v-for="res, i in results"
        :key="res[i]">
      <tr>
        <td>{{ res.position }}</td>
        <td>
          <img :src="getArrowImage(res.grid, res.position)"
          :alt='`${res.Driver.nationality}`'
          :class="getArrowClass(res.grid, res.position)"
          />
          <span class="positionDifference">{{ res.grid - res.position != 0 ? Math.abs(res.grid - res.position) : "" }}</span>
        </td>
        <td>{{ res.Driver.givenName }} {{ res.Driver.familyName }}</td>
        <td>
          <img :src="getFlagImage(res.Driver.nationality)"
          :alt='`${res.Driver.nationality}`'
          class="country-flag-img"/>
        </td>
        <td>{{ res.Constructor.name }}</td>
        <td>{{ res.points }}</td>
        <td v-if="fastestLap(res.FastestLap)">
          <img src="../assets/img/icons/fastest_lap.png"
          class="fastestLap" 
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import getFlagMixin from '../mixins/getFlagMixin'

export default {
  name: 'LastRace',
  props: {
    race: Object,
    results: Array
  },
  mounted() {
  },
  methods: {
      getFlagImage(nationality) {
        let countryFlag = this.getFlag(nationality)
        return require(`../assets/img/flags/${countryFlag}.png`)
    },
    getArrowImage(grid, position) {
      let gridImg

      gridImg = grid != position ? 'arrow' : 'line';

      return require(`../assets/img/icons/${gridImg}.png`)
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
  mixins: [getFlagMixin]
}
</script>

<style scoped>

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
