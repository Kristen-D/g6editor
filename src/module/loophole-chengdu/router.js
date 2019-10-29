import context from './components/Context.vue';
import App from './components/App.vue';
import detail from './components/detail.vue'

const routes = [
  {path: '/App', component:App, name:'App'},
  {path: '/', component: context, name:'context' },
  {path: '/detail', component: detail, name:'detail' },
];

export default routes;
