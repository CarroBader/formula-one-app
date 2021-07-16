<template>
  <div
    class="next-race-quali-div">
    <h1 class="red-text align-title"> Qualifyining: </h1>
    <h1 class="align-title" style="margin-left:2em"> {{ this.qualificationResult.raceName }}</h1>
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
        v-for="quali, i in this.qualificationResult.QualifyingResults"
        :key="quali[i]">
      <tr>
        <td>{{ quali.position }}</td>
        <!-- <td>
          <img :src="getArrowImage(res.grid, res.position)"
          :alt='`${res.Driver.nationality}`'
          :class="getArrowClass(res.grid, res.position)"
          />
          <span class="positionDifference">{{ res.grid - res.position != 0 ? Math.abs(res.grid - res.position) : "" }}</span>
        </td> -->
        <td>{{ quali.Driver.givenName }} {{ quali.Driver.familyName }}</td>
        <!-- <td>{{ next.Driver.permanentNumber }}</td> -->
        <!-- <td>
          <img :src="getFlagImage(res.Driver.nationality)"
          :alt='`${res.Driver.nationality}`'
          class="country-flag-img"/>
        </td> -->
        <td :class="getColor(quali.Constructor.constructorId)">{{ quali.Constructor.name }}</td>
        <td>{{ quali.Q1 }}</td>
        <td>{{ quali.Q2 }}</td>
        <td>{{ quali.Q3 }}</td>
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
import getColorMixin from '../../../mixins/getColorMixin'

export default {
  name: 'PracticeSession',
  props: {
    qualificationResult: Object
  },
  mounted() {
    console.log("QS", this.qualificationResult.QualifyingResults)
  },
  methods: {
  },
  mixins: [getColorMixin]
}
</script>

<style scoped>

.next-race-quali-div {
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

/* .country-flag-img {
  height: 0.8em;
  width: 1.6em;
} */

</style>
