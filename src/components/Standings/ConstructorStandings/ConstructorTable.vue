<template>
  <div
    v-if="dataLoaded">
    <div class="leaders-div">
      <div
        v-for="topConstructors, i in constructorStandings.slice(0,3)"
        :key="topConstructors[i]"
        class="leader-div"
      >
        <img 
          :src='getConstructersPhoto(topConstructors.Constructor.constructorId)'
          class='leader-constructor-img'
        />
        <div class="leaders-info">
          <h3 class="leader-points">{{ topConstructors.points }}<span class="leader-points-span">pts</span></h3>
          <div class="leader-nationality">
            <img 
              :src="getFlagImage(topConstructors.Constructor.nationality)"
              :alt='`${topConstructors.Constructor.nationality}`'
              class="leader-country-flag-img"
            />
          </div>
          <h5 class="leader-name-team" :class="getColor(topConstructors.Constructor.constructorId)">{{ topConstructors.Constructor.name }}</h5>
        </div>
      </div>
    </div>
   <table>
    <tr>
        <th>Position</th>
        <th>Name</th>
        <th>Nationality</th>
        <th>Points</th>
    </tr>
      <tbody         
        v-for="constructor, i in constructorStandings.slice(3,10)"
        :key="constructor[i]"
      >
      <tr>
        <td class="red-text"> {{ constructor.position }} </td>
        <td> 
          {{ constructor.Constructor.name }}
        </td>
        <td>
          <img :src="getFlagImage(constructor.Constructor.nationality)"
          :alt='`${constructor.Constructor.nationality}`'
          class="country-flag-img"/>
        </td>
        <td> {{ constructor.points }} </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import getColorMixin from '../../../mixins/getColorMixin'
import getFlagMixin from '../../../mixins/getFlagMixin'
import apiCallsMixin from '../../../mixins/apiCallsMixin'

export default {
  name: 'ConstructorTable',
  data () {
    return {
      constructorStandings: null,
      dataLoaded: false
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
  border: 0.1px solid black;
}

.leader-constructor-img {
  height: 4.7em;
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

.leader-div {
  flex: 1;
  margin: 0 0.5em;
}

.leaders-div {
  display: flex;
  justify-content: space-between;
  margin: 2em 0;
}

.leader-nationality {
  margin-bottom: 0.3em;
}
</style>

