import alarmInterfaceForm from "./components/AlarmInterfaceForm.vue"
import context from './components/Context.vue';

let routes = [{
    path: "/",
    component: context,
    name: "context"
  },
  {
    path: "/alarmInterfaceForm",
    component: alarmInterfaceForm,
    name: "alarmInterfaceForm"
  }



]


export default routes;
