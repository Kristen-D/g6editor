import Context from './components/Context.vue'
import ServiceChainForm from './components/ServiceChainForm.vue'
import ServiceChainDetail from './components/ServiceChainDetail.vue'
import ServiceChainTable from './components/ServiceChainTable.vue'
import SdnSwitchInfo from "./components/SdnSwitchInfo.vue";
import ServiceChainBaseInfo from "./components/ServiceChainBaseInfo.vue";
import GraphInfo from "./components/GraphInfo.vue";


let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/ServiceChainTable',
    name : 'serviceChainTable',
    component : ServiceChainTable,
  },
  {
    path : '/ServiceChainForm',
    name : 'serviceChainForm',
    component : ServiceChainForm
  },
  {
    path : '/ServiceChainDetail/:id',
    name : 'serviceChainDetail',
    component : ServiceChainDetail,
    children:[
      {
        path: '/ServiceChainBaseInfo',
        name: 'serviceChainBaseInfo',
        component: ServiceChainBaseInfo
      },
      {
        path: '/GraphInfo',
        name: 'graphInfo',
        component: GraphInfo
      }]

  },
];

export default routes;
