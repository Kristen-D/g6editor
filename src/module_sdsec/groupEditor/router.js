//import Context from './components/Context'
//import G6 from './g6/components/G6Editor'
//import G6View from './g6/components/G6View'

const routes = [
  {
    path : '/',
    name : 'Context',
    //component : Context
    component:  r => require.ensure([], () => r(require('./components/Context')), 'playBookG6Context')
  },
  {
    path : '/G6',
    name : 'G6',
    //component : G6
    component:  r => require.ensure([], () => r(require('./g6/components/G6Editor')), 'playBookG6')
  },
  {
    path : '/G6View',
    name : 'G6View',
    component:  r => require.ensure([], () => r(require('./g6/components/G6View')), 'playBookG6')
    //component : G6View
  }
]

export default routes;
