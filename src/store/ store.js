import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import createPersistedState from "vuex-persistedstate"
import { baseUrl, baseURLF1, hostF1, apiKeyF1 } from "../variables/apiVars"
import {
	addTrackId,
	addGrandPrixId,
	changeCountryName,
	notWantedSessions,
	newSessionType,
} from "../variables/replaceVars"

Vue.use(Vuex)

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
		raceNav: "Last Race",
		standingsNav: "Driver Standings",
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
        Return all races from season where status != Cancelled
        Exemple:
        Input - (2021)
        Return - [], with all races from the season
      */

			const todaysDate = new Date()
			const season = todaysDate.getFullYear() - 1
			const confirmedRaces = []

			try {
				const response = await axios.get(`${baseURLF1}/races/${season}`, {
					headers: {
						"x-rapidapi-key": apiKeyF1,
						"x-rapidapi-host": hostF1,
					},
				})

				response.data.results.forEach((race) => {
					if (race.status !== "Cancelled") {
						race.date_in_milli = Date.parse(race.end_date)
						confirmedRaces.push(race)
					}
				})

				confirmedRaces.forEach((race, index) => {
					race.track_id = addTrackId[race.track]
					race.grand_prix_id = addGrandPrixId[race.name]
					race.race_round = index + 1
					if (race.country in changeCountryName) {
						race.country = changeCountryName[race.country]
					}
				})

				console.log("Fetching allRaces from database")
				commit("SET_RACES", confirmedRaces)
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

				console.log("Fetching DRIVERS from database")
				commit("SET_DRIVERS", drivers)
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

				console.log("Fetching TEAMS from database")
				commit("SET_TEAMS", teams)
			} catch (e) {
				console.error(e)
			}
		},
		getUpcomingRace({ commit }, allRaces) {
			/*
        Return - the next race obj
      */
			// const nextRaceObj = {}
			// const nextRaceObj = allRaces.find((race) => race.date_in_milli >= todaysDate)
			const upcomingRaceObj = allRaces.find(
				(race) => race.date_in_milli === 1616889600000
			)
			// console.log("jbjjjbjbni")

			// allRaces.forEach((race) => {
			// 	//
			// 	if (race.date_in_milli === 1616889600000)
			// })

			console.log("Set UPCOMING_RACE")

			commit("SET_UPCOMING_RACE", upcomingRaceObj)
		},
		getNextRaceRound({ commit }, upcomingRace) {
			/*
        Return - the current round number
      */
			// const round = upcomingRace.race_round
			const round = 1

			console.log("Set CURRENT_ROUND")
			commit("SET_CURRENT_ROUND", round)
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
			this.currentSession = "Next Race"
			console.log("Set CURRENT_SESSION")
			commit("SET_SESSION", this.currentSession)
		},
	},
})
