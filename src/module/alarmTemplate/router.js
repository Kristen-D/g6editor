import alarmTemplateForm from "./components/AlarmTemplateForm.vue"
import context from './components/Context.vue';

let routes = [{
    path: "/",
    component: context,
    name: "context"
  },
  {
    path: "/alarmTemplateForm",
    component: alarmTemplateForm,
    name: "alarmTemplateForm"
  }



]


export default routes;
