import blackForm from "./components/BlackForm.vue"
import context from './components/Context.vue';

let routes = [{
    path: "/",
    component: context,
    name: "context",
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/blackForm",
    component: blackForm,
    name: "blackForm",
    meta:{
      title:"操作页"
    }
  }



]


export default routes;
