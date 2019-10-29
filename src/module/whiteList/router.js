import whiteForm from "./components/WhiteForm.vue"
import context from './components/Context.vue';

let routes = [{
    path: "/",
    component: context,
    name: "context"
  },
  {
    path: "/whiteForm",
    component: whiteForm,
    name: "whiteForm",
    meta:{
      title:"操作页"
    }
  }
]


export default routes;
