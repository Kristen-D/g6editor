import Context from './components/Context.vue'
import JobDetail from './components/JobDetail.vue'
import JobTable from './components/JobTable.vue'
import JobBaseInfo from './components/JobBaseInfo.vue';


let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/JobTable',
    name : 'jobTable',
    component : JobTable,
  },
  {
    path: '/JobDetail/:id',
    name: 'jobDetail',
    component: JobDetail,
  },
  {
    path: '/JobBaseInfo/:id',
    name: 'jobBaseInfo',
    component: JobBaseInfo
  },
];

export default routes;
