export default { 
  methods: {
    getCountryName(nationality) {
    /* 
      Convert nationality to respective country.
      Return a call to getFlag, where the image file path is complete.
    */
      let countryName
      
      switch (nationality) {
        case "Dutch":
            countryName = "Netherlands";
            break;
        case "British":
            countryName = "UK";
            break;
        case "Mexican":
            countryName = "Mexico";
            break;
        case "Monegasque":
            countryName = "Monaco";
            break;
        case "Spanish":
            countryName = "Spain";
            break;
        case "Finnish":
            countryName = "Finland";
            break;
        case "Australian":
            countryName = "Australia";
            break;
        case "French":
            countryName = "France";
            break;
        case "German":
            countryName = "Germany";
            break;
        case "Canadian":
            countryName = "Canada";
            break;
        case "Japanese":
            countryName = "Japan";
            break;
        case "Italian":
            countryName = "Italy";
            break;
        case "Russian":
            countryName = "Russia";
            break;
        case "Austrian":
            countryName = "Austria";
            break;
        case "American":
            countryName = "USA";
            break;
        case "Swiss":
            countryName = "Switzerland";
            break;
        default:
            countryName = "";
      }
      return this.getFlag(countryName)
    },
    getFlag(country) { 
    /*
      Return the flag of the country sent as a param.
    */
      return require(`../assets/img/flags/${country}.png`)
    }
  }
}
