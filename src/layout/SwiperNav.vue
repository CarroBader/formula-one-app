<template>
  <swiper :options="swiperOptions" class="swiper-nav">
    <swiper-slide v-for="(race, index) in allRaces" :key="index">
      <div
        class="swiper-nav-div"
        @click=";[activeRace($event), changeRace(race)]"
        :class="
          race.round - 1 === swiperOptions.initialSlide ? 'active-race' : ''
        "
      >
        <img
          :src="getFlag(race.country)"
          :alt="`${race.country}`"
          class="swiper-nav-flag-img"
        />
        <div class="swiper-nav-info">
          <h4 class="swiper-nav-info-text">
            {{ race.dayNumber }} {{ race.monthName }}
          </h4>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { mapGetters, mapState } from 'vuex'

import getCountryFlagMixin from '../mixins/getCountryFlagMixin'
import convertRaceTimeMixin from '../mixins/convertRaceTimeMixin'

export default {
  name: 'SwiperNav',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      allRaces: null,
      nextUpcomingRace: null,
      swiperOptions: {
        slidesPerView: 'auto',
        initialSlide: 0,
        spaceBetween: 0,
        centeredSlides: true,
        centeredSlidesBounds: true,
        freeMode: true,
        loop: false,
        navigation: {
          nextEswiperl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  computed: {
    ...mapGetters(['allConfirmedRaces', 'upcomingRace']),
    // ...mapState([]),
  },
  async created() {
    this.allRaces = this.allConfirmedRaces

    this.swiperOptions.initialSlide = Number(this.upcomingRace.round) - 1 // Titta över detta
    this.$store.commit('SET_CURRENT_ROUND', Number(this.upcomingRace.round)) // Titta över detta

    this.getNameOfMonth()
  },
  methods: {
    getNameOfMonth() {
      this.allRaces.forEach((race) => {
        const date = new Date(race.end_date)
        const month = date.toLocaleString('default', { month: 'short' })
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
      const activeRaceDiv = document.querySelector('.active-race')

      if (activeRaceDiv !== null) {
        activeRaceDiv.classList.remove('active-race')
      }
      e.target.classList.add('active-race')
    },
    changeRace(race) {
      /*
      Change race_round according to wish race is clicked
    */
      this.$store.commit('SET_CURRENT_ROUND', race.round)
    },
  },
  mixins: [getCountryFlagMixin, convertRaceTimeMixin],
}
</script>

<style scoped>
/* .swiper-nav {
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
	background-color: #232323;
}

.swiper-slide {
	display: table-cell;
	border-right: solid 1px #5f5555;
} */
</style>
