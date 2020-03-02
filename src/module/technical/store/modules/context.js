import common from 'components/js/common.js'

const state = {
  getOrgListUrl: "/ssa/organization/getOtherOrg.do",
  getLeaderRoleUserUrl: "/ssa/processMgmt/getLeaderRoleUser.do",
  getHandleRoleUserUrl: "/ssa/processMgmt/getHandleRoleUser.do",
  getSuperviseRoleUserUrl: "/ssa/processMgmt/getSuperviseRoleUser.do",
  getInspectionItemsUrl: "/ssa/taskInspect/getInspectionItems.do",
  orgList: [],
  orgMap: {},
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
  isCompany: false
}

const getters = {

}

const actions = {
  loadOrgList({
    state,
    commit
  }) {
    if (state.orgList == 0) {
      common.req(state.getOrgListUrl).then(result => {
        commit('setOrgList', result);
      });
    }
  },
  getSuperviseRoleUser({
    state,
    commit
  }) {
    if (state.superviseList.length == 0) {
      common.req(state.getSuperviseRoleUserUrl).then(result => {
        commit('setSuperviseList', result);
      });
    }
  },

  getHandleRoleUser({
    state,
    commit
  }) {
    if (state.handleList.length == 0) {
      common.req(state.getHandleRoleUserUrl).then(result => {
        commit('setHandleList', result);
      });
    }
  },

  getLeaderRoleUser({
    state,
    commit
  }) {
    if (state.leaderList.length == 0) {
      common.req(state.getLeaderRoleUserUrl).then(result => {
        commit('setLeaderList', result);
      });
    }
  },

  getInspectionItems({
    state,
    commit
  }) {
    if (state.inspectionItems.length == 0) {
      common.req(state.getInspectionItemsUrl).then(result => {
        commit('setInspectionItems', result);
      });
    }
  },

  //获取表单数据
  async getTaskTechnicalById({
    commit,
    state
  }, [params]) {
    var result = await common.req("/ssa/technical/getTaskTechnicalById.do", params, this);
    return result;
  },

  async getassistTzTaskDetail({
    commit,
    state
  }, [params]) {
    var result2 = await common.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result2[0].textValue;
    data.isPass = result2[1].longValue;
    return data;
  },
  async gettechnicalAduitDetail({
    commit,
    state
  }, [params]) {
    var result2 = await common.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result2[0].textValue;
    data.isPass = result2[1].longValue;
    return data;
  },
  async gettechnicalFeedbackDetail({
    commit,
    state
  }, [params]) {
    var result = await common.req("/ssa/technical/getFeedBackByTaskId.do", params, this);
    return result;
  },
  async gettechnicalCheckDetail({
    commit,
    state
  }, [params]) {
    var result = await common.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.technical_place = result[1].textValue;
    data.isPass = result[0].longValue;
    return data;
  },
  downloadFile({
    commit,
    state
  }, [params]) {
    var fileUrl = "/ssa/technical/downloadFile.do?assist_code=" +
      params.assist_code + "&taskName=" + params.tkey + "&taskId=" + params.taskId;
    window.location.href = fileUrl;
  },


  async getUserRoles({
    commit,
    state
  }) {
    var data = await common.req("/ssa/processMgmt/getUserRole.do");
    commit('setRoles', data);
  },

}

const mutations = {
  setOrgList(state, data) {
    state.orgList = data;
    state.orgList.forEach(org => {
      state.orgMap[org.value] = org;
    });
  },
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
  setInspectionItems(state, data) {
    state.inspectionItems = data;
    state.inspectionItems.forEach(items => {
      state.inspectionMap[items.value] = items;
    })
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
