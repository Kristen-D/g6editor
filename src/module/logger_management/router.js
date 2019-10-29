
import logoperation from './components/LogOperation.vue';
import logthreshold from './components/LogThreshold.vue';
import LogDetails from './components/LogDetails.vue';

const routes = [
  {path: '/logoperation', component: logoperation, name:'logoperation' },
  {path: '/logthreshold', component: logthreshold, name:'logthreshold' },
  {path: '/LogDetails', component: LogDetails, name:'LogDetails' }
  
];

export default routes;
