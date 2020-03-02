
import reportTemplateForm from './components/ReportTemplateForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/reportTemplateForm', component: reportTemplateForm, name:'reportTemplateForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
