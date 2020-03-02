import utils from 'components/js/common.js'

const state = {

  getLeaderRoleUserUrl: "/ssa/processMgmt/getLeaderRoleUser.do",
  getHandleRoleUserUrl: "/ssa/processMgmt/getHandleRoleUser.do",
  getSuperviseRoleUserUrl: "/ssa/processMgmt/getSuperviseRoleUser.do",
  getInspectionItemsUrl: "/ssa/taskInspect/getInspectionItems.do",
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

  getLeaderRoleUser({
    state,
    commit
  }) {
    if (state.leaderList.length == 0) {
      utils.req(state.getLeaderRoleUserUrl).then(result => {
        commit('setLeaderList', result);
      });
    }
  },

  getInspectionItems({
    state,
    commit
  }) {
    if (state.inspectionItems.length == 0) {
      utils.req(state.getInspectionItemsUrl).then(result => {
        commit('setInspectionItems', result);
      });
    }
  },

  async getTaskInspectById({
    commit,
    state
  }, [params]) {
    var result = await utils.req("/ssa/taskInspect/getTaskInspectById.do", params, this);
    return result;
  },

  async getInspectAduitDetail({
    commit,
    state
  }, [params]) {
    var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result2[0].textValue;
    data.isPass = result2[1].longValue;
    return data;
  },
  async getSuperviseInspectDetail({
    commit,
    state
  }, [params, tkey]) {
    //获取所有检查内容
    var result = await utils.req("/ssa/taskInspect/getTaskInsepctRecordBytaskInspectId.do", params, this);
    return result;

  },

  async getIllegalaction({
    commit,
    state
  }) {
    var result = await utils.req("/ssa/taskInspect/getIllegalaction.do", null, this);
    return result;
  },
  //获取 整改通知详细内容
  async getRectificationNoticeDetail({
    commit,
    state
  }, [params]) {
    var result = await utils.req("/ssa/taskInspect/getReformNotificationByTaskId.do", params, this);
    return result;
  },



  //获取整改反馈详细内容
  async getRectificationFeedbackDetail({
    commit,
    state
  }, [params]) {
    var result = await utils.req("/ssa/taskInspect/getFeedBackByTaskId.do", params, this);
    return result;
  },
  //获取整改反馈信息
  async getRectificationCheckDetail({
    commit,
    state
  }, [params]) {
    var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.checkOpinion = result[1].textValue;
    data.isPass = result[0].longValue;
    return data;
  },

  //获取获取通报详细内容
  async getBulletinDetail({
    commit,
    state
  }, [params]) {
    var result = await utils.req("/ssa/taskInspect/getTaskInspectBulletinByTaskInspectId.do", params, this);
    return result;
  },
  downloadFile({
    commit,
    state
  }, [params]) {
    var fileUrl = "/ssa/taskInspect/downloadFile.do?task_inspect_id=" +
      params.task_inspect_id + "&taskName=" + params.tkey + "&taskId=" + params.taskId;
    window.location.href = fileUrl;
  },


  async getUserRoles({
    commit,
    state
  }) {
    var data = await utils.req("/ssa/processMgmt/getUserRole.do");
    commit('setRoles', data);
  },
  async getAdministrativePenaltyDetail({
    commit,
    state
  }, [params, tkey]) {
    var data = await utils.req("/ssa/eventMgmt/getAministrativePenalty.do", params, this);
    return data;
  },

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
