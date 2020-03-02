import Context from './components/Context.vue'
import InstanceForm from './components/InstanceForm.vue'
import InstanceDetail from './components/InstanceDetail.vue'
import InstanceTable from './components/InstanceTable.vue'
import InstanceBaseInfo from './components/InstanceBaseInfo.vue';


let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/InstanceTable',
    name : 'instanceTable',
    component : InstanceTable,
  },
  {
    path : '/InstanceForm',
    name : 'instanceForm',
    component : InstanceForm
  },
  {
    path : '/InstanceDetail/:id',
    name : 'instanceDetail',
    component : InstanceDetail,
    children:[
      {
        path: '/InstanceBaseInfo',
        name: 'instanceBaseInfo',
        component: InstanceBaseInfo
      },
    ]
  },
];

export default routes;
