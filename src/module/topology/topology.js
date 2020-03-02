import Home from './views/Home';
import Main from './views/Main';
import Group from './views/Group';
import Link from './views/Link';
import Node from './views/Node';
import Image from './views/Images';
import Servicer from './views/Servicer';
import Preview from './views/Preview';
import JsonPreview from './views/JsonPreview';
import Edit from './views/Edit';
import commonAjax from 'components/js/common.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.prototype.common = commonAjax

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/image', component: Image},
    { path: '/node', component: Node },
    { path: '/servicer', component: Servicer},
    { path: '/link', component: Link },
    { path: '/group', component: Group },
    { path: '/edit', component: Edit },
    { path: '/preview', component: Preview },
    { path: '/jsonPreview', component: JsonPreview}
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(Main)
})
