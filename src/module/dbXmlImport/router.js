import context from './components/Context.vue';
import taskInspectForm from './components/TaskInspectForm.vue'
import mainForm from './components/MainForm.vue'
import app from './components/App.vue';

let routes = [{
    path: "/",
    component: context,
    name: "context"
  },
  {
    path: "/mainForm",
    component: mainForm,
    name: "mainForm"
  }
]
export default routes;
