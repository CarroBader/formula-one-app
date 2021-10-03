<template>
  <div>
    <div class="qualifying-session-headline-div">
      <h1 class="qualifying-session-headline">{{ this.nextRaceName }}</h1>
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
            v-for="quali, index in this.qualifyingResults"
            :key="index"
            :class="[index == 9 || index == 14 ? 'elimination-line' : '']"
            class="qualifying-session-tbody"
          >
          <td class="qualifying-session-td extra-dark-grey">{{ quali.position }}</td>
          <td
            class="qualifying-session-td"
            :class="returnAltBySize(small, '', getConstructorColor(quali.team_id))"
          >
            {{ quali.driver_name }}
          </td>
          <td
            class="qualifying-session-td"
            :class="getConstructorColor(quali.team_id)"
            :style="returnAltBySize(small, revert, none)"
          >
            {{ quali.team_name }}
          </td>
          <td
            class="qualifying-session-td q1Time light-grey"
            :class="qualiOne(index)"
          >
            {{ quali.q1Time }}
          </td>
          <td
            class="qualifying-session-td q2Time medium-grey"
            :class="qualiTwo(index)"
          >
            {{ quali.q2Time }}
          </td>
          <td
            class="qualifying-session-td dark-grey"
            :class="qualiThree(index)"
          >
            {{ quali.q3Time }}
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
  name: `QualifyingSession`,
  props: {
    qualifyingResults: Array,
    nextRaceName: String,
  },
  methods: {
    qualiOne(index) {
    /*
      Checks if q1Time contains a drivers fastest time.
      Returns a class that matches the result.
    */
      if ((this.qualifyingResults[index].q2Time === undefined || this.qualifyingResults[index].q2Time.length === 0) && this.qualifyingResults[index].q3Time === undefined) {
        return `green`
      }

      if (this.qualifyingResults[index].q2Time !== undefined && this.qualifyingResults[index].q3Time === undefined) {
        return this.qualifyingResults[index].q1Time < this.qualifyingResults[index].q2Time ? `green` : ``
      }
    },
    qualiTwo(index) {
    /*
      Checks if q2Time contains a drivers fastest time.
      Returns a class that matches the result.
    */
      if (this.qualifyingResults[index].q3Time === undefined) {
        return this.qualifyingResults[index].q2Time < this.qualifyingResults[index].q1Time ? `green` : ``
      }

      if (this.qualifyingResults[index].q3Time !== undefined) {
        return this.qualifyingResults[index].q2Time < this.qualifyingResults[index].q3Time ? `green` : ``
      }
    },
    qualiThree(index) {
    /*
      Checks if q3Time contains a drivers fastest time.
      Returns a class that matches the result.
    */
      return this.qualifyingResults[index].q3Time < this.qualifyingResults[index].q1Time && this.qualifyingResults[index].q3Time < this.qualifyingResults[index].q2Time ? `green` : ``
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

  .qualifying-session-headline-div {
    margin: 0.5em 0 2em;
  }

  .q1Time {
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
  }

  .q2Time {
    border-right: 1px solid #fff;
  }
</style>
