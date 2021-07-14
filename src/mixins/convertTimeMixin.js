export default {
  methods: {
    convertTime(timeToConvert) {
      let hour = Number(timeToConvert.time.slice(0,2))
      let ending = ":00:00"
      let newHour

      if(hour === 23 ) {
        newHour = "01" + ending
      } else if (hour === 24) {
        newHour = "02" + ending
      } else {
        newHour = hour + 2 + ending
      }
      return newHour
    }
  }
}