import eventMgmtProcess from "./components/EventMgmtProcess.vue"
import context from './components/Context.vue';
import app from './components/App.vue';
import eventMgmtHandle from './components/EventMgmtHandle.vue'
import mainHiTaskDetail from './components/detail/MainHiTaskDetail.vue'
import eventMgmtInfo from './components/EventMgmtInfo.vue'
import technicalHandle from '../technical/components/TechnicalHandle.vue'
import mainForm from './components/form/MainForm.vue'


let routes = [{
    path: "/",
    component: context
  },
  {
    path: "/eventMgmtInfo",
    component: eventMgmtInfo,
    name: "eventMgmtInfo"
  },

  {
    path: "/eventMgmtHandle",
    component: eventMgmtHandle,
    name: "eventMgmtHandle"
  },
  {
    path: "/mainHiTaskDetail",
    component: mainHiTaskDetail,
    name: "mainHiTaskDetail"
  },
  {
    path: "/mainForm",
    component: mainForm,
    name: "mainForm"
  },{
    path:"/technicalHandle",
    components:technicalHandle,
    name:"technicalHandle"
  }
  //resolve => require(['../technical/components/TechnicalHandle.vue'],resolve),
]


export default routes;
