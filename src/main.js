import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Db from './db'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faTable, faCog, faCube, faTrash, faRandom } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'

Vue.config.productionTip = false
Vue.use(Db)
library.add(faUserSecret, faTable, faCog, faCube, faFacebook, faGoogle, faTwitter, faTrash, faRandom)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
