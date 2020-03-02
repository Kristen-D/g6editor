import netLinkAccessForm from "./components/NetLinkAccessForm.vue"
import context from './components/Context.vue';

let routes = [{
    path: "/",
    component: context,
    name: "context"
  },
  {
    path: "/netLinkAccessForm",
    component: netLinkAccessForm,
    name: "netLinkAccessForm"
  }



]


export default routes;
