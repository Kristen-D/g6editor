
import vendorInfoForm from './components/VendorInfoForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/vendorInfoForm', component: vendorInfoForm, name:'vendorInfoForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
