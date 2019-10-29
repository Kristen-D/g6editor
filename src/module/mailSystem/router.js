import mailSystemForm from "./components/MailSystemForm.vue"
import context from './components/Context.vue';

let routes = [{
    path: "/",
    component: context,
    name: "context"
  },
  {
    path: "/mailSystemForm",
    component: mailSystemForm,
    name: "mailSystemForm"
  }



]


export default routes;
