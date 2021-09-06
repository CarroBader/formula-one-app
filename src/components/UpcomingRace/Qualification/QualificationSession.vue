<template>
  <div>
    <div class="qualification-session-headline-div">
      <h1 class="qualification-session-headline">{{ this.nextRaceName }}</h1>
    </div>
    <b-card class="card-margin">
      <div class="scroll-table">
        <table>
          <tr class="qualifying-session-tr">
            <th>{{ returnAltBySize(small, positionLong, positionShort) }}</th>
            <th>Name</th>
            <th :style="returnAltBySize(small, revert, none)">Car</th>
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
          <td class="qualification-session-td extra-dark-grey">{{ quali.position }}</td>
          <td
            class="qualification-session-td"
            :class="returnAltBySize(small, '', getConstructorColor(quali.Constructor.constructorId))"
          >
            {{ quali.Driver.givenName }} {{ quali.Driver.familyName }}
          </td>
          <td
            class="qualification-session-td"
            :class="getConstructorColor(quali.Constructor.constructorId)"
            :style="returnAltBySize(small, revert, none)"
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
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'
import getWindowSizeMixin from '../../../mixins/getWindowSizeMixin'
import generalVars from '../../../mixins/generalVars'

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
  mixins: [getConstructorColorMixin, getWindowSizeMixin, generalVars],
}
</script>

<style scoped>
  tbody {
    border-bottom: 1px solid #fff;
  }

  tbody:last-child {
    border-bottom: none;
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
