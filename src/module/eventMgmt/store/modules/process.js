import utils from 'components/js/common.js'

const state = {
  getOrgListUrl: "/ssa/organization/getCompanyOrg.do",
  orgList: [],
  orgMap: {},
  roles: {},
  technicalVisible:false
}

const getters = {

}

const actions = {

  //获取事件处置表单数据
  async getEventHandleInfoById({commit,state}, [params]) {
    var result = await utils.req("/ssa/eventMgmt/getEventHandleInfoById.do", params, this);
    // var handlingOwner = await utils.req("/ssa/processMgmt/getUserByUserId.do", {
    //   "user_id": result.handling_owner
    // }, this);
    // var regulator = await utils.req("/ssa/processMgmt/getUserByUserId.do", {
    //   "user_id": result.regulator
    // }, this);
    // if(handlingOwner != null){
    //     result.handlingOwner = handlingOwner.realname;
    // }
    // if(regulator != null){
    //     result.regulatorName = regulator.realname;
    // }



    return result;
  },


  async getEventAduitDetail({
    commit,
    state
  }, [params, tkey]) {
    var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result2[0].textValue;
    data.isPass = result2[1].longValue;
    return data;
  },
  async getEnteringReportDetail({
    commit,
    state
  }, [params, tkey]) {

    var data = await utils.req("/ssa/eventMgmt/getEnteringReport.do", params, this);
    return data;
  },

  async getEventtaskAssessmentDetail({
    commit,
    state
  }, [params, tkey]) {
    var data = await utils.req("/ssa/eventMgmt/getEventtaskAssessment.do", params, this);
    return data;
  },
  async getInquisitionDetail({
    commit,
    state
  }, [params, tkey]) {
    var data = await utils.req("/ssa/eventMgmt/getInquisition.do", params, this);
    return data;
  },
  async getSuperviseRectifyDetail({
    commit,
    state
  }, [params, tkey]) {
    var data = await utils.req("/ssa/eventMgmt/getSuperviseRectify.do", params, this);
    return data;
  },
  async getAdministrativePenaltyDetail({
    commit,
    state
  }, [params]) {
    var data = await utils.req("/ssa/eventMgmt/getAministrativePenalty.do", params, this);
    return data;
  },

  async getFeedbackDetail({
    commit,
    state
  }, [params, tkey]) {
    var data = await utils.req("/ssa/eventMgmt/getFeedback.do", params, this);
    return data;
  },

  //获取整改反馈信息
  async getFeedBackCheckDetailDetail({
    commit,
    state
  }, [params]) {
    var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.checkOpinion = result[1].textValue;
    data.isPass = result[0].longValue;
    return data;
  },
  async loadOrgList({
    state,
    commit
  }) {
    if (state.orgList.length == 0) {
      var data = await utils.req(state.getOrgListUrl);
      commit('setOrgList', data);
      return data;
    }

  },
  async getUserRoles({
    commit,
    state
  }) {
    var data = await utils.req("/ssa/processMgmt/getUserRole.do");
    commit('setRoles', data);
  }


}

const mutations = {
  setOrgList(state, data) {
    state.orgList = data;
    state.orgList.forEach(org => {
      state.orgMap[org.value] = org;
    });
  },
  setRoles(state, data) {
    state.roles = data;
  }

}


export default {
  state,
  getters,
  actions,
  mutations
}
