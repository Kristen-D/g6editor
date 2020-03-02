import Vue from 'vue'
import App from './components/App'
import VueRouter from 'vue-router'
import routes from './router.js'
import common from 'components/js/common.js'
import store from './store'
Vue.prototype.utils = common
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