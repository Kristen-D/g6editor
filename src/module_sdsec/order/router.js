import Context from './components/Context.vue'
import OrderForm from './components/OrderForm.vue'
import OrderDetail from './components/OrderDetail.vue'
import OrderTable from './components/OrderTable.vue'
import OrderBaseInfo from "./components/OrderBaseInfo.vue";
import ServiceChainForm from "../serviceChain/components/ServiceChainForm.vue";
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
    path : '/OrderForm',
    name : 'orderForm',
    component : OrderForm
  },
  {
    path : '/ProductTable',
    name : 'productTable',
    component : ProductTable
  },
  {
    path: '/OrderDetail/:id',
    name: 'orderDetail',
    component: OrderDetail,
    children: [
      {
        path: '/OrderBaseInfo',
        name: 'orderBaseInfo',
        component: OrderBaseInfo
      }
    ]
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
  {
    path: '/SecChainForm',
    name: 'secChainForm',
    component: ServiceChainForm
  },

  ];

export default routes;
