<template>
  <div
    class="circuit-last-list-div">
    <b-card class="circuit-last-list-card-margin">
      <h1 class="circuit-last-list-title">{{ this.title }}</h1>
      <div class="circuit-last-list-table-div">
        <table>
          <tbody
             v-for="driver, index in this.drivers"
             :key="index"
          >
            <td class="circuit-last-list-td">
              <span class="circuit-last-list-year extra-dark-grey">{{ driver.year }}</span>
            </td>
            <td class="circuit-last-list-td">
              <span class="circuit-last-list-name">{{ driver.name }}</span>
            </td>
            <td class="circuit-last-list-td"
              v-if="driver.winners">
              <span
                class="circuit-last-list-constructor"
                :class="getConstructorColor(driver.colorCode)"
              >
                {{ driver.constructor }}
              </span>
            </td>
            <td
              v-else
              class="circuit-last-list-td dark-grey">
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
  name: `CircuitLastList`,
  props: {
    title: String,
    drivers: Array,
  },
  mixins: [getConstructorColorMixin],
}
</script>

<style scoped>
  tbody {
    border-bottom: 1px solid #fff;
  }
</style>
