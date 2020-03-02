
// import assetInfoForm from './components/AssetInfoForm.vue';
import resourcePoolInfoForm from './components/resourcePoolInfoForm.vue';
import context from './components/Context.vue';

const routes = [
  // {path: '/assetInfoForm', component: assetInfoForm, name:'assetInfoForm' },
  {path: '/resourcePoolInfoForm', component: resourcePoolInfoForm, name:'resourcePoolInfoForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
