<template>
  <div>
    <b-card class="next-race-circuit-info-card-margin">
      <h5 class="next-race-circuit-info-name">{{ nextRace.Circuit.circuitName }}</h5>
      <h5 class="next-race-circuit-info-location extra-dark-grey">
        {{ nextRace.Circuit.Location.locality }},
        {{ nextRace.Circuit.Location.country }}</h5>
      <img
        :src="getImageMixin(imgFolder, nextRace.Circuit.circuitId)"
        :alt='`${nextRace.Circuit.circuitName}`'
        class="next-race-circuit-info-circuit-img"
      />
      <table>
        <tr>
          <th class="next-race-circuit-info-th">First Grand Prix:</th>
          <td class="next-race-circuit-info-td">1950</td>
        </tr>
        <tr>
          <th class="next-race-circuit-info-th">Length:</th>
          <td class="next-race-circuit-info-td">7.004 km</td>
        </tr>
        <tr>
          <th class="next-race-circuit-info-th">Laps:</th>
          <td class="next-race-circuit-info-td">44</td>
        </tr>
        <tr>
          <th class="next-race-circuit-info-th">Race Distance:</th>
          <td class="next-race-circuit-info-td">308.052 km</td>
        </tr>
        <tr>
          <th class="next-race-circuit-info-th">Turns:</th>
          <td class="next-race-circuit-info-td">19</td>
        </tr>
        <tr>
          <th class="next-race-circuit-info-th">Fastest Race Lap:</th>
          <td class="next-race-circuit-info-td">1:59:45</td>
        </tr>
        <tr>
          <th class="next-race-circuit-info-th">Fastest Lap:</th>
          <td class="next-race-circuit-info-td">1:57:45</td>
        </tr>
      </table>
    </b-card>
  </div>
</template>

<script>
import convertRaceTimeMixin from '../../../mixins/convertRaceTimeMixin.js'
import getImageMixin from '../../../mixins/getImageMixin.js'

const imgFolder = `circuits`

export default {
  name: `NextRaceCircuitInfo`,
  props: {
    nextRace: Object,
  },
  data() {
    return {
      imgFolder,
    }
  },
  mixins: [convertRaceTimeMixin, getImageMixin],
}
</script>

<style scoped>
  table {
    width: 100%;
  }

  th {
    /* dark-grey */
    color: #a9a9a9 !important;
  }

  tr:last-child {
    border: none;
  }
</style>
