import App from './components/App'
import store from './store'

import common from 'components/js/common.js'
import VueRouter from 'vue-router'
import routes from './router.js'
Vue.prototype.commonAjax = common

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  next()//执行进入路由，如果不写就不会进入目标页
})
new Vue({
 el: '#app',
 router,
 store,
 render: h => h(App)
})
