<template>
    <b-navbar toggleable="md navbar-top">
      <img
        src="../../assets/logo.png"
        class="nav-logo-top" alt="F1 logo"
      >
      <b-navbar-brand class="nav-title-top">Formula One</b-navbar-brand>

      <b-navbar-toggle class="place-toggle-button" target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="nav-collapse-top" is-nav>
          <b-navbar-nav class="navbar-nav-top">
              <router-link
                v-for="route in routes"
                :key="route.path"
                :to="route.path"
                class="nav-link nav-link-top"
              >
                {{ route.name }}
              </router-link>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: `TopNav`,
  data() {
    return {
      routes: this.$router.options.routes,
    }
  },
  props: {
    nextRaceName: String,
  },
  beforeMount() {
    this.routes[0].name = this.nextRaceName
  },
}
</script>

<style scoped>
  .navbar-top {
    background-color: #e10600;
    border-bottom: 1px solid #fff;
    z-index: 10000;
  }

  .nav-collapse-top {
    justify-content: flex-end;
  }

  .nav-title-top {
    font-family: 'Orbitron', 'sans-serif';
    color: #fff !important;
    text-shadow: 2px 2px #000;
  }

  .nav-logo-top {
    margin: 0 0.5em;
  }

  .items-far-right {
    justify-content: flex-end;
  }

  .place-toggle-button {
    position: absolute;
    right: 5px;
    top: 2.5px;
  }
</style>
