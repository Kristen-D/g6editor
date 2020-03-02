
import productTypeForm from './components/ProductTypeForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/productTypeForm', component: productTypeForm, name:'productTypeForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
