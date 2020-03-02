
import commonAjax from 'components/js/common.js'
const state = {
  code:'',
  alarmGradeList: [],
  alarmTypeList: [],
  alarmParentTypeList:[],
  alarmThreeTypeList:[]
}


const mutations = {
  setCode(state,code){
    //debugger;
    state.code = code;
  },
  setListTypeList(state, {alarmGradeList,alarmTypeList,alarmParentTypeList,alarmThreeTypeList}) {
    state.alarmGradeList = alarmGradeList;
    state.alarmTypeList = alarmTypeList;
    state.alarmParentTypeList = alarmParentTypeList;
    state.alarmThreeTypeList=alarmThreeTypeList;
  },
  setListScriptList(state, {autoFormLists}) {
    state.autoFormLists = autoFormLists;
  },
  setRoles(state,[roledata]){
    state.roles = roledata;
  }

}

const getters = {

}

const actions = {
  async getUserRoles({state,commit}){
     var roledata =  await commonAjax.req("/ssa/processMgmt/getUserRole.do");
      commit('setRoles',[roledata]);
      return roledata;
  },
  async loadListTypeList({
    state,
    commit
  }) {
    var initData = await commonAjax.req("/ssa/alarmManagerSd/getInitData.do");
    commit('setListTypeList', initData);
    return initData;
  },
  async loadScriptList({
    state,
    commit
  },[params,url]) {
    var initData=await commonAjax.req(url,params);
   return initData;

  }


}



export default {
  state,
  getters,
  actions,
  mutations
}
