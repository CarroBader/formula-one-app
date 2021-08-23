<template>
  <div 
    v-if="allRacesDataLoaded">
    <h1>Upcoming Races</h1>
    <div
      class="main-div swiper-container-horizontal swiper-container-free-mode">
      <div       
        v-for="race, i in allRacesCurrentSeason"
        :key="race[i]"
        class="for-div">

        <article style="border:1px solid #fff">
          <img 
            :src="getFlagImage(race.Circuit.Location.country)"
            :alt='`${race.Circuit.Location.country}`'
            class="all-races-flag-img"
          />
          <h1> {{ race.Circuit.Location.country }} </h1>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import convertTimeMixin from '../mixins/convertTimeMixin'
import apiCallsMixin from '../mixins/apiCallsMixin'

export default {
  name: 'AllRaces',
  data() {
    return {
      getAllRaces: 'allRaces',
      allRacesDataLoaded: false,
      allRacesCurrentSeason: null
    }
  },
  async mounted() {
    // Returns all races of the current season
    let responseRace = await this.getRaces(this.getAllRaces);

    // When data is fetched this varible set to true and the component will show
    this.allRacesDataLoaded = responseRace.dataLoaded

    // Sets the varible to all races in the curren season
    this.allRacesCurrentSeason = responseRace.allRaces

    console.log("AllRaces - allRacesCurrentSeason", this.allRacesCurrentSeason)
    // this.convertTimeOfArray()
  },
  methods: {
    getFlagImage(country) {
    /*
      Returns the flag from the country sent as a param.
    */
      return require(`../assets/img/flags/${country}.png`)
    },
    convertTimeOfArray() {
    /*
      Converts the time of the race from f to ....
    */
      for(let i = 0; i < this.futureRaces.length; i++) {
        this.futureRaces[i].time = this.convertTime(this.futureRaces[i])
      }
    }
  },
  mixins: [apiCallsMixin, convertTimeMixin]
}
</script>

<style scoped>
.all-races-flag-img {
  height: 2em;
}

.main-div {
  /* display: -webkit-box; */
  overflow: hidden;
  position: relative;
}

.middle-div {
  transform: translate3d(-288.77px, 0px, 0px);
  height: 570px;
  overflow: hidden;
}

.for-div {
  border-right: solid 1px #38383f;
  border-bottom-right-radius: 20px;
  border-bottom: solid 1px #38383f;
  cursor: pointer;
  float: left;
  height: 530px;
  margin: 20px 0;
  overflow: visible;
  padding: 10px 0 0;
  -webkit-transition: width .4s ease-out;
}
</style>

