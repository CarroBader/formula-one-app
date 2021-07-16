<template>
  <div
    class="track-last-winners">
    <h1 class="red-text align-title lastest-winner-text"> Lastest winners:</h1>
    <div class="winners-div-outer">
      <div class="winners-div">
        <div class="winners-inner">
          <div         
            v-for="winners, i in this.latestWinners"
            :key="winners[i]"
            class="winners-para-div">
            <p class="red-text winners-p year-para">{{ winners.season }}</p>
            <p class="winners-p" >{{ winners.winner }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TrackLastWinners',
  props: {
    latestWinners: Array,
    nextRaceTrackName: String
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style scoped>
.track-last-winners {
  margin: 1.5em 0;
}

.align-title {
  text-align: initial;
}

.winners-div {
  background-color: #121212;
  border: 3px solid #fff;
  border-radius: 15px;
}

.winners-div-outer {
  background-color: #ff1616;
  border-radius: 15px;
  width: 40%;
  padding: 0.4em;
  margin: 2em auto;
}

.winners-inner {
  margin: 0.5em;
}

.winners-p {
  margin: 0;
  font-size: 1.2em;
  color: #fff;
  font-family: 'Orbitron', 'sans-serif';
}
.winners-para-div {
  display: flex;
  justify-content: initial;
  border-bottom: 1px solid #fff;
  /* margin-left: 1em; */
}

.winners-para-div:last-child {
  border: none;
}

.year-para {
  font-size: 1.1em;
  margin-right: 0.5em;
}

.circuit-name {
  margin: auto 2em;
  background-color: grey;
  border-radius: 15px;
  text-align: center;
  -webkit-text-stroke-width: 0.9px;
  -webkit-text-stroke-color: black;
}

.lastest-winner-text {
  font-size: 1.8em;
}
</style>
