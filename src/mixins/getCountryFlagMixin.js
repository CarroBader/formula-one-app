export default {
  methods: {
    getFlag(country) {
    /*
      Return the flag of the country sent as a param.
    */
      const convertedCountry = country.toLowerCase().replace(/ /g, `_`)
      console.log(`CARRO - convertedCountry`, convertedCountry)
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/img/flags/${convertedCountry}.png`)
    },
  },
}
