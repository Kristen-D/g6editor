import Context from './components/Context.vue'
import SysLogTable from './components/SysLogTable.vue'

let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/SysLogTable',
    name : 'sysLogTable',
    component : SysLogTable,
  },

];

export default routes;
