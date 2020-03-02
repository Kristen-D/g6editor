import Context from './components/Context.vue'
import PurchasedServiceForm from './components/PurchasedServiceForm.vue'
import PurchasedServiceDetail from './components/PurchasedServiceDetail.vue'
import PurchasedServiceTable from './components/PurchasedServiceTable.vue'
import PurchasedServiceBaseInfo from "./components/PurchasedServiceBaseInfo.vue";


let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/PurchasedServiceTable',
    name : 'purchasedServiceTable',
    component : PurchasedServiceTable,
  },
  {
    path : '/PurchasedServiceForm',
    name : 'purchasedServiceForm',
    component : PurchasedServiceForm
  },
  {
    path : '/PurchasedServiceDetail/:id',
    name : 'purchasedServiceDetail',
    component : PurchasedServiceDetail,
    // children:[
    //
    // ]
  },
  {
    path: '/PurchasedServiceBaseInfo/:id',
    name: 'purchasedServiceBaseInfo',
    component: PurchasedServiceBaseInfo
  },
];

export default routes;
