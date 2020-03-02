import Router from './components/Router';
import Main from './components/Main';
import Context from './components/Context';
import Tasks from './components/Tasks';
import Editor from './components/Editor';
import Flow from './components/Flow' 

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Main, children: [
      { path: '/context', component: Context },
      { path: '/flow', component: Flow }
    ] },
    { path: '/tasks', component: Tasks },
    { path: '/editor', component: Editor }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(Router)
})
