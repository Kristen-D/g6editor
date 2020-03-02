import Context from './components/Context.vue'
import TenantTable from "./components/TenantTable";
import TenantForm from "./components/TenantForm";

let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/TenantTable',
    name : 'tenantTable',
    component : TenantTable,
  },
  {
    path : '/TenantForm',
    name : 'tenantForm',
    component : TenantForm,
  },

];

export default routes;
