export default {
  methods: {
    getImageMixin(folder, img) {
    /*
      Returns a image based on the params.
    */
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`./assets/img/${folder}/${img}.png`)
    },
  },
}
