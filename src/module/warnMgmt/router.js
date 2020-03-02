import warnMgmtInfo from "./components/WarnMgmtInfo.vue"
import warnMgmtForm from "./components/form/WarnMgmtForm.vue"
import warnMgmtHandle from './components/WarnMgmtHandle.vue'
import mainForm from './components/form/MainForm.vue'
import mainHiTaskDetail from './components/detail/MainHiTaskDetail.vue'
import context from './components/Context.vue';
import app from './components/App.vue';

let routes = [{
    path: "/",
    component: context,
    children: [{
        path: "/warnMgmtInfo",
        component: warnMgmtInfo,
        name: "warnMgmtInfo"
      }
    ]

  },{
    path: "/mainForm",
    component: mainForm,
    name: "mainForm"
  },
  {
    path: "/warnMgmtForm",
    component: warnMgmtForm,
    name: "warnMgmtForm",
    title:"预警表单"
  },
  {
    path: "/warnMgmtHandle",
    component: warnMgmtHandle,
    name: "warnMgmtHandle",
    title:"预警审批表单"
  },
  {
    path: "/mainHiTaskDetail",
    component: mainHiTaskDetail,
    name: "mainHiTaskDetail"
  }
]


export default routes;
