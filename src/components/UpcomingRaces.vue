<template>
  <div style="margin-bottom: 4em;">
    <h1 class="coming-races-title">Upcoming Races</h1>
    <!-- <table>
      <tbody
        v-for="race, i in futureRaces.slice(0, 5)"
        :key="race[i]">
      <tr class="align-title">
        <td> <span class="race-name red-text">{{ race.raceName }}</span> 
        - {{ race.Circuit.Location.country }}
        <img :src="getFlagImage(race.Circuit.Location.country)" 
        :alt='`${race.Circuit.Location.country}`' 
        class="country-flag-img"/>
        </td>
      </tr>
      <tr>
        <th>Track:</th>
        <td> {{ race.Circuit.circuitName }}</td>
      </tr>
      <tr>
          <th>Date:</th>
          <td> {{ race.date }}</td>
      </tr>
      <tr>
          <th class="red-text">Time:</th>
          <td class="red-text"> {{ race.time }}</td>
      </tr>
      <br>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import convertTimeMixin from '../mixins/convertTimeMixin'
import apiCallsMixin from '../mixins/apiCallsMixin'

export default {
  name: 'UpcomingRaces',
  props: {
      futureRaces: Array
  },
  async mounted() {
    let hej = await this.getRaces(allRaces);
    console.log("Carro", hej)
    // this.convertTimeOfArray()
  },
  methods: {
    getFlagImage(country) {
      return require(`../assets/img/flags/${country}.png`)
    },
    convertTimeOfArray() {
      for(let i = 0; i < this.futureRaces.length; i++) {
        this.futureRaces[i].time = this.convertTime(this.futureRaces[i])
      }
    }
  },
  mixins: [apiCallsMixin, convertTimeMixin]
}
</script>

<style scoped>

</style>

