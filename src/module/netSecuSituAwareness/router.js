
import mainview from './components/MainView.vue'
import details from './components/AwarenessDetails.vue'
const routes = [

    {path: '/', component: mainview, name:'mainview' },
    {path: '/details', component: details, name:'details'}
];

export default routes;
