import Context from './components/Context.vue'
import secOverviewTable from './components/secOverviewTable.vue'

let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/secOverviewTable',
    name : 'overviewTable',
    component : secOverviewTable,
  },

];

export default routes;
