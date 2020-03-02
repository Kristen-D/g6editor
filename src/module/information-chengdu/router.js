import context from './components/Context.vue'
import App from './components/App.vue'
import infoForm from './components/infoForm.vue'
import preview from './components/preview.vue'

const routes = [
  {path: '/App', component:App, name:'App'},
  {path: '/', component: context, name:'context' },
  {path: '/infoForm', component: infoForm, name:'infoForm' },
  {path: '/preview', component: preview, name:'preview' },
];

export default routes;
