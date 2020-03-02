import Context from './components/Context.vue'
import ResourcePoolForm from './components/ResourcePoolForm.vue'
import ResourcePoolDetail from './components/ResourcePoolDetail.vue'
import ResourcePoolTable from './components/ResourcePoolTable.vue'
import SdnSwitchInfo from './components/SdnSwitchInfo.vue';
import ResourcePoolBaseInfo from './components/ResourcePoolBaseInfo.vue';
import SecEquipInfo from './components/SecEquipInfo.vue';


let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/ResourcePoolTable',
    name : 'resourcePoolTable',
    component : ResourcePoolTable,
  },
  {
    path : '/ResourcePoolForm',
    name : 'resourcePoolForm',
    component : ResourcePoolForm
  },
  {
    path : '/ResourcePoolDetail/:id',
    name : 'resourcePoolDetail',
    component : ResourcePoolDetail,
    children:[
      {
        path: '/ResourcePoolBaseInfo',
        name: 'resourcePoolBaseInfo',
        component: ResourcePoolBaseInfo
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
