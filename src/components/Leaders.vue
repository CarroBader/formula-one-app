<template>
  <div>
    <h1>Leaders</h1>
      <img 
        :src='getDriverPhoto()'
        class='driver-img'
      />
      <img 
        :src='getConstructersPhoto()'
        class='constructor-img'
      />
  </div>
</template>

<script>

export default {
    name: 'Leaders',
    props: {
      leaderDriver: Object,
      leaderConstructor: Object
    },
    mounted() {
    },
    methods: {
      getDriverPhoto() {
        return require(`../assets/img/drivers/${this.leaderDriver.Driver.code}.png`)
      },
      getConstructersPhoto() {
        return require(`../assets/img/constructers/${this.leaderConstructor.Constructor.constructorId}.png`)
      }
    }
}
</script>

<style scoped>
  .driver-img{
    height: 10em;
    width: 10em;
  }

  .constructor-img{
    width: 20em;
  }

</style>
