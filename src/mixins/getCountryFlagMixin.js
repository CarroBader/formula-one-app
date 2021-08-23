export default { 
  methods: {
    getCountryFlag: function(nationality) {
    /* 
      Return img of the flag that corresponds with nationality.
    */
      let country
      
      switch (nationality) {
        case "Dutch":
            country = "Netherlands";
            break;
        case "British":
            country = "UK";
            break;
        case "Mexican":
            country = "Mexico";
            break;
        case "Monegasque":
            country = "Monaco";
            break;
        case "Spanish":
            country = "Spain";
            break;
        case "Finnish":
            country = "Finland";
            break;
        case "Australian":
            country = "Australia";
            break;
        case "French":
            country = "France";
            break;
        case "German":
            country = "Germany";
            break;
        case "Canadian":
            country = "Canada";
            break;
        case "Japanese":
            country = "Japan";
            break;
        case "Italian":
            country = "Italy";
            break;
        case "Russian":
            country = "Russia";
            break;
        case "Austrian":
            country = "Austria";
            break;
        case "American":
            country = "USA";
            break;
        case "Swiss":
            country = "Switzerland";
            break;
        default:
            country = "";
      }
      return require(`../assets/img/flags/${country}.png`)
    }
  }
}
