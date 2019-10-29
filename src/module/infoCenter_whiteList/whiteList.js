import App from './components/App'
import store from './store'

import common from 'components/js/common.js'
import VueRouter from 'vue-router'
import routes from './router.js'
Vue.prototype.commonAjax = common

const router = new VueRouter({
  routes
})

new Vue({
 el: '#app',
 router,
 store,
 render: h => h(App)
})
