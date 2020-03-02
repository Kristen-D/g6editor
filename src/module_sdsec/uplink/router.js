import Context from './components/Context.vue'
import UplinkForm from './components/UplinkForm.vue'
import UplinkDetail from './components/UplinkDetail.vue'
import UplinkTable from './components/UplinkTable.vue'
import UplinkBaseInfo from './components/UplinkBaseInfo.vue';



let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/UplinkTable',
    name : 'uplinkTable',
    component : UplinkTable,
  },
  {
    path : '/UplinkForm',
    name : 'uplinkForm',
    component : UplinkForm
  },
  {
    path : '/UplinkDetail/:id',
    name : 'uplinkDetail',
    component : UplinkDetail,
    children:[
      {
        path: '/UplinkBaseInfo',
        name: 'uplinkBaseInfo',
        component: UplinkBaseInfo
      },

    ]
  },
];

export default routes;
