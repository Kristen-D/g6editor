import context from './modules/context'
import detail from './modules/detail'
import editTable from './modules/editTable'

export default new Vuex.Store({
  modules: {
    context,
    editTable,
    detail
  }
})
