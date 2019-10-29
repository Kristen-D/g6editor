import Router from './components/Router';
import VueRouter from 'vue-router';
Vue.use(VueRouter) 
const Main = r => require.ensure([], () => r(require('./components/Main.vue')), 'Main');
const Context  = r => require.ensure([], () => r(require('./views/Context.vue')), 'Context');
const Tasks  = r => require.ensure([], () => r(require('./views/Tasks.vue')), 'Tasks');
const Editor  = r => require.ensure([], () => r(require('./views/Editor.vue')), 'Editor');
const Flow  = r => require.ensure([], () => r(require('./views/Flow.vue')), 'Flow');
const OutputManager  = r => require.ensure([], () => r(require('./views/OutputManager.vue')), 'OutputManager');
const InputManager = r => require.ensure([], () => r(require('./views/InputManager.vue')), 'InputManager'); 
const ProcessManager = r => require.ensure([], () => r(require('./views/ProcessManager.vue')), 'ProcessManager'); 
const ModelManager = r => require.ensure([], () => r(require('./views/ModelManager.vue')), 'ModelManager'); 


const router = new VueRouter({
  routes: [
    { path: '/', component: Main, children: [
      { path: '/', component: Context },
      { path: '/context', component: Context },
      { path: '/flow', component: Flow },
      { path: '/tasks', component: Tasks },
      { path: '/output', component: OutputManager },
      { path: '/input', component: InputManager },
      { path: '/process', component: ProcessManager },
      { path: '/model', component: ModelManager}
    ] },
    { path: '/editor', component: Editor }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(Router)
})
