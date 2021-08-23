<template>
  <div v-if="allRacesDataLoaded">
    <swiper :options="swiperOptions">
      <div
        v-for="race, index in allRacesCurrentSeason"
        :key="index"
        :id="race.round"
        v-on:click="expandDiv"
        class="swiper-slide"
      >
        <div class="race-div">
          <img
            :src="getFlagImage(race.Circuit.Location.country)"
            :alt='`${race.Circuit.Location.country}`'
            class="all-races-flag-img"
          />
          <div class="all-races-info">
            <h4>{{ race.Circuit.Location.country }}</h4>
            <h4>{{ race.raceName }} {{ race.season }}</h4>
            <h4>{{ race.date }}</h4>
            <h4>{{ race.time }}</h4>
          </div>
        </div>
      </div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

import convertRaceTimeMixin from '../mixins/convertRaceTimeMixin.js'
import apiCallsMixin from '../mixins/apiCallsMixin.js'

export default {
  name: 'AllRaces',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      getAllRaces: 'allRaces',
      allRacesCurrentSeason: null,
      allRacesDataLoaded: false,
      getNextRace: 'nextRace',
      nextRace: null,
      nextRaceDataLoaded: false,
      swiperOptions : {
        slidesPerView: "auto",
        initialSlide: 0,
        spaceBetween: 0,
        centeredSlides: true,
        centeredSlidesBounds: true,
        freeMode: true,
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  async created() {
    // Get all races of the current season
    let responseAllRaces = await this.getRaces(this.getAllRaces);

    // Get next race
    let responseNextRace = await this.getRaces(this.getNextRace);

    // Set value to other data properties
    this.allRacesCurrentSeason = responseAllRaces.allRaces
    this.swiperOptions.initialSlide = Number(responseNextRace.nextRace.round) - 1 // Subtract from round because it is one based numbering and not zero as the swiper

    // Set value for the dataloaded varibles (true)
    this.allRacesDataLoaded = responseAllRaces.dataLoaded
    this.nextRaceDataLoaded = responseNextRace.dataLoaded

    this.convertRaceTimeOfArray()
  },
  methods: {
    getFlagImage(country) {
    /*
      Returns the flag from the country sent as a param.
    */
      return require(`../assets/img/flags/${country}.png`)
    },
    convertRaceTimeOfArray() {
    /*
      Converts the time of the race from f to ....
    */
      this.allRacesCurrentSeason.map(race => {
        race.time = this.convertRaceTime(race.time)
      })
    },
    expandDiv(e) {
    /*
      Add expand-div-active on the chosen element. If it already exists on another element it will remove it.
    */
      let activeRaceDiv = document.querySelector(".expand-div-active")

      if (activeRaceDiv !== null) {
        activeRaceDiv.classList.remove('expand-div-active')
      }
      e.target.classList.add('expand-div-active')
    }
  },
  mixins: [apiCallsMixin, convertRaceTimeMixin]
}
</script>

<style scoped>
  .all-races-flag-img {
    height: 2em;
    pointer-events: none;
  }

  .all-races-info {
    pointer-events: none;
  }

  .race-div {
    border-right: solid 1px #38383f;
    border-bottom-right-radius: 20px;
    border-bottom: solid 1px #38383f;
  }

  .expand-div-active {
    background-color: aqua;
  }

  .swiper-slide {
    width: revert;
  }
</style>
