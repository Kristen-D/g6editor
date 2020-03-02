
import dynamicContext from './components/DynamicContext.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/dynamicContext', component: dynamicContext, name:'dynamicContext' },
  {path: '/', component: context, name:'context' }
];

export default routes;
