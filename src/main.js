import Vue from 'vue'
import './registerServiceWorker'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

/* Icons */
// import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons/faGlobeEurope'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons/faFlagCheckered'
import router from './router'
import App from './App.vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)

library.add(faTable, faGlobeEurope, faFlagCheckered)
Vue.component(`font-awesome-icon`, FontAwesomeIcon)

delete Icon.Default.prototype.getIconUrl
const requiredIconRetinaUrl = require(`./assets/img/mapMarkers/position.png`)
const requiredIconUrl = require(`./assets/img/mapMarkers/position.png`)
const requiredShadowUrl = require(`leaflet/dist/images/marker-shadow.png`)

Icon.Default.mergeOptions({
  iconRetinaUrl: requiredIconRetinaUrl,
  iconUrl: requiredIconUrl,
  shadowUrrequiredIconUrll: requiredShadowUrl,
})

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount(`#app`)
