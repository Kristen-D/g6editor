import { SET_ACTIVE_SCREEN, SET_INFO_LIST } from '../mutation-types.js'
import common from 'components/js/common.js'
const state = {
  list: {
    NewEventTypeList: {},
    NewEventTypeListUrl: "/ssa/netattack/getNewEventType.do",
    AttackPhaseList: {},
    AttackPhaseListUrl: "/ssa/netattack/getNetattackPhaseDict.do",
  }

}


const getters = {

}


const mutations = {
  SET_ACTIVE_SCREEN(state, name) {
    state.activeScreen = name;
  },
  SET_INFO_LIST(state, [data, data2]) {
    state.list.NewEventTypeList=common.convertArray2Obj(data, 'id', 'name');
    state.list.AttackPhaseList=common.convertArray2Obj(data2, 'id', 'name');
  }
}

const actions = {
  async loadInfoList({ state, commit }) {
    let [data, data2] = await Promise.all([
      common.req(state.list.NewEventTypeListUrl),
      common.req(state.list.AttackPhaseListUrl),
    ])
    commit(SET_INFO_LIST, [data, data2]);
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
