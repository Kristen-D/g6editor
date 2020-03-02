import context from './components/Context.vue'
import App from './components/App.vue'
import alarmTable from './components/alarmTable.vue'
// import detail from './components/detail.vue'

const routes = [
  {path: '/App', component:App, name:'App'},
  {path: '/', component: context, name:'context' },
  {path:'/alarmTable',component:alarmTable, name:'alarmTable'},
  // {path:'/alarmTable/detail',component:detail, name:'detail'},
];

export default routes;
