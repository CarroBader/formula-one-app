<template>
  <b-card class="card-margin">
    <div class="scroll-table">
      <table>
        <tr class="practice-session-tr">
          <th>{{ returnAltBySize(small, positionLong, positionShort) }}</th>
          <th :style="returnAltBySize(small, revert, none)">Number</th>
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
          class="practice-session-td"
          :class="getConstructorColor(result.car)"
          :style="returnAltBySize(small, revert, none)"
        >
          {{ result.number }}
        </td>

        <td
        class="practice-session-td"
        :class="returnAltBySize(small, '', getConstructorColor(result.car))"
        >
          {{ result.name }}
        </td>

        <td class="practice-session-td extra-dark-grey">{{ result.laps }}</td>
        <td class="practice-session-td practice-session-border-left">{{ result.time }}</td>
        <td
          class="practice-session-td practice-session-border-left"
          :class="returnAltBySize(small, 'red', 'dark-grey')"
        >
          {{ result.gap }}<span v-if="result.gap !== ''" class="practice-session-seconds">s</span>
        </td>
        </tbody>
      </table>
    </div>
  </b-card>
</template>

<script>
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'
import getWindowSizeMixin from '../../../mixins/getWindowSizeMixin'
import generalVars from '../../../mixins/generalVars'

export default {
  name: `PracticeSession`,
  props: {
    practiceResult: Array,
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

  .practice-session-border-left {
    border-left: 1px solid #fff;
  }
</style>
