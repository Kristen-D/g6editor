
import context from './components/Context.vue'
import flow from './components/ZrenderFlow.vue'
import center from './components/Center.vue'
import config from './components/DispatchForm.vue'

const routes = [
  {path: '/', component: context, name:'context' },
  {path: '/zrender',component:flow,name:'zrender'},
  {path: '/center',component:center,name:'center'},
  {path: '/config',component:config,name:'config'}
];

export default routes;
