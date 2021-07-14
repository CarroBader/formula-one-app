<template>
  <div>
    <h1 class="red-text align-title"> Next GP:</h1>
    <h1> {{ nextRace.raceName }}</h1>
    <img :src="getCircuitImage()"
    :alt='`${nextRace.Circuit.circuitName}`'
    class="circuit-img"/>
    <table>
      <tr>
        <th>Track:</th>
        <td>{{ nextRace.Circuit.circuitName }}</td>
      </tr>
      <tr>
        <th>Country:</th>
        <td>{{ nextRace.Circuit.Location.country }}</td>
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
import convertTimeMixin from '../mixins/convertTimeMixin'

export default {
    name: 'NextRace',
    props: {
        nextRace: Object
    },
    mounted() {
      this.nextRace.time = this.convertTime(this.nextRace)
    },
    methods: {
        getCircuitImage() {
            return require(`../assets/img/circuits/${this.nextRace.Circuit.circuitId}.png`)
        }
    },
    mixins: [convertTimeMixin]
}
</script>

<style scoped>

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

tr:nth-child(even) {
	color: #fff;
}

tr:nth-child(odd) {
	color: #ff1616;
}

</style>
