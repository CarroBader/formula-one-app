export default {
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
    }
  },
  created() {
    window.addEventListener(`resize`, this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener(`resize`, this.handleResize)
  },
  methods: {
    handleResize() {
    /*
      Assign current window size to varibles.
    */
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
    returnAltBySize(size, altOne, altTwo) {
    /*
      Returns the right alt by size.
    */
      const screenSize = this.window.width
      const sizeValue = size

      return screenSize > sizeValue ? altOne : altTwo
    },
  },
}
