<template>
  <div v-if="driverStandingsDataLoaded">
    <div class="driver-table-headline-div">
      <h1 class="driver-table-headline">2021 World Championship</h1>
    </div>
    <b-card class="card-margin">
      <!-- Drivers placed 1-3 -->
      <div class="leader-driver-div">
        <div
          v-for="topDriver, index in driverStandings.slice(0,3)"
          :key="index"
          :class="divsTopThree[index]"
          class="leader-div"
        >
          <div class="parent">
            <img
              :src='getDriverPhoto(topDriver.Driver.code)'
              class='leader-driver-img'
            />
            <img
              :src="getCountryName(topDriver.Driver.nationality)"
              :alt='`${topDriver.Driver.nationality}`'
              class="leader-driver-flag-img"
            />
          </div>
          <div class="leader-driver-info">
            <h3 class="leader-driver-points">{{ topDriver.points }} pts</h3>
            <h5 class="leader-driver-name-team leader-driver-name">
              {{ topDriver.Driver.givenName }} 
              {{ topDriver.Driver.familyName }}
            </h5>
            <h6
              class="leader-driver-name-team"
              :class="getConstructorColor(topDriver.Constructors[0].constructorId)"
            >
              {{ topDriver.Constructors[0].name }}
            </h6>
          </div>
        </div>
      </div>
      <!-- Drivers placed 4-20 -->
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
            v-for="driver, index in driverStandings.slice(3,20)"
            :key="index"
            class="driver-table-tbody"
          >
            <tr>
              <td class="driver-table-td extra-dark-grey">{{ driver.position }}</td>
              <td class="driver-table-td">{{ driver.Driver.givenName }} {{ driver.Driver.familyName }}</td>
              <td class="driver-table-td">
                <img
                  :src="getCountryName(driver.Driver.nationality)"
                  :alt='`${driver.Driver.nationality}`'
                  class="driver-table-flag-img"
                />
              </td>
              <td
                class="driver-table-td"
                :class="getConstructorColor(driver.Constructors[0].constructorId)"
              >
                {{ driver.Constructors[0].name }}
              </td>
              <td class="driver-table-td">{{ driver.points }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import apiCallsMixin from '../../../mixins/apiCallsMixin.js'
import getCountryFlagMixin from '../../../mixins/getCountryFlagMixin.js'
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin.js'

const divsTopThree = ["first", "second", "third"]

export default {
  name: 'DriverTable',
  data() {
    return {
      driverStandings: null,
      driverStandingsDataLoaded: false,
      divsTopThree: divsTopThree
    }
  },
  async created() {
    // Get current driver standings
    let responseDriverStandings = await this.getDriverStandings()

    // Set value on data properties
    this.driverStandings = responseDriverStandings.standingsDriver

    // Set dataloaded variable(s) to true
    this.driverStandingsDataLoaded = responseDriverStandings.dataLoaded
  },
  methods: {
    getDriverPhoto(driver) {
    /*
      Return driver photo.
    */
      return require(`../../../assets/img/drivers/${driver}.png`)
    }
  },
  mixins: [apiCallsMixin, getCountryFlagMixin, getConstructorColorMixin]
}
</script>

<style scoped>
  table {
    width: 100%;
  }

  .driver-table-headline-div {
    margin: 0.5em 0 2em;
  }

  .leader-driver-div {
    display: flex;
    justify-content: space-between;
  }

  .leader-driver-div> .first {order: 2; }
  .leader-driver-div > .second {order: 1; }
  .leader-driver-div > .third {order: 3; }

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
