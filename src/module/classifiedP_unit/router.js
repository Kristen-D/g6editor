import unitProcess from "./components/UnitProcess.vue"
import unitForm from "./components/UnitForm"
import context from './components/Context.vue';
import app from './components/App.vue';
import unitHandle from './components/UnitHandle.vue'
import unitHiTaskDetail from './components/UnitHiTaskDetail.vue'

let routes = [{
    path: "/",
    component: context,
    children: [{
        path: "/unitProcess",
        component: unitProcess,
        name: "unitProcess",
        title:"单位备案"
      }
    ]

  },
  {
    path: "/unitForm",
    component: unitForm,
    name: "unitForm",
    title:"单位备案表单"
  },

  {
    path: "/unitHandle",
    component: unitHandle,
    name: "unitHandle"
  },
  {
    path: "/unitHiTaskDetail",
    component: unitHiTaskDetail,
    name: "unitHiTaskDetail"

  }

]


export default routes;
