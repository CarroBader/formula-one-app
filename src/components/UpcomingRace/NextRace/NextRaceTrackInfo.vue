<template>
  <div class="next-race-track-info">
    <b-card class="card-margin">
      <img
        :src="getCircuitImage()"
        :alt='`${nextRace.Circuit.circuitName}`'
        class="next-race-track-info-circuit-img"
      />
      <table>
        <tr>
          <th class="next-race-track-info-th">Track:</th>
          <td class="next-race-track-info-td">{{ nextRace.Circuit.circuitName }}</td>
        </tr>
        <tr>
          <th class="next-race-track-info-th">Location:</th>
          <td class="next-race-track-info-td">
            {{ nextRace.Circuit.Location.locality }}, 
            {{ nextRace.Circuit.Location.country }}
          </td>
        </tr>
        <tr>
          <th class="next-race-track-info-th">Date:</th>
          <td class="next-race-track-info-td">{{ nextRace.date }}</td>
        </tr>
        <tr>
          <th class="next-race-track-info-th">Time:</th>
          <td class="next-race-track-info-td">{{ convertRaceTime(nextRace.time) }}</td>
        </tr>
      </table>
    </b-card>
  </div>
</template>

<script>
import convertRaceTimeMixin from '../../../mixins/convertRaceTimeMixin.js'

export default {
  name: 'NextRaceTrackInfo',
  props: {
    nextRace: Object
  },
  methods: {
    getCircuitImage() {
    /*
      Get circuit img.
    */
      return require(`../../../assets/img/circuits/${this.nextRace.Circuit.circuitId}.png`)
    }
  },
  mixins: [convertRaceTimeMixin]
}
</script>

<style scoped>
  .next-race-track-info {
    margin: 1.5em 0;
  }

  th {
    text-align: initial;
  }

  td {
    text-align: end;
    width: 100%;
  }

  tr:last-child {
    border: none;
  }
</style>
