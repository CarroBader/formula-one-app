import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import { baseUrl } from '../../apiVars'
import {
  addTrackId,
  addGrandPrixId,
  changeCountryName,
  notWantedSessions,
  newSessionType,
} from '../variables/replaceVars'

Vue.use(Vuex)

const todaysDate = new Date()

// If you want to clear createPersistedState sessionStorage.clear()
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    allDataLoaded: false,
    raceNav: 'Last Race',
    standingsNav: 'Driver Standings',
    allConfirmedRaces: [],
    allDrivers: [],
    allConstructors: [],
    upcomingRace: {},
    currentRound: 0,
    nextSession: 'Next Race',
  },
  getters: {
    allConfirmedRaces: (state) => state.allConfirmedRaces,
    allDrivers: (state) => state.allDrivers,
    allConstructors: (state) => state.allConstructors,
    upcomingRace: (state) => state.upcomingRace,
    currentRound: (state) => state.currentRound,
  },
  mutations: {
    SET_RACES: (state, confirmedRaces) => {
      state.allConfirmedRaces.push(...confirmedRaces)
    },
    SET_DRIVERS: (state, drivers) => {
      state.allDrivers.push(...drivers)
    },
    SET_CONSTRUCTORS: (state, constructors) => {
      state.allConstructors.push(...constructors)
    },
    SET_UPCOMING_RACE: (state, upcomingRaceObj) => {
      state.upcomingRace = upcomingRaceObj
    },
    SET_CURRENT_ROUND: (state, round) => {
      state.currentRound = round

      state.allDataLoaded = true
    },
    SET_NAV_NAME: (state, raceNavValue) => {
      // Varible used for routing of race.
      state.raceNav = raceNavValue
    },
    SET_STANDINGS_NAME: (state, standingsNavValue) => {
      // Varible used for routing of standings.
      state.standingsNav = standingsNavValue
    },
  },
  actions: {
    async getAllRaces({ commit }) {
      /*
        Return all races
      */

      try {
        const response = await axios.get(`${baseUrl}/races`)

        let races = response.data.data[0]['allRaces']

        races.forEach((race) => {
          if (Date.parse(race.end_date) < todaysDate) {
            race.status = 'Complete'
          } else race.status = 'Unfinished'
          {
          }
          race.grand_prix_id = addGrandPrixId[race.name]
          if (race.country in changeCountryName) {
            race.country = changeCountryName[race.country]
          }

          race.sessions.forEach((session) => {
            if (session.session_name === 'Sprint Qualifying') {
              race.sprint_race = true
            }
          })
        })

        let sortedArray = races.sort(function(a, b) {
          return new Date(a.end_date) - new Date(b.end_date)
        })

        commit('SET_RACES', sortedArray)

        // Get and Set Upcoming Race
        const upcomingRaceObj = sortedArray.find(
          (race) => Date.parse(race.end_date) >= todaysDate
        )

        commit('SET_UPCOMING_RACE', upcomingRaceObj)

        commit('SET_CURRENT_ROUND', upcomingRaceObj.round)
      } catch (e) {
        console.error(e)
      }
    },
    async getAllDrivers({ commit }) {
      /*
        Return - [], with all drivers and reserve drivers
      */

      let drivers = []

      try {
        const response = await axios.get(`${baseUrl}/drivers`)

        drivers = response.data.data

        commit('SET_DRIVERS', drivers)
      } catch (e) {
        console.error(e)
      }
    },
    async getAllConstructors({ commit }) {
      /*
        Return - [], with all current constructors
      */

      let constructors = []

      try {
        const response = await axios.get(`${baseUrl}/constructors`)

        constructors = response.data.data

        commit('SET_CONSTRUCTORS', constructors)
      } catch (e) {
        console.error(e)
      }
    },
  },
})
