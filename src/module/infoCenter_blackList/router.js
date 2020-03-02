import blackWhiteForm from "./components/BlackWhiteForm.vue"
import context from './components/Context.vue';

let routes = [{
    path: "/",
    component: context,
    name: "context"
  },
  {
    path: "/blackWhiteForm",
    component: blackWhiteForm,
    name: "blackWhiteForm"
  }



]


export default routes;
