import mailTemplateForm from './components/MailTemplateForm.vue';
import context from './components/Context.vue';

let routes = [{
    path: "/",
    component: context,
    name: "context"
  },
  {path: '/mailTemplateForm', component: mailTemplateForm, name:'mailTemplateForm' },

  {path: '/', component: context, name:'context' }



]


export default routes;
