import Context from './components/Context.vue'
import StrategyConfigurationTable from './components/StrategyConfigurationTable.vue'

let routes = [
  {
    path : '/',
    name : 'context',
    component : Context
  },
  {
    path : '/StrategyConfigurationTable',
    name : 'strategyConfigurationTable',
    component : StrategyConfigurationTable,
  },

];

export default routes;
