 import App from './components/App'
import store from './store'
import routes from './router.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import commonAjax from 'components/js/common.js'

const router = new VueRouter({
  routes
})

Vue.prototype.commonAjax = commonAjax
Vue.prototype.common = commonAjax
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
