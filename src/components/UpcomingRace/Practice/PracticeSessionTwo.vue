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
            <th>Time</th>
            <th>Gap</th>
            <th>Laps</th>
          </tr>
          <tbody
            v-for="pTwo, index in this.practiceTwo"
            :key="index"
            class="practice-session-tbody"
          >
          <tr>
            <td class="practice-session-td extra-dark-grey">{{ pTwo.position }}</td>
            <td
              class="practice-session-td"
              :class="getConstructorColor(pTwo.car)">{{ pTwo.number }}</td>
            <td class="practice-session-td">{{ pTwo.name }}</td>
            <td class="practice-session-td light-grey lol">{{ pTwo.time }}</td>
            <td class="practice-session-td practice-session-border-left dark-red lal">{{ pTwo.gap }}<span v-if="pTwo.gap !== ''" class="practice-session-second">s</span></td>
            <td class="practice-session-td practice-session-border-left extra-dark-grey">{{ pTwo.laps }}</td>
            <!-- <td
              class="practice-session-td mobile-view"
              :class="getConstructorColor(quali.Constructor.constructorId)"
            >
              {{ quali.Driver.givenName }} {{ quali.Driver.familyName }}
            </td> -->
          </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin.js'

export default {
  name: `PracticeSessionTwo`,
  props: {
    practiceTwo: Array,
  },
  mixins: [getConstructorColorMixin],
}
</script>

<style scoped>
  .practice-session-border-left {
    border-left: 1px solid #fff;
  }

  tbody {
    border-bottom: 1px solid #fff;
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
