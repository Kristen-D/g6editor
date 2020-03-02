import Context from './components/Context.vue'
import ImageDetail from './components/ImageDetail.vue'
import ImageTable from './components/ImageTable.vue'
import ImageBaseInfo from './components/ImageBaseInfo.vue';


let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/ImageTable',
    name : 'imageTable',
    component : ImageTable,
  },
  {
    path : '/ImageDetail/:id',
    name : 'imageDetail',
    component : ImageDetail,
    children:[
      {
        path: '/ImageBaseInfo',
        name: 'imageBaseInfo',
        component: ImageBaseInfo
      }
    ]
  }
];

export default routes;
