import context from './components/Context.vue';
import app from './components/App.vue';
import evaluationOrganForm from './components/form/EvaluationOrganForm.vue'
import mainForm from './components/form/MainForm.vue'
import evaluationOrganHandle from './components/EvaluationOrganHandle.vue'
import evaluationOrganInfo from './components/EvaluationOrganInfo.vue'

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
    path: "/evaluationOrganHandle",
    component: evaluationOrganHandle,
    name: "evaluationOrganHandle"
  },

  {
    path: "/evaluationOrganInfo",
    component: evaluationOrganInfo,
    name: "evaluationOrganInfo"
  },




]
export default routes;
