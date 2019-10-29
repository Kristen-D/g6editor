import App from './components/App'
import store from './store'
import VueRouter from 'vue-router'

import routes from './router.js'
import common from 'components/js/common.js'
import axios from 'axios'

Vue.prototype.common = common
Vue.prototype.utils = common
Vue.prototype.$http = axios;

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
