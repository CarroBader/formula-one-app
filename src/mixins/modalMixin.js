import { month } from "../variables/replaceVars"

export default {
	methods: {
		getAge(birthday) {
			/*
      Return age from birthday.
    */

			const birthdayArray = birthday.split(" ")

			const driverYear = parseInt(birthdayArray[2])
			const driverMonth = month[birthdayArray[1]]
			const driverDay = parseInt(birthdayArray[0])

			const todaysDate = new Date()
			const nowYear = todaysDate.getFullYear()
			const nowMonth = todaysDate.getMonth() + 1
			const nowDay = todaysDate.getDate()

			if (driverMonth < nowMonth) {
				return nowYear - driverYear
			} else if (driverMonth === nowMonth) {
				if (driverDay < nowDay) {
					return nowYear - driverYear
				} else {
					return nowYear - driverYear - 1
				}
			} else if (driverMonth > nowMonth) {
				return nowYear - driverYear - 1
			}
		},
		getPositionColor(position) {
			console.log("position", position)
			switch (position) {
				case "1st":
					return "gold"
					break
				case "2nd":
					return "silver"
					break
				case "3rd":
					return "bronze"
					break

				default:
					break
			}
		},
		getBorderColor(teamId) {
			switch (teamId) {
				case "red_bull":
					return "red-bull-border"
					break
				case "mclaren":
					return "mclaren-border"
					break
				case "mercedes":
					return "mercedes-border"
					break
				case "alfa_romeo":
					return "alpha-romeo-border"
					break
				case "alphatauri":
					return "alpha-tauri-border"
					break
				case "haas":
					return "haas-border"
					break
				case "alpine":
					return "alpine-border"
					break
				case "ferrari":
					return "ferrari-border"
					break
				case "williams":
					return "williams-border"
					break
				case "aston_martin":
					return "aston-martin-border"
					break
				default:
					break
			}
		},
		setShowToFalse(kind) {
			// Returns a value to the parent component.
			this.$emit("clicked", { status: false, kind: kind })
		},
		setShowToFalseModal(value) {
			// Sets chosen modal to returned value.

			switch (value.kind) {
				case "driver":
					this.showDriverModal = value.status
					break
				case "constructor":
					this.showConstructorModal = value.status
					break
			}
		},
	},
}
