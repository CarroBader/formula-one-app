<template>
  <div>
    <b-card class="next-race-time-table-card-margin">
      <h5 class="next-race-time-table-title">Time Table</h5>
      <!-- <p style="font-size:0.9em;" class="red">27 August 2021 - 29 August 2021</p> -->
      <h5 class="next-race-time-table-date red">27 August - 29 August</h5>
      <b-row>
        <b-col class="
          next-race-time-table-col
          next-race-time-table-col-left"
        >
          <!-- Table One -->
          <table>
            <tbody>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-event">Practice 1</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-day">Fri</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-time">11:30-12:30</span>
              </td>
            </tbody>

            <tbody class="next-race-time-table-border">
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-event">Practice 2</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-day">Fri</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-time">11:30-12:30</span>
              </td>
            </tbody>

            <tbody>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-event">Practice 3</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-day">Sat</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-time">11:30-12:30</span>
              </td>
            </tbody>
          </table>

        </b-col>
        <b-col class="next-race-time-table-col">
          <!-- Table Two -->
          <table>
            <tbody class="next-race-time-table-border">
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-event">Qualifying</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-day">Sat</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-time">11:30-12:30</span>
              </td>
            </tbody>

            <tbody>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-event">Race</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-day">Sun</span>
              </td>
              <td class="next-race-time-table-td">
                <span class="next-race-time-table-time">11:30-12:30</span>
              </td>
            </tbody>
          </table>

        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>

export default {
  name: `NexRaceTimeTable`,
  props: {

  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style scoped>
  table {
    text-align: start;
  }

  tbody {
    border-bottom: none;
  }

  .next-race-time-table-col {
    display: flex;
    display:-webkit-flex;
    justify-content: center;
    align-items: baseline;
  }
</style>
