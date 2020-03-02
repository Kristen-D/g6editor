import common from 'components/js/common.js'

const state = {
  getOrgListUrl: "/ssa/organization/getCompanyOrg.do",
  orgList: [],
  orgMap: {},
  recvOrgList: []
}

const getters = {

}

const actions = {
  //获取表单数据
  async getNoticeHandleInfoById({
    commit,
    state
  }, [params]) {
    var result = await common.req("/ssa/alertNotice/getNoticeHandleInfoById.do", params, this);
    return result;
  },
  async geteventTzDetail({
    commit,
    state
  }, [params]) {
    var result2 = await common.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result2[0].textValue;
    data.isPass = result2[1].longValue;
    return data;
  },
  async getEventReportDetail({
    commit,
    state
  }, [params]) {
    params.varName = "noticeFbPass";
    var result1 = await common.req("/ssa/processMgmt/getHiVarsByVarNameAndProcessId.do", params, this);
    var result2 = await common.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
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
    var result2 = await common.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result2[0].textValue;
    data.isPass = result2[1].longValue;
    return data;
  },
  async getEventAduitDetail1({
    commit,
    state
  }, [params]) {
    params.varName = "noticeSpPass";
    var result1 = await common.req("/ssa/processMgmt/getHiVarsByVarNameAndProcessId.do", params, this);
    var result2 = await common.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    if (result1[0] != undefined) {
      data.isPass = result1[0].longValue;

    }
    if (result2[0] != undefined) {
      data.reason = result2[0].textValue;
    }
    return data;
  },
  async loadRecvOrgList({
    commit,
    state
  }, [params]) {
    var data = await common.req("/ssa/alertNotice/getEventFkQsDetail.do", params, this);
    commit('setRecvOrgList', data);
    return data;
  },
  async getFeedbackDetail({
    commit,
    state
  }, [params]) {
    var result = await common.req("/ssa/alertNotice/getFeedBackByTaskId.do", params, this);
    return result;
  },
  async loadOrgList({
    state,
    commit
  }) {
    if (state.orgList.length == 0) {
      var data = await common.req(state.getOrgListUrl);
      commit('setOrgList', data);
      return data;
    }

  },
  async getUserRoles({
    commit,
    state
  }) {
    var data = await common.req("/ssa/processMgmt/getUserRole.do");
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
  },
  setRecvOrgList(state, data) {
    state.recvOrgList = data;
  },
}


export default {
  state,
  getters,
  actions,
  mutations
}
