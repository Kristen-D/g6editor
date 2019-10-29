
import userForm from './components/UserForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/userForm', component: userForm, name:'userForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
