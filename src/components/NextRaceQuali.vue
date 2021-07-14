<template>
  <div>
    <h1 class="red-text align-title"> Qualifyining: </h1>
    <h1> {{ nextRaceNameQuali }}</h1>
    <table>
    <tr>
        <th>Position</th>
        <th>Name</th>
        <!-- <th>Number</th> -->
        <th>Car</th>
        <th>Q1</th>
        <th>Q2</th>
        <th>Q3</th>
      </tr>
      <tbody         
        v-for="next, i in nextRaceQuali"
        :key="next[i]">
      <tr>
        <td>{{ next.position }}</td>
        <!-- <td>
          <img :src="getArrowImage(res.grid, res.position)"
          :alt='`${res.Driver.nationality}`'
          :class="getArrowClass(res.grid, res.position)"
          />
          <span class="positionDifference">{{ res.grid - res.position != 0 ? Math.abs(res.grid - res.position) : "" }}</span>
        </td> -->
        <td>{{ next.Driver.givenName }} {{ next.Driver.familyName }}</td>
        <!-- <td>{{ next.Driver.permanentNumber }}</td> -->
        <!-- <td>
          <img :src="getFlagImage(res.Driver.nationality)"
          :alt='`${res.Driver.nationality}`'
          class="country-flag-img"/>
        </td> -->
        <td>{{ next.Constructor.name }}</td>
        <td>{{ next.Q1 }}</td>
        <td>{{ next.Q2 }}</td>
        <td>{{ next.Q3 }}</td>
        <!-- <td v-if="fastestLap(res.FastestLap)">
          <img src="../assets/img/icons/fastest_lap.png"
          class="fastestLap" 
          />
        </td> -->
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//import getFlagMixin from '../mixins/getFlagMixin'   mixins: [getFlagMixin]

export default {
  name: 'NextRaceQuali',
  props: {
    nextRaceQuali: Array,
    nextRaceNameQuali: String
  },
  mounted() {
    console.log("Quali next race", this.nextRaceQuali)
  },
  methods: {
    //   getFlagImage(nationality) {
    //     let countryFlag = this.getFlag(nationality)
    //     return require(`../assets/img/flags/${countryFlag}.png`)
    // },
    // getArrowImage(grid, position) {
    //   let gridImg

    //   gridImg = grid != position ? 'arrow' : 'line';

    //   return require(`../assets/img/icons/${gridImg}.png`)
    // },
  }
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

/* .country-flag-img {
  height: 0.8em;
  width: 1.6em;
} */

</style>
