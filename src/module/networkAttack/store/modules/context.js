import { SET_ACTIVE_SCREEN, SET_INFO_LIST } from '../mutation-types.js'
import common from 'components/js/common.js'
const state = {
  localName:'',
  localTion:[],
  AttackLocalTionUrl:"/ssa/netattack/getLocaltion.do",
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
  },
  SET_LOCALTION(state,[data] ){
    var mapStr= new Array();
     mapStr=data.split(",");
    state.localName=mapStr[0];
    let localtion=[];
    localtion.push(mapStr[1])
    localtion.push(mapStr[2]);
    state.localTion=localtion;
  }
}

const actions = {
  async loadInfoList({ state, commit }) {
    let [data, data2] = await Promise.all([
      common.req(state.list.NewEventTypeListUrl),
      common.req(state.list.AttackPhaseListUrl),
    ])
    commit(SET_INFO_LIST, [data, data2]);
  },
  async loadLoction({ state, commit }) {
    let data = await common.req(state.AttackLocalTionUrl);
    commit('SET_LOCALTION', [data]);
    return data ;
  },
}


export default {
  state,
  getters,
  actions,
  mutations
}
