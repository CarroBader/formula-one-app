<template>
  <div>
    <h1>Drivers</h1>
    <div class="leaders-div">
      <div
        v-for="topDrivers, i in driverStandings.slice(0,3)"
        :key="topDrivers[i]"
        class="leader-div"
      >
        <div class="parent">
          <img 
            :src='getDriverPhoto(topDrivers.Driver.code)'
            class='leader-driver-img'
          />
          <img 
            :src="getFlagImage(topDrivers.Driver.nationality)"
            :alt='`${topDrivers.Driver.nationality}`'
            class="leader-country-flag-img"
          />
        </div>
        <div class="leaders-info">
          <h3 class="leader-points">{{ topDrivers.points }}<span class="leader-points-span">pts</span></h3>
          <h5 class="leader-name-team">{{ topDrivers.Driver.givenName }} {{ topDrivers.Driver.familyName }} </h5>
          <h6 class="leader-name-team" :class="getColor(topDrivers.Constructors[0].constructorId)">{{ topDrivers.Constructors[0].name }}</h6>
        </div>
      </div>
    </div>
   <table>
    <tr>
        <th>Position</th>
        <th>Name</th>
        <th>Nationality</th>
        <th>Car</th>
        <th>Points</th>
    </tr>
      <tbody         
        v-for="driver, i in driverStandings.slice(3,20)"
        :key="driver[i]"
      >
      <tr>
        <td class="red-text"> {{ driver.position }} </td>
        <td> 
          {{ driver.Driver.givenName }} {{ driver.Driver.familyName }} 
        </td>
        <td>
          <img :src="getFlagImage(driver.Driver.nationality)"
          :alt='`${driver.Driver.nationality}`'
          class="country-flag-img"/>
        </td>
        <td
          :class="getColor(driver.Constructors[0].constructorId)"> 
          {{ driver.Constructors[0].name }}
        </td>
        <td> {{ driver.points }} </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import getColorMixin from '../mixins/getColorMixin'
import getFlagMixin from '../mixins/getFlagMixin'

export default {
  name: 'DriverStandings',
  props: {
    driverStandings: Array
  },
  data () {
  return {
    }
  },
  mounted() {
    console.log("driverStandings", this.driverStandings)
  },
  methods: {
    getFlagImage(nationality) {
      let countryFlag = this.getFlag(nationality)
      return require(`../assets/img/flags/${countryFlag}.png`)
    },
    getDriverPhoto(driver) {
      return require(`../assets/img/drivers/${driver}.png`)
    }
  },
  mixins: [getColorMixin, getFlagMixin]
}
</script>

<style scoped>
table {
  width: 100%;
}

th {
  font-size: 0.9em;
  color: #fff;
}

td {
  color: #fff;
}

.country-flag-img {
  height: 1em;
  width: 1.6em;
}

.driver-img {
  height: 10em;
}

.leader-country-flag-img {
  height: 1.5em;
  width: 2.5em;
  position: absolute;
  top: 0;
  left: 0;
}

.leader-driver-img {
  height: 10em;
  position: relative;
  top: 0;
  left: 0;
}

.leaders-info {
  background-color: #ff1616;
  border-top: 5px solid #fff;
  border-radius: 0 0 15px 15px;
  padding: 0.2em;
}

.leader-points-span {
  font-size: medium;
}

.leader-points {
  -webkit-text-stroke-width: 0.9px;
  -webkit-text-stroke-color: black;
}

.leader-name-team {
  background-color: black;
  padding: 0.2em;
  border-radius: 0 15px;
  -webkit-text-stroke-width: 0.9px;
  -webkit-text-stroke-color: black;
  border: 1px solid #fff;
}

.leaders-div {
  display: flex;
  justify-content: space-between;
  margin: 2em 0;
}

.parent {
  position: relative;
  top: 0;
  left: 0;
}

.leader-div {
  flex: 1;
  margin: 0 0.5em;
}
</style>

