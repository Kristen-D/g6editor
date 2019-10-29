import common from 'components/js/common.js'

const state = {
  orderType: {
    ascending: "asc",
    descending: "desc"
  }
}

const getters = {

}

const actions = {
  async loadTableData({
    commit,
    state
  }, [id, params, url]) {

    state[id].loading = true;
    if (!params) params = state[id].params;
    if (!url) url = state[id].tableUrl;
    params.pageSize = state[id].pageSize;
    params.pageIndex = state[id].pageIndex;

    var data = await common.req(url, params);

    commit('setTableAfterLoad', [id, data]);
    return data;
  },
  async reloadTable({
    dispatch,
    state
  }, id) {

    var data = await dispatch('loadTableData', [id]);


    state[id].pageIndex = 1;
    return data;
  },

  async handleCurrentChange({
    dispatch,
    state
  }, [id, pageIndex]) {
    state[id].pageIndex = pageIndex;
    return await dispatch('loadTableData', [id]);
  },

  async handleDelete({
    commit,
    state,
    dispatch
  }, [context, i, row]) {
    var id = context.id;
    context.$confirm('此操作将删除该行, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      var msg = await common.req(state[id].delUrl, row);
      await dispatch('reloadTable', id);
      context.$message({
        type: 'success',
        message: msg
      });
      return msg;
    })
  },

  async handleSave({
    commit,
    state,
    dispatch
  }, [context, id, params]) {
    var id = context.id;
    var msg = await common.req(state[id].saveUrl, params);
    context.$message({
      type: "success",
      message: msg
    });
    return msg;
  },

  async handleSortChange() {

  }

}

const mutations = {
  registerConf(state, [id, conf]) {

    state[id] = conf;
  },
  setTableAfterLoad(state, [id, data]) {

    state[id].loading = false;
    state[id].tableData = data.rowData;
    state[id].total = data.total;
  },
  setParams(state, [id, params]) {
    for (var p in params) {
      state[id].params[p] = params[p];
    }
  },
  handleSortChange(state, [id, selectedRow]) {
    state[id].multipleSelection = selectedRow;
  }
,
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
