<template>
    <div class="footer-nav">
        <router-link 
            v-for="route in routes" 
            :key="route.path" 
            :to="route.path"
            class="bot-nav-link">
            <div class="text-icon">
                {{route.name}}
                <font-awesome-icon 
                :icon="['fas', route.icon]"/>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'BotNav',
  data() {
    return {
      routes: this.$router.options.routes
    }
  }
}
</script>

<style scoped>
.footer-nav {
    text-align: center;
    background-color: #121212;
    border-top: 1px solid #ff1616;
    bottom: 0;
    position: fixed;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-evenly;
}

.bot-nav-link {
    font-size: 1.2em;
    color: #666;
    text-decoration: none;
}

.text-icon {
    display: grid;
    text-align: -webkit-center;
    padding: 0.5em;
}

.router-link-active {
    color: white;
    
}
</style>

