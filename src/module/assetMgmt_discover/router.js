
import assetDiscoverdForm from './components/AssetDiscoverdForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/assetDiscoverdForm', component: assetDiscoverdForm, name:'assetDiscoverdForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
