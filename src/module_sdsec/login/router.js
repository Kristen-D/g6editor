import Context from './components/Context.vue';
import LoginMain from './components/LoginMain.vue';

let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/LoginMain',
    name : 'LoginMain',
    component : LoginMain,
  }
];

export default routes;
