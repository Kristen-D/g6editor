import context from './components/Context.vue';
import app from './components/App.vue';
import taskInspectForm from './components/form/TaskInspectForm.vue'
import mainForm from './components/form/MainForm.vue'
import taskInspectHandle from './components/TaskInspectHandle.vue'
import taskInspectInfo from './components/TaskInspectInfo.vue'
import mainHiTaskDetail from './components/detail/MainHiTaskDetail.vue'

let routes = [{
    path: "/",
    component: context,
    name: "context"
  },
  {
    path: "/mainForm",
    component: mainForm,
    name: "mainForm"
  },
  {
    path: "/taskInspectHandle",
    component: taskInspectHandle,
    name: "taskInspectHandle"
  },

  {
    path: "/taskInspectInfo",
    component: taskInspectInfo,
    name: "taskInspectInfo"
  },
  {
    path: "/mainHiTaskDetail",
    component: mainHiTaskDetail,
    name: "mainHiTaskDetail"
  }




]
export default routes;
