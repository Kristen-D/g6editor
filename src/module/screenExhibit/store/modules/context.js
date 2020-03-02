import { SET_ACTIVE_SCREEN, SET_INFO_LIST } from '../mutation-types.js'
import common from 'components/js/common.js'
const state = {
  activeScreen: '',
  list: {
    EventTypeList: [],
    EventTypeListUrl: "/ssa/screenExhibit/getEventTypeList.do",
    ProductTypeList: [],
    ProductTypeListUrl: "/ssa/screenExhibit/getProductTypeList.do",
    EventThreatList: [],
    EventThreatListUrl: "/ssa/netAttack/getEventThreatList.do",
    EventGradeList: [],
    EventGradeListUrl: "/ssa/screenExhibit/getEventGradeList.do",
    EventRiskList: [],
    EventRiskListUrl: "/ssa/screenExhibit/getEventRiskList.do"
  }

}


const getters = {

}


const mutations = {
  SET_ACTIVE_SCREEN(state, name) {
    state.activeScreen = name;
  },
  SET_INFO_LIST(state, [data, data2, data3, data4, data5]) {
    state.list.EventTypeList=data;
    state.list.ProductTypeList=data2;
    state.list.EventThreatList=data3;
    state.list.EventGradeList=data4;
    state.list.EventRiskList=data5;
  }
}

const actions = {
  async loadInfoList({ state, commit }) {
    // var data = await common.req(state.list.EventTypeListUrl);
    // var data2 = await common.req(state.list.ProductTypeListUrl);
    // var data3 = await common.req(state.list.EventThreatListUrl);
    // var data4 = await common.req(state.list.EventGradeListUrl);
    // var data5 = await common.req(state.list.EventRiskListUrl);
    let [data, data2, data3, data4, data5] = await Promise.all([
      common.req(state.list.EventTypeListUrl),
      common.req(state.list.ProductTypeListUrl),
      common.req(state.list.EventThreatListUrl),
      common.req(state.list.EventGradeListUrl),
      common.req(state.list.EventRiskListUrl)
    ])
    commit(SET_INFO_LIST, [data, data2, data3, data4, data5]);
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
