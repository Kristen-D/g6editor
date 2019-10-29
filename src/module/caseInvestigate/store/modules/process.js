import utils from 'components/js/common.js'

const state = {
  getLeaderRoleUserUrl: "/ssa/processMgmt/getLeaderRoleUser.do",
  getHandleRoleUserUrl: "/ssa/processMgmt/getHandleRoleUser.do",
  getSuperviseRoleUserUrl: "/ssa/processMgmt/getSuperviseRoleUser.do",
  //公安领导
  leaderList: [],
  leaderMap: {},
  //公安经办
  handleList: [],
  handleMap: {},
  //公安督办
  superviseList: [],
  superviseMap: {},

  inspectionItems: [],
  inspectionMap: {},
  roles: {},
  isCompany: false,
  protocols:[],
  protocolsMap:{},
  deviceTypes:[],
  deviceTypesMap:{},
  caseTypes:[],
  caseTypesMap:{},
  technicalVisible:false

}

const getters = {

}

const actions = {

  getSuperviseRoleUser({
    state,
    commit
  }) {
    if (state.superviseList.length == 0) {
      utils.req(state.getSuperviseRoleUserUrl).then(result => {
        commit('setSuperviseList', result);
      });
    }
  },

  getHandleRoleUser({
    state,
    commit
  }) {
    if (state.handleList.length == 0) {
      utils.req(state.getHandleRoleUserUrl).then(result => {
        commit('setHandleList', result);
      });
    }
  },

  getLeaderRoleUser({state,commit}) {
    if (state.leaderList.length == 0) {
      utils.req(state.getLeaderRoleUserUrl).then(result => {
        commit('setLeaderList', result);
      });
    }
  },
  async getUserRoles({commit,state}) {
    var data = await utils.req("/ssa/processMgmt/getUserRole.do");
    commit('setRoles', data);
  },
   getCaseProtocol({commit,state}) {
     if (state.protocols.length == 0) {
      utils.req("/ssa/caseInvestigate/getCaseProtocol.do").then(result =>{
        commit('setProtocols', result);
      });
    }
  },
  getCaseDeviceType({commit,state}){
    if (state.deviceTypes.length == 0) {
    utils.req("/ssa/caseInvestigate/getCaseDeviceType.do").then(result =>{
      commit('setDeviceTypes',result);
    });
  }},

  getCaseType({commit,state}){
    if (state.caseTypes.length == 0) {
    utils.req("/ssa/caseInvestigate/getCaseType.do").then(result =>{
      commit('setCaseTypes',result);
    });
  }},
  async getCaseInvestigateById({commit,state}, [params]) {
    var result = await utils.req("/ssa/caseInvestigate/getCaseInvestigateById.do", params, this);
    return result;
  },
  async getCaseAduitDetail({commit,state}, [params]) {
    var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result2[0].textValue;
    data.isPass = result2[1].longValue;
    return data;
  },

  async getCaseInvestigateDetail({commit,state}, [params]) {
    var result = await utils.req("/ssa/caseInvestigate/getCaseInvestigateDetail.do", params, this);
    return result;
  },
  async getCaseFileDetail({commit,state}, [params]) {
    var result = await utils.req("/ssa/caseInvestigate/getCaseFileDetail.do", params, this);
    return result;
  }


}

const mutations = {

  setLeaderList(state, data) {
    state.leaderList = data;
    state.leaderList.forEach(item => {
      state.leaderMap[item.user_id] = item;
    });
  },

  setHandleList(state, data) {
    state.handleList = data;
    state.handleList.forEach(item => {
      state.handleMap[item.user_id] = item;
    });
  },

  setSuperviseList(state, data) {
    state.superviseList = data;
    state.superviseList.forEach(item => {
      state.superviseMap[item.user_id] = item;
    });
  },
  setRoles(state, data) {
    state.roles = data;
  },
  setProtocols(state, data){
    state.protocols = data;
    state.protocols.forEach(item =>{
      state.protocolsMap[item.value] = item;
    });
  },
  setDeviceTypes(state,data){
    state.deviceTypes = data;
    state.deviceTypes.forEach(item =>{
      state.deviceTypesMap[item.value] = item;
    });
  },
  setCaseTypes(state,data){
    state.caseTypes = data;
    state.caseTypes.forEach(item =>{
      state.caseTypesMap[item.value] = item;
    });

  }



}


export default {
  state,
  getters,
  actions,
  mutations
}
