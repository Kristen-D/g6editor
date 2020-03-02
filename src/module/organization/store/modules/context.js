import utils from 'components/js/common.js'

const state = {
  areaList: [],
  areaMap: {},
  orgList: [],
  orgMap: {},
  areaUrl: "/ssa/organization/getArea.do",
  orgUrl: "/ssa/organization/getOrganizationType.do"
}

const getters = {

}

const actions = {
  async loadOrgList({
    state,
    commit
  }) {
    if (state.orgList.length == 0) {
      var data = await utils.req(state.orgUrl); 
      commit('setOrgList', data);
      return data;
    }

  },
  async loadAreaList({
    state,
    commit
  }) {
    if (state.areaList.length == 0) {
      var data = await utils.req(state.areaUrl);
      commit('setAreaList', data);
      return data;
    }

  }

}

const mutations = {
  setAreaList(state, data) {
    state.areaList = data;
    state.areaList.forEach(area => {
      state.areaMap[area.id] = area;
    });
  },
  setOrgList(state, data) {
    state.orgList = data;
    state.orgList.forEach(org => {
      state.orgMap[org.id] = org;
    });
  }

}


export default {
  state,
  getters,
  actions,
  mutations
}
