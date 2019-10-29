import systemProcess from "./components/SystemProcess.vue"
import systemForm from "./components/SystemForm.vue"
import context from './components/Context.vue';
import app from './components/App.vue';
import systemHandle from './components/SystemHandle.vue'
import systemHiTaskDetail from './components/SystemHiTaskDetail.vue'
let routes = [{
    path: "/",
    component: context,
    children: [{
        path: "/systemProcess",
        component: systemProcess,
        name: "systemProcess"
      }
    ]
  },
  {
    path: "/systemForm",
    component: systemForm,
    name: "systemForm"
  }
,

  {
    path: "/systemHandle",
    component: systemHandle,
    name: "systemHandle"
  },
  {
    path: "/systemHiTaskDetail",
    component: systemHiTaskDetail,
    name: "systemHiTaskDetail"

  }


]


export default routes;
