import common from  'components/js/common.js'

const state = {
  orderTypeTree : [],
  orderTypeTreeUrl : '/sdsec/web/order/order/pageQuery',
}

const getters = {

}

const actions={
  async loadOrderTable({commit,state},[id,params,url]){
    if (!params) params = state[id].params;
    if (!url) url = state[id].tableUrl;
    params.pageSize = state[id].pageSize;
    params.pageIndex = state[id].pageIndex;
    // var data = await common.req(url, params);
    var data = await common.reqObjBackState(url, params,id);
    // console.log(data);
    commit('setTableAfterLoad', [id, data]);
    state[id].load = false;
    return data;
  },
  async loadOrderTypeTree({commit,state}){
    var param = {'showTree':true};
    // var data = await common.req(state.resPoolTypeTreeUrl, param, this);
    var data = await common.reqObjBackState(state.orderTypeTreeUrl, param, this);
    commit('setOrderTypeTree', data);
    return data;
  },
  async reloadTable({dispatch,state},id) {
    state[id].pageIndex = 1;
    state[id].pageSize = 10;
    var data = await dispatch('loadOrderTable', [id]);
    return data;
  },
  async handleCurrentChange({dispatch,state},[id,pageIndex]){
    state[id].pageIndex = pageIndex;
    return await dispatch('loadOrderTable',[id]);
  },
  async handleSizeChange({dispatch,state},[id,pageSize]){
    state[id].pageSize = pageSize;
    return await  dispatch('loadOrderTable',[id]);
  },

  //以下为未改名的函数，不清楚具体用途
  // async loadAssetTypeOsTree({commit,state}){
  //   var param = {'showTree':true};
  //   var data = await common.req(state.assetTypeOsTreeUrl,param,this);
  //   commit('setAssetTypeOsTree',data);
  //   return data;
  // },
  //
  // async loadAssetBiz({commit,state}){
  //
  //   var data = await common.req(state.assetBizUrl);
  //   commit('setAssetBiz',data);
  //   return  data;
  // },
  //
  // async loadAssetOs({commit,state},param){
  //   var data = await common.req(state.assetOsUrl,param);
  //   if(data == null){
  //     state.assetOs = [];
  //   }else{
  //     commit('setAssetOs',data);
  //   }
  //   return data;
  // },

  async loadOrgTree({commit,state}){
    // var data = await common.req(state.orgTreeUrl);
    var data = await common.reqObjBackState(state.orgTreeUrl);
    commit('setOrgTree',data);
    return  data;
  },


}

const mutations={
  setOrderTypeTree(state, data){
    state.orderTypeTree = data;
  },
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

//以下为未改名的函数，不清楚具体用途
//   setAssetBiz(state,data){
//     state.assetBiz = data;
//   },
//   setAssetOs(state,data){
//     state.assetOs = data;
//   },
//   setAssetTypeOsTree(state,data){
//     state.assetTypeOsTree = data;
//   },
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



