

import context from './components/Context.vue';
import blackIpInfoForm from './components/BlackIpInfoForm.vue';

const routes = [
  {path: '/', component: context, name:'context' },
  {path: '/blackIpInfoForm', component: blackIpInfoForm, name:'blackIpInfoForm' }
];

export default routes;
