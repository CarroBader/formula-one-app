import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import { baseUrl } from '../variables/apiVars'
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
    raceDataLoaded: false,
    raceNav: 'Last Race',
    standingsNav: 'Driver Standings',
    allConfirmedRaces: [],
    allDrivers: [],
    allTeams: [],
    upcomingRace: {},
    currentRound: 0,
    nextSession: {},
  },
  getters: {
    allConfirmedRaces: (state) => state.allConfirmedRaces,
    allDrivers: (state) => state.allDrivers,
    allTeams: (state) => state.allTeams,
    upcomingRace: (state) => state.upcomingRace,
    currentRound: (state) => state.currentRound,
    nextSession: (state) => state.nextSession,
  },
  mutations: {
    SET_RACES: (state, confirmedRaces) => {
      state.allConfirmedRaces.push(...confirmedRaces)

      state.raceDataLoaded = true
    },
    SET_DRIVERS: (state, drivers) => {
      state.allDrivers.push(...drivers)
    },
    SET_TEAMS: (state, teams) => {
      state.allTeams.push(...teams)
    },
    SET_UPCOMING_RACE: (state, upcomingRaceObj) => {
      state.upcomingRace = upcomingRaceObj
    },
    SET_CURRENT_ROUND: (state, round) => {
      state.currentRound = round
    },
    SET_SESSION: (state, currentSession) => {
      state.nextSession = currentSession
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

      const confirmedRaces = []

      try {
        const response = await axios.get(`${baseUrl}/races`)
        console.log(' Store - Fetching races from database')

        let races = response.data.data[0]['allRaces']

        races.forEach((race) => {
          if (race.status !== 'Cancelled') {
            race.date_in_milli = Date.parse(race.end_date)
            confirmedRaces.push(race)
          }
        })

        confirmedRaces.forEach((race) => {
          race.track_id = addTrackId[race.track]
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

        const sortedArray = races.sort(function(a, b) {
          return new Date(a.end_date) - new Date(b.end_date)
        })

        console.log('sortedArray', sortedArray)

        commit('SET_RACES', sortedArray)
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

        console.log('Fetching DRIVERS from database')
        commit('SET_DRIVERS', drivers)
      } catch (e) {
        console.error(e)
      }
    },
    async getAllTeams({ commit }) {
      /*
        Return - [], with all current teams
      */

      let teams = []

      try {
        const response = await axios.get(`${baseUrl}/teams`)

        teams = response.data.data

        console.log('Fetching TEAMS from database')
        commit('SET_TEAMS', teams)
      } catch (e) {
        console.error(e)
      }
    },
    getUpcomingRace({ commit }, allRaces) {
      /*
        Return - the next race obj
      */

      const upcomingRaceObj = allRaces.find(
        (race) => race.date_in_milli >= todaysDate
      )

      console.log('SET_UPCOMING_RACE', upcomingRaceObj)

      commit('SET_UPCOMING_RACE', upcomingRaceObj)
    },
    getNextRaceRound({ commit }, upcomingRace) {
      /*
        Return - the current round number
      */
      // const round = upcomingRace.race_round
      const round = upcomingRace.round

      console.log('Set CURRENT_ROUND', round)
      commit('SET_CURRENT_ROUND', round)
    },
    getNextSession({ commit }, upcomingRace) {
      /*
        Return - the active session
        If: the active session don't have live data: sessionType, nextSessionName, nextSessionDate
        Else: sessionType and sessionId
      */
      const relevantSessions = []
      // let nextSession = {}

      upcomingRace.sessions.forEach((session) => {
        if (!notWantedSessions.includes(session.session_name)) {
          session.session_type = newSessionType[session.session_name]
          relevantSessions.push(session)
        }
      })

      // relevantSessions.find((relSession) => {
      //   console.log('relSession', )
      //   const dateInMilli = Date.parse(relSession.date)

      //   if (dateInMilli === todaysDate) {
      //     nextSession = {
      //       sessionType: relSession.session_type,
      //       sessionId: relSession.id,
      //     }
      //   }

      //   if (dateInMilli >= todaysDate) {
      //     nextSession = {
      //       sessionType: "Next Race",
      //       sessionName: relSession.session_name,
      //       startTime: relSession.date,
      //     }
      //   }
      //   return nextSession
      // })

      // this.currentSession = nextSession
      this.currentSession = 'Next Race'
      console.log('Set CURRENT_SESSION', this.currentSession)
      commit('SET_SESSION', this.currentSession)
    },
  },
})
