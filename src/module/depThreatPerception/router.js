import context from './components/Context.vue';
import App from './components/App.vue'
import table2 from './components/table2.vue'

const routes = [
  {path: '/App', component:App, name:'App'},
  {path: '/', component: context, name:'context' },
  {path: '/table2',component: table2 , name:'table2'},
];

export default routes;
