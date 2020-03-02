
import blackSearchLoophole from './components/BlackSearchLoophole.vue';
import blackSearchDomain from './components/BlackSearchDomain.vue';
import blackSearchIp from './components/BlackSearchIp.vue';
import blackSearchUrl from './components/BlackSearchUrl.vue';
import searchWhoIsForm from './components/SearchWhoIsForm.vue';

const routes = [
  {path: '/blackSearchLoophole', component: blackSearchLoophole, name:'blackSearchLoophole' },
  {path: '/blackSearchDomain', component: blackSearchDomain, name:'blackSearchDomain' },
  {path: '/blackSearchUrl', component: blackSearchUrl, name:'blackSearchUrl' },
  {path: '/blackSearchIp', component: blackSearchIp, name:'blackSearchIp' },
  {path: '/searchWhoIsForm', component: searchWhoIsForm, name:'searchWhoIsForm' },
];

export default routes;
