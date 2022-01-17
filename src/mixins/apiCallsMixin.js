/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import axios from "axios"
import { baseUrl, baseURLF1, hostF1, apiKeyF1 } from "../vars"
import generalVars from "./generalVars"

const newTeamIdsTeamStandings = {
	58685: "mercedes",
	33121: "red_bull",
	56525: "mclaren",
	183197: "ferrari",
	31205: "alpine",
	199493: "alphatauri",
	65311: "aston_martin",
	163637: "williams",
	71583: "alfa_romeo",
	143585: "haas",
}

const newDriverIds = {
	87445: "max_verstappen",
	21838: "lewis_hamilton",
	92948: "valtteri_bottas",
	539806: "lando_norris",
	26087: "sergio_perez",
	328938: "charles_leclerc",
	87222: "carlos_sainz",
	58339: "daniel_ricciardo",
	991967: "pierre_gasly",
	21122: "fernando_alonso",
	102533: "esteban_ocon",
	31997: "sebastian_vettel",
	754025: "lance_stroll",
	50864: "yuki_tsunoda",
	764647: "george_russell",
	547297: "nicholas_latifi",
	64723: "kimi_raikkonen",
	351420: "antonio_giovinazzi",
	704606: "mick_schumacher",
	106571: "robert_kubica",
	280605: "nikita_mazepin",
}

const newTeamIdsDriverStandings = {
	16549: "red_bull",
	29331: "mercedes",
	28251: "mclaren",
	91587: "ferrari",
	99735: "alphatauri",
	15591: "alpine",
	32644: "aston_martin",
	81807: "williams",
	35780: "alfa_romeo",
	71781: "haas",
}

const changeCountryName = {
	"Great Britain": "United Kingdom",
	USA: "United States",
	"Abu Dhabi": "UAE",
}

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
			const sessionsToRemove = [
				"Grid",
				"FastestLap",
				"Qualifying 2",
				"Qualifying 3",
			]
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
		async getTeamStandings() {
			/*
        Return team standings for a aeason
        Param: season
      */
			try {
				const response = await axios.get(
					"${baseURLF1}/constructors/standings/${this.season}",
					{
						headers: {
							"x-rapidapi-key": apiKeyF1,
							"x-rapidapi-host": hostF1,
						},
					}
				)

				const teams = response.data.results

				teams.forEach((team) => {
					if (team.team_id in newTeamIdsTeamStandings) {
						team.team_id = newTeamIdsTeamStandings[team.team_id]
					}
					if (team.team_name === "Alfa Romeo Racing") {
						team.team_name = "Alfa Romeo"
					}
				})

				return {
					allTeams: teams,
					teamDataLoaded: true,
				}
			} catch (e) {
				console.error(e)
			}
		},
		async getDriverStandings() {
			/*
      Return driver standings for a season
      Param: season
    */
			try {
				const response = await axios.get(
					"${baseURLF1}/drivers/standings/${this.season}",
					{
						headers: {
							"x-rapidapi-key": apiKeyF1,
							"x-rapidapi-host": hostF1,
						},
					}
				)

				const drivers = response.data.results

				drivers.forEach((driver) => {
					if (driver.driver_id in newDriverIds) {
						driver.driver_id = newDriverIds[driver.driver_id]
					}

					if (driver.team_id in newTeamIdsDriverStandings) {
						driver.team_id = newTeamIdsDriverStandings[driver.team_id]
					}

					if (driver.nationality in changeCountryName) {
						driver.nationality = changeCountryName[driver.nationality]
					}

					if (driver.team_name === "Alfa Romeo Racing") {
						driver.team_name = "Alfa Romeo"
					}
				})

				return {
					allDrivers: drivers,
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
				const response = await axios.get("${baseUrl}/circuits/${trackId}")
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
					"${baseUrl}/grands-prix/${grandPrixId}"
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
			console.log("Entering - API - getSessionById")
			const qualifyingSessions = {}
			await Promise.all(
				sessionIds.map(async (session) => {
					try {
						const response = await axios.get(
							"${baseURLF1}/session/${session}",
							{
								headers: {
									"x-rapidapi-key": apiKeyF1,
									"x-rapidapi-host": hostF1,
								},
							}
						)
						qualifyingSessions[
							response.data.results.session.general.session_name.replace(
								" ",
								""
							)
						] = response.data.results.drivers
					} catch (e) {
						console.error(e)
					}
				})
			)
			return qualifyingSessions
		},
		async getGridStartingForRace(grandPrixId) {
			/*
        Return - Starting for race
        Params: grand_prix_id
      */
			try {
				const response = await axios.get(
					"${baseUrl}/starting-grids/${grandPrixId}"
				)

				return {
					data: response.data.data.grid,
					dataLoaded: true,
				}
			} catch (e) {
				console.error(e)
			}
		},
	},
	mixins: [generalVars],
}
