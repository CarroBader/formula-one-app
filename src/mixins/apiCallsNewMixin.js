/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import axios from 'axios'
import {
  baseURLF1, hostF1, apiKeyF1,
} from '../vars'

const newTeamIds = {
  58685: `mercedes`,
  33121: `red_bull`,
  56525: `mclaren`,
  183197: `ferrari`,
  31205: `alpine`,
  199493: `alphatauri`,
  65311: `aston_martin`,
  163637: `williams`,
  71583: `alfa_romeo`,
  143585: `haas`,
}

export default {
  methods: {
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
    async getDriverStandings() {
      /*
        Return constructor standings for a aeason
        Param: season
      */
      const todaysDate = new Date()
      const season = todaysDate.getFullYear()

      try {
        const response = await axios.get(`${baseURLF1}/constructors/standings/${season}`, {
          headers: {
            "x-rapidapi-key": apiKeyF1,
            "x-rapidapi-host": hostF1,
          },
        })

        const teams = response.data.results

        teams.forEach((team) => {
          if (team.team_id in newTeamIds) {
            team.team_id = newTeamIds[team.team_id]
          }
          if (team.team_name === `Alfa Romeo Racing`) {
            team.team_name = `Alfa Romeo`
          }
        })
        // console.log(`teams`, teams)
        return {
          allTeams: teams,
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
}
