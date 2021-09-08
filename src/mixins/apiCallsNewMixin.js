import axios from 'axios'
import {
  baseURLF1, hostF1, apiKeyF1,
} from '../vars'

export default {
  methods: {
    async getTimeTableForRace(raceId) {
    /*
      Return time table information for a specific race.
    */
      const returnSessions = []
      try {
        const response = await axios.get(`${baseURLF1}/races/2021`, {
          headers: {
            "x-rapidapi-key": apiKeyF1,
            "x-rapidapi-host": hostF1,
          },
        })

        response.data.results.forEach((race) => {
          if (race.race_id === raceId) {
            this.chosenRace = race
          }
        })

        this.chosenRace.sessions.forEach((session) => {
          if (session.session_name !== `Grid`
            && session.session_name !== `FastestLap`
            && session.session_name !== `Qualifying 2`
            && session.session_name !== `Qualifying 3`) {
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
