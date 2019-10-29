import utils from 'components/js/common.js'

const state = {

}

const getters = {

}

const actions = {

  async getUnitIssuedDetail({commit,state}, [params]) {
    var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result[0].textValue;
    return data;
  },
  async getUnitCheckDetail({commit,state}, [params]) {
    var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.isPass = result[0].longValue;
    data.reason = result[1].textValue;
    return data;
  },
  async getUnitRectificationDetail({commit,state}, [params]) {
    var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result[0].textValue;
    return data;
  },
  //获取事件上报详细信息
  async getOpinionDetail({
    commit,
    state
  }, [params, tkey]) {
    if (tkey == "Unit_Check") {
      params.varName = "checkPass";
    }
    else{
      params.varName = "";
    }
    var data = {};
    if(params.varName != ""){
      var result1 = await utils.req("/ssa/processMgmt/getHiVarsByVarNameAndProcessId.do", params, this);
      if (result1[0] != undefined) {
        data.isPass = result1[0].longValue;
      }
    }
    var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    if (result2[0] != undefined) {
      data.reason = result2[0].textValue;
    }
    return data;
  },
  async getUserRoles({commit,state}){
     var data =  await utils.req("/ssa/processMgmt/getUserRole.do");
      commit('setRoles',data);
  },
}

const mutations = {
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
