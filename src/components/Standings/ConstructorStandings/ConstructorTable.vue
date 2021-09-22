<template>
  <div><h3>Team Win</h3></div>
</template>

<script>
import apiCallsMixin from '../../../mixins/apiCallsMixin'
import getCountryFlagMixin from '../../../mixins/getCountryFlagMixin'
import getConstructorColorMixin from '../../../mixins/getConstructorColorMixin'
import getImageMixin from '../../../mixins/getImageMixin'
import getWindowSizeMixin from '../../../mixins/getWindowSizeMixin'
import generalVars from '../../../mixins/generalVars'

export default {
  name: `ConstructorTable`,
  data() {
    return {
      constructorStandings: null,
      constructorStandingsDataLoaded: false,
    }
  },
  async created() {
    // // Get current constructor standings
    // const responseConstructorStandings = await this.getConstructorStandings()

    // // Set value on data properties
    // this.constructorStandings = responseConstructorStandings.standingsConstructor

    // // Set dataloaded variable(s) to true
    // this.constructorStandingsDataLoaded = responseConstructorStandings.dataLoaded
  },
  mixins: [
    apiCallsMixin,
    getCountryFlagMixin,
    getConstructorColorMixin,
    getImageMixin,
    getWindowSizeMixin,
    generalVars],
}
</script>

<style scoped>
  table {
    width: 100%;
  }

  tbody {
    border-bottom: 1px solid #fff;
  }

  tbody:last-child {
    border-bottom: none;
  }

  .constructor-table-headline-div {
    margin: 0.5em 0 2em;
  }

  .leader-constructor-div {
    display: flex;
    display:-webkit-flex;
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
