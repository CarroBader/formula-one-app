<template>
  <div class="default-background-center">
    <Header />
    <router-view/>
    <Footer />
    <BotNav />
  </div>
</template>

<script>
import Header from './components/General/Header'
import Footer from './components/General/Footer'
import BotNav from './components/General/BotNav'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    BotNav
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
