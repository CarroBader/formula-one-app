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
	},
}
