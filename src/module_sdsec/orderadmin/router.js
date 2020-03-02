import Context from './components/Context.vue'

import OrderDetail from './components/OrderDetail.vue'
import OrderTable from './components/OrderTable.vue'
import OrderBaseInfo from "./components/OrderBaseInfo.vue";

import ServiceChainForm from "../serviceChain/components/ServiceChainForm";
import ServiceChainTable from "../serviceChain/components/ServiceChainTable";
import ServiceChainBaseInfo from "../serviceChain/components/ServiceChainBaseInfo";
import ServiceChainDetail from "../serviceChain/components/ServiceChainDetail";

import ProductTable from "../securityMarket/components/ProductTable.vue";
import PurchasedServiceDetail from "../PurchasedService/components/PurchasedServiceDetail";
import PurchasedServiceBaseInfo from "../PurchasedService/components/PurchasedServiceBaseInfo";
import PurchasedServiceTable from "../PurchasedService/components/PurchasedServiceTable";

let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/OrderTable',
    name : 'orderTable',
    component : OrderTable,
  },
  {
    path: '/ServiceChainForm',
    name: 'serviceChainForm',
    component: ServiceChainForm
  },
  {
    path: '/ServiceChainTable',
    name: 'serviceChainTable',
    component: ServiceChainTable
  },
  {
    path: '/ServiceChainDetail/:id',
    name: 'serviceChainDetail',
    component: ServiceChainDetail,
  },
  {
    path: '/ServiceChainBaseInfo',
    name: 'serviceChainBaseInfo',
    component: ServiceChainBaseInfo
  },
  {
    path : '/ProductTable',
    name : 'productTable',
    component : ProductTable
  },
  {
    path : '/OrderDetail/:id',
    name : 'orderDetail',
    component : OrderDetail,
  },
  {
    path: '/OrderBaseInfo/:id',
    name: 'orderBaseInfo',
    component: OrderBaseInfo
  },
  {
    path: '/purchasedServiceTable',
    name: 'purchasedServiceTable',
    component: PurchasedServiceTable,
  },
  {
    path: '/purchasedServiceDetail/:id',
    name: 'purchasedServiceDetail',
    component: PurchasedServiceDetail,
    children: [
      {
        path: '/PurchasedServiceBaseInfo',
        name: 'purchasedServiceBaseInfo',
        component: PurchasedServiceBaseInfo
      }
    ]
  },

];

export default routes;
