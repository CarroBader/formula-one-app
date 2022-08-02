export default {
  methods: {
    getFlag(country) {
      /*
      Return the flag of the country sent as a param.
    */
      const convertedCountry = country.replace(/ /g, '_')
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`../assets/img/flags/${convertedCountry}.png`)
    },
  },
}
