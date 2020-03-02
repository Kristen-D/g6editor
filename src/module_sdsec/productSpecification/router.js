import Context from './components/Context.vue'
import ProductForm from './components/ProductForm.vue'
import ProductDetail from './components/ProductDetail.vue'
import ProductTable from './components/ProductTable.vue'
import SdnSwitchInfo from "./components/SdnSwitchInfo.vue";
import ProductBaseInfo from "./components/ProductBaseInfo.vue";
import SecEquipInfo from "./components/SecEquipInfo";


let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/ProductTable',
    name : 'productTable',
    component : ProductTable,
  },
  {
    path : '/ProductForm',
    name : 'productForm',
    component : ProductForm
  },
  {
    path : '/ProductDetail/:id',
    name : 'productDetail',
    component : ProductDetail,
    children:[
      {
        path: '/ProductBaseInfo',
        name: 'productBaseInfo',
        component: ProductBaseInfo
      },
      {
        path: '/SdnSwitchInfo',
        name: 'sdnSwitchInfo',
        component: SdnSwitchInfo
      },
      {
        path: '/SecEquipInfo',
        name: 'secEquipInfo',
        component: SecEquipInfo
      }
    ]
  },
];

export default routes;
