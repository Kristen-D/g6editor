
import mailnotifyForm from './components/MailnotifyForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/mailnotifyForm', component: mailnotifyForm, name:'mailnotifyForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
