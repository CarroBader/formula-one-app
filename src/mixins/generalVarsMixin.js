export default {
  data() {
    return {
      // Size of breakpoint
      small: 544,
      medium: 768,
      large: 992,
      // Display or not
      none: 'display:none;',
      revert: 'display:revert;',
      // Long or Short version of text
      pointsLong: 'Points',
      pointsShort: 'Pts.',
      positionLong: 'Position',
      positionShort: 'Pos.',
      // Image folder names
      iconsFolder: 'icons',
      driversFolder: 'drivers',
      constructersFolder: 'constructers',
      // Variables used in Standings
      divsTopThree: ['first', 'second', 'third'],
      // Time and Date
      season: this.getYear(),
      year: this.getYear(),
    }
  },
  methods: {
    getYear() {
      const todaysDate = new Date()
      const year = todaysDate.getFullYear()
      return year
    },
  },
}
