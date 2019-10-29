
import urlInfoForm from './components/BlackUrlInfoForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/urlInfoForm', component: urlInfoForm, name:'urlInfoForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
