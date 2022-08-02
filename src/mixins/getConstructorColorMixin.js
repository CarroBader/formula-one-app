export default {
  methods: {
    getConstructorColor(id) {
      /*
      Get constructor color from an id.
      Return a color name that macthes a class in main.css.
    */
      let colorName

      switch (id) {
        case 'mclaren':
        case 'lando_norris':
        case 'daniel_ricciardo':
          colorName = 'mclaren'
          break
        case 'red_bull':
        case 'max_verstappen':
        case 'sergio_perez':
          colorName = 'red-bull'
          break
        case 'mercedes':
        case 'lewis_hamilton':
        case 'george_russell':
          colorName = 'mercedes'
          break
        case 'alfa_romeo':
        case 'zhou_guanyu':
        case 'valtteri_bottas':
          colorName = 'alpha-romeo'
          break
        case 'alphatauri':
        case 'pierre_gasly':
        case 'yuki_tsunoda':
          colorName = 'alpha-tauri'
          break
        case 'haas':
        case 'mick_schumacher':
        case 'kevin_magnussen':
          colorName = 'haas'
          break
        case 'alpine':
        case 'fernando_alonso':
        case 'esteban_ocon':
          colorName = 'alpine'
          break
        case 'ferrari':
        case 'charles_leclerc':
        case 'carlos_sainz':
          colorName = 'ferrari'
          break
        case 'williams':
        case 'alexander_albon':
        case 'nicholas_latifi':
          colorName = 'williams'
          break
        case 'aston_martin':
        case 'lance_stroll':
        case 'sebastian_vettel':
          colorName = 'aston-martin'
          break
        case 'lotus':
          colorName = 'lotus'
          break
        case 'brawn':
          colorName = 'brawn'
          break
        case 'renault':
          colorName = 'renault'
          break
        case 'toro_rosso':
          colorName = 'torro-rosso'
          break
        case 'sauber':
          colorName = 'sauber'
          break
        case 'racing_point':
          colorName = 'racing-point'
          break
        case 'honda':
          colorName = 'honda'
          break
        default:
          colorName = ''
      }
      return colorName
    },
    convertConstructorName(teamName) {
      const teamId = teamName.replace(' ', '_').toLowerCase()
      return this.getConstructorColor(teamId)
    },
    getConstructorColorAndLink(teamId) {
      let className = ''

      switch (teamId) {
        case 'mclaren':
          className = 'mclaren-link'
          break
        case 'red_bull':
          className = 'red-bull-link'
          break
        case 'mercedes':
          className = 'mercedes-link'
          break
        case 'alfa_romeo':
          className = 'alpha-romeo-link'
          break
        case 'alphatauri':
          className = 'alpha-tauri-link'
          break
        case 'haas':
          className = 'haas-link'
          break
        case 'alpine':
          className = 'alpine-link'
          break
        case 'ferrari':
          className = 'ferrari-link'
          break
        case 'williams':
          className = 'williams-link'
          break
        case 'aston_martin':
          className = 'aston-martin-link'
          break
        default:
          className = ''
      }

      return className
    },
  },
}
