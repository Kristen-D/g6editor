import utils from 'components/js/common.js'

const state = {
  getOrgListUrl: "/ssa/organization/getAllOrganization.do",
  getLeaderRoleUserUrl:"/ssa/processMgmt/getLeaderRoleUser.do",
  getHandleRoleUserUrl:"/ssa/processMgmt/getHandleRoleUser.do",
  getSuperviseRoleUserUrl:"/ssa/processMgmt/getSuperviseRoleUser.do",
  orgList:[],
  orgMap:{},
  //公安领导
  leaderList:[],
  //公安经办
  handleList:[],
  //公安督办
  superviseList:[],
  inspectionItems:[],
  roles:{},
}

const getters = {

}

const actions = {
     loadOrgList({state,commit}){
       if(state.orgList == 0){
         utils.req(state.getOrgListUrl).then(result =>{
          commit('setOrgList',result);
        });
       }
    },
    getSuperviseRoleUser({state,commit}){
      if(state.superviseList.length ==0){
        utils.req(state.getSuperviseRoleUserUrl).then(result =>{
         commit('setSuperviseList',result);
       });
      }
    },

    getHandleRoleUser({state,commit}){
      if(state.handleList.length ==0){
        utils.req(state.getHandleRoleUserUrl).then(result =>{
         commit('setHandleList',result);
       });
      }
    },

    getLeaderRoleUser({state,commit}){
      if(state.leaderList.length ==0){
        utils.req(state.getLeaderRoleUserUrl).then(result =>{
         commit('setLeaderList',result);
       });
      }
    },


    async getEvaluationFormById({commit,state},[params]) {
      var result = await utils.req("/ssa/evaluationOrgan/getEvaluationForm.do", params, this);
      return result;
    },
    async getUserRoles({commit,state}){
       var data =  await utils.req("/ssa/processMgmt/getUserRole.do");
        commit('setRoles',data);
    },
    async getReportCheckDetail({commit,state}, [params]) {
      var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
      var data = {};
      data.reason = result[0].textValue;
      data.isPass = result[1].longValue;
      return data;
    },
    async getFileDetail({commit,state}, [params]) {
      var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
      var data = {};
      data.reason = result[0].textValue;
      //data.isPass = result[1].longValue;
      return data;
    },
    async getDisposalApprovalDetail({commit,state}, [params]) {
      var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
      var data = {};
      data.reason = result[0].textValue;
      //data.isPass = result[1].longValue;
      return data;
    },
    async getDisposalOpinionDetail({commit,state}, [params]) {
      //var result = await utils.req("/ssa/evaluationOrgan/getOpinionById.do", params, this);
      var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
      var data = {};
      data.disposal_opinion = result[0].textValue;
      //data.isPass = result[1].longValue;
      return data;
    },
    downloadFile({commit,state},[params]) {
      var fileUrl = "/ssa/evaluationOrgan/downloadFile.do?filePath=" + params.filePath + "&fileName=" + params.fileName;
      window.location.href = fileUrl;
    },
}

const mutations = {
  setOrgList(state,data){
    state.orgList = data;
    state.orgList.forEach(org=>{
      state.orgMap[org.value] = org;
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
