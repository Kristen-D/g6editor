import Context from './components/Context.vue'
import ProductForm from './components/ProductForm.vue'
import ProductDetail from './components/ProductDetail.vue'
import ProductTable from './components/ProductTable.vue'
import ProductBaseInfo from "./components/ProductBaseInfo.vue";
import SDSecComponentBackground from "./components/SDSec-component-background.vue"


import OrderTable from "../orderadmin/components/OrderTable";
import OrderDetail from "../orderadmin/components/OrderDetail";
import OrderForm from "../orderadmin/components/OrderForm";
import OrderBaseInfo from "../orderadmin/components/OrderBaseInfo";
import PurchaseFirewall from "./components/PurchaseFirewall";


let routes = [
  {
    path: '/',
    name: 'context',
    component: Context
  },
  {
    path: '/ProductTable',
    name: 'productTable',
    component: ProductTable,
  },
    {
      path: '/PurchaseFirewall/:id',
      name: 'purchaseFirewall',
      component: PurchaseFirewall,
    },
  {
    path: '/ProductForm',
    name: 'productForm',
    component: ProductForm
  },
  {
    path: '/ProductDetail/:id',
    name: 'productDetail',
    component: ProductDetail,
  },
  {
    path: '/ProductBaseInfo',
    name: 'productBaseInfo',
    component: ProductBaseInfo
  },
  {
    path: '/SDSec-component-background',
    name: 'sdSecComponentBackground',
    component: SDSecComponentBackground
  },

{
  // path : 'src/module_sdsec/web/order/components/OrderForm',
    path : '/OrderForm',
    name: 'orderForm',
    component: OrderForm
}
,
{
    path : '/OrderTable',
    name: 'orderTable',
    component: OrderTable,
}
,
{
    path: '/OrderDetail/:id',
    name: 'orderDetail',
    component: OrderDetail,
}
,
{
    path: '/OrderBaseInfo',
    name: 'orderBaseInfo',
    component: OrderBaseInfo,
}
]
;

export default routes;
