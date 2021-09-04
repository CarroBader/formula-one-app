<template>
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
          v-for="result, index in this.practiceResult"
          :key="index"
          class="practice-session-tbody"
        >
        <td class="practice-session-td extra-dark-grey">{{ result.position }}</td>
        <td
          class="practice-session-td no-display-when-mobile"
          :class="getConstructorColor(result.car)">{{ result.number }}
        </td>

        <td class="practice-session-td browser-view">{{ result.name }}</td>
        <td class="practice-session-td mobile-view"
            :class="getConstructorColor(result.car)">{{ result.name }}
        </td>

        <td class="practice-session-td extra-dark-grey">{{ result.laps }}</td>
        <td class="practice-session-td practice-session-border-left">{{ result.time }}</td>
        <td class="practice-session-td practice-session-border-left browser-view red">{{ result.gap }}<span v-if="result.gap !== ''" class="practice-session-seconds">s</span></td>
        <td class="practice-session-td practice-session-border-left mobile-view dark-grey">{{ result.gap }}<span v-if="result.gap !== ''" class="practice-session-seconds">s</span></td>
        </tbody>
      </table>
    </div>
  </b-card>
</template>

<script>
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'

export default {
  name: `PracticeSession`,
  props: {
    practiceResult: Array,
  },
  mounted() {
    console.log(this.practiceResult)
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
</style>
