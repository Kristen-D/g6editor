import commonAjax from 'components/js/common.js'

const state = {
  alarmGradeList: [],
  alarmTypeList: [],
  alarmParentTypeList:[]
}


const mutations = {
  setListTypeList(state, {alarmGradeList,alarmTypeList,alarmParentTypeList}) {
    state.alarmGradeList = alarmGradeList;
    state.alarmTypeList = alarmTypeList;
    state.alarmParentTypeList = alarmParentTypeList;
  }

}

const getters = {

}

const actions = {

  async loadListTypeList({
    state,
    commit
  }) {
    var initData = await commonAjax.req("/ssa/alarmManagerJs/getInitData.do");
    commit('setListTypeList', initData);
    return initData;
  }



}



export default {
  state,
  getters,
  actions,
  mutations
}
