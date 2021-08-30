<template>
  <div class="next-race-country-flag-div">
      <img
        :src="getFlag(country)"
        :alt='`${country}`'
        class="next-race-country-flag-img"
      />
  </div>
</template>

<script>
import getCountryFlagMixin from '../../../mixins/getCountryFlagMixin.js'

export default {
  name: `NextRaceCountryFlag`,
  props: {
    country: String,
  },
  mixins: [getCountryFlagMixin],
}
</script>

<style scoped>
  .next-race-country-flag-img {
    width: 100%;
    height: 100%;
    object-fit: fill;

    border-radius: 10px;
    border: 5px solid #161616;
    box-shadow: rgb(0 0 0 / 35%) 0px 3px 9px;
  }
</style>
