import Context from './components/Context.vue'
import OperationOverviewTable from './components/OperationOverviewDetail.vue'
import OperationOverviewDetail from './components/OperationOverviewTable.vue'
import OperationOverviewBaseInfo from './components/OperationOverviewBaseInfo.vue';
import EventTableContext from '../eventManagement/components/Context'
import EventConfirm from '../eventManagement/components/EventConfirm'
import MessageTableContext from '../messageCenter/components/Context'
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
    path : '/OperationOverviewTable',
    name : 'OperationOverviewTable',
    component : OperationOverviewTable,
  },
  {
    path : '/EventTableContext',
    name : 'EventTableContext',
    component : EventTableContext
  },
  {
    path : '/EventConfirm',
    name : 'EventConfirm',
    component : EventConfirm
  },
  {
    path : '/MessageTableContext',
    name : 'MessageTableContext',
    component : MessageTableContext
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
    path : '/OperationOverviewDetail/:id',
    name : 'OperationOverviewDetail',
    component : OperationOverviewDetail,
    children:[
      {
        path: '/OperationOverviewBaseInfo',
        name: 'OperationOverviewBaseInfo',
        component: OperationOverviewBaseInfo
      }
    ]
  }
];

export default routes;
