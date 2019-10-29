
// import leftPanel from 'components/leftpanel/left-panel'
// import topPanel from 'components/topnel/top-panel'
import context from './modules/context'
import editTable from './modules/editTable'
import drillDialog from './modules/drillData.js'
import infoDialog from './modules/infoDialog.js'
import gridster from 'components/gridster/gridster.js'
import detailDialog from './modules/detailDialog.js'
import dialog from './modules/dialog';
import network from './modules/network';

export default new Vuex.Store({
  modules: {
    context,
    editTable,
    drillDialog,
    infoDialog,
    gridster,
    detailDialog,
    dialog,
    network
  }
})
