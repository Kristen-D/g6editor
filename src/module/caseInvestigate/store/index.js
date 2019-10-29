import table from './modules/table.js'
import process from './modules/process.js'
import eventProcess from '../../eventMgmt/store/modules/process.js'

export default new Vuex.Store({
  modules: {
    table,
    process,
    eventProcess
  }
})
