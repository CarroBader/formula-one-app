export default {
  methods: {
    getRace(allRaces, round) {
    /*
      Get the next race.
      Paramas allRaces and round.
    */
      return allRaces.find((race) => race.race_round === round)
    },
  },
}
