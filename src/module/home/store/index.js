
// import leftPanel from 'components/leftpanel/left-panel'
// import topPanel from 'components/topnel/top-panel'
import context from './modules/context'
import gridster from 'components/gridster/gridster.js'
import editTable from 'components/gridster/testTable.js'

export default new Vuex.Store({
  modules: { 
    // leftPanel,
    // topPanel,
    context,
    editTable,
    gridster
  }
})
