export default {
  methods: {
    async getNextRace(season, date) {
      /*
        Return next race in the calender.
        Exemple:
        Input - (2021, "2021-09-08") <- Should be todays date
        Return - {
          dataLoaded: true
          race: {race_id: 384, name: "Italian Grand Prix", country: "Italy", status: "Confirmed", season: "2021", …}
        }
      */
      const todaysDate = this.convertDate(date)

      try {
        // Returns an array of all confirmed races
        const response = await this.getAllRaces(season)

        const nextRace = response.races.find((race) => race.dateInMilli >= todaysDate)

        return {
          race: nextRace,
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getTimeTableForRace(season, raceId) {
    /*
      Return time table information for a specific race.
      Exemple:
      Input - (2021, "2014")
      Return - {
        start: `2021-09-10`,
        end: `2021-09-12`,
        sessions: [{id:1337, session_name: `Practice 1`, date: `2021-09-10T12:30:00+00:00`}....],
        dataLoaded: true
      }
    */
      const sessionsToRemove = [`Grid`, `FastestLap`, `Qualifying 2`, `Qualifying 3`]
      const returnSessions = []

      try {
        // Returns an array of all confirmed races
        const response = await this.getAllRaces(season)

        response.races.forEach((race) => {
          if (race.race_id === raceId) {
            this.chosenRace = race
          }
        })

        this.chosenRace.sessions.forEach((session) => {
          if (!sessionsToRemove.includes(session.session_name)) {
            returnSessions.push(session)
          }
        })

        return {
          start: this.chosenRace.start_date,
          end: this.chosenRace.end_date,
          sessions: returnSessions,
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
}
