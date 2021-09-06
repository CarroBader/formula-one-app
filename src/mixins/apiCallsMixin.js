import axios from 'axios'
import { baseUrl } from '../vars'

const comingRaces = []
const pastRaces = []
let todaysDate

export default {
  methods: {
    async getRaces(para) {
    /*
      Params:
      allRaces - Return an array of all the races of the current season.
      lastRace - Return an object contining the season and the round of the lastest race.
      nextRace - Return an object contining the next race.
    */
      try {
        const response = await axios.get(`${baseUrl}current.json`)

        this.allRaces = response.data.MRData.RaceTable.Races

        if (para === `allRaces`) {
          return {
            allRaces: this.allRaces,
            dataLoaded: true,
          }
        }
        todaysDate = this.getTodaysDate()
        this.allRaces.forEach((race) => {
          const raceDate = Date.parse(race.date)
          if (raceDate >= todaysDate) {
            comingRaces.push(race)
          } else {
            pastRaces.push(race)
          }
        })

        if (para === `lastRace`) {
          const lr = pastRaces.slice(-1)[0]
          return {
            season: lr.season,
            round: lr.round,
          }
        }

        if (para === `nextRace`) {
          return {
            nextRace: comingRaces[0],
            dataLoaded: true,
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    getTodaysDate() {
    /*
      Return the date of today.
    */
      const dateToday = new Date(new Date().getTime()
      - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)

      return Date.parse(dateToday)
    },
    async getRaceResult(season, lastRound) {
    /*
      Return the result of a specific race.
    */
      try {
        const response = await axios.get(`${baseUrl}${season}/${lastRound}/results.json`)
        const race = response.data.MRData.RaceTable.Races

        return {
          lastRaceResult: race[0],
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getNextRaceQualificationResult(season, currentRound) {
    /*
      Return the qulification result of the next race.
    */
      try {
        console.log(currentRound)
        // const response = await axios.get(`${baseUrl}${season}/${currentRound}/qualifying.json`)
        const response = await axios.get(`${baseUrl}${season}/13/qualifying.json`)
        const qualiForRace = response.data.MRData.RaceTable.Races
        if (qualiForRace.length !== 0) {
          return {
            nextRaceQualification: response.data.MRData.RaceTable.Races[0],
            dataLoaded: true,
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getDriverStandings() {
    /*
      Return current driver standing.
    */
      try {
        const response = await axios.get(`${baseUrl}current/driverStandings.json`)
        this.driverStandings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings

        return {
          standingsDriver: this.driverStandings,
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getConstructorStandings() {
    /*
      Return current constructor standing.
    */
      try {
        const response = await axios.get(`${baseUrl}current/constructorStandings.json`)
        this.constructorStandings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings

        return {
          standingsConstructor: this.constructorStandings,
          dataLoaded: true,
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
}
