import context from './components/Context.vue';
import noticeInfoForm from "./components/NoticeInfoForm.vue"
import noticeHandle from './components/NoticeHandle.vue'
import noticeHiTaskDetail from './components/NoticeHiTaskDetail.vue'
const routes = [{
    path: '/noticeInfoForm',
    component: noticeInfoForm,
    name: 'noticeInfoForm'
  },
  {
    path: "/noticeHandle",
    component: noticeHandle,
    name: "noticeHandle",
    title:"通知审批表单"
  },
  {
    path: "/noticeHiTaskDetail",
    component: noticeHiTaskDetail,
    name: "noticeHiTaskDetail"
  },
  {
    path: '/',
    component: context,
    name: 'context'
  }
];

export default routes;
