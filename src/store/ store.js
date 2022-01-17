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
		raceNav: `Last Race`,
		standingsNav: `Driver Standings`,
		allConfirmedRaces: [],
		allDrivers: [],
		allTeams: [],
		nextRace: {},
		currentRound: 0,
		nextSession: {},
	},
	getters: {
		allConfirmedRaces: (state) => state.allConfirmedRaces,
		allDrivers: (state) => state.allDrivers,
		allTeams: (state) => state.allTeams,
		nextRace: (state) => state.nextRace,
		currentRound: (state) => state.currentRound,
		nextSession: (state) => state.nextSession,
	},
	mutations: {
		SET_RACES: (state, confirmedRaces) => {
			console.log(`SET_RACES mutations`)
			state.allConfirmedRaces.push(...confirmedRaces)

			state.raceDataLoaded = true
			// state.allConfirmedRaces = []
		},
		SET_DRIVERS: (state, drivers) => {
			console.log(`SET_DRIVERS mutations`)
			state.allDrivers.push(...drivers)
			// state.allDrivers = []
		},
		SET_TEAMS: (state, teams) => {
			console.log(`SET_TEAMS mutations`)
			state.allTeams.push(...teams)
			// state.allTeams = []
		},
		SET_NEXT_RACE: (state, nextRaceObj) => {
			console.log(`SET_NEXT_RACE mutations`)
			state.nextRace = nextRaceObj
			// state.allTeams = []
		},
		SET_CURRENT_ROUND: (state, round) => {
			console.log(`SET_CURRENT_ROUND mutations`)
			console.log(`här`, round)
			state.currentRound = round
			// state.allTeams = []
		},
		SET_SESSION: (state, currentSession) => {
			console.log(`SET_SESSION mutations`)
			state.nextSession = currentSession
			// state.allTeams = []
			state.allDataLoaded = true
		},
		SET_NAV_NAME: (state, raceNavValue) => {
			// Varible used for routing of race.
			console.log(`SET_NAV_NAME mutations`)
			state.raceNav = raceNavValue
		},
		SET_STANDINGS_NAME: (state, standingsNavValue) => {
			// Varible used for routing of standings.
			console.log(`SET_STANDINGS_NAME mutations`)
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
					if (race.status !== `Cancelled`) {
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

				console.log(`Fetching allRaces from database`)
				commit(`SET_RACES`, confirmedRaces)
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

				console.log(`Fetching drivers from database`)
				commit(`SET_DRIVERS`, drivers)
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

				console.log(`Fetching teams from database`)
				commit(`SET_TEAMS`, teams)
			} catch (e) {
				console.error(e)
			}
		},
		getNextRace({ commit }, allRaces) {
			/*
        Return - the next race obj
      */
			// const nextRaceObj = {}
			// const nextRaceObj = allRaces.find((race) => race.date_in_milli >= todaysDate)
			const nextRaceObj = allRaces.find(
				(race) => race.date_in_milli === 1616889600000
			)
			// console.log("jbjjjbjbni")

			// allRaces.forEach((race) => {
			// 	//
			// 	if (race.date_in_milli === 1616889600000)
			// })

			console.log(`Set nextRace`)
			commit(`SET_NEXT_RACE`, nextRaceObj)
		},
		getNextRaceRound({ commit }, nextRace) {
			/*
        Return - the current round number
      */
			const round = nextRace.race_round

			console.log(`Set current round number`)
			commit(`SET_CURRENT_ROUND`, round)
		},
		getNextSession({ commit }, nextRace) {
			/*
        Return - the active session
        If: the active session don't have live data: sessionType, nextSessionName, nextSessionDate
        Else: sessionType and sessionId
      */
			const relevantSessions = []
			// let nextSession = {}

			nextRace.sessions.forEach((session) => {
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
			//       sessionType: `Next Race`,
			//       sessionName: relSession.session_name,
			//       startTime: relSession.date,
			//     }
			//   }
			//   return nextSession
			// })

			// this.currentSession = nextSession
			this.currentSession = `Next Race`
			console.log(`Set current session`)
			commit(`SET_SESSION`, this.currentSession)
		},
	},
})
