<template>
  <div>
    <div class="qualification-session-headline-div">
      <h1 class="qualification-session-headline">{{ this.qualificationResult.raceName }}</h1>
    </div>
    <b-card class="card-margin">
      <div class="scroll-table ">
        <table>
          <tr class="qualifying-session-tr">
          <th class="browser-view">Position</th>
          <th class="mobile-view">Pos.</th>
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
            <td class="qualification-session-td darkgrey-text">{{ quali.position }}</td>
            <td class="qualification-session-td browser-view">{{ quali.Driver.givenName }} {{ quali.Driver.familyName }}</td>
            <td class="qualification-session-td mobile-view"
                :class="getColor(quali.Constructor.constructorId)">
                {{ quali.Driver.givenName }} {{ quali.Driver.familyName }}
            </td>
            <td class="qualification-session-td no-display-when-mobile" 
                :class="getColor(quali.Constructor.constructorId)"> 
                {{ quali.Constructor.name }}
            </td>
            <td class="qualification-session-td q1"
                :class="qualiOne(i)">
                {{ quali.Q1 }}
            </td>
            <td class="qualification-session-td q2"
                :class="qualiTwo(i)">
                {{ quali.Q2 }}
            </td>
            <td class="qualification-session-td q3"
                :class="qualiThree(i)">
                {{ quali.Q3 }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import getColorMixin from '../../../mixins/getColorMixin'

var qualiResult

export default {
  name: 'QualificationSession',
  props: {
    qualificationResult: Object
  },
  beforeMount() {
    qualiResult = this.qualificationResult.QualifyingResults
  },
  methods: {
    // bestQuliTime(index, qualiPhase) {
    //   if (qualiPhase === "Q1" && qualiResult[index].Q2 !== undefined && qualiResult[index].Q3 === undefined) {
    //     return qualiResult[index].Q1 < qualiResult[index].Q2 ? "green-text" : ""
    //   } else if (qualiPhase === "Q1" && qualiResult[index].Q2 === undefined && qualiResult[index].Q3 === undefined) {
    //     return "green-text"
    //   }

    //   if (qualiPhase === "Q2" && qualiResult[index].Q3 === undefined) {
    //     return qualiResult[index].Q2 < qualiResult[index].Q1 ? "green-text" : ""
    //   } else if (qualiPhase === "Q2" && qualiResult[index].Q3 !== undefined) {
    //     return qualiResult[index].Q2 < qualiResult[index].Q3 ? "green-text" : ""
    //   }

    //   if (qualiPhase === "Q3" ) {
    //     return qualiResult[index].Q3 < qualiResult[index].Q1 
    //     && qualiResult[index].Q3 < qualiResult[index].Q2 ? "green-text" : ""
    //   }
    // },
    qualiOne(index) {
      if (qualiResult[index].Q2 !== undefined && qualiResult[index].Q3 === undefined) {
        return qualiResult[index].Q1 < qualiResult[index].Q2 ? "green-text" : ""
      } else if (qualiResult[index].Q2 === undefined && qualiResult[index].Q3 === undefined) {
        return "green-text"
      }
    },
    qualiTwo(index) {
      if (qualiResult[index].Q3 === undefined) {
        return qualiResult[index].Q2 < qualiResult[index].Q1 ? "green-text" : ""
      } else if (qualiResult[index].Q3 !== undefined) {
        return qualiResult[index].Q2 < qualiResult[index].Q3 ? "green-text" : ""
      }

    },
    qualiThree(index) {
      return qualiResult[index].Q3 < qualiResult[index].Q1 && qualiResult[index].Q3 < qualiResult[index].Q2 ? "green-text" : ""
    }
  },
  mixins: [getColorMixin]
}
</script>

<style scoped>
  .qualification-session-headline-div {
    margin: 0.5em 0 2em;
  }

  .q1 {
    color: #d3d3d3;
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
  }

  .q2 {
    color: #c0c0c0;
    border-right: 1px solid #fff;
  }

  .q3 {
    color: #a9a9a9;
  }
</style>
