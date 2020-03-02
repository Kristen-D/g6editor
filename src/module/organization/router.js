import context from './components/Context.vue';
import app from './components/App.vue';
import organizationForm from './components/OrganizationForm.vue'


let routes = [{
    path: "/",
    component: context,
    name: "context"

  },
  {
    path: "/organizationForm",
    component: organizationForm,
    name: "organizationForm"
  }
]


export default routes;
