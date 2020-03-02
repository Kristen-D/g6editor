import Context from './components/Context.vue'
import UserManagementTable from "./components/UserManagementTable";
import UserManagementForm from "./components/UserManagementForm";

let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/UserManagementTable',
    name : 'userManagementTable',
    component : UserManagementTable,
  },
  {
    path : '/UserManagementForm',
    name : 'userManagementForm',
    component : UserManagementForm,
  },

];

export default routes;
