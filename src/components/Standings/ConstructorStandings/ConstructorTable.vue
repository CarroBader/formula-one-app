<template>
  <div
    v-if="dataLoaded">
    <b-card class="card-margin">
      <div class="leaders-div">
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
          <td class="darkgrey-text"> {{ constructor.position }} </td>
          <td :class="getColor(constructor.Constructor.constructorId)"> {{ constructor.Constructor.name }}</td>
          <td>
            <img :src="getFlagImage(constructor.Constructor.nationality)"
            :alt='`${constructor.Constructor.nationality}`'
            class="country-flag-img"/>
          </td>
          <td> {{ constructor.points }} </td>
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

  .leader-div {
    flex: 1;
    margin: 0 0.5em;
  }

  .country-flag-img {
    height: 1em;
    width: 1.6em;
  }
</style>
