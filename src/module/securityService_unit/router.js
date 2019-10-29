import unitList from "./components/UnitList.vue"
import unitForm from "./components/UnitForm.vue"
import context from './components/Context.vue';
import app from './components/App.vue';
import unitDetail from './components/UnitDetail.vue'
let routes = [{
    path: "/",
    component: context,
    children: [{
        path: "/unitList",
        component: unitList,
        name: "unitList"
      }
    ]
  },
  {
    path: "/unitForm",
    component: unitForm,
    name: "unitForm"
  }
,
  {
    path: "/unitDetail",
    component: unitDetail,
    name: "unitDetail"

  }


]


export default routes;
