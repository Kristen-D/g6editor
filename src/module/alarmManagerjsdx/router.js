import context from './components/Context.vue';
import alarmHandle from './components/AlarmHandle.vue'
const routes = [
  {
    path: "/alarmHandle",
    component: alarmHandle,
    name: "alarmHandle",
    title:"告警表单"
  },
  {
    path: '/',
    component: context,
    name: 'context'
  }
];

export default routes;
