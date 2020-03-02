import utils from 'components/js/common.js'

const state = {
  getOrgListUrl: "/ssa/organization/getCompanyOrg.do",
  orgList:[],
  orgMap:{},
  getPoliceOrgUrl:"/ssa/organization/getPoliceOrg.do",
  policeOrgList:[],
  policeOrgMap:{}

}

const getters = {

}

const actions = {
  //获取表单数据
  async getWarnHandleInfoById({commit,state},[params]){
     var result =  await utils.req("/ssa/warnMgmt/getWarnHandleInfoById.do",params,this);
     return result;
  },
  async geteventTzDetail({
    commit,
    state
  }, [params]) {
    var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result2[0].textValue;
    data.isPass = result2[1].longValue;
    return data;
  },
  async getEventReportDetail({
    commit,
    state
  }, [params]) {
    params.varName = "alertFbPass";
    var result1 = await utils.req("/ssa/processMgmt/getHiVarsByVarNameAndProcessId.do", params, this);
    var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    if (result1[0] != undefined) {
      data.isPass = result1[0].longValue;

    }
    if (result2[0] != undefined) {
      data.reason = result2[0].textValue;
    }

    return data;

  },
  //获取事件审核详细
  async getEventAduitDetail({
    commit,
    state
  }, [params]) {
    var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result2[0].textValue;
    data.isPass = result2[1].longValue;
    return data;
  },
  async getEventAduitDetail1({
    commit,
    state
  }, [params]) {
    params.varName = "alertSpPass";
    var result1 = await utils.req("/ssa/processMgmt/getHiVarsByVarNameAndProcessId.do", params, this);
    var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    if (result1[0] != undefined) {
      data.isPass = result1[0].longValue;

    }
    if (result2[0] != undefined) {
      data.reason = result2[0].textValue;
    }
    return data;
  },
  async getEventYzSpDetail({
    commit,
    state
  }, [params]) {
    params.varName = "alertYzPass";
    var result1 = await utils.req("/ssa/processMgmt/getHiVarsByVarNameAndProcessId.do", params, this);
    var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    if (result1[0] != undefined) {
      data.isPass = result1[0].longValue;

    }
    if (result2[0] != undefined) {
      data.reason = result2[0].textValue;
    }
    return data;
  },
  async getEventJcDetail({
    commit,
    state
  }, [params]) {
    params.varName = "alertJcPass";
    var result1 = await utils.req("/ssa/processMgmt/getHiVarsByVarNameAndProcessId.do", params, this);
    var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    if (result1[0] != undefined) {
      data.isPass = result1[0].longValue;

    }
    if (result2[0] != undefined) {
      data.reason = result2[0].textValue;
    }
    return data;
  },
  async getEventFkDetail({
    commit,
    state
  }, [params]) {
    var data = await utils.req("/ssa/warnMgmt/geteventFkReport.do", params, this);
    return data;
  },

  async getAlertFeedbackDetail({
    commit,
    state
  }, [params]) {
    var result = await utils.req("/ssa/warnMgmt/getFeedBackByTaskId.do", params, this);
    return result;
  },
  async getEventYzDetail({
    commit,
    state
  }, [params]) {
    var data = await utils.req("/ssa/warnMgmt/geteventYzReport.do", params, this);
    return data;
  },
  async   loadOrgList({state,commit}){
    if (state.orgList.length == 0) {
     var data = await utils.req(state.getOrgListUrl);
      commit('setOrgList',data);
      return  data;
      }

    },
    async   loadPoliceOrgList({state,commit}){
      if (state.policeOrgList.length == 0) {
       var data = await utils.req(state.getPoliceOrgUrl);
        commit('setPoliceOrgList',data);
        return  data;
        }

      },

    async getUserRoles({commit,state}){
       var data =  await utils.req("/ssa/processMgmt/getUserRole.do");
        commit('setRoles',data);
    }
}


const mutations = {
  setOrgList(state,data){
    state.orgList = data;
    state.orgList.forEach(org=>{
      state.orgMap[org.value] = org;
    });
  },
  setPoliceOrgList(state,data){
    state.policeOrgList = data;
    state.policeOrgList.forEach(org=>{
      state.policeOrgMap[org.value] = org;
    });
  },
  setRoles(state,data){
    state.roles = data;
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
