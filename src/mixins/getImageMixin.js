export default {
  methods: {
    getImageMixin(folder, img) {
    /*
      Returns a image based on the params.
    */
      return require(`../assets/img/${folder}/${img}.png`)
    },
  },
}
