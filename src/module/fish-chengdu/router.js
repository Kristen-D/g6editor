import context from './components/Context.vue'
import App from './components/App.vue'

const routes = [
  {path: '/App', component:App, name:'App'},
  {path: '/', component: context, name:'context' },
];

export default routes;
