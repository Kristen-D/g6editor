import context from './components/Context.vue';
import alarmInfoForm from "./components/AlarmInfoForm.vue"
import alarmHandle from './components/AlarmHandle.vue'
import AlarmHiTaskDetail from './components/AlarmHiTaskDetail.vue'
const routes = [{
    path: '/alarmInfoForm',
    component: alarmInfoForm,
    name: 'alarmInfoForm'
  },
  {
    path: "/alarmHandle",
    component: alarmHandle,
    name: "alarmHandle",
    title:"告警表单"
  },
  {
    path: "/AlarmHiTaskDetail",
    component: AlarmHiTaskDetail,
    name: "AlarmHiTaskDetail"
  },
  {
    path: '/',
    component: context,
    name: 'context'
  }
];

export default routes;
