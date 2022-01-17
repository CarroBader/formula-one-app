export default {
	methods: {
		getDateString(start, end) {
			/*
        Example:
        Input - ('2021-09-10', '2021-09-12')
        Return - 10 September - 12 September
      */
			const startDateDay = this.getDateDay(start)
			const endDateDay = this.getDateDay(end)

			const startMonthName = this.getMonthName(start, "long")
			const endMonthName = this.getMonthName(end, "long")

			return `${startDateDay} ${startMonthName} - ${endDateDay} ${endMonthName}`
		},
		getFormattedDayAndTime(session) {
			/*
        Exemple:
        Input - { id:1337, session_name: `Practice 1`, date: `2021-09-10T12:30:00+00:00` }
        Return - { sessionName: `Practice 1`, dayName: `Fri`, startTime: `14:30`, endTime: `15:30` }
      */
			return {
				sessionName: session.session_name,
				dayName: this.getDayName(session.date, "short"),
				startTime: this.getFormattedTime(session.date),
				endTime: this.getFormattedEndTime(session.date, session.session_name),
			}
		},
		getFormattedTime(date) {
			/*
      Example:
      Input - (`2021-09-10T12:30:00+00:00`)
      Return - 14:30
    */
			const formatedDate = new Date(date)
			return `${formatedDate.getHours()}:${
				formatedDate.getMinutes() < 10 ? "0" : ""
			}${formatedDate.getMinutes()}`
		},
		getFormattedEndTime(date, sessionName) {
			/*
      Example:
      Input - (`2021-09-10T12:30:00+00:00`, `Practice 1`)
      Return - 15:30
    */
			let hoursToAdd

			if (sessionName === "Race") {
				return ""
			}

			if (sessionName === "Sprint Qualifying") {
				hoursToAdd = 30
			} else {
				hoursToAdd = 60
			}

			const formatedDate = new Date(date)

			const time = this.addTime(formatedDate, hoursToAdd)

			return `- ${time.getHours()}:${
				time.getMinutes() < 10 ? "0" : ""
			}${time.getMinutes()}`
		},
		addTime(date, timeToAdd) {
			return new Date(date.getTime() + timeToAdd * 60000)
		},
		getMonthName(date, length) {
			/*
      Param length:
        `long` - September
        `short` - Sept
      Example:
      Input - (`2021-09-10T12:30:00+00:00`, `long`)
      Return - September
    */
			const formatedDate = new Date(date)
			return formatedDate.toLocaleString("default", { month: `${length}` })
		},
		getDayName(date, length) {
			/*
      Param length:
        `long` - Friday
        `short` - Fri
      Example:
      Input - (`2021-09-10T12:30:00+00:00`, `short`)
      Return - Fri
    */
			const formatedDate = new Date(date)
			return formatedDate.toLocaleString("default", { weekday: `${length}` })
		},
		getDateDay(date) {
			/*
      Example:
      Input - (`2021-09-10T12:30:00+00:00`)
      Return - 10
    */
			const formatedDate = new Date(date)
			return formatedDate.getDate()
		},
	},
}
