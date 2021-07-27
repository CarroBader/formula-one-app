<template>
<div>
  <b-navbar toggleable="md">
    <img src="../../assets/logo.png" class="nav-logo" alt="F1 logo">
    <b-navbar-brand class="nav-title">Formula One</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" class="items-far-right" is-nav>
        <b-navbar-nav>
            <router-link 
                v-for="route in routes" 
                :key="route.path"
                :to="route.path"
                class="nav-link">
            {{route.name}}
            </router-link>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      routes: this.$router.options.routes
    }
  }
}
</script>

<style scoped>
.navbar {
    background-color: #ff1616;
    border-bottom: 1px solid #fff;
    /* margin-bottom: 2em; */
    z-index: 10000;
}

.nav-title {
    font-family: 'Orbitron', 'sans-serif';
    color: #fff !important;
    text-shadow: 2px 2px #000;
}

.nav-link {
  font-family: 'Orbitron', 'sans-serif';
  text-decoration: none;
  text-shadow: 1.5px 1.5px #000;
  padding: 0px 0px;
}

.navbar-brand {
    font-size: 2rem;
}

.nav-logo {
        margin: 0 0.5em;
}

.items-far-right {
    justify-content: flex-end;
}
</style>

