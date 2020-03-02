import context from './components/Context.vue';
import app from './components/App.vue';
import mainForm from './components/form/MainForm.vue'
import caseInvestigateHandle from './components/CaseInvestigateHandle.vue'
import mainHiTaskDetail from './components/detail/MainHiTaskDetail.vue'
import selectView from './components/CaseInvestigateHandle.vue'
import eventMgmtHandle from '../eventMgmt/components/EventMgmtHandle.vue'



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
    path: "/caseInvestigateHandle",
    component: caseInvestigateHandle,
    name: "caseInvestigateHandle"
  },
  {
    path: "/mainHiTaskDetail",
    component: mainHiTaskDetail,
    name: "mainHiTaskDetail"
  },{
    path: "/selectView",
    component: selectView,
    name: "selectView"

  },{
    path: "/eventMgmtHandle",
    component: eventMgmtHandle,
    name: "eventMgmtHandle"

  }
]
export default routes;
