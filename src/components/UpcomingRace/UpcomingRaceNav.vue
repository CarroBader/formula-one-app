<template>
  <div>
    <b-navbar toggleable="md navbar-upcoming">
        <b-navbar-nav class="navbar-nav-upcoming">
            <router-link 
                v-for="route in routes" 
                :key="route.path"
                :to="route.path"
                class="nav-link nav-link-upcoming">
            {{route.name}}
            </router-link>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'UpcomingRaceNav',
  data() {
    return {
      routes: this.$router.options.routes[0].children
    }
  }
}
</script>

<style scoped>
.navbar-upcoming {
  background-color: #232323;
  z-index: 10000;
  padding: 2px 0;
}

.nav-link-upcoming {
  font-family: 'Orbitron', 'sans-serif';
  text-decoration: none;
  text-shadow: 2px 2px #000;
}
</style>

