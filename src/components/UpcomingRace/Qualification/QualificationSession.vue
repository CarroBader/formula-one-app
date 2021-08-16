<template>
  <div
    class="next-race-quali-div">
    <h1 class="qualification-session-headline">{{ this.qualificationResult.raceName }}</h1>
    <b-card class="card-margin">
      <table>
        <tr class="qualifying-session-tr">
        <th class="full-length">Position</th>
        <th class="short-length">Pos.</th>
          <th>Name</th>
          <th class="no-display-when-mobile">Car</th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
        </tr>
        <tbody         
          v-for="quali, i in this.qualificationResult.QualifyingResults"
          :key="quali[i]"
          class="qualifying-session-tbody"
          :class="[i == 9 || i == 14 ? 'elimination-line' : '']">
        <tr>
          <td class="qualification-session-td" style="color:darkgrey !important">{{ quali.position }}</td>
          <td class="qualification-session-td">{{ quali.Driver.givenName }} {{ quali.Driver.familyName }}</td>
          <td class="qualification-session-td no-display-when-mobile" 
          :class="getColor(quali.Constructor.constructorId)">
          {{ quali.Constructor.name }}</td>
          <td class="qualification-session-td Q1">{{ quali.Q1 }}</td>
          <td class="qualification-session-td Q2">{{ quali.Q2 }}</td>
          <td class="qualification-session-td Q3">{{ quali.Q3 }}</td>
        </tr>
        </tbody>
      </table>
    </b-card>
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
    // for (let i = 0; i < this.qualificationResult.QualifyingResults.length; i++) {
    //   console.log(this.qualificationResult.QualifyingResults[i].Constructor.name.slice(0,1))
    // } 
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

.qualifying-title {
  font-size: 1.8em;
}

.elimination-line {
  border-bottom: 1px solid #ff0000;
}

.Q1 {
  color: #D3D3D3;
  border-right: 1px solid #ff0000;
  border-left: 1px solid #ff0000;
}

.Q2 {
  color: #C0C0C0;
  border-right: 1px solid #ff0000;
}

.Q3 {
  color: #A9A9A9;
  border-right: 1px solid red;
}
/* .country-flag-img {
  height: 0.8em;
  width: 1.6em;
} */

</style>
