<template>
  <div>
    <b-navbar toggleable="md navbar-standings">
        <b-navbar-nav class="navbar-nav-standings">
            <router-link 
                v-for="route in routes" 
                :key="route.path"
                :to="route.path"
                class="nav-link nav-link-standings">
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
.navbar-standings {
  background-color: #232323;
  z-index: 10000;
  padding: 2px 0;
}

.nav-link-standings {
  font-family: 'Orbitron', 'sans-serif';
  text-decoration: none;
  text-shadow: 2px 2px #000;
}
</style>

