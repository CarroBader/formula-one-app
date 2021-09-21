const todaysDate = Date.parse(new Date())

export default {
  methods: {
    getNextRace(races) {
      return races.find((race) => race.date_in_milli >= todaysDate)
    },
    // getLastRace() {
    //   const reveredAllRaces = [...this.allRaces].reverse()

    //   return reveredAllRaces.find((race) => race.dateInMilli <= todaysDate)
    // },
  },
}
