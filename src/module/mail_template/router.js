
import mailTemplateForm from './components/MailTemplateForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/mailTemplateForm', component: mailTemplateForm, name:'mailTemplateForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
