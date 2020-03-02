import Context from './components/Context.vue'
import MirrorDetail from './components/MirrorDetail.vue'
import MirrorTable from './components/MirrorTable.vue'
import MirrorBaseInfo from './components/MirrorBaseInfo.vue';


let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/MirrorTable',
    name : 'mirrorTable',
    component : MirrorTable,
  },
  {
    path : '/MirrorDetail/:id',
    name : 'mirrorDetail',
    component : MirrorDetail,
    children:[
      {
        path: '/MirrorBaseInfo',
        name: 'mirrorBaseInfo',
        component: MirrorBaseInfo
      }
    ]
  }
];

export default routes;
