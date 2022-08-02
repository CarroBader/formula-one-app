<template>
  <div class="circuit-last-list-div">
    <b-card>
      <div class="circuit-last-list-title-div">
        <h1 class="circuit-last-list-title">{{ title }}</h1>
      </div>
      <div class="circuit-last-list-table-div">
        <table>
          <tbody v-for="(driver, index) in drivers" :key="index">
            <td class="circuit-last-list-td">
              <span class="circuit-last-list-year">{{ driver.year }}</span>
            </td>
            <td class="circuit-last-list-td">
              <span class="circuit-last-list-name">{{
                driver.driver_name
              }}</span>
            </td>
            <td class="circuit-last-list-td" v-if="driver.winner === 'true'">
              <span
                class="circuit-last-list-constructor"
                :class="getConstructorColor(driver.team_id)"
              >
                {{ driver.team_name }}
              </span>
            </td>
            <td v-else class="circuit-last-list-td">
              <span class="circuit-last-list-fastest-lap">
                {{ driver.time }}
              </span>
            </td>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'

export default {
  name: 'CircuitLastList',
  props: {
    title: String,
    drivers: Array,
  },
  mixins: [getConstructorColorMixin],
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
