import context from './modules/context'
import editTable from './modules/editTable.js'
import drillDialog from './modules/drillData.js'


export default new Vuex.Store({
  modules: {
    context,
    editTable,
    drillDialog
  }
})
