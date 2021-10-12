<template>
  <div>
    <b-card>
      <h5 class="next-race-circuit-info-name">{{ nextGrandPrix.grand_prix_name }}</h5>
      <h5 class="next-race-circuit-info-location extra-dark-grey">Info</h5>
      <table>
        <tr>
          <th class="next-race-circuit-info-th">First held:</th>
          <td class="next-race-circuit-info-td">{{ nextGrandPrix.first_held }}</td>
        </tr>
        <tr>
          <th class="next-race-circuit-info-th">Number of times held:</th>
          <td class="next-race-circuit-info-td">{{ nextGrandPrix.times_held }}</td>
        </tr>
        <tr>
          <th class="next-race-circuit-info-th">Length:</th>
          <td class="next-race-circuit-info-td">{{ nextGrandPrix.length }} km</td>
        </tr>
        <tr>
          <th class="next-race-circuit-info-th">Laps:</th>
          <td class="next-race-circuit-info-td">{{ nextGrandPrix.laps }}</td>
        </tr>
        <tr>
          <th class="next-race-circuit-info-th">Most wins teams:</th>
          <td class="next-race-circuit-info-th"></td>
        </tr>
        <tr v-for="tWins in nextGrandPrix.most_wins_team" :key="tWins.team_id">
          <th class="next-race-circuit-info-th"></th>
          <td class="next-race-circuit-info-td">{{ tWins.wins }} - &ensp; <span :class="getConstructorColor(tWins.team_id)">{{ tWins.team_name }}</span></td>
        </tr>
        <tr> 
          <th class="next-race-circuit-info-th">Most wins drivers:</th>
          <td class="next-race-circuit-info-th"></td>
        </tr>
        <tr v-for="dWins, index in nextGrandPrix.most_wins_driver" :key="index">
          <th class="next-race-circuit-info-th"></th>
          <td class="next-race-circuit-info-td">{{ dWins.wins }} - &ensp; {{ dWins.driver_name }}</td>
        </tr>
      </table>
    </b-card>
  </div>
</template>

<script>
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'

export default {
  name: `NextRaceGrandPrixInfo`,
  props: {
    nextGrandPrix: Object,
  },
  data() {
    return {
    }
  },
  mixins: [getConstructorColorMixin],
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

  td {
    color: white !important;
  }
  
  tr:last-child {
    border: none;
  }

  tr:nth-child(even) {
    background: #121212;
  }
</style>
