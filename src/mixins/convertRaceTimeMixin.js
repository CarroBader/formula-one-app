export default {
  methods: {
    convertRaceTime(timeToConvert) {
    /*
      Convert race time in z to real time.
    */
      const hour = Number(timeToConvert.slice(0, 2))
      const ending = `:00:00`
      let newTime

      if (hour === 23) {
        newTime = `01${ending}`
      } else if (hour === 24) {
        newTime = `02${ending}`
      } else {
        newTime = hour + 2 + ending
      }
      return newTime
    },
  },
}
