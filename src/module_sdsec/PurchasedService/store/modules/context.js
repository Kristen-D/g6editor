import common from  'components/js/common.js'

const state = {
}

const getters = {

}

const actions={
  async loadPurchasedServiceTable({commit,state},[id,params,url]){
    if (!params) params = state[id].params;
    if (!url) url = state[id].tableUrl;
    params.pageSize = state[id].pageSize;
    params.pageIndex = state[id].pageIndex;
    var data = await common.reqObjBackState(url, params,id);
    commit('setTableAfterLoad', [id, data]);
    state[id].load = false;
    return data;
  },
  async reloadTable({dispatch,state},id) {
    state[id].pageIndex = 1;
    state[id].pageSize = 10;
    var data = await dispatch('loadPurchasedServiceTable', [id]);
    return data;
  },
  async handleCurrentChange({dispatch,state},[id,pageIndex]){
    state[id].pageIndex = pageIndex;
    return await dispatch('loadPurchasedServiceTable',[id]);
  },
  async handleSizeChange({dispatch,state},[id,pageSize]){
    state[id].pageSize = pageSize;
    return await  dispatch('loadPurchasedServiceTable',[id]);
  },

  async loadOrgTree({commit,state}){
    // var data = await common.req(state.orgTreeUrl);
    var data = await common.reqObjBackState(state.orgTreeUrl);
    commit('setOrgTree',data);
    return  data;
  },


}

const mutations={
  setParams(state,[id,params]) {
    for(var p in params){
      state[id].params[p] = params[p];
    }
  },
  setTableAfterLoad(state, [id, data]){
    state[id].tableData = data.data;
    state[id].total = data.total;
  },
  registerConf(state, [id, conf]) {
    state[id] = conf;
  },
  handleSelectionChange(state,[id,selectedRow]){
    state[id].multipleSelection = selectedRow;
  },

  setOrgTree(state,data){
    state.orgTree = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}



