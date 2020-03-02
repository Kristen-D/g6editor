
import assetInfoForm from './components/AssetInfoForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/assetInfoForm', component: assetInfoForm, name:'assetInfoForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
