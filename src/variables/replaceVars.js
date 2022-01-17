const addTrackId = {
	Sakhir: "bahrain",
	Imola: "imola",
	"Algarve International": "algrave",
	Catalunya: "catalunya",
	Monaco: "monaco",
	Baku: "baku",
	"Circuit Paul Ricard": "paul_ricard",
	"Red Bull Ring": "red_bull_ring",
	Silverstone: "silverstone",
	Hungaroring: "hungaroring",
	"Spa-Francorchamps": "spa",
	Zandvoort: "zandvoort",
	Monza: "monza",
	Sochi: "sochi",
	"Istanbul Park Circuit": "istanbul_park",
	"Circuit of the Americas": "americas",
	"Autodromo Hermanos Rodriguez": "hermanos_rodriguez",
	"Autodromo Jose Carlos Pace": "interlagos",
	Jeddah: "jeddah",
	"Yas Marina": "yas_marina",
}

const addGrandPrixId = {
	"Bahrain Grand Prix": "bahrain_grand_prix",
	"Imola Grand Prix": "emilia-romagna_grand_prix",
	"Portuguese Grand Prix": "portuguese_grand_prix",
	"Spanish Grand Prix": "spanish_grand_prix",
	"Monaco Grand Prix": "monaco_grand_prix",
	"Azerbaijan Grand Prix": "azerbaijan_grand_prix",
	"French Grand Prix": "french_grand_prix",
	"Styrian Grand Prix": "styrian_grand_prix",
	"Austrian Grand Prix": "austrian_grand_prix",
	"British Grand Prix": "british_grand_prix",
	"Hungarian Grand Prix": "hungarian_grand_prix",
	"Belgian Grand Prix": "belgian_grand_prix",
	"Dutch Grand Prix": "dutch_grand_prix",
	"Italian Grand Prix": "italian_grand_prix",
	"Russian Grand Prix": "russian_grand_prix",
	"Turkish Grand Prix": "turkish_grand_prix",
	"United States Grand Prix": "united_states_grand_prix",
	"Mexican Grand Prix": "mexican_grand_prix",
	"Brazilian Grand Prix": "brazilian_grand_prix",
	"Grand Prix of Saudi Arabia": "saudi_arabian_grand_prix",
	"Abu Dhabi Grand Prix": "abu_dhabi_grand_prix",
}

const changeCountryName = {
	"Great Britain": "United Kingdom",
	USA: "United States",
	"Abu Dhabi": "United Arab Emirates",
}

const notWantedSessions = ["Grid", "FastestLap"]

const newSessionType = {
	"Practice 1": "practice",
	"Practice 2": "practice",
	"Practice 3": "practice",
	"Qualifying 1": "qualifying",
	"Qualifying 2": "qualifying",
	"Qualifying 3": "qualifying",
	Race: "race",
}

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

const sessionsToRemove = ["Grid", "FastestLap", "Qualifying 2", "Qualifying 3"]

export {
	addTrackId,
	addGrandPrixId,
	changeCountryName,
	notWantedSessions,
	newSessionType,
	newTeamIdsTeamStandings,
	newDriverIds,
	newTeamIdsDriverStandings,
	sessionsToRemove,
}
