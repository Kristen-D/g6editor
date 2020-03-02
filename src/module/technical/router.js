import context from './components/Context.vue';
import app from './components/App.vue';
import technicalForm from './components/form/TechnicalForm.vue'
import mainForm from './components/form/MainForm.vue'
import technicalHandle from './components/TechnicalHandle.vue'
import technicalInfo from './components/TechnicalInfo.vue'
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
    path: "/technicalHandle",
    component: technicalHandle,
    name: "technicalHandle"
  },

  {
    path: "/technicalInfo",
    component: technicalInfo,
    name: "technicalInfo"
  },
  {
    path: "/mainHiTaskDetail",
    component: mainHiTaskDetail,
    name: "mainHiTaskDetail"
  }




]
export default routes;
