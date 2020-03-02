import Context from './components/Context.vue'
import SecurityOverviewTable from './components/SecurityOverviewDetail.vue'
import SecurityOverviewDetail from './components/SecurityOverviewTable.vue'
import SecurityOverviewBaseInfo from './components/SecurityOverviewBaseInfo.vue';
import MessageContext from '../messageCenter/components/Context'
import MessageForm from '../messageCenter/components/MessageForm'
import MessageDetail from '../messageCenter/components/MessageDetail'
import MessageBaseInfo from '../messageCenter/components/MessageBaseInfo'

let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/SecurityOverviewTable',
    name : 'SecurityOverviewTable',
    component : SecurityOverviewTable,
  },
  {
    path : '/MessageContext',
    name : 'MessageContext',
    component : MessageContext
  },
  {
    path : '/MessageForm',
    name : 'MessageForm',
    component : MessageForm
  },
  {
    path : '/MessageDetail/:id',
    name : 'MessageDetail',
    component : MessageDetail,
    children:[
      {
        path: '/MessageBaseInfo',
        name: 'MessageBaseInfo',
        component: MessageBaseInfo
      }
    ]
  },
  {
    path : '/SecurityOverviewDetail/:id',
    name : 'SecurityOverviewDetail',
    component : SecurityOverviewDetail,
    children:[
      {
        path: '/SecurityOverviewBaseInfo',
        name: 'SecurityOverviewBaseInfo',
        component: SecurityOverviewBaseInfo
      }
    ]
  }
];

export default routes;
