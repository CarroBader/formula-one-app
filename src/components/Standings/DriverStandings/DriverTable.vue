<template>
  <div
    v-if="dataLoaded">
    <div class="driver-table-headline-div">
      <h1 class="driver-table-headline">2021 Standings</h1>
    </div>
    <b-card class="card-margin">
      <div class="leaders-div">
        <div
          v-for="topDrivers, i in driverStandings.slice(0,3)"
          :key="topDrivers[i]"
          :class="divsTopThree[i]"
          class="leader-div">
          <div class="parent">
            <img 
              :src='getDriverPhoto(topDrivers.Driver.code)'
              class='leader-driver-img'
            />
            <img 
              :src="getFlagImage(topDrivers.Driver.nationality)"
              :alt='`${topDrivers.Driver.nationality}`'
              class="leader-driver-flag-img"
            />
          </div>
          <div class="leader-driver-info">
            <h3 class="leader-driver-points">{{ topDrivers.points }} pts</h3>
            <h5 class="leader-driver-name-team leader-driver-name">{{ topDrivers.Driver.givenName }} {{ topDrivers.Driver.familyName }} </h5>
            <h6 class="leader-driver-name-team" :class="getColor(topDrivers.Constructors[0].constructorId)">{{ topDrivers.Constructors[0].name }}</h6>
          </div>
        </div>
      </div>
      <div class="scroll-table">
        <table>
        <tr class="driver-table-tr">
          <th class="browser-view">Position</th>
          <th class="mobile-view">Pos.</th>
          <th>Name</th>
          <th>Nationality</th>
          <th>Car</th>
          <th class="browser-view">Points</th>
          <th class="mobile-view">Pts.</th>
        </tr>
          <tbody         
            v-for="driver, i in driverStandings.slice(3,20)"
            :key="driver[i]"
            class="driver-table-tbody">
          <tr>
            <td class="driver-table-td darkgrey-text"> {{ driver.position }} </td>
            <td class="driver-table-td"> {{ driver.Driver.givenName }} {{ driver.Driver.familyName }} </td>
            <td class="driver-table-td">
              <img :src="getFlagImage(driver.Driver.nationality)"
              :alt='`${driver.Driver.nationality}`'
              class="driver-table-flag-img "/>
            </td>
            <td
              class="driver-table-td"
              :class="getColor(driver.Constructors[0].constructorId)"> 
              {{ driver.Constructors[0].name }}
            </td>
            <td class="driver-table-td"> {{ driver.points }} </td>
          </tr>
          </tbody>
        </table>
      </div>
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
    console.log("Carro", this.driverStandings)
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

  .driver-table-headline-div {
    margin: 0.5em 0 2em;
  }

  .leaders-div {
    display: flex;
    justify-content: space-between;
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

  .leader-div {
    flex: 1;
    margin: 0 0.5em;
  }

  .parent {
    position: relative;
    top: 0;
    left: 0;
  }

  .leader-driver-flag-img {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
