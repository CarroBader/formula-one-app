<template>
  <div>
    <b-navbar toggleable="md">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
              <router-link 
                  v-for="route in routes" 
                  :key="route.path"
                  :to="route.path"
                  class="nav-link nav-link-race">
              {{route.name}}
              </router-link>
          </b-navbar-nav>
      </b-collapse>
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
.navbar {
  /* background-color: #ff1616; */
  background-color: #232323;
  /* border-bottom: 1px solid white; */
  z-index: 10000;
}

.nav-link-race {
  font-family: 'Orbitron', 'sans-serif';
  text-decoration: none;
  font-size: 1.2em;
  text-shadow: 2px 2px #000;
  padding: 0px;
  margin: 3px;
}
</style>

