import App from './components/App'
import VueRouter from 'vue-router'
import routes from './router.js'
import common from 'components/js/common.js'

Vue.prototype.common = common
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
