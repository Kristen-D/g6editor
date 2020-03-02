import context from './modules/context'
import editTable from './modules/editTable.js'
import drillData from './modules/drillData.js'


export default new Vuex.Store({
  modules: {
    context,
    editTable,
    drillData
  }
})
