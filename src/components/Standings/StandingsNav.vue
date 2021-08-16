<template>
  <div>
    <b-navbar toggleable="md navbar-sub">
        <b-navbar-nav class="navbar-nav-sub">
            <router-link 
                v-for="route in routes" 
                :key="route.path"
                :to="route.path"
                class="nav-link nav-link-sub">
            {{route.name}}
            </router-link>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'StandingsNav',
  data() {
    return {
      routes: this.$router.options.routes[1].children
    }
  }
}
</script>

<style scoped>

</style>

