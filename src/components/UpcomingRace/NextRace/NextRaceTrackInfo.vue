<template>
  <div
    class="next-race-track-info">
    <h1 class="red-text align-title next-gp-text"> Next GP:</h1>
    <h1 class="align-title" style="margin-left:2em"> {{ nextRace.raceName }}</h1>
    <img :src="getCircuitImage()"
    :alt='`${nextRace.Circuit.circuitName}`'
    class="circuit-img"/>
    <table>
      <tr>
        <th>Track:</th>
        <td>{{ nextRace.Circuit.circuitName }}</td>
      </tr>
      <tr>
        <th>Location:</th>
        <td>{{ nextRace.Circuit.Location.locality }}, {{ nextRace.Circuit.Location.country }}</td>
      </tr>
      <tr>
        <th>Date:</th>
        <td>{{ nextRace.date }}</td>
      </tr>
      <tr>
        <th>Time:</th>
        <td>{{ nextRace.time }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import convertTimeMixin from '../../../mixins/convertTimeMixin'

export default {
    name: 'NextRaceTrackInfo',
    props: {
      nextRace: Object
    },
    mounted() {
      this.nextRace.time = this.convertTime(this.nextRace.time)
    },
    methods: {
      getCircuitImage() {
        return require(`../../../assets/img/circuits/${this.nextRace.Circuit.circuitId}.png`)
      }
    },
    mixins: [convertTimeMixin]
}
</script>

<style scoped>

.next-race-track-info {
  margin: 1.5em 0;
}

.circuit-img {
  margin: 1em 0;
}

.align-title {
  text-align: initial;
}

th {
  text-align: initial;
  font-size: 0.9em;
}

td {
  text-align: end;
  width:100%;
}

tr {
  border-bottom: 1px solid #fff;
}

tr:nth-child(even) {
	color: #fff;
}

tr:nth-child(odd) {
	color: #ff1616;
}

.next-gp-text {
  font-size: 1.8em;
}

</style>
