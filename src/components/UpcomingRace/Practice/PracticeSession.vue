<template>
  <div>
    <div class="noDataMessage" v-if="!practiceDataExists">
      <p>No practice have been completed yet.</p>
    </div>
    <b-card class="card-margin" v-if="practiceDataExists">
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
            v-for="(result, index) in this.practiceResult"
            :key="index"
            class="practice-session-tbody"
          >
            <td class="practice-session-td practice-session-position">
              {{ result.position }}
            </td>
            <td
              class="practice-session-td"
              :class="getConstructorColor(result.color_code)"
              :style="returnAltBySize(small, revert, none)"
            >
              {{ result.number }}
            </td>

            <td
              class="practice-session-td"
              :class="
                returnAltBySize(
                  small,
                  '',
                  getConstructorColor(result.color_code)
                )
              "
            >
              {{ result.first_name }} {{ result.last_name }}
            </td>

            <td class="practice-session-td practice-session-laps">
              {{ result.laps }}
            </td>
            <td class="practice-session-td practice-session-border-left">
              {{ result.time }}
            </td>
            <td
              class="practice-session-td practice-session-border-left"
              :class="returnAltBySize(small, 'medium-red', 'dark-grey')"
            >
              {{ result.gap }}
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
import generalVarsMixin from '../../../mixins/generalVarsMixin'

export default {
  name: 'PracticeSession',
  props: {
    practiceResult: Array,
    practiceDataExists: Boolean,
  },
  mixins: [getConstructorColorMixin, getWindowSizeMixin, generalVarsMixin],
}
</script>

<style lang="scss" scoped>
tbody {
  border-bottom: 1px solid #fff;
}

tbody:last-child {
  border-bottom: none;
}
</style>
