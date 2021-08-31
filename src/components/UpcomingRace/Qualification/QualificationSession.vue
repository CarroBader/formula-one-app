<template>
  <div>
    <div class="qualification-session-headline-div">
      <h1 class="qualification-session-headline">{{ this.nextRaceName }}</h1>
    </div>
    <b-card class="card-margin">
      <div class="scroll-table">
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
            v-for="quali, index in this.qualificationResult"
            :key="index"
            :class="[index == 9 || index == 14 ? 'elimination-line' : '']"
            class="qualifying-session-tbody"
          >
          <tr>
            <td class="qualification-session-td extra-dark-grey">{{ quali.position }}</td>
            <td class="qualification-session-td browser-view">{{ quali.Driver.givenName }} {{ quali.Driver.familyName }}</td>
            <td
              class="qualification-session-td mobile-view"
              :class="getConstructorColor(quali.Constructor.constructorId)"
            >
              {{ quali.Driver.givenName }} {{ quali.Driver.familyName }}
            </td>
            <td
              class="qualification-session-td no-display-when-mobile"
              :class="getConstructorColor(quali.Constructor.constructorId)"
            >
              {{ quali.Constructor.name }}
            </td>
            <td
              class="qualification-session-td q1 light-grey"
              :class="qualiOne(index)"
            >
              {{ quali.Q1 }}
            </td>
            <td
              class="qualification-session-td q2 medium-grey"
              :class="qualiTwo(index)"
            >
              {{ quali.Q2 }}
            </td>
            <td
              class="qualification-session-td dark-grey"
              :class="qualiThree(index)"
            >
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
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'

export default {
  name: `QualificationSession`,
  props: {
    qualificationResult: Array,
    nextRaceName: String,
  },
  methods: {
    qualiOne(index) {
    /*
      Checks if Q1 contains a drivers fastest time.
      Returns a class that matches the result.
    */
      if (this.qualificationResult[index].Q2 !== undefined && this.qualificationResult[index].Q3 === undefined) {
        return this.qualificationResult[index].Q1 < this.qualificationResult[index].Q2 ? `green` : ``
      } if (this.qualificationResult[index].Q2 === undefined && this.qualificationResult[index].Q3 === undefined) {
        return `green`
      }
    },
    qualiTwo(index) {
    /*
      Checks if Q2 contains a drivers fastest time.
      Returns a class that matches the result.
    */
      if (this.qualificationResult[index].Q3 === undefined) {
        return this.qualificationResult[index].Q2 < this.qualificationResult[index].Q1 ? `green` : ``
      } if (this.qualificationResult[index].Q3 !== undefined) {
        return this.qualificationResult[index].Q2 < this.qualificationResult[index].Q3 ? `green` : ``
      }
    },
    qualiThree(index) {
    /*
      Checks if Q3 contains a drivers fastest time.
      Returns a class that matches the result.
    */
      return this.qualificationResult[index].Q3 < this.qualificationResult[index].Q1 && this.qualificationResult[index].Q3 < this.qualificationResult[index].Q2 ? `green` : ``
    },
  },
  mixins: [getConstructorColorMixin],
}
</script>

<style scoped>
  tbody {
    border-bottom: 1px solid #fff;
  }

  .qualification-session-headline-div {
    margin: 0.5em 0 2em;
  }

  .q1 {
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
  }

  .q2 {
    border-right: 1px solid #fff;
  }
</style>
