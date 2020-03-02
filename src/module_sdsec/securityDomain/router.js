import Context from './components/Context.vue'
import SecurityDomainForm from './components/SecurityDomainForm.vue'
import SecurityDomainDetail from './components/SecurityDomainDetail.vue'
import SecurityDomainTable from './components/SecurityDomainTable.vue'
import SecurityDomainBaseInfo from './components/SecurityDomainBaseInfo.vue';


let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/SecurityDomainTable',
    name : 'securityDomainTable',
    component : SecurityDomainTable,
  },
  {
    path : '/SecurityDomainForm',
    name : 'securityDomainForm',
    component : SecurityDomainForm
  },
  {
    path : '/SecurityDomainDetail/:id',
    name : 'securityDomainDetail',
    component : SecurityDomainDetail,
  },
  {
    path: '/SecurityDomainBaseInfo',
    name: 'securityDomainBaseInfo',
    component: SecurityDomainBaseInfo
  },
];

export default routes;
