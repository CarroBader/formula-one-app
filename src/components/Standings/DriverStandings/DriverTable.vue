<template>
  <div
    v-if="dataLoaded">
    <b-card class="card-margin">
      <div class="leaders-div">
        <div
          v-for="topDrivers, i in driverStandings.slice(0,3)"
          :key="topDrivers[i]"
          :class="divsTopThree[i]"
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
            <!-- <h3 class="leader-points">{{ topDrivers.points }}<span class="leader-points-span">pts</span></h3> -->
            <h3 class="leader-points">{{ topDrivers.points }} pts</h3>
            <h5 class="leader-name-team leader-name">{{ topDrivers.Driver.givenName }} {{ topDrivers.Driver.familyName }} </h5>
            <h6 class="leader-name-team" :class="getColor(topDrivers.Constructors[0].constructorId)">{{ topDrivers.Constructors[0].name }}</h6>
          </div>
        </div>
      </div>
      <table>
      <tr class="driver-table-tr">
          <th>Position</th>
          <th>Name</th>
          <th class="nationality-table-mobile">Nationality</th>
          <th>Car</th>
          <th>Points</th>
      </tr>
        <tbody         
          v-for="driver, i in driverStandings.slice(3,20)"
          :key="driver[i]"
          class="driver-table-tbody">
        <tr>
          <td class="red-text"> {{ driver.position }} </td>
          <td> 
            {{ driver.Driver.givenName }} {{ driver.Driver.familyName }} 
          </td>
          <td class="nationality-table-mobile">
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
    </b-card>
  </div>
</template>

<script>
import getColorMixin from '../../../mixins/getColorMixin'
import getFlagMixin from '../../../mixins/getFlagMixin'
import apiCallsMixin from '../../../mixins/apiCallsMixin'

const divsTopThree = ["first", "second", "third"]

export default {
  name: 'DriverTable',
  data () {
    return {
      driverStandings: null,
      dataLoaded: false,
      divsTopThree: divsTopThree
    }
  },
  async mounted() {
    let responseDriverStandings = await this.getDriverStandings()

    this.driverStandings = responseDriverStandings.standingsDriver
    this.dataLoaded = responseDriverStandings.dataLoaded
  },
  methods: {
    getFlagImage(nationality) {
      let countryFlag = this.getFlag(nationality)
      return require(`../../../assets/img/flags/${countryFlag}.png`)
    },
    getDriverPhoto(driver) {
      return require(`../../../assets/img/drivers/${driver}.png`)
    }
  },
  mixins: [apiCallsMixin, getColorMixin, getFlagMixin]
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

.leader-country-flag-img {
  position: absolute;
  top: 0;
  left: 0;
}

/* .leader-driver-img {
  height: 10em;
  position: relative;
  top: 0;
  left: 0;
} */

/* .leaders-info {
  background-color: #ff1616;
  border-top: 5px solid #fff;
  border-radius: 0 0 15px 15px;
  padding: 0.2em;
} */

/* .leader-points-span {
  font-size: medium;
} */

/* LÄGG PÅ DENNA SEN */
/* .leader-points {
  -webkit-text-stroke-width: 0.9px;
  -webkit-text-stroke-color: black;
} */

/* .leader-name-team {
  background-color: black;
  padding: 0.2em;
  border-radius: 0 15px;
  -webkit-text-stroke-width: 0.9px;
  -webkit-text-stroke-color: black;
  border: 1px solid #fff;
} */

.leaders-div {
  display: flex;
  justify-content: space-between;
  margin: 0 0 2em 0;
}

.leaders-div > .first {order: 2; }
.leaders-div > .second {order: 1; }
.leaders-div > .third {order: 3; }

.second {
  margin: 2em 0.5em 0 0.5em !important;
}

.third {
  margin: 3em 0.5em 0 0.5em !important;
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
