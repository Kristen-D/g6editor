import context from './components/Context.vue';
import taskForm from "./components/TaskForm.vue"
import vulTaskForm from "./components/VulTaskForm.vue"
const routes = [{
    path: '/taskForm',
    component: taskForm,
    name: 'taskForm'
  },
  {
      path: '/vulTaskForm',
      component: vulTaskForm,
      name: 'vulTaskForm'
    },
  {
    path: '/',
    component: context,
    name: 'context'
  }
];

export default routes;
