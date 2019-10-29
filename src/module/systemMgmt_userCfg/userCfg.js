import App from './components/App'
import store from './store'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import common from 'components/js/common.js'
Vue.prototype.common = common
import routes from './router.js'


const router = new VueRouter({
  routes
})

new Vue({
 el: '#app',
 router,
 store,
 render: h => h(App)
})
