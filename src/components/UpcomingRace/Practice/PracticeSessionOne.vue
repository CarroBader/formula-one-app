<template>
  <div>
    <b-card class="card-margin">
      <div class="scroll-table">
        <table>
          <tr class="practice-session-tr">
            <th class="browser-view">Position</th>
            <th class="mobile-view">Pos.</th>
            <th class="no-display-when-mobile">Number</th>
            <th>Name</th>
            <th>Laps</th>
            <th>Time</th>
            <th>Gap</th>
          </tr>
          <tbody
            v-for="pOne, index in this.practiceOne"
            :key="index"
            class="practice-session-tbody"
          >
          <td class="practice-session-td extra-dark-grey">{{ pOne.position }}</td>
          <td
            class="practice-session-td"
            :class="getConstructorColor(pOne.car)">{{ pOne.number }}</td>
          <td class="practice-session-td">{{ pOne.name }}</td>
          <td class="practice-session-td extra-dark-grey">{{ pOne.laps }}</td>
          <td class="practice-session-td practice-session-border-left light-grey">{{ pOne.time }}</td>
          <td class="practice-session-td practice-session-border-left dark-red">{{ pOne.gap }}<span v-if="pOne.gap !== ''" class="practice-session-second">s</span></td>
          <!-- <td
            class="practice-session-td mobile-view"
            :class="getConstructorColor(quali.Constructor.constructorId)"
          >
            {{ quali.Driver.givenName }} {{ quali.Driver.familyName }}
          </td> -->
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'

export default {
  name: `PracticeSessionOne`,
  props: {
    practiceOne: Array,
  },
  mixins: [getConstructorColorMixin],
}
</script>

<style scoped>
  tbody {
    border-bottom: 1px solid #fff;
  }

  tbody:last-child {
    border-bottom: none;
  }

  .practice-session-border-left {
    border-left: 1px solid #fff;
  }

  .practice-session-headline {
    background: linear-gradient(180deg, #3a3a3a 50%, #000 50%);
    border-radius: 8px;
    border: #ffffff7d 2px solid;
    display: inline;
    padding: 0 0.3em 0.3em 0.3em;
    font-size: 1.7em;
  }

  .practice-session-headline-div {
    margin: 0.5em 0 2em;
  }

  .practice-session-tr {
    font-size: 0.95em;
  }

  .practice-session-tbody {
    font-size: 0.95em;
  }

  .practice-session-td {
    padding: 1em 2.5em;
  }

  .practice-session-second {
    font-size: 0.8em;
  }
</style>
