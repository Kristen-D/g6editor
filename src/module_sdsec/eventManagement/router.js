import Context from './components/Context.vue'
import EventTable from './components/EventTable'
import EventConfirm from './components/EventConfirm'


let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/EventTable',
    name : 'EventTable',
    component : EventTable,
  },
  {
    path : '/EventConfirm',
    name : 'EventConfirm',
    component : EventConfirm
  },
];

export default routes;
