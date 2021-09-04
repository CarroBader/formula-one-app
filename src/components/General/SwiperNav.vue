<template>
  <swiper
    :options="swiperOptions"
    v-if="allRacesDataLoaded"
    class="swiper-nav">
    <swiper-slide
      v-for="race, index in allRacesCurrentSeason"
      :key="index"
    >
      <div
        class="swiper-nav-div"
        v-on:click="activeRace"
        :class="race.round - 1 === swiperOptions.initialSlide ? 'active-race' : ''"
      >
        <img
          :src="getFlag(race.Circuit.Location.country)"
          :alt='`${race.Circuit.Location.country}`'
          class="swiper-nav-flag-img"
        />
        <div class="swiper-nav-info">
          <h4 class="swiper-nav-info-text"> {{ race.dayNumber }} {{ race.monthName }}</h4>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import apiCallsMixin from '../../mixins/apiCallsMixin'
import getCountryFlagMixin from '../../mixins/getCountryFlagMixin'
import convertRaceTimeMixin from '../../mixins/convertRaceTimeMixin'

export default {
  name: `SwiperNav`,
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      getAllRaces: `allRaces`,
      allRacesCurrentSeason: null,
      allRacesDataLoaded: false,
      getNextRace: `nextRace`,
      nextRace: null,
      raceRound: null,
      swiperOptions: {
        slidesPerView: `auto`,
        initialSlide: 0,
        spaceBetween: 0,
        centeredSlides: true,
        centeredSlidesBounds: true,
        freeMode: true,
        loop: false,
        navigation: {
          nextEswiperl: `.swiper-button-next`,
          prevEl: `.swiper-button-prev`,
        },
      },
    }
  },
  async created() {
    console.log(`created`)
    // Get all races of the current season
    const responseAllRaces = await this.getRaces(this.getAllRaces)

    // Get next race
    const responseNextRace = await this.getRaces(this.getNextRace)

    // Set value to other data properties
    this.allRacesCurrentSeason = responseAllRaces.allRaces
    this.raceRound = responseNextRace.nextRace.round
    this.swiperOptions.initialSlide = Number(this.raceRound) - 1 // Subtract from round because it is one based numbering and not zero as the swiper

    this.getNameOfMonth()

    // Set value for the dataloaded varibles (true)
    this.allRacesDataLoaded = responseAllRaces.dataLoaded
  },
  methods: {
    getNameOfMonth() {
      this.allRacesCurrentSeason.forEach((race) => {
        const date = new Date(race.date)
        const month = date.toLocaleString(`default`, { month: `short` })

        const day = date.getDate()

        race.monthName = month
        race.dayNumber = day

        // https://stackoverflow.com/questions/1643320/get-month-name-from-date/18648314#18648314
      })
    },
    activeRace(e) {
    /*
      Add active-race on the chosen element. If it already exists on another element it will remove it.
    */
      const activeRaceDiv = document.querySelector(`.active-race`)

      if (activeRaceDiv !== null) {
        activeRaceDiv.classList.remove(`active-race`)
      }
      e.target.classList.add(`active-race`)
    },
  },
  mixins: [apiCallsMixin, getCountryFlagMixin, convertRaceTimeMixin],
}
</script>

<style scoped>
  .swiper-nav {
    overflow-x: hidden;
  }

  .swiper-nav-div {
    display: table;
  }

  .swiper-nav-flag-img {
    pointer-events: none;
    margin: 0.5em 0;
  }

  .swiper-nav-info {
    pointer-events: none;
  }

  .active-race {
    /* width: 15em !important; */
    background-color: #232323;
  }

  .swiper-slide{
    display: table-cell;
    border-right: solid 1px #5f5555;
  }
</style>
