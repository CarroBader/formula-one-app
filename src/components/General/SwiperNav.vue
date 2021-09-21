<template>
  <swiper
    :options="swiperOptions"
    class="swiper-nav">
    <swiper-slide
      v-for="race, index in allRaces"
      :key="index"
    >
      <div
        class="swiper-nav-div"
        v-on:click="activeRace"
        :class="race.race_round === swiperOptions.initialSlide ? 'active-race' : ''"
      >
        <img
          :src="getFlag(race.country)"
          :alt='`${race.country}`'
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
import { mapGetters } from 'vuex'

import dataMixin from '../../mixins/dataMixin'
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
      // getAllRaces: `allRaces`,
      allRaces: null,
      // allRacesDataLoaded: false,
      // getNextRace: `nextRace`,
      nextRace: null,
      // raceRound: null,
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
  computed: {
    ...mapGetters([`allConfirmedRaces`, `allDrivers`, `allTeams`]),
  },
  async created() {
    this.allRaces = this.allConfirmedRaces
    this.nextRace = this.getNextRace(this.allRaces)

    this.swiperOptions.initialSlide = Number(this.nextRace.race_round)

    this.getNameOfMonth()
  },
  methods: {
    getNameOfMonth() {
      this.allRaces.forEach((race) => {
        const date = new Date(race.end_date)
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
  mixins: [dataMixin, getCountryFlagMixin, convertRaceTimeMixin],
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
