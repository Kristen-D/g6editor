

import knowledgemanagement from './components/KnowledgeManagement.vue';
import knowledgemanagementdetails from './components/KnowledgeManagementDetails.vue';

import knowledgemanagementadd from './components/KnowledgeManagementAdd.vue';
import knowledgemanagementedit from './components/KnowledgeManagementEdit.vue';

const routes = [
  {path: '/', component: knowledgemanagement, name:'knowledgemanagement' },
  {path: '/knowledgemanagementdetails', component: knowledgemanagementdetails, name:'knowledgemanagementdetails' },
  {path: '/knowledgemanagementadd', component: knowledgemanagementadd, name:'knowledgemanagementadd' },
  {path: '/knowledgemanagementedit', component: knowledgemanagementedit, name:'knowledgemanagementedit' }
];

export default routes;
