import Context from './components/Context.vue'
import OperationOverviewDetail from './components/OperationOverviewDetail.vue'

let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/OperationOverviewDetail/:id',
    name : 'OperationOverviewDetail',
    component : OperationOverviewDetail
  }
];

export default routes;
