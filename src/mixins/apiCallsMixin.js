/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import axios from 'axios'
import { baseUrl } from '../variables/apiVars'
import generalVarsMixin from './generalVarsMixin'
import { changeCountryName, sessionsToRemove } from '../variables/replaceVars'

export default {
  methods: {
    async getTimeTableForRace(season, raceId) {
      /*
      Return time table information for a specific race.
      Exemple:
      Input - (2021, "2014")
      Return - {
        start: "2021-09-10",
        end: "2021-09-12",
        sessions: [{id:1337, session_name: "Practice 1", date: "2021-09-10T12:30:00+00:00"}....],
        dataLoaded: true
      }
    */
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
    async getConstructorStandings() {
      /*
        Return team standings
      */
      try {
        const response = await axios.get(`${baseUrl}/constructor-standings`)

        return {
          allConstructors: response.data.data[0]['standings'],
          teamDataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getDriverStandings() {
      /*
      Return driver standings
    */
      try {
        const response = await axios.get(`${baseUrl}/driver-standings`)
        let drivers = response.data.data[0]['standings']

        drivers.forEach((driver) => {
          if (driver.country in changeCountryName) {
            driver.country = changeCountryName[driver.country]
          }
        })

        return {
          alldrivers: drivers,
          driverDataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getOneTrack(trackId) {
      /*
        Return - One track
        Params: track_id
      */
      try {
        const response = await axios.get(`${baseUrl}/circuits/${trackId}`)
        // console.log("Fetching track from database")

        return {
          data: response.data.data,
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getOneGrandPrix(grandPrixId) {
      /*
        Return - One grand prix
        Params: grand_prix_id
      */
      try {
        const response = await axios.get(
          `${baseUrl}/grands-prix/${grandPrixId}`
        )
        // console.log("Fetching grand prix from database")

        return {
          data: response.data.data,
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getSessionById(sessionIds) {
      /*
        Return session according to session ids.
        Exemple:
        Input - An array with session Ids.
        Return - An object with session name and array with drivers
      */
      // console.log('Entering - API - getSessionById')
      const qualifyingSessions = {}
      await Promise.all(
        sessionIds.map(async (session) => {
          try {
            const response = await axios.get(
              `${baseURLF1}/session/${session}`,
              {
                headers: {
                  'x-rapidapi-key': apiKeyF1,
                  'x-rapidapi-host': hostF1,
                },
              }
            )
            qualifyingSessions[
              response.data.results.session.general.session_name.replace(
                ' ',
                ''
              )
            ] = response.data.results.drivers
          } catch (e) {
            console.error(e)
          }
        })
      )
      return qualifyingSessions
    },
    async getRaceResult(grandPrixId) {
      /*
        Return - Race result
        Params: grand_prix_id
      */
      try {
        const response = await axios.get(`${baseUrl}/race/${grandPrixId}`)

        return {
          data: response.data.data['race'],
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getGridStartingForRace(grandPrixId) {
      /*
        Return - Starting for race
        Params: grand_prix_id
      */
      try {
        const response = await axios.get(
          `${baseUrl}/starting-grids/${grandPrixId}`
        )

        return {
          data: response.data.data['starting-grid'],
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getFastestLap(grandPrixId) {
      /*
        Return - Fastest lap
        Params: grand_prix_id
      */
      try {
        const response = await axios.get(
          `${baseUrl}/fastest-lap/${grandPrixId}`
        )

        return {
          data: response.data.data['fastest_lap'],
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getOneDriver(driverId) {
      /*
        Return - One driver
        Params: driver_id
      */
      try {
        const response = await axios.get(`${baseUrl}/drivers/${driverId}`)
        // console.log("Fetching driver from database")

        return {
          data: response.data.data,
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getOneConstructor(teamId) {
      /*
        Return - One constructor
        Params: driver_id
      */
      try {
        const response = await axios.get(`${baseUrl}/constructors/${teamId}`)
        // console.log("Fetching driver from database")

        return {
          data: response.data.data,
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getPractice(grandPrixId, practice) {
      /*
        Return - Practice One
        Params: grand_prix_id
      */
      try {
        const response = await axios.get(
          `${baseUrl}/${practice}/${grandPrixId}`
        )

        return {
          data: response.data.data[practice],
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
  mixins: [generalVarsMixin],
}
