<template>
  <div
    v-if="dataLoaded">
    <div class="constructor-table-headline-div">
      <h1 class="constructor-table-headline">2021 Constructor Championship</h1>
    </div>
    <b-card class="card-margin">
      <div class="leader-constructor-div">
        <div
          v-for="topConstructors, i in constructorStandings.slice(0,3)"
          :key="topConstructors[i]"
          :class="divsTopThree[i]"
          class="leader-div">
          <img 
            :src='getConstructersPhoto(topConstructors.Constructor.constructorId)'
            class='leader-constructor-img'
          />
          <div class="leaders-constructor-info">
            <h3 class="leader-constructor-points">{{ topConstructors.points }} pts</h3>
            <div>
              <img 
                :src="getFlagImage(topConstructors.Constructor.nationality)"
                :alt='`${topConstructors.Constructor.nationality}`'
                class="leader-constructor-flag-img"
              />
            </div>
            <h5 class="leader-constructor-name-team" :class="getColor(topConstructors.Constructor.constructorId)">{{ topConstructors.Constructor.name }}</h5>
          </div>
        </div>
      </div>
    <table>
      <tr class="constructor-table-tr">
          <th>Position</th>
          <th>Name</th>
          <th>Nationality</th>
          <th>Points</th>
      </tr>
        <tbody         
          v-for="constructor, i in constructorStandings.slice(3,10)"
          :key="constructor[i]"
          class="constructor-table-tbody">
        <tr>
          <td class="constructor-table-td darkgrey-text"> {{ constructor.position }} </td>
          <td class="constructor-table-td"
              :class="getColor(constructor.Constructor.constructorId)"> {{ constructor.Constructor.name }}
          </td>
          <td>
            <img 
              :src="getFlagImage(constructor.Constructor.nationality)"
              :alt='`${constructor.Constructor.nationality}`'
              class="constructor-table-td constructor-table-flag-img"
            />
          </td>
          <td lass="constructor-table-td"> {{ constructor.points }} </td>
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
  name: 'ConstructorTable',
  data () {
    return {
      constructorStandings: null,
      dataLoaded: false,
      divsTopThree: divsTopThree
    }
  },
  async mounted() {
    let responseConstructorStandings = await this.getConstructorStandings()
    this.constructorStandings = responseConstructorStandings.standingsConstructor
    this.dataLoaded = responseConstructorStandings.dataLoaded
  },
  methods: {
    getFlagImage(nationality) {
      let countryFlag = this.getFlag(nationality)
      return require(`../../../assets/img/flags/${countryFlag}.png`)
    },
    getConstructersPhoto(constructor) {
      return require(`../../../assets/img/constructers/${constructor}.png`)
    }
  },
  mixins: [apiCallsMixin, getColorMixin, getFlagMixin]
}
</script>

<style scoped>
  table {
    width: 100%;
  }

  .constructor-table-headline-div {
    margin: 0.5em 0 2em;
  }

  .leader-constructor-div {
    display: flex;
    justify-content: space-between;
  }

  .leader-constructor-div > .first {order: 2; }
  .leader-constructor-div > .second {order: 1; }
  .leader-constructor-div > .third {order: 3; }

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
</style>
