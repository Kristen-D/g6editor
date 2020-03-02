
import productInfoForm from './components/ProductInfoForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/productInfoForm', component: productInfoForm, name:'productInfoForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
