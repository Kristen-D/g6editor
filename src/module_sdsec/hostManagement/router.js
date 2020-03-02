import Context from './components/Context.vue'
import HostTable from './components/HostTable.vue'

let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/HostTable',
    name : 'hostTable',
    component : HostTable,
  },

];

export default routes;
