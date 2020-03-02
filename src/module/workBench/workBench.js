import App from './components/App'
import store from './store'
import VueRouter from 'vue-router'

import routes from './router.js'
import commonAjax from 'components/js/common.js'

Vue.prototype.utils = commonAjax

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
