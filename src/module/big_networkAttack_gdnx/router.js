import context from './components/Context.vue'
import alarmDetail from './components/AlarmDetail.vue';

const routes = [
  {path: '/', component: context, name:'context' },
  {path: '/alarmDetail', component: alarmDetail, name:'alarmDetail' }
];

export default routes;
