import common from 'components/js/common.js'

const  state = {

}


const getters = {

}

const actions = {

  async reloadSearchTable({dispatch,state},id){
    state[id].pageSize = 10;
    state[id].pageIndex = 1;
    var data = await dispatch('loadTable', [id]);
    return data;
  },
  async reloadTable({dispatch,state},id){
    var data = await dispatch('loadTable', [id]);
    return data;
  },
  async loadTable({commit,state},[id,params,url]){
    if (!params) params = state[id].params;
    if (!url) url = state[id].tableUrl;
    params.pageSize = state[id].pageSize;
    params.pageIndex = state[id].pageIndex;

    var data = await common.reqObj(url, params);

    commit('setTableAfterLoad', [id, data]);
    state[id].load = false;
    return data;
  },
  async handleCurrentChange({dispatch,state},[id,pageIndex]){
    state[id].pageIndex = pageIndex;
    return await dispatch('loadTable',[id]);
  },

  async handleSizeChange({dispatch,state},[id,pageSize]){
    state[id].pageSize = pageSize;
    return await  dispatch('loadTable',[id]);
  }
}

const mutations = {


  registerConf(state, [id, conf]) {
    state[id] = conf;
  },
  setTableAfterLoad(state, [id, data]) {
    state[id].tableData = data.rowData;
    state[id].total = data.total;
  },
  setParams(state,[id,params]) {
    for(var p in params){
      state[id].params[p] = params[p];
    }
  },
  handleSelectionChange(state,[id,selectedRow]){
    state[id].multipleSelection = selectedRow;
  }

}


export default {
  state,
  getters,
  actions,
  mutations
}
