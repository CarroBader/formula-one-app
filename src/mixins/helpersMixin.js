export default {
  methods: {
    getNextRace(allRaces, round) {
      /*
      Get the next race.
      Paramas allRaces and round.
    */
      return allRaces.find((race) => race.round === round)
    },
    createId(name) {
      /*
      Convert name to id
    */
      return name
        .toLowerCase()
        .replace('-', '_')
        .replace(' ', '_')
    },
  },
}
