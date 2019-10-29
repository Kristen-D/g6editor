
import deviceInfoForm from './components/DeviceInfoForm.vue';
import context from './components/Context.vue';

const routes = [
  {path: '/deviceInfoForm', component: deviceInfoForm, name:'deviceInfoForm' },
  {path: '/', component: context, name:'context' }
];

export default routes;
