export default { 
  methods: {
    getColor: function(id) {
      let colorName;

      switch (id) {
        case "mclaren":
        case "norris":
        case "ricciardo":
          colorName = "mclaren";
          break;
        case "red_bull":
        case "max_verstappen":
        case "perez":
          colorName = "red-bull";
          break;
        case "mercedes":
        case "hamilton":
        case "bottas":
          colorName = "mercedes";
          break;
        case "alfa":
        case "raikkonen":
        case "giovinazzi":
          colorName = "alpha-romeo";
          break;
        case "alphatauri":
        case "gasly":
        case "tsunoda":
          colorName = "alpha-tauri";
            break;
        case "haas":
        case "mick_schumacher":
        case "mazepin":
          colorName = "haas";
            break;
        case "alpine":
        case "alonso":
        case "ocon":
          colorName = "alpine";
            break;
        case "ferrari":
        case "leclerc":
        case "sainz":
          colorName = "ferrari";
            break;
        case "williams":
        case "russell":
        case "latifi":
          colorName = "williams";
            break;
        case "aston_martin":
        case "stroll":
        case "vettel":
          colorName = "aston-martin";
            break;
        default:
          colorName = "";
      }
      return colorName;
    }
  }
}