export default {
	methods: {
		getConstructorColor(id) {
			/*
      Get constructor color from an id.
      Return a color name that macthes a class in main.css.
    */
			let colorName

			switch (id) {
				case "mclaren":
				case "lando_norris":
				case "daniel_ricciardo":
					colorName = "mclaren"
					break
				case "red_bull":
				case "max_verstappen":
				case "sergio_perez":
					colorName = "red-bull"
					break
				case "mercedes":
				case "lewis_hamilton":
				case "valtteri_bottas":
					colorName = "mercedes"
					break
				case "alfa_romeo":
				case "kimi_raikkonen":
				case "antonio_giovinazzi":
					colorName = "alpha-romeo"
					break
				case "alphatauri":
				case "pierre_gasly":
				case "yuki_tsunoda":
					colorName = "alpha-tauri"
					break
				case "haas":
				case "mick_schumacher":
				case "nikita_mazepin":
					colorName = "haas"
					break
				case "alpine":
				case "fernando_alonso":
				case "esteban_ocon":
					colorName = "alpine"
					break
				case "ferrari":
				case "charles_leclerc":
				case "carlos_sainz":
					colorName = "ferrari"
					break
				case "williams":
				case "george_russell":
				case "nicholas_latifi":
					colorName = "williams"
					break
				case "aston_martin":
				case "lance_stroll":
				case "sebastian_vettel":
					colorName = "aston-martin"
					break
				case "lotus":
					colorName = "lotus"
					break
				case "brawn":
					colorName = "brawn"
					break
				case "renault":
					colorName = "renault"
					break
				case "toro_rosso":
					colorName = "torro-rosso"
					break
				case "sauber":
					colorName = "sauber"
					break
				case "racing_point":
					colorName = "racing-point"
					break
				default:
					colorName = ""
			}
			return colorName
		},
		convertConstructorName(teamName) {
			const teamId = teamName.replace(" ", "_").toLowerCase()
			console.log("teamId", teamId)
			return this.getConstructorColor(teamId)
		},
	},
}
