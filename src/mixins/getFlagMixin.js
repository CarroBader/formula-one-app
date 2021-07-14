export default { 
  methods: {
    getFlag: function(nationality) {
      let flag;
      
      switch (nationality) {
        case "Dutch":
            flag = "Netherlands";
            break;
        case "British":
            flag = "UK";
            break;
        case "Mexican":
            flag = "Mexico";
            break;
        case "Monegasque":
            flag = "Monaco";
            break;
        case "Spanish":
            flag = "Spain";
            break;
        case "Finnish":
            flag = "Finland";
            break;
        case "Australian":
            flag = "Australia";
            break;
        case "French":
            flag = "France";
            break;
        case "German":
            flag = "Germany";
            break;
        case "Canadian":
            flag = "Canada";
            break;
        case "Japanese":
            flag = "Japan";
            break;
        case "Italian":
            flag = "Italy";
            break;
        case "Russian":
            flag = "Russia";
            break;
        case "Austrian":
            flag = "Austria";
            break;
        case "American":
            flag = "USA";
            break;
        case "Swiss":
            flag = "Switzerland";
            break;
        default:
            flag = "";
      }
      return flag;
    }
  }
}