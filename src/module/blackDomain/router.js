

import context from './components/Context.vue';
import blackDomainInfoForm from './components/BlackDomainInfoForm.vue';
import whoIsForm from './components/WhoIsForm.vue';
const routes = [
  {path: '/', component: context, name:'context' },
  {path: '/blackDomainInfoForm', component: blackDomainInfoForm, name:'blackDomainInfoForm' },
  {path: '/whoIsForm', component: whoIsForm, name:'whoIsForm' },
];

export default routes;
