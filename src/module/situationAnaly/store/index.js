
// import leftPanel from 'components/leftpanel/left-panel'
// import topPanel from 'components/topnel/top-panel'
import context from './modules/context'
import editTable from './modules/editTable'
import drillDialog from './modules/drillData.js'
import gridster from 'components/gridster/gridster.js'

export default new Vuex.Store({
  modules: {
    context,
    editTable,
    drillDialog,
    gridster
  }
})
