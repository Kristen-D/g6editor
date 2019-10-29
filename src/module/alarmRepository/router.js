import alarmRepositoryForm from "./components/AlarmRepositoryForm.vue"
import context from './components/Context.vue';

let routes = [{
    path: "/",
    component: context,
    name: "context"
  },
  {
    path: "/alarmRepositoryForm",
    component: alarmRepositoryForm,
    name: "alarmRepositoryForm"
  }



]


export default routes;
